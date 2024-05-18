"use client"
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
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from '@/components/ui/button'
import Each from '@/components/ui/each'
import { cn } from '@/lib/utils'
import { Minus, Plus } from 'lucide-react'
import { SocketProvider } from '@/context/socketContext'
import { useClerk } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import { WalletProvider } from '@/context/walletContext'

const Page = () => {
  const [moneyType, setMoneyType] = React.useState(10);
  const [price, setPrice] = React.useState(1);
  const socketServer = React.useContext(SocketProvider);
  const { setWalletAmount } = React.useContext(WalletProvider);

  const { user } = useClerk();
  const router = useRouter();
  const contactMoneyType: number[] = React.useMemo(() => [10, 100, 1000, 10000], []);
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

  const handleConfirm = () => {
    const payload = { userId: user?.id, amount: price * moneyType, actionType: 'add' }
    socketServer?.emit('updateUserWallet', payload, ({ updatedBalance }: any) => {
      if (typeof setWalletAmount === 'function') {
        setWalletAmount((pre: any) => ({ ...pre, amount: updatedBalance }))
      }
      router.push('/game');
    })
  }
  return (
    <>
      <header className='p-3 bg-blue-500 text-center text-white text-[20px] font-[500]'>
        Add wallet amount
      </header>
      <main className='flex justify-center items-center h-screen'>

        <AlertDialog>
          <AlertDialogTrigger className='bg-blue-500 p-2 rounded-md text-white'>Add amount</AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Add Wallet amount</AlertDialogTitle>
              <AlertDialogDescription>
                <div className='p-3'>
                  <div className='font-[500]'>
                    <span>Wallet amount</span>
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
                      <Button variant={'outline'} size={'sm'} onClick={() => handlePluseMinus('-')}
                        className='cursor-pointer absolute left-16 bg-slate-100 p-2 rounded'>
                        <Minus />
                      </Button>
                      <div id='number' className='text-black w-36 border-2 border-solid p-2 rounded  text-center' >
                        <span>{price}</span>
                      </div>
                      <Button size={'sm'} variant={'outline'} onClick={() => handlePluseMinus('+')}
                        className='cursor-pointer absolute right-16 bg-slate-100 p-2 rounded' >
                        <Plus />
                      </Button>
                    </div>
                  </div>
                  <div className='mt-7 text-center'>
                    <span>Total amount is {price * moneyType}</span>
                  </div>

                </div>
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleConfirm} >Continue</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </main>
    </>
  )
}

export default Page