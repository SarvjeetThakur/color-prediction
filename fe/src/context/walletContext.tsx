"use client";
import { useClerk } from "@clerk/nextjs";
import * as React from "react";
import { SocketProvider } from "./socketContext";
type WalletValue = { amount: number, haveWallet: boolean, setWalletAmount?: ((value: any) => void) | undefined };

export const WalletProvider = React.createContext<WalletValue>({ amount: 0, setWalletAmount: () => { }, haveWallet: false });

const WalletProvidersValue = ({ children }: { children: React.ReactNode }) => {
    const socket = React.useContext(SocketProvider);
    const { user } = useClerk();
    const [wallet, setWallet] = React.useState<{ amount: number, haveWallet: boolean }>({ amount: 0, haveWallet: false });
    React.useEffect(() => {
        socket?.emit('findUserWallet', { userId: user?.id }, (data: { data: WalletValue }) => {
            setWallet({ amount: data?.data?.amount, haveWallet: data?.data?.haveWallet });
        });
        return () => {
            socket?.off('findUserWallet');
        }
    }, [socket, user?.id])

    const setWalletAmount = React.useCallback((callBack: React.SetStateAction<{
        amount: number;
        haveWallet: boolean;
    }>) => {
        setWallet(callBack);
    }, []);

    return (
        <WalletProvider.Provider value={{ amount: wallet.amount, setWalletAmount: setWalletAmount, haveWallet: wallet.haveWallet }}>
            {children}
        </WalletProvider.Provider>
    )
};

export default WalletProvidersValue;