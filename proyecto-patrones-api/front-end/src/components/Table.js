import React, { useEffect, useRef } from "react";
import {
    useTable,
    useFilters,
    useGlobalFilter,
    useAsyncDebounce,
    useSortBy,
    usePagination,
    useRowSelect,
} from "react-table";
import {
    ChevronDoubleLeftIcon,
    ChevronLeftIcon,
    ChevronRightIcon,
    ChevronDoubleRightIcon,
} from "@heroicons/react/24/solid";
import { Button, PageButton } from "./shared/Button";
import { classNames } from "./shared/Utils";
import { SortIcon, SortUpIcon, SortDownIcon } from "./shared/Icons";
// Define a default UI for filtering
function GlobalFilter({
    preGlobalFilteredRows,
    globalFilter,
    setGlobalFilter,
}) {
    const count = preGlobalFilteredRows.length;
    const [value, setValue] = React.useState(globalFilter);
    const onChange = useAsyncDebounce((value) => {
        setGlobalFilter(value || undefined);
    }, 200);

    return (
        <label className="flex gap-x-2 items-baseline">
            <span className="text-gray-700">Busqueda: </span>
            <input
                type="text"
                className="w-full  rounded-md border-[1.5px] border-stroke bg-transparent  px-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                value={value || ""}
                onChange={(e) => {
                    setValue(e.target.value);
                    onChange(e.target.value);
                }}
                placeholder={`${count} registros...`}
            />
        </label>
    );
}

// This is a custom filter UI for selecting
// a unique option from a list
export function SelectColumnFilter({
    column: { filterValue, setFilter, preFilteredRows, id, render },
}) {
    // Calculate the options for filtering
    // using the preFilteredRows
    const options = React.useMemo(() => {
        const options = new Set();
        preFilteredRows.forEach((row) => {
            options.add(row.values[id]);
        });
        return [...options.values()];
    }, [id, preFilteredRows]);

    // Render a multi-select box
    return (
        <label className="flex gap-x-2 items-baseline">
            <span className="text-gray-700">{render("Header")}: </span>
            <select
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                name={id}
                id={id}
                value={filterValue}
                onChange={(e) => {
                    setFilter(e.target.value || undefined);
                }}
            >
                <option value="">All</option>
                {options.map((option, i) => (
                    <option key={i} value={option}>
                        {option}
                    </option>
                ))}
            </select>
        </label>
    );
}

export function StatusPill({ value }) {
    const status = value ? value.toLowerCase() : "unknown";

    return (
        <span
            className={classNames(
                "px-3 py-1 uppercase leading-wide font-bold text-xs rounded-full shadow-sm",
                status.startsWith("confirmada") ? "bg-green-100 text-green-800" : null,
                status.startsWith("inactivo") ? "bg-yellow-100 text-yellow-800" : null,
                status.startsWith("Caducado") ? "bg-green-100 text-red-800" : null,
                status.startsWith("Pendiente activar admin") ? "bg-yellow-100 text-red-800" : null,
                status.startsWith("offline") ? "bg-red-100 text-red-800" : null
            )}
        >
            {status}
        </span>
    );
}

