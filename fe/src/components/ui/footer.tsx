"use client"
import { Gamepad2, HomeIcon, User, Wallet } from 'lucide-react'
import * as React from 'react'
import Each from './each'
import Link from 'next/link';
// import useLocalStorage from '@/hook/useStorage';
import { useUser } from '@clerk/nextjs';

function Footer() {
    // const [storedValue] = useLocalStorage(process.env.NEXT_PUBLIC_IS_LOGIN, false);
    const { isSignedIn } = useUser();

    const footerData: { name: string, icon: React.ReactNode, href: string }[] = React.useMemo(() => {
        const data = [
            {
                name: 'Home',
                icon: <HomeIcon />,
                href: '/'
            },
            {
                name: 'Search',
                icon: <Wallet />,
                href: '/search'
            },
            {
                name: 'My',
                icon: <User />,
                href: '/profile'
            },
        ];
        if (isSignedIn) {
            data.splice(2, 0, {
                name: 'Win',
                icon: <Gamepad2 />,
                href: '/game'
            })

        };
        return data;
    }, [isSignedIn]);

    return (
        <>
            <div className="fixed bottom-0 w-full bg-white text-black shadow-md">
                <div className="flex justify-around border p-1">
                    <Each of={footerData} render={(item: { name: string, icon: React.ReactNode, href: string }) => (
                        <Link href={item.href} className="text-xs flex justify-center items-center flex-col cursor-pointer">
                            {item.icon}
                            <span>{item.name}</span>
                        </Link>
                    )} />
                </div>
            </div>
        </>
    )
}

export default Footer