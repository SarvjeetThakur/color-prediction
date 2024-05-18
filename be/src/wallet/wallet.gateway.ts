import { WebSocketGateway, SubscribeMessage, MessageBody } from '@nestjs/websockets';
import { WalletService } from './wallet.service';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { UpdateWalletDto } from './dto/update-wallet.dto';

@WebSocketGateway()
export class WalletGateway {
  constructor(private readonly walletService: WalletService) { }

  @SubscribeMessage('createWallet')
  create(@MessageBody() createWalletDto: CreateWalletDto) {
    return this.walletService.create(createWalletDto);
  }

  @SubscribeMessage('findUserWallet')
  findUserWallet(@MessageBody() { userId }: { userId: string }) {
    return this.walletService.findUserWallet(userId);
  }
  
  @SubscribeMessage('updateUserWallet')
  update(@MessageBody() updateWalletDto: UpdateWalletDto) {
    return this.walletService.update(updateWalletDto);
  }
  @SubscribeMessage('findAllWallet')
  findAll() {
    return this.walletService.findAll();
  }

  @SubscribeMessage('findOneWallet')
  findOne(@MessageBody() id: number) {
    return this.walletService.findOne(id);
  }


  @SubscribeMessage('removeWallet')
  remove(@MessageBody() id: number) {
    return this.walletService.remove(id);
  }
}