export function AvatarCell({ value, column, row }) {
    return (
        <div className="flex items-center">
            <div className="flex-shrink-0 h-10 w-10">
                <img
                    className="h-10 w-10 rounded-full"
                    src={row.original[column.imgAccessor]}
                    alt=""
                />
            </div>
            <div className="ml-4">
                <div className="text-sm font-medium text-gray-900">{value}</div>
                <div className="text-sm text-gray-500">
                    {row.original[column.emailAccessor]}
                </div>
                <div className="text-sm text-gray-500">
                    {row.original[column.datoAccessor]}
                </div>
            </div>

        </div>
    );
}
function IndeterminateCheckbox({ indeterminate, className = "", ...rest }) {
    const ref = useRef(null);

    React.useEffect(() => {
        if (typeof indeterminate === "boolean") {
            ref.current.indeterminate = !rest.checked && indeterminate;
        }
    }, [ref, indeterminate]);

    return (
        <input
            type="checkbox"
            ref={ref}
            className={className + " cursor-pointer"}
            {...rest}
        />
    );
}
function Table({
    columns,
    data,
    search = false,
    editable = false,
    onSelected = () => { },
    onEdit = () => { },
    onNew = () => { },
    onRemove = () => { },
}) {
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        page, // Instead of using 'rows', we'll use page,
        // which has only the rows for the active page

        // The rest of these things are super handy, too ;)
        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,
        selectedFlatRows,
        rows,
        state,
        preGlobalFilteredRows,
        setGlobalFilter,
    } = useTable(
        {
            columns,
            data,
            initialState: { pageSize: 100 },
        },
        useFilters, // useFilters!
        useGlobalFilter,
        useSortBy,
        usePagination,

        useRowSelect,
        (hooks) => {
            search &&
                hooks.visibleColumns.push((columns) => [
                    {
                        id: "selection",
                        Header: ({ getToggleAllRowsSelectedProps }) => (
                            <>
                                <IndeterminateCheckbox
                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                    {...getToggleAllRowsSelectedProps()}
                                />
                            </>
                        ),
                        Cell: ({ row }) => (
                            <IndeterminateCheckbox
                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                {...row.getToggleRowSelectedProps()}
                            />
                        ),
                    },
                    ...columns,
                ]);
        }
    );
    const onNewClick = () => {
        onNew();
    };
    const onEditClick = () => {
        onEdit(selectedFlatRows[0].original);
    };
    const onRemoveClick = () => {
        onRemove(selectedFlatRows.map((row) => row.original));
    };

    useEffect(() => {
        onSelected(selectedFlatRows.map((row) => row.original));
    }, [selectedFlatRows]);
    return (
        <>
            <div className="flex items-center justify-between">
                <div className="sm:flex sm:gap-x-2 items-center">
                    <GlobalFilter
                        preGlobalFilteredRows={preGlobalFilteredRows}
                        globalFilter={state.globalFilter}
                        setGlobalFilter={setGlobalFilter}
                    />
                    {headerGroups.map((headerGroup) =>
                        headerGroup.headers.map((column) =>
                            column.Filter ? (
                                <div className="mt-0 sm:mt-0" key={column.id}>
                                    {column.render("Filter")}
                                </div>
                            ) : null
                        )
                    )}
                </div>
                <div className="flex justify-between">
                    {editable && (
                        <>
                            <button
                                type="button"
                                className="inline-flex w-full justify-center rounded-md bg-[#3F667D] px-3 py-2 text-sm font-semibold text-white  hover:bg-[#2B5772] sm:ml-3 sm:w-auto"
                                onClick={onNewClick}
                            >
                                Nuevo
                            </button>
                            {selectedFlatRows.length === 1 && (
                                <button
                                    type="button"
                                    className="inline-flex w-full justify-center rounded-md bg-[#3F667D] px-3 py-2 text-sm font-semibold text-white  hover:bg-[#2B5772] sm:ml-3 sm:w-auto"
                                    onClick={onEditClick}
                                >
                                    Editar
                                </button>
                            )}
                            {selectedFlatRows.length > 0 && (
                                <button
                                    type="button"
                                    className="inline-flex w-full justify-center rounded-md bg-[#3F667D] px-3 py-2 text-sm font-semibold text-white  hover:bg-[#2B5772] sm:ml-3 sm:w-auto"
                                    onClick={onRemoveClick}
                                >
                                    Eliminar
                                </button>
                            )}
                        </>
                    )}
                </div>
            </div>
            {/* table */}
            <div className="mt-4 flex flex-col">
                <div className="-my-2 overflow-x-auto -mx-4 sm:-mx-6 lg:-mx-8">
                    <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                        <div className="border overflow-hidden border-b border-gray-200 sm:rounded-lg">
                            <table
                                {...getTableProps()}
                                className="min-w-full divide-y divide-gray-200"
                            >
                                <thead className="bg-gray-50">
                                    {headerGroups.map(function (headerGroup) {
                                        const { key, ...headerGroupProps } =
                                            headerGroup.getHeaderGroupProps();
                                        return (
                                            <tr key={key} {...headerGroupProps}>
                                                {headerGroup.headers.map(function (column) {
                                                    const { key, ...headerProps } = column.getHeaderProps(
                                                        column.getSortByToggleProps()
                                                    );
                                                    return (
                                                        <th
                                                            key={key}
                                                            scope="col"
                                                            className="group px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                            {...headerProps}
                                                        >
                                                            <div className="flex items-center justify-between">
                                                                {column.render("Header")}
                                                                {/* Agrega un indicador de dirección de ordenamiento */}
                                                                <span>
                                                                    {column.isSorted ? (
                                                                        column.isSortedDesc ? (
                                                                            <SortDownIcon className="w-4 h-4 text-gray-400" />
                                                                        ) : (
                                                                            <SortUpIcon className="w-4 h-4 text-gray-400" />
                                                                        )
                                                                    ) : (
                                                                        <SortIcon className="w-4 h-4 text-gray-400 opacity-0 group-hover:opacity-100" />
                                                                    )}
                                                                </span>
                                                            </div>
                                                        </th>
                                                    );
                                                })}
                                            </tr>
                                        );
                                    })}
                                </thead>
                                <tbody
                                    {...getTableBodyProps()}
                                    className="bg-white divide-y divide-gray-200"
                                >
                                    {page.length > 0 &&
                                        page.map((row, i) => {
                                            // new
                                            prepareRow(row);
                                            const { key, ...rowProps } = row.getRowProps();
                                            return (
                                                <tr key={key} {...rowProps}>
                                                    {row.cells.map((cell) => {
                                                        const { key, ...cellProps } = cell.getCellProps();
                                                        return (
                                                            <td
                                                                {...cellProps}
                                                                key={key}
                                                                className="px-6 py-4 whitespace-nowrap"
                                                                role="cell"
                                                            >
                                                                {cell.column.Cell.name === "defaultRenderer" ? (
                                                                    <div className="text-sm text-gray-500">
                                                                        {cell.render("Cell")}
                                                                    </div>
                                                                ) : (
                                                                    cell.render("Cell")
                                                                )}
                                                            </td>
                                                        );
                                                    })}
                                                </tr>
                                            );
                                        })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            {/* Pagination */}
            <div className="py-3 flex items-center justify-between">
                <div className="flex-1 flex justify-between sm:hidden">
                    <Button onClick={() => previousPage()} disabled={!canPreviousPage}>
                        Previous
                    </Button>
                    <Button onClick={() => nextPage()} disabled={!canNextPage}>
                        Next
                    </Button>
                </div>
                <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                    <div className="flex gap-x-3 items-baseline">
                        <span className="text-sm text-gray-700">
                            Pagina <span className="font-medium">{state.pageIndex + 1}</span>{" "}
                            de <span className="font-medium">{pageOptions.length}</span>
                        </span>
                        <label>
                            <span className="sr-only">Items Per Page</span>
                            <select
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                value={state.pageSize}
                                onChange={(e) => {
                                    setPageSize(Number(e.target.value));
                                }}
                            >
                                {[50, 75, 100].map((pageSize) => (
                                    <option key={pageSize} value={pageSize}>
                                        Mostrar {pageSize}
                                    </option>
                                ))}
                            </select>
                        </label>
                        {search && (
                            <span className="ml-2">
                                {selectedFlatRows.length} de {rows.length}
                            </span>
                        )}
                    </div>
                    <div>
                        <nav
                            className="relative z-0 inline-flex rounded-md  -space-x-px"
                            aria-label="Pagination"
                        >
                            <PageButton
                                className="rounded-l-md"
                                onClick={() => gotoPage(0)}
                                disabled={!canPreviousPage}
                            >
                                <span className="sr-only">First</span>
                                <ChevronDoubleLeftIcon
                                    className="h-5 w-5 text-gray-400"
                                    aria-hidden="true"
                                />
                            </PageButton>
                            <PageButton
                                onClick={() => previousPage()}
                                disabled={!canPreviousPage}
                            >
                                <span className="sr-only">Previous</span>
                                <ChevronLeftIcon
                                    className="h-5 w-5 text-gray-400"
                                    aria-hidden="true"
                                />
                            </PageButton>
                            <PageButton onClick={() => nextPage()} disabled={!canNextPage}>
                                <span className="sr-only">Next</span>
                                <ChevronRightIcon
                                    className="h-5 w-5 text-gray-400"
                                    aria-hidden="true"
                                />
                            </PageButton>
                            <PageButton
                                className="rounded-r-md hover: bg-[#B69D74]"
                                onClick={() => gotoPage(pageCount - 1)}
                                disabled={!canNextPage}
                            >
                                <span className="sr-only">Last</span>
                                <ChevronDoubleRightIcon
                                    className="h-5 w-5 text-gray-400"
                                    aria-hidden="true"
                                />
                            </PageButton>
                        </nav>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Table;