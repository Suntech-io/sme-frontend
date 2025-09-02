"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  SortingState,
  getSortedRowModel,
  VisibilityState,
  Updater,
  PaginationState,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DataTablePagination } from "./pagination";
import { useState } from "react";
import { Button } from "@/components/ui/button";
// import { Input } from "../ui/input";
import TableRowActions, { ITableRowActionList } from "./tableRowActions";
import { Input } from "@/components/ui/input";
import IconifyIcon from "../IconifyIcon";
import React from "react";
import { cn } from "@/lib/utils";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  tableContainerClass?: string;
  showAddButton?: boolean;
  addButtonLabel?: string;
  addButtonFunction?: () => void;
  searchPlaceholder?: string;
  onRowAction?: (action: string, row: Record<string, any>) => void;
  tableRowActionList?: ITableRowActionList[];
  allowCustomRowActionList?: boolean;
  showActions?: boolean;
  showHeader?: boolean;
  isLoading?: boolean;
  isFetching?: boolean;
  tableLoaderHeaderSize?: number;
  tableLoaderBodySize?: number;
  totalPages: number;
  pageIndex?: number | any;
  pageSize?: number;
  searchInputPlaceholder?: string;
  addSearch?: boolean;
  addFiltering?: boolean;
  setPaginationNumber?: (updater: any) => void | any;
  filterContent?: React.ComponentType<any>
  tableInformationContent?: React.ComponentType<any> | React.ReactElement
  // setPageSize?: (pageSize: number) => void;
  onSearchInput?: (val: string) => void
  hideColumnVisibility?: boolean;
}

export default function DataTable<TData, TValue>({
  columns,
  data,
  tableContainerClass,
  showAddButton,
  addButtonLabel = "",
  addButtonFunction,
  searchPlaceholder = "Search...",
  onRowAction,
  tableRowActionList = [],
  allowCustomRowActionList = false,
  showActions = false,
  showHeader = true,
  totalPages,
  pageIndex,
  pageSize,
  isFetching,
  addFiltering,
  searchInputPlaceholder = 'Search...',
  addSearch,
  // setPageSize,
  setPaginationNumber,
  filterContent,
  tableInformationContent,
  onSearchInput,
  hideColumnVisibility = false,
  isLoading = false,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    // onPaginationChange: setPaginationNumber,
    onPaginationChange: setPaginationNumber,

    manualPagination: true,
    pageCount: totalPages,
    state: {
      sorting,
      columnVisibility,
      pagination: { pageIndex: pageIndex, pageSize: pageSize! },
    },
    // initialState: {
    //   pagination: {
    //     pageSize: pageSize,
    //     pageIndex: pageIndex,
    //   },
    // },
  });

  return (
    <div className={cn("rounded-xl border p-4 bg-white max-w-full overflow-x-auto",tableContainerClass)}>

      {/* table content and information */}

      {tableInformationContent &&
        (typeof tableInformationContent === "function"
          ? React.createElement(tableInformationContent)
          : tableInformationContent)}

      {showHeader && (
        <div className="flex  items-center justify-between mb-5 max-w-full">
          {/* search input */}
          {addSearch && <div className="searchInput flex items-center gap-1">
            <Input onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              onSearchInput?.(e.target.value)
            }} className="placeholder:text-xs disabled:bg-gray-300 disabled:border w-[300px]" placeholder={searchInputPlaceholder} />
            <Button>
              Search
            </Button>
          </div>}

          <div className="flex justify-end flex-wrap-reverse items-center gap-3 grow">
            {/* filters */}
            {addFiltering && <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="border-gray-500 flex items-center gap-2"
                >
                  <p className="text-xs">
                    Filter
                  </p>
                  <IconifyIcon icon="carbon:column" />
                </Button>
              </DropdownMenuTrigger>
              {/* drop down content */}
              <DropdownMenuContent align="end">
                {filterContent && React.createElement(filterContent)}
              </DropdownMenuContent>
            </DropdownMenu>}

            {showAddButton && (
              <Button onClick={() => addButtonFunction && addButtonFunction()}>
                {addButtonLabel}
              </Button>
            )}
            {!hideColumnVisibility && <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="border-primary bg-primary/5 flex items-center gap-2"
                >
                  <p className="text-xs">
                    Columns
                  </p>
                  <IconifyIcon icon="carbon:column" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {table
                  .getAllColumns()
                  .filter((column) => column.getCanHide())
                  .map((column) => {
                    return (
                      <DropdownMenuCheckboxItem
                        key={column.id}
                        className="capitalize cursor-pointer"
                        checked={column.getIsVisible()}
                        onCheckedChange={(value) =>
                          column.toggleVisibility(!!value)
                        }
                      >
                        {column.id}
                      </DropdownMenuCheckboxItem>
                    );
                  })}
              </DropdownMenuContent>
            </DropdownMenu>}
          </div>
        </div>
      )}
      {isLoading ? (
        <div>loading...</div>
      ) : (
        <>
          <div className="tableContainer max-w-full flex flex-col overflow-x-auto ">
            <Table className="mb-5 max-w-full">
              <TableHeader className="bg-gray-100">
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => {
                      return (
                        <TableHead
                          key={header.id}
                          className="whitespace-nowrap px-4 "
                        >
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                        </TableHead>
                      );
                    })}
                    {showActions && <TableHead>Actions</TableHead>}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row) => (
                    <TableRow
                      key={row.id}
                      data-state={row.getIsSelected() && "selected"}
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id} className="whitespace-nowrap px-4">
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      ))}
                      {showActions && (
                        <TableCell>
                          <TableRowActions
                            actionList={tableRowActionList}
                            allowCustomRowActionList={allowCustomRowActionList}
                            onRowAction={(action) =>
                              onRowAction && onRowAction(action, row.original!)
                            }
                          />
                        </TableCell>
                      )}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length}
                      className="h-24 text-center"
                    >
                      No results.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
            <DataTablePagination table={table} isFetching={isFetching} />
          </div>
        </>
      )}
    </div>
  );
}
