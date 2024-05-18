'use client';
import { cn } from "@/lib/utils";
import * as React from 'react'
import ReactPaginate from "react-paginate";
type CustomPaginationProps = {
    length: number;
    handlePageChange: (selectedPage: number, newOffset: number) => void;
    itemsPerPage: number;
    currentPage: number;
}

const CustomPagination: React.FC<CustomPaginationProps> = React.memo(({ length, handlePageChange, itemsPerPage, currentPage }) => {
    const pageCount = Math.ceil(length / itemsPerPage) || 1;

    const handleChangePageLoadData = (event: any) => {
        if (typeof event.nextSelectedPage === typeof undefined) return false;
        const selectedPage = event.nextSelectedPage ? event.nextSelectedPage : 0;
        const newOffset = (selectedPage * itemsPerPage);
        if (newOffset >= 0) {
            handlePageChange(selectedPage + 1, newOffset);
        }
    };

    return (
        <div className=" bg-white  flex justify-center gap-4 items-center">
            {/* <div className="">
                {length ? ` ${(currentPage-1) * (itemsPerPage + 1)} to ${currentPage * itemsPerPage > length ? length : currentPage * itemsPerPage} of ${length}` : "No data found"}
            </div> */}
            <div className="flex justify-center">
                <ReactPaginate
                    className="flex justify-center items-center border gap-7 p-2 rounded shadow-sm  bg-slate-100 font-[500]"
                    forcePage={currentPage - 1}
                    pageCount={pageCount}
                    breakLabel="..."
                    nextLabel={<span className="">NEXT</span>}
                    onClick={handleChangePageLoadData}
                    pageRangeDisplayed={2}
                    previousLabel={<span className="">PREV</span>}
                    renderOnZeroPageCount={null}
                    activeLinkClassName={cn({ selected: currentPage })}
                    activeClassName="text-blue-700 font-[600]"
                />
            </div>
        </div>
    );
});
CustomPagination.displayName = 'CustomPagination'
export default CustomPagination;