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
import { Input } from '@/components/ui/input';
import { Minus, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';
import Each from '@/components/ui/each';
import { Button } from '@/components/ui/button';
import { useUser } from '@clerk/nextjs';
import { SocketProvider } from '@/context/socketContext';
import { WalletProvider } from '@/context/walletContext';
import Link from 'next/link';

type ContractMoneyProps = {
    modal: boolean;
    setModal: React.SetStateAction<any>;
    selectedColor: { number: string, color: string }
    handleGetUserRecords: () => void;
    inComingPeriod: string;
    records: any;
};

const ContractMoney: React.FC<ContractMoneyProps> = React.memo(({ modal, selectedColor, setModal, handleGetUserRecords, inComingPeriod, records }) => {
    const { user } = useUser();
    const [moneyType, setMoneyType] = React.useState(10);
    const [price, setPrice] = React.useState(1);
    const [openModal, setOpenModal] = React.useState(false);

    const socketServer = React.useContext(SocketProvider);
    const wallet = React.useContext(WalletProvider);

    const contactMoneyType: number[] = React.useMemo(() => [10, 100, 1000, 10000], []);
    const modalColorClass: string = React.useMemo(() => (
        selectedColor.number ? 'bg-blue-600' : selectedColor.color === 'red' ? 'bg-red-600' : selectedColor.color === 'green' ? 'bg-green-600' : 'bg-violet-600'
    ), [selectedColor]);

    const handleSelectMoneyType = (money: number) => {
        setMoneyType(money)
    };

    const handlePluseMinus = (type: string) => {
        if (type === '+') {
            setPrice((pre) => pre + 1);
        };
        if (type === '-') {
            setPrice((pre) => pre === 1 ? 1 : pre - 1);
        };
    };
    const handleConfirm = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!records?.length) return false;
        if (wallet?.amount < 10 || (price * moneyType) > wallet?.amount) {
            setOpenModal(pre => !pre);
            return false;
        };
        const payload = { userId: user?.id, amount: price * moneyType, actionType: 'deduct' }

        socketServer?.emit('updateUserWallet', payload, ({ updatedBalance }: { updatedBalance: number }) => {
            if (typeof wallet?.setWalletAmount === 'function') {
                wallet?.setWalletAmount((pre: any) => ({ ...pre, amount: updatedBalance }))
            }
            socketServer?.emit('createGameRecord', {
                userId: user?.id,
                color: selectedColor.color,
                number: selectedColor.number,
                contractMoney: (price * moneyType),
                period: inComingPeriod,
            });

            socketServer?.emit('updateGamePeriod', {
                period: inComingPeriod,
                contractMoney: (price * moneyType),
            });

            handleGetUserRecords();
            setMoneyType(10);
            setPrice(1);
        });
    };
    return (
        <>
            <AlertDialog open={modal} onOpenChange={() => setModal((pre: boolean) => !pre)} >
                <AlertDialogContent>
                    <form onSubmit={handleConfirm}>

                        <AlertDialogHeader>
                            <AlertDialogTitle className={cn('text-white p-2 rounded text-center ', modalColorClass)}>
                                {selectedColor.number ? `Select ${selectedColor.number}` : `Join ${selectedColor.color}`}
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                                <div className='p-3'>
                                    <div className='font-[500]'>
                                        <span>Contract money</span>
                                    </div>
                                    <div className='flex justify-start items-center gap-9 mt-3'>
                                        <Each of={contactMoneyType} render={(money) => (
                                            <div>
                                                <span onClick={() => handleSelectMoneyType(money)}
                                                    className={cn('cursor-pointer p-2 ', { 'border-b-2 border-b-blue-600': moneyType === money })}>
                                                    {money}
                                                </span>
                                            </div>
                                        )} />
                                    </div>
                                    <div className='flex gap-3 justify-start items-center mt-8'>
                                        <div >Number</div>
                                        <div className='w-full flex justify-center items-center relative'>
                                            <Button type='button' variant={'outline'} size={'sm'} onClick={() => handlePluseMinus('-')}
                                                className='cursor-pointer absolute left-16 bg-slate-100 p-2 rounded'>
                                                <Minus />
                                            </Button>
                                            <div id='number' className='text-black w-36 border-2 border-solid p-2 rounded  text-center' >
                                                <span>{price}</span>
                                            </div>
                                            <Button type='button' size={'sm'} variant={'outline'} onClick={() => handlePluseMinus('+')}
                                                className='cursor-pointer absolute right-16 bg-slate-100 p-2 rounded' >
                                                <Plus />
                                            </Button>
                                        </div>
                                    </div>
                                    <div className='mt-7 text-center'>
                                        <span>Total contact money is {price * moneyType}</span>
                                    </div>
                                    <div className='flex justify-start items-center gap-2 mt-3'>
                                        <Input className=' size-5 ' type='checkbox' />
                                        I agree <span className=' cursor-pointer text-blue-700'>PRESALE RULE</span>
                                    </div>
                                </div>
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel className='text-gray-500 hover:text-gray-600'>Close</AlertDialogCancel>
                            <AlertDialogAction type='submit'
                                className='text-blue-600 bg-gray-100 hover:bg-gray-200'>Confirm</AlertDialogAction>
                        </AlertDialogFooter>
                    </form>
                </AlertDialogContent>
            </AlertDialog>

            <AlertDialog open={openModal} onOpenChange={setOpenModal}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>{`You don't have an adequate amount.`}</AlertDialogTitle>
                        <AlertDialogDescription>
                            {`You don't have an adequate amount. Please add the amount first.`}
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction>
                            <Link href={'/wallet'}>Add amount</Link>
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    )
})
ContractMoney.displayName = 'ContractMoney'
export default ContractMoney