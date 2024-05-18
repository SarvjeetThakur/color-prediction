"use client";
import { useUser } from '@clerk/nextjs';
import * as React from 'react';
import { io, Socket } from "socket.io-client";

const useSocket = () => {
    const { user, isSignedIn } = useUser();

    const socketRef = React.useRef<Socket | null>(null);
    const [server, setSerer] = React.useState<Socket | null>(null)
    React.useEffect(() => {
        if (isSignedIn) {
            const socket = io(process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8086', { query: { id: user.id } });
            socket.on("connect", () => {
                socketRef.current = socket;
                console.log('Socket connected');
                setSerer(socket)
            });
            return () => {
                socket.disconnect();
            };
        }
    }, [isSignedIn, user?.id]);

    return server;
};

export default useSocket;
