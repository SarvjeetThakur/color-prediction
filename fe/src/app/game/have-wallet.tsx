import * as React from 'react'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { SocketProvider } from '@/context/socketContext';
import { useClerk } from '@clerk/nextjs';
import { WalletProvider } from '@/context/walletContext';
type HaveWalletProps = {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
}
const HaveWallet: React.FC<HaveWalletProps> = React.memo(({ open, setOpen }) => {
    const socketServer = React.useContext(SocketProvider);
    const wallet = React.useContext(WalletProvider);

    const { user } = useClerk();
    const handleApplyWallet = () => {
        socketServer?.emit('createWallet', { userId: user?.id }, () => {
            if (typeof wallet?.setWalletAmount === 'function') {
                wallet?.setWalletAmount((pre: any) => ({ ...pre, amount: 0, haveWallet: true }))
            }
        })
    };
    return (
        <>
            <AlertDialog open={open} onOpenChange={setOpen} >
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Apply for wallet to play.</AlertDialogTitle>
                        <AlertDialogDescription>
                            Apply for a wallet, enjoy your game, and make money forever.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleApplyWallet}>Apply</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    )
})
HaveWallet.displayName = 'HaveWallet'
export default HaveWallet