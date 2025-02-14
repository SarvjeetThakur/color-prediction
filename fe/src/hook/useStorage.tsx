"use client";
import * as React from 'react';

export default function useLocalStorage<T>(key: string = '', initialValue: T): [T, React.Dispatch<React.SetStateAction<T>>] {

    const [storedValue, setStoredValue] = React.useState(initialValue);
    const [firstLoadDone, setFirstLoadDone] = React.useState(false);
    React.useEffect(() => {
        const fromLocal = () => {
            if (typeof window === 'undefined') {
                return initialValue;
            };
            try {
                const item = window.localStorage.getItem(key);
                return item ? JSON.parse(item) as T : initialValue;
            } catch (error) {
                console.error(error);
                return initialValue;
            };
        };
        setStoredValue(fromLocal);
        setFirstLoadDone(true);
    }, [initialValue, key]);

    React.useEffect(() => {
        if (!firstLoadDone) {
            return;
        }
        try {
            if (typeof window !== 'undefined') {
                window.localStorage.setItem(key, JSON.stringify(storedValue));
            }
        } catch (error) {
            console.error(error);
        }
    }, [storedValue, firstLoadDone, key]);

    return [storedValue, setStoredValue];
}