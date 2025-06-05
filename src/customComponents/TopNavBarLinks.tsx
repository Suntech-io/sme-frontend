"use client"

import * as React from "react"
import Link from "next/link"

import { cn } from "@/lib/utils"
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import IconifyIcon from "./IconifyIcon"
import Image from "next/image"


interface IMultipleLinksData {
    title: string;
    href: string;
    description: string;
    titleClass?: string;
    descriptionClass?: string;
}

export type TopNavBarLinksProps =
    | {
        type: 'single';
        title: string;
        href: string;
        className?: string
    } | {
        type: 'multiple';
        title: string;
        titleClass?: string;
        data: IMultipleLinksData[]
    } | {
        type: 'grouped',
        title: string;
        data: IMultipleLinksData[]
        groupHero: | {
            type: 'icon';
            icon: string;
            title: string;
            description: string;
            href?: string
            titleClass?: string;
            descriptionClass?: string;
            className?: string;
        } | {
            type: 'image';
            src: string;
            title: string;
            description: string;
            href?: string;
            titleClass?: string;
            descriptionClass?: string;
            className?: string;
        }
    }

const SingleLink = ({ title, href, className }: { title: string; href: string, className?: string }) => {
    return (
        <NavigationMenuItem>
            <Link href={href} legacyBehavior passHref className={className}>
                <NavigationMenuLink className={navigationMenuTriggerStyle() + ' ' + className}>
                    {title}
                </NavigationMenuLink>
            </Link>
        </NavigationMenuItem>
    )
}

const MultipleLinks = ({ data, title, titleClass }: {
    title: string;
    titleClass?: string;
    data: IMultipleLinksData[]
}) => {
    return (
        <NavigationMenuItem>
            <NavigationMenuTrigger className={titleClass}>{title}</NavigationMenuTrigger>
            <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                    {data.map((component) => (
                        <ListItem
                            key={component.title}
                            title={component.title}
                            href={component.href}
                            className={component.titleClass}
                        >
                            <p className={component.descriptionClass}>
                                {component.description}
                            </p>
                        </ListItem>
                    ))}
                </ul>
            </NavigationMenuContent>
        </NavigationMenuItem>
    )
}

const GroupedLinks = ({ data, title, groupHero }: {
    title: string;
    data: IMultipleLinksData[]
    groupHero: | {
        type: 'icon';
        icon: string;
        title: string;
        description: string;
        href?: string
        titleClass?: string;
        descriptionClass?: string;
        className?: string;
    } | {
        type: 'image';
        src: string;
        title: string;
        description: string;
        href?: string
        titleClass?: string;
        descriptionClass?: string;
        className?: string;
    }
}) => {
    return (
        <NavigationMenuItem>
            <NavigationMenuTrigger>
                <p className={groupHero.titleClass}>
                    {title}
                </p>
            </NavigationMenuTrigger>
            <NavigationMenuContent>
                <ul className={cn("grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]", groupHero.className)}>
                    <li className="row-span-3">
                        <NavigationMenuLink asChild>
                            <a
                                className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                                href={groupHero.href || '/'}
                            >
                                {/* <Icons.logo className="h-6 w-6" /> */}
                                {groupHero?.type === 'icon' ? <IconifyIcon icon={groupHero.icon} /> :
                                    <Image src={groupHero.src} width={6} height={6} alt="logo" />
                                }
                                <div className={cn("mb-2 mt-4 text-lg font-medium", groupHero.titleClass)}>
                                    {groupHero.title}
                                </div>
                                <p className={cn("text-sm leading-tight text-muted-foreground", groupHero.descriptionClass)}>
                                    {groupHero.description}
                                </p>
                            </a>
                        </NavigationMenuLink>
                    </li>
                    {data.map((el: IMultipleLinksData) => (<ListItem href={el.href} title={el.title} key={el.title}>
                        {el.description}
                    </ListItem>))}
                </ul>
            </NavigationMenuContent>
        </NavigationMenuItem>
    )
}

export default function TopNavbarLinks({
    links
}: { links: TopNavBarLinksProps[] }) {
    return (
        <NavigationMenu>
            <NavigationMenuList>

                {links.map((link, index) => {
                    if (link.type === 'single') {
                        return (
                            <SingleLink key={index} title={link.title} href={link.href} className={link.className} />
                        )
                    } else if (link.type === 'multiple') {
                        return (
                            <MultipleLinks key={index} title={link.title} data={link.data} titleClass={link.titleClass} />
                        )
                    } else if (link.type === 'grouped') {
                        return (
                            <GroupedLinks key={index} title={link.title} data={link.data} groupHero={link.groupHero} />
                        )
                    }
                })}


            </NavigationMenuList>
        </NavigationMenu>
    )
}

const ListItem = React.forwardRef<
    React.ElementRef<"a">,
    React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
    return (
        <li>
            <NavigationMenuLink asChild>
                <a
                    ref={ref}
                    className={cn(
                        "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                        className
                    )}
                    {...props}
                >
                    <div className="text-sm font-medium leading-none">{title}</div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        {children}
                    </p>
                </a>
            </NavigationMenuLink>
        </li>
    )
})
ListItem.displayName = "ListItem"
