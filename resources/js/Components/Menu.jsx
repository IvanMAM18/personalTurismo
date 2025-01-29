import { IconSearch } from "@tabler/icons-react";
import Dropdown from "./Dropdown";
import ButtonMenu from "./ButtonMenu";
import { cn } from "@/lib/utils";
import * as React from "react";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import { ChevronDown } from "lucide-react";

import { Link } from "@inertiajs/react";

const NavigationMenuDemo = ({ delegaciones }) => {
    return (
        <NavigationMenu.Root className="relative z-[1] flex w-full justify-center">
            <NavigationMenu.List className="center m-0 flex list-none rounded-[6px] p-1 ">
                <NavigationMenu.Item>
                    <NavigationMenu.Link asChild>
                        <Link className="hover:bg-slate-800/50 focus:shadow-white block select-none rounded-[4px] px-3 py-2 font-extrabold text-lg leading-none no-underline outline-none focus:shadow-[0_0_0_2px]"
                        href="/">
                        Inicio
                        </Link>
                    </NavigationMenu.Link>
                </NavigationMenu.Item>

                <NavigationMenu.Item>
                    <NavigationMenu.Trigger className="text-white hover:bg-slate-800/50 focus:shadow-white group flex select-none items-center justify-between gap-[2px] rounded-[4px] px-3 py-2 text-lg font-extrabold leading-none outline-none focus:shadow-[0_0_0_2px]">
                        Delegaciones{" "}
                        <ChevronDown
                            className="h-3 w-3 relative top-[1px] transition-transform duration-200 ease-in group-data-[state=open]:-rotate-180"
                            aria-hidden
                        />
                    </NavigationMenu.Trigger>
                    <NavigationMenu.Content className="data-[motion=from-start]:animate-enterFromLeft data-[motion=from-end]:animate-enterFromRight data-[motion=to-start]:animate-exitToLeft data-[motion=to-end]:animate-exitToRight absolute top-0 left-0 w-full sm:w-auto">
                        <ul className="m-0 grid list-none gap-x-[10px] p-[22px] sm:w-[500px] sm:grid-cols-[1fr_1fr]">
                            {delegaciones &&
                                delegaciones.map((item) => (
                                    <ListItem
                                        href={route("delegacion.show", item.slug)}
                                        title={item.nombre}
                                    >
                                        {item.leyenda}
                                    </ListItem>
                                ))}
                        </ul>
                    </NavigationMenu.Content>
                </NavigationMenu.Item>

                <NavigationMenu.Indicator className="data-[state=visible]:animate-fadeIn data-[state=hidden]:animate-fadeOut top-full z-[1] flex h-[10px] items-end justify-center overflow-hidden transition-[width,transform_250ms_ease]">
                    <div className="relative top-[70%] h-[10px] w-[10px] rotate-[45deg] rounded-tl-[2px] bg-white" />
                </NavigationMenu.Indicator>
            </NavigationMenu.List>

            <div className="perspective-[2000px] absolute top-full left-0 flex w-full justify-center">
                <NavigationMenu.Viewport className="data-[state=open]:animate-scaleIn data-[state=closed]:animate-scaleOut relative mt-[10px] h-[var(--radix-navigation-menu-viewport-height)] w-full origin-[top_center] overflow-hidden rounded-[6px] bg-white transition-[width,_height] duration-300 sm:w-[var(--radix-navigation-menu-viewport-width)]" />
            </div>
        </NavigationMenu.Root>
    );
};

const ListItem = React.forwardRef(
    ({ className, children, title, ...props }, forwardedRef) => (
        <li>
            <NavigationMenu.Link asChild>
                <Link
                    className={cn(
                        "focus:shadow-[0_0_0_2px] focus:shadow-slate-800 hover:bg-slate-100 block select-none rounded-[6px] p-3 text-[15px] leading-none no-underline outline-none transition-colors",
                        className
                    )}
                    {...props}
                    ref={forwardedRef}
                >
                    <div className="text-black mb-[5px] font-medium leading-[1.2]">
                        {title}
                    </div>
                    <p className="text-gray-400 leading-[1.4]">{children}</p>
                </Link>
            </NavigationMenu.Link>
        </li>
    )
);


export default function Menu(props) {
    return (
        <div className="w-full flex justify-center sm:justify-between text-white py-5 sm:px-12 px-5 items-center z-10 relative">
            <div className="flex">
                <Link href="/">
                    <img src="/images/logof.png" className="w-[8vh]" />
                </Link>
                <img src="/images/logo2.png" className="w-[8vh]" />
            </div>
            <div className="flex-1">
                 {/* <NavigationMenuDemo {...props}></NavigationMenuDemo>  */}
            </div>
            <div className="flex items-end justify-end w-[100px] ">
                {/* <div className=" border border-white rounded-lg p-1 cursor-pointer hover:border-4 hover:border-amber-700 text-white hover:text-amber-700">
                    <svg class="h-8 w-8 "  fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
                    </svg>
                </div> */}
                <ButtonMenu delegacion={props}></ButtonMenu>
                
            </div>
        </div>
    );
}
