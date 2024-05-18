import { Logger } from "@nestjs/common";
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  WebSocketGateway,
  WebSocketServer,
} from "@nestjs/websockets";

import { Server } from "socket.io";
import { SocketService } from "./socket.service";

@WebSocketGateway({
  cors: {
    origin: '*',
  }
})
export class GameGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  constructor(private readonly socketService: SocketService) { }

  private readonly logger = new Logger(GameGateway.name);
  @WebSocketServer() io: Server;
  interval: any;
  createPeriodEventEmitted: boolean;
  connectedUsers = {}
  socketId: string;
  countdown = (minutes: number, seconds: number) => {
    let time = minutes * 60 + seconds;
    if (this.interval) {
      clearInterval(this.interval);
    }
    this.interval = setInterval(() => {
      if (time === 0) {
        clearInterval(this.interval);
        this.socketService.create({ createNew: true });
        this.socketService.update(this.io, this.connectedUsers);
        this.countdown(3, 0);
      }
      let formattedMinutes: any = Math.floor(time / 60);
      if (formattedMinutes < 10) formattedMinutes = "0" + formattedMinutes;
      let formattedSeconds: any = time % 60;
      if (formattedSeconds < 10) formattedSeconds = "0" + formattedSeconds;
      const text = formattedMinutes + ':' + formattedSeconds;
      if (this.io) {
        this.io.emit('count-down', text);
      }
      time--;
    }, 1000);
  };

  afterInit() {
    this.countdown(3, 0);
    this.logger.log("Initialized");
  };

  handleConnection(client: any) {
    const { sockets } = this.io.sockets;
    this.logger.log(`Client id: ${client.id} connected`);
    this.socketId = client.id;
    const socketQuery = client.handshake.query;
    if (socketQuery.id) {
      this.connectedUsers[socketQuery?.id] = client.id
    };    
    this.logger.debug(`Number of connected clients: ${sockets.size}`);
  };

  handleDisconnect(client: any) {
    this.logger.log(`Client id:${client.id} disconnected`);
  };
}
