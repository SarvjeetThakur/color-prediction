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
import { CalendarDays } from 'lucide-react';
import CustomPagination from '@/components/ui/pagination';
import Show from '@/components/show';

type MyRecordProps = {
    activeTab: string;
    myRecords: any[];
    totalRecord: number;
    skip: number;
    limit: number;
    setSkipPage: React.Dispatch<React.SetStateAction<number>>
}
const MyRecord: React.FC<MyRecordProps> = React.memo(({ activeTab, myRecords, totalRecord, skip, limit, setSkipPage }) => {
    const results: any = React.useMemo(() => ({
        1: 'green',
        3: 'green',
        7: 'green',
        9: 'green',
        2: 'red',
        4: 'red',
        6: 'red',
        8: 'red',
    }), []);
    const result: any = React.useMemo(() => ({
        green: <div className=' flex'>
            <span className='bg-green-500 rounded-full p-[5px]'></span>
        </div>,
        red: <div className=' flex'>
            <span className='bg-red-500 rounded-full p-[5px]'></span>
        </div>,
        'violet-green': <div className=' flex gap-2'>
            <span className='bg-green-500 rounded-full p-[5px]'></span>
            <span className='bg-violet-500 rounded-full p-[5px]'></span>
        </div>,
        'violet-red': <div className=' flex gap-2'>
            <span className='bg-red-500 rounded-full p-[5px]'></span>
            <span className='bg-violet-500 rounded-full p-[5px]'></span>
        </div>,
        violet: <div className=' flex'>
            <span className='bg-violet-500 rounded-full p-[5px]'></span>
        </div>
    }), []);
    const resultColor: any = React.useMemo(() => ({
        Pending: 'text-yellow-600',
        Lose: 'text-red-600',
        Win: 'text-green-600'
    }), []);
    return (
        <>
            <div className='p-3 text-slate-500 text-center text-[15px] font-[500] flex justify-center items-center gap-2'>
                <span className='flex justify-center items-center gap-1'><CalendarDays size={20} strokeWidth={1.25} /> My {activeTab} Record</span>
            </div>
            <div className='p-4'>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="">Period</TableHead>
                            <TableHead>Price</TableHead>
                            <TableHead>Color</TableHead>
                            <TableHead>Number</TableHead>
                            <TableHead className="">Result</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <Show>
                            <Show.If isTrue={!!myRecords.length} >
                                <Each of={myRecords} render={(record) => (
                                    <TableRow>
                                        <TableCell className="font-medium">{record?.period}</TableCell>
                                        <TableCell>{record?.contractMoney}</TableCell>
                                        <TableCell>{result[record?.color]}</TableCell>
                                        <TableCell
                                            style={{ color: `${record.number === 0 ? 'red' : record.number === 5 ? 'green' : results[record.number]}` }}
                                            className={`text-${record.result?.toLowerCase()}-500`}>{record.number ?? `-`}
                                        </TableCell>
                                        <TableCell className={resultColor[record?.result]}>{record?.result}</TableCell>
                                    </TableRow>
                                )} />
                            </Show.If>
                        </Show>
                    </TableBody>
                </Table>
            </div>
            <div className='mb-16'>
                <CustomPagination length={totalRecord} currentPage={skip} itemsPerPage={limit} handlePageChange={(page, limit) => setSkipPage(page)} />
            </div>
        </>
    )
})
MyRecord.displayName = 'MyRecord';
MyRecord.prototype = {
    activeTab: ''
}
export default MyRecord