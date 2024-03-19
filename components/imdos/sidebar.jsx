"use client";
import React from "react";
import Link from "next/link";

import { buttonVariants } from "../ui/button";
import { cn } from "@/lib/utils";
import { ChevronRight, CircleDot, icons } from "lucide-react";
import { useImdosUI } from "@/providers/ImdosProvider";

import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/imdos-ui/menubar";
import { ScrollShadow } from "@nextui-org/react";
import { appConfig } from "@/lib/config";

const Sidebar = ({ links }) => {
  const { sideBar } = useImdosUI();
  return (
    <div
      className={cn(
        "fixed transition-all duration-200 z-[50] md:left-0",
        sideBar ? "left-0" : "left-[-300px]"
      )}
    >
      <div
        className={cn(
          "logo h-[80px] bg-white border-b border-r shadow-sm dark:bg-zinc-900 flex px-4 items-center transition-all duration-200 justify-center"
        )}
      >
        <h1 className="text-xl font-bold truncate">{appConfig.appName}</h1>
      </div>
      <ScrollShadow className="w-[300px] h-[calc(100vh-80px)] overflow-y-scroll no-scrollbar backdrop-blur-lg border-r px-3">
        <div className="pb-4">
          {links.map((item, index) => (
            <div key={index} className="px-1">
              <h1 className={cn("my-2 font-bold text-sm")}>{item.title}</h1>
              <div className="space-y-1">
                {item.items.map((link, linkIndex) => {
                  const LucideIcon = icons[link.icon];
                  return (
                    <Menubar
                      key={linkIndex}
                      className="bg-transparent px-0 border-0"
                    >
                      <MenubarMenu>
                        <Link
                          href={link.sub ? "#" : link.url}
                          className="w-full"
                        >
                          <MenubarTrigger
                            className={cn(
                              buttonVariants({ variant: "ghost", size: "lg" }),
                              "justify-between px-3 w-full"
                            )}
                          >
                            <div className="flex items-center gap-2">
                              <LucideIcon size={20} />
                              <span>{link.label}</span>
                            </div>
                            {link.sub && (
                              <ChevronRight
                                size={15}
                                className="focus:rotate-[30deg]"
                              />
                            )}
                          </MenubarTrigger>
                        </Link>
                        {link.sub && (
                          <MenubarContent className="translate-x-[5px] w-[265px]">
                            {link.sub.map((sub, subIndex) => (
                              <Link href={sub.url} key={subIndex}>
                                <MenubarItem
                                  key={subIndex}
                                  className="flex items-center py-2 gap-2"
                                >
                                  <CircleDot size={10} />
                                  {sub.label}
                                  <ChevronRight
                                    size={15}
                                    className="focus:rotate-[30deg] ml-auto"
                                  />
                                </MenubarItem>
                              </Link>
                            ))}
                          </MenubarContent>
                        )}
                      </MenubarMenu>
                    </Menubar>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </ScrollShadow>
    </div>
  );
};

export default Sidebar;
