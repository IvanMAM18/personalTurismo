import { IconSearch } from "@tabler/icons-react";
import Dropdown from "./Dropdown";
import { cn } from "@/lib/utils";
import * as React from "react";

import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuIndicator,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    NavigationMenuViewport,
    navigationMenuTriggerStyle,
} from "@/Components/NavigationMenu";
import { Link } from "@inertiajs/react";

const components = [
    {
        title: "Alert Dialog",
        href: "/docs/primitives/alert-dialog",
        description:
            "A modal dialog that interrupts the user with important content and expects a response.",
    },
    {
        title: "Hover Card",
        href: "/docs/primitives/hover-card",
        description:
            "For sighted users to preview content available behind a link.",
    },
    {
        title: "Progress",
        href: "/docs/primitives/progress",
        description:
            "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
    },
    {
        title: "Scroll-area",
        href: "/docs/primitives/scroll-area",
        description: "Visually or semantically separates content.",
    },
    {
        title: "Tabs",
        href: "/docs/primitives/tabs",
        description:
            "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
    },
    {
        title: "Tooltip",
        href: "/docs/primitives/tooltip",
        description:
            "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
    },
];

const ListItem = React.forwardRef(
    ({ className, title, children, ...props }, ref) => {
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
                        <div className="text-sm font-medium leading-none">
                            {title}
                        </div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            {children}
                        </p>
                    </a>
                </NavigationMenuLink>
            </li>
        );
    }
);
ListItem.displayName = "ListItem";

export default function Menu(props) {
    return (
        <div className="hidden md:flex justify-center sm:items-center sm:justify-between text-white py-1 px-12">
            <div>
                <img src="/images/logoc.png" className="w-[100px]" />
            </div>
            <div className="flex">
                <NavigationMenu>
                    <NavigationMenuList>
                        <NavigationMenuItem>
                            <Link href="/">
                                <NavigationMenuLink
                                    className={navigationMenuTriggerStyle()}
                                >
                                    Inicio
                                </NavigationMenuLink>
                            </Link>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <NavigationMenuTrigger>
                                Delegaciones
                            </NavigationMenuTrigger>
                            <NavigationMenuContent>
                                <ul className="grid gap-3 p-6 md:w-[680px] md:grid-cols-2 ">
                                    <ListItem
                                        href="/delegacion"
                                        title="Todos santos"
                                    ></ListItem>
                                    <ListItem
                                        href="/docs"
                                        title="Los barriles"
                                    ></ListItem>
                                </ul>
                            </NavigationMenuContent>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <NavigationMenuTrigger>
                                Hoteles
                            </NavigationMenuTrigger>
                            <NavigationMenuContent>
                                <ul className="grid gap-3 p-6 md:w-[880px] md:grid-cols-2 ">
                                    <ListItem
                                        href="/playa"
                                        title="Hotel 1"
                                    ></ListItem>
                                    <ListItem
                                        href="/docs"
                                        title="Hotel 2"
                                    ></ListItem>
                                </ul>
                            </NavigationMenuContent>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <NavigationMenuTrigger>
                                Restaurantes
                            </NavigationMenuTrigger>
                            <NavigationMenuContent>
                                <ul className="grid gap-3 p-6 md:w-[680px] md:grid-cols-2 ">
                                    <ListItem
                                        href="/docs"
                                        title="Hotel 1"
                                    ></ListItem>
                                    <ListItem
                                        href="/docs"
                                        title="Hotel 2"
                                    ></ListItem>
                                </ul>
                            </NavigationMenuContent>
                        </NavigationMenuItem>

                        <NavigationMenuItem>
                            <NavigationMenuTrigger>
                                Atractivos
                            </NavigationMenuTrigger>
                            <NavigationMenuContent>
                                <ul className="grid gap-3 p-6 md:w-[680px] md:grid-cols-2 ">
                                    <ListItem
                                        href="/atractivos"
                                        title="Hotel 1"
                                    ></ListItem>
                                    <ListItem
                                        href="/docs"
                                        title="Hotel 2"
                                    ></ListItem>
                                </ul>
                            </NavigationMenuContent>
                        </NavigationMenuItem>

                        <NavigationMenuItem>
                            <NavigationMenuTrigger>
                                Noticias
                            </NavigationMenuTrigger>
                            <NavigationMenuContent>
                                <ul className="grid gap-3 p-6 md:w-[680px] md:grid-cols-2 ">
                                    <ListItem
                                        href="/docs"
                                        title="Hotel 1"
                                    ></ListItem>
                                    <ListItem
                                        href="/docs"
                                        title="Hotel 2"
                                    ></ListItem>
                                </ul>
                            </NavigationMenuContent>
                        </NavigationMenuItem>
                    </NavigationMenuList>
                </NavigationMenu>

                {/* {[
                    "Inicio",
                    "Delegaciones",
                    "Hoteles",
                    "Restaurantes",
                    "Atractivos",
                    "Noticias",
                ].map((item) => (
                    <Dropdown key={item}>
                        <Dropdown.Trigger>
                            <span className="inline-flex rounded-md">
                                <button
                                    type="button"
                                    className="inline-flex items-center px-2 py-2 border border-transparent text-sm leading-4 font-bold rounded-md  hover:text-gray-300 focus:outline-none transition ease-in-out duration-150"
                                >
                                    {item}
                                    <svg
                                        className="ml-2 -mr-0.5 h-4 w-4"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </button>
                            </span>
                        </Dropdown.Trigger>

                        <Dropdown.Content>
                            <Dropdown.Link href={route("profile.edit")}>
                                Profile
                            </Dropdown.Link>
                        </Dropdown.Content>
                    </Dropdown>
                ))}  */}
            </div>
            <div className="flex gap-4 items-center">
                <a className="">
                    <IconSearch className="inline"></IconSearch>
                </a>
                <a className="rounded-lg p-4 bg-gradient-to-r from-orange-300 to-orange-600 font-bold">
                    Registra tu empresa
                </a>
            </div>
        </div>
    );
}
