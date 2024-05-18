"use client";
import * as React from 'react'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import Each from '@/components/ui/each';
import { Trophy } from 'lucide-react';
import { RecordsType } from './page';
import Show from '@/components/show';
import CustomPagination from '@/components/ui/pagination';

type RecordPropsType = {
    records: RecordsType[];
    activeTab: string;
    total: number;
    limit: number;
    skip: number;
    handlePageChange: (selectedPage: number, newOffset: number) => void;
}
type ResultType = { green: React.ReactNode, red: React.ReactNode, 'violet-red': React.ReactNode, 'violet-green': React.ReactNode }
type ResultTypes = 'green' | 'red' | 'violet-green' | 'violet-red'
const Record: React.FC<RecordPropsType> = React.memo(({ records, activeTab, total, skip, limit, handlePageChange }) => {
    const result: ResultType = React.useMemo(() => ({
        'green': <div className=' flex'>
            <span className='bg-green-500 rounded-full p-[5px]'></span>
        </div>,
        'red': <div className=' flex'>
            <span className='bg-red-500 rounded-full p-[5px]'></span>
        </div>,
        'violet-green': <div className=' flex gap-2'>
            <span className='bg-green-500 rounded-full p-[5px]'></span>
            <span className='bg-violet-500 rounded-full p-[5px]'></span>
            <span></span>
        </div>,

        'violet-red': <div className=' flex gap-2'>
            <span className='bg-red-500 rounded-full p-[5px]'></span>
            <span className='bg-violet-500 rounded-full p-[5px]'></span>
        </div>,
    }), []);

    return (
        <>
            <div className='p-3 text-slate-500 text-center text-[15px] font-[500] flex justify-center items-center gap-2'>
                <span className='flex justify-center items-center gap-1'>
                    <Trophy className='text-black' size={16} strokeWidth={0.5} /> {activeTab} Record</span>
            </div>
            <div className='p-3 '>
                <Table className="">
                    <TableHeader>
                        <TableRow>
                            <TableHead className="">Period</TableHead>
                            <TableHead>Price</TableHead>
                            <TableHead>Number</TableHead>
                            <TableHead className="">Result</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <Show>
                            <Show.If isTrue={!!records?.length} >
                                <Each of={records} render={(record: RecordsType) => (
                                    <TableRow>
                                        <TableCell className="font-medium">{record.period}</TableCell>
                                        <TableCell>{record.price}</TableCell>
                                        <TableCell
                                            style={{ color: `${record.number === 0 ? 'red' : record.number === 5 ? 'green' : record.result?.toLowerCase()}` }}
                                            className={`text-${record.result?.toLowerCase()}-500`}>{record.number}</TableCell>
                                        <TableCell className="">{result[record.result?.toLowerCase() as ResultTypes]}</TableCell>
                                    </TableRow>
                                )} />
                            </Show.If>
                        </Show>
                    </TableBody>
                </Table>
            </div>
            <CustomPagination length={total} currentPage={skip} itemsPerPage={limit} handlePageChange={(page, limit) => handlePageChange(page, limit)} />
        </>
    )
});
Record.displayName = 'Record'
Record.prototype = {
    records: [],
    activeTab: ''
}
export default Record