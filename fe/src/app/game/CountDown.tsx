"use client";
import { SocketProvider } from '@/context/socketContext';
import * as React from 'react'
type CountDownProps = {
    setDisabled: React.Dispatch<React.SetStateAction<boolean>>;
    handleGetUserRecords: () => void;
}

const CountDown: React.FC<CountDownProps> = React.memo(({ setDisabled, handleGetUserRecords }) => {
    const [countDown, setCountDown] = React.useState('03:00');
    const socketServer = React.useContext(SocketProvider);

    React.useEffect(() => {
        const handleCountDown = (counter: string) => {
            if (Number(counter.split(':')[1]) <= 30 && counter.startsWith('00')) {
                setDisabled(true);
            };
            if (counter === '03:00') {
                handleGetUserRecords();
                setDisabled(false);
            };
            setCountDown(counter);
        };
        if (socketServer) {
            socketServer?.on('count-down', handleCountDown);
        }
        return () => {
            if (socketServer) {
                socketServer?.off('count-down', handleCountDown);
            }
        };
    }, [socketServer, setDisabled, handleGetUserRecords]);
    return (
        <span>{countDown}</span>
    )
})
CountDown.displayName = 'CountDown';
export default CountDown;