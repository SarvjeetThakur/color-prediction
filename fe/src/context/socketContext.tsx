"use client";
import useSocket from "@/hook/useSocket";
import * as React from "react";
import { Socket } from "socket.io-client";

export  const SocketProvider = React.createContext<Socket | null>(null);

const SocketProvidersValue = ({ children }: { children: React.ReactNode }) => {
    const socket = useSocket();
    return (
        <SocketProvider.Provider value={socket}>
            {children}
        </SocketProvider.Provider>
    )
};

export default SocketProvidersValue