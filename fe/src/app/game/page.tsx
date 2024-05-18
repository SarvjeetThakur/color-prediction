'use client';
import * as React from 'react'
import { Button } from '@/components/ui/button'
import Each from '@/components/ui/each'
import { cn } from '@/lib/utils'
import { RotateCw, Trophy } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import Record from './record';
import MyRecord from './my-record';

import ContractMoney from './contract-money';
import CountDown from './CountDown';
import { SocketProvider } from '@/context/socketContext';
import { useUser } from '@clerk/nextjs';
import HaveWallet from './have-wallet';
import { WalletProvider } from '@/context/walletContext';
import GameHeader from './header';

export type RecordsType = {
  period: string;
  price: number;
  number: number;
  result: string;
}
type GetGameResultPropsType = {
  skip?: number;
  limit?: number;
}
const Game = () => {
  const tabs = React.useMemo(() => ['Parity', 'Sepre', 'Bcone'], []);
  const searchParams = useSearchParams();
  const activeTab = searchParams.get('tab') || 'Parity';
  const router = useRouter();
  const { user } = useUser();
  const ChoosingNumbers = React.useMemo(() => [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], []);
  const [modal, setModal] = React.useState(false);
  const [selectedColor, setSelectedColor] = React.useState<{ color: string, number: string }>({ color: '', number: '' });
  const [disabled, setDisabled] = React.useState<any>(false);
  const socketServer = React.useContext(SocketProvider);
  const wallet = React.useContext(WalletProvider);

  const [records, setRecords] = React.useState<RecordsType[]>([]);
  const [total, setTotal] = React.useState({ all: 0, user: 0 });
  const limit = React.useMemo(() => 10, []);
  const [skip, setSkip] = React.useState(0);
  const [skipPage, setSkipPage] = React.useState(0);
  const [myRecords, setMyRecords] = React.useState<any[]>([]);
  const [spin, setSpin] = React.useState<boolean>(false);
  const [haveWallet, setHaveWallet] = React.useState(false);

  const getCustomDateFormat = React.useCallback((): string => {
    const currentDate = new Date();
    const day = currentDate.getUTCDate().toString().padStart(2, '0');
    const month = (currentDate.getUTCMonth() + 1).toString().padStart(2, '0');
    const year = currentDate.getUTCFullYear().toString();
    return `${day}${month}${year}`;
  }, []);

  const inComingPeriod = React.useMemo(() => records?.[0]?.period ? records?.[0]?.period?.slice(0, 8) + (Number(String(records?.[0]?.period).slice(8)) + 1) : getCustomDateFormat() + 1, [getCustomDateFormat, records])

  const handleTabs = React.useCallback((tab: string) => {
    if (tab !== 'Parity') return false;
    router.push(`${process.env.NEXT_PUBLIC_LOCAL_URL}game?tab=${tab}`);
  }, [router]);

  const handleColorSelect = React.useCallback((color: string, SelectedNumber?: number): void => {
    if (wallet.haveWallet) {
      setSelectedColor({ color, number: String(SelectedNumber ?? '') });
      setModal(pre => !pre);
    } else {
      setHaveWallet(pre => !pre)
    };
  }, [wallet.haveWallet]);

  const handleGetGameResult = React.useCallback(({ skip = 0, limit = 10 }: GetGameResultPropsType) => {
    socketServer?.emit('findAllGame', { skip, limit }, (data: any) => {
      setTotal(pre => ({ ...pre, all: data?.count ? data?.count : 0 }))
      setRecords(data?.data ? data?.data : []);
      setTimeout(() => {
        setSpin(false);
      }, 1000);
    })
  }, [socketServer]);

  const handleGetUserRecords = React.useCallback(() => {
    socketServer?.emit('findUserAllGameRecords', {
      userId: user?.id,
      skipPage,
      limitPage: limit
    }, ({ data = [], total = 0 }: { data: any, total: number }) => {
      setMyRecords(data);
      setTotal((pre) => ({ ...pre, user: total }))
    })
  }, [limit, skipPage, socketServer, user?.id]);

  React.useEffect(() => {
    handleGetGameResult({ skip: skip, limit: limit });
    handleGetUserRecords();
    if (disabled) {
      setModal(false);
    }
    socketServer?.on('updateWalletAmount', ({ amount }: { amount: number }) => {
      if (typeof wallet.setWalletAmount === 'function') {
        wallet.setWalletAmount((pre: any) => ({ ...pre, amount: amount }));
      }
    })
    return () => {
      socketServer?.off('findAllGame');
      socketServer?.off('findUserAllGameRecords');
      socketServer?.off('updateWalletAmount')
    }
  }, [handleGetGameResult, skip, socketServer, disabled, handleGetUserRecords, wallet, limit]);

  const handlePagination = React.useCallback((page: number, limit: number) => {
    setSkip(page);
  }, []);

  const handleRotateSw = React.useCallback(() => {
    setSpin(true);
    handleGetUserRecords();
    handleGetGameResult({ skip: 0, limit: 10 })
  }, [handleGetGameResult, handleGetUserRecords]);

  return (
    <>
      <GameHeader router={router} disabled={disabled} amount={wallet?.amount} spin={spin} handleRotateSw={handleRotateSw} setHaveWallet={setHaveWallet} />
      <div className='flex justify-around items-center p-1'>
        <Each of={tabs} render={(item, index) => (
          <div onClick={() => handleTabs(item)} className={cn('w-full text-center p-4 cursor-pointer hover:bg-slate-50', { 'border-b-2 border-black': item === activeTab })}>
            <span className='text-slate-700 font-[600]'>{item} {item !== 'Parity' ? <span className='text-slate-500 font-[400]'>soon....</span> : null}</span>
          </div>
        )} />
      </div>

      <div className=' bg-gray-200 p-2'>
        <div className='flex justify-between px-3 py-1'>
          <div className='flex flex-col  gap-2 justify-center items-center'>
            <span className='flex gap-1 justify-center items-center'>
              <Trophy size={16} strokeWidth={0.5} /> Period</span>
            <span className='text-[20px] font-[500]'>
              {inComingPeriod}
            </span>
          </div>
          <div className='flex flex-col gap-2 justify-center items-center'>
            <span>Count Down</span>
            <span className='text-[20px] font-[500]'>
              <CountDown handleGetUserRecords={handleGetUserRecords} setDisabled={setDisabled} />
            </span>
          </div>
        </div>

        <div className='flex justify-between items-center mt-3'>
          <Button disabled={disabled } onClick={() => handleColorSelect('green')} variant={'default'} size={'sm'} type='button' className='bg-green-700 text-white hover:bg-green-800'>Join Green</Button>
          <Button disabled={disabled } onClick={() => handleColorSelect('violet')} variant={'default'} size={'sm'} type='button' className='bg-violet-700 text-white hover:bg-violet-800'>Join violet</Button>
          <Button disabled={disabled } onClick={() => handleColorSelect('red')} variant={'default'} size={'sm'} type='button' className='bg-red-700 text-white hover:bg-red-800'>Join Red</Button>
        </div>

        <div className='gap-3 w-full justify-between items-center p-2 mt-2 grid grid-cols-4'>
          <Each of={ChoosingNumbers} render={(number, index) => (
            <Button disabled={disabled } onClick={() => handleColorSelect(index === 0 ? 'violet-red' : index === 5 ? 'violet-green' :
              index % 2 !== 0 ? 'green' : 'red', index)} variant={'default'} size={'lg'}
              className={index === 0 ? 'violet-red' : index === 5 ? 'violet-green' :
                index % 2 !== 0 ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700'}>{number}</Button>
          )} />
        </div>

      </div>
      <div className='p-2 pb-4'>
        <Record
          handlePageChange={handlePagination}
          total={total.all} activeTab={activeTab}
          records={records} limit={limit} skip={skip}
        />
      </div>
      <div className='mb-[30px]'>
        <MyRecord setSkipPage={setSkipPage} skip={skipPage} limit={limit}
          totalRecord={total.user} myRecords={myRecords} activeTab={activeTab} />
      </div>
      <ContractMoney records={records} inComingPeriod={inComingPeriod} modal={modal}
        selectedColor={selectedColor} setModal={setModal} handleGetUserRecords={handleGetUserRecords} />
      <HaveWallet open={haveWallet} setOpen={setHaveWallet} />
    </>
  )
}

export default Game;


