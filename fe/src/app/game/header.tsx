"use client";
import { Button } from '@/components/ui/button';
import {  RotateCw } from 'lucide-react';
import * as React from 'react'
import { currencyFormate } from '@/utility/common/common'
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { cn } from '@/lib/utils';
import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import Each from '@/components/ui/each';
import { WalletProvider } from '@/context/walletContext';
type GameHeaderProps = {
    amount: number;
    spin: boolean;
    handleRotateSw: () => void;
    disabled: boolean;
    router: AppRouterInstance;
    setHaveWallet: React.Dispatch<React.SetStateAction<boolean>>
}


const ALL_RULES: string[] = [
    `3 minutes 1 issue, 2 minutes and 30 seconds to order,
    30 seconds to show the lottery result. It opens all day. The total number of trade is 480 issues.`,
    `If you spend 100 to trade, after deducting 2 service fee, your contract amount is 98.`,
    `1. JOIN GREEN: if the result shows 1,3,7,9, you will get (98*2) 196.
    If the result shows 5, you will get (98*1.5) 147.`,
    `2. JOIN RED: if the result shows 2,4,6,8, you will get (98*2) 196. If the result shows 0, you will get (98*1.5) 147.`,
    `3. JOIN VIOLET: if the result shows 0 or 5, you will get (98*4.5) 441.`,
    `4. SELECT NUMBER: if the result is the same as the number you selected, you will get(98*9)882.`
]

const GameHeader: React.FC<GameHeaderProps> = React.memo(({ amount, spin, handleRotateSw, disabled, router, setHaveWallet }) => {
    const [openRule, setOpenRule] = React.useState<boolean>(false);
    const wallet = React.useContext(WalletProvider);
    const handleRecharge = () => {
        if (wallet.haveWallet) {
            router.push('/wallet');
        } else {
            setHaveWallet(pre => !pre);
        };
    }
    return (
        <>
            <div className='bg-blue-500 p-3 flex flex-col gap-3'>
                <div className='text-white pt-4 flex justify-between'>
                    <span>Available balance : {currencyFormate('inr', amount)}</span>
                   
                </div>
                <div className=' flex gap-3 justify-between items-center'>
                    <div className='flex gap-3'>
                        <Button onClick={handleRecharge} variant={'default'} size={'sm'} type='button' className='bg-green-700 text-white hover:bg-green-800'>Recharge</Button>
                        <Button name='role' onClick={() => setOpenRule((pre: boolean) => !pre)} variant={'outline'} size={'sm'} type='button'>Read Rule</Button>
                    </div>
                    <div>
                        <RotateCw aria-disabled={disabled} className={cn(' cursor-pointer', { 'animate-spin': spin })} onClick={handleRotateSw} />
                    </div>
                </div>
            </div>
            <AlertDialog open={openRule} onOpenChange={setOpenRule}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle className='text-center'>Rule of guess</AlertDialogTitle>
                        <AlertDialogDescription  className='bg-slate-50 p-2 text-black'>
                         
                            <Each of={ALL_RULES} render={(rule: string) => (
                                <div className='mt-3'>
                                    <p>
                                        {rule}
                                    </p>
                                </div>
                            )} />
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    )
})
GameHeader.displayName = 'GameHeader';
export default GameHeader;