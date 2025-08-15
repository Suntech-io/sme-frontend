'use client';

// table options dropdown component
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import IconifyIcon from "./IconifyIcon";
import React from "react";
import { cn } from "@/lib/utils";

export interface ITableActionsComponentProps {
    actions: {
        component: React.ComponentType<any> | React.ReactElement | string;
        onClick?: (rowData?:any) => void;
        icon?: string;
    }[],
    title?: string;
    align?: 'start' | 'end';
    className?: string;
    rowData?: any;
}

export function TableActionsComponent({ actions, align = 'end', title, className,rowData }: ITableActionsComponentProps) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <IconifyIcon icon='solar:menu-dots-bold' />
            </DropdownMenuTrigger>
            <DropdownMenuContent className={cn("w-56", className)} align={align}>
                {title && <DropdownMenuLabel>{title}</DropdownMenuLabel>}
                {title && <DropdownMenuSeparator />}
                <DropdownMenuGroup>
                    {
                        actions.map((action, index) => (
                            <DropdownMenuItem key={index} onClick={()=>action.onClick?.(rowData)}>
                                {typeof action.component === "string"
                                    ? action.component
                                    : React.isValidElement(action.component)
                                        ? action.component
                                        : action.component
                                            ? React.createElement(action.component)
                                            : null}
                                {action.icon && <DropdownMenuShortcut><IconifyIcon icon={action.icon} /></DropdownMenuShortcut>}
                            </DropdownMenuItem>
                        ))
                    }
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}