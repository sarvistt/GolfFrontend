import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    getSortedRowModel,
    SortingState,
    useReactTable,
} from "@tanstack/react-table";
import { useMemo, useState } from "react";

export default function Table({ data }: { data: any[] }) {
    const [sorting, setSorting] = useState<SortingState>([]);
    const [search, setSearch] = useState(""); // State for search input

    const columns = useMemo<ColumnDef<any>[]>(
    () => [
        {
            header: "Golf Club",
            accessorKey: "club",
            
        },
        {
            header: "Tags",
            accessorKey: "tags",
            cell: ({ getValue }) => {
                const tags = getValue() as string[]; // Assuming tags is an array of strings
                return (
                    <div className="flex flex-wrap gap-2">
                        {tags.map((tag, index) => (
                            <span
                                key={index}
                                className="bg-emerald-600 text-white text-xs font-semibold px-2.5 py-0.5 rounded-full"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                );
            },
        },
        {
            header: "Price",
            accessorKey: "price",
            cell: ({ getValue }) => `$${getValue()}`,
        },
        {
            header: "Tee Time",
            accessorKey: "time",
        },
        {
            header: "Link",
            accessorKey: "url",
            cell: ({ getValue }) => (
                <button
                    onClick={() => (window.location.href = getValue() as string)}
                    className="bg-emerald-600 text-white px-4 py-2 rounded hover:bg-emerald-500 transition"
                >
                    <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.213 9.787a3.391 3.391 0 0 0-4.795 0l-3.425 3.426a3.39 3.39 0 0 0 4.795 4.794l.321-.304m-.321-4.49a3.39 3.39 0 0 0 4.795 0l3.424-3.426a3.39 3.39 0 0 0-4.794-4.795l-1.028.961"/>
                    </svg>


                </button>
            ),
            enableSorting: false
        },
    ],
    []
);

    const filteredData = useMemo(() => {
        return data.filter((row) =>
            row.club.toLowerCase().includes(search.toLowerCase())
        );
    }, [data, search]);

    const table = useReactTable({
        data: filteredData,
        columns,
        state: {
            sorting,
        },
        onSortingChange: setSorting,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
    });

    return (
        <div className="w-full flex flex-col">
            <div className="relative w-1/2 mx-auto mb-4">
            <input
                type="text"
                placeholder="Search Specific Golf Clubs..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full p-2 pl-10 border border-gray-300 rounded"
            />
            <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"/>
            </svg>
        </div>

    <div className="max-h-[700px] overflow-y-scroll border border-gray-200 rounded-lg shadow-lg mx-16">
        <table className="min-w-full bg-white">
            <thead className="sticky top-0 bg-gray-50 shadow">
                {table.getHeaderGroups().map((headerGroup) => (
                    <tr key={headerGroup.id}>
                        {headerGroup.headers.map((header) => (
                            <th
                                key={header.id}
                                className={`py-2 px-4 border-b select-none ${header.column.columnDef.header === "Link" ? "text-center" : "text-left"}`}
                                style={{ cursor: header.column.getCanSort() ? "pointer" : "default" }}
                                onClick={header.column.getToggleSortingHandler()}
                            >
                                    <div className={`flex items-center gap-2 ${header.column.columnDef.header === "Link" ? "justify-center" : ""}`}>
                                    {flexRender(header.column.columnDef.header, header.getContext())}
                                    {/* TODO: change to be dependent on the sorting prop */}
                                    {header.column.columnDef.header !== "Link" && (  
                                        <>
                                            {header.column.getIsSorted() === "asc" && (
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="h-4 w-4 text-gray-500"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                    strokeWidth={2}
                                                >
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
                                                </svg>
                                            )}
                                            {header.column.getIsSorted() === "desc" && (
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="h-4 w-4 text-gray-500"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                    strokeWidth={2}
                                                >
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                                                </svg>
                                            )}
                                            {!header.column.getIsSorted() && (
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="h-4 w-4 text-gray-300"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                    strokeWidth={2}
                                                >
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
                                                </svg>
                                            )}
                                        </>
                                    )}
                                </div>
                            </th>
                        ))}
                    </tr>
                ))}
            </thead>
            <tbody>
                {table.getRowModel().rows.length > 0 ? (
                    table.getRowModel().rows.map((row) => (
                        <tr key={row.id} className="hover:bg-gray-100">
                            {row.getVisibleCells().map((cell) => (
                                <td
                                    key={cell.id}
                                    className={`py-2 border  ${cell.column.columnDef.header === "Link" ? "px-2 w-32 text-center" : "px-4"}`}
                                >
                                    {flexRender(
                                        cell.column.columnDef.cell,
                                        cell.getContext()
                                    )}
                                </td>
                            ))}
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td
                            colSpan={columns.length}
                            className="text-center py-4 text-gray-500"
                        >
                            No courses found!
                        </td>
                    </tr>
                )}
            </tbody>
        </table>
    </div>
</div>
    );
}