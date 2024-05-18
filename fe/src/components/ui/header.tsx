"use client";
import * as React from 'react';
import Image from "next/image";
import { generateRandomNumber } from '@/utility/common/common';
import { UserButton } from '@clerk/nextjs';

const Header = () => {
    const images = React.useMemo(() => ([
        'https://www.lulumalls.co.in/assets/img/logo2.jpg',
        'https://www.lulumalls.co.in/assets/img/logo3.jpg',
        'https://www.lulumalls.co.in/assets/img/logo0.jpg',
        'https://www.lulumalls.co.in/assets/img/logo1.jpg'
    ]), []);
    const [randomIndex, setRandomIndex] = React.useState(0);
    const generateRandomIndex = React.useCallback(() => generateRandomNumber(0, images.length - 1), [images.length]);

    React.useEffect(() => {
        const intervalId = setInterval(() => {
            setRandomIndex(generateRandomIndex())
        }, 5000);
        return () => {
            clearInterval(intervalId)
        }
    }, [generateRandomIndex, images]);

    return (
        <>
            <header>
                <div className='h-[42px] text-[14px] font-[500] bg-gray-400 text-white text-center flex items-center justify-center'>
                    <span className='w-full text-end'>Open with an app</span>
                    <div className=' w-full p-2 flex justify-end items-end'>
                        <UserButton />
                    </div>
                </div>
                <div className='p-3 flex justify-center items-center text-center'>
                    <span className='text-blue-600 text-[15px] font-[500] '>Welcome back</span>
                </div>
                <div className="flex items-center justify-center mt-1">
                    <div className="relative w-full h-72">
                        <Image
                            src={images[randomIndex]}
                            alt="header Image"
                            layout="fill"
                            objectFit="cover"
                            className="rounded-lg"
                        />
                    </div>
                </div>

            </header>
        </>
    )
}

export default Header