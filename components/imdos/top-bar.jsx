"use client";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { Button } from "@/components/ui/button";
import {
  CloudSun,
  LogOut,
  Menu,
  Moon,
  Palette,
  Sun,
  User,
  X,
} from "lucide-react";
import { useTheme } from "next-themes";
import { useImdosUI } from "@/providers/ImdosProvider";
import { cn } from "@/lib/utils";
import { Logout } from "@/lib/server-utils";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const TopBar = () => {
  const { setTheme } = useTheme();
  const { user, sideBar, setSideBar, setConfirmAlert } = useImdosUI();
  const router = useRouter();

  const logOut = async () => {
    const response = await Logout();
    if (response.status == 200) {
      toast.success(response.message);
      router.replace("/");
    } else {
      toast.error(response.message);
    }
  };

  return (
    <div className="h-[80px] w-screen flex fixed top-0 right-0 md:ml-[300px] z-[50] backdrop-blur-lg justify-between items-center px-4 border-b">
      <Button
        variant="outline"
        className={cn(
          "p-2 lg:hidden transition-all w-[40px] dark:bg-zinc-900 relative duration-160 z-[50]",
          sideBar ? "left-[300px]" : "left-0"
        )}
        onClick={() => setSideBar(!sideBar)}
      >
        {!sideBar ? <Menu size={30} /> : <X size={30} />}
      </Button>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="relative rounded-full ml-auto p-2"
          >
            <Avatar className="h-8 w-8 rounded-full">
              <AvatarFallback>{user?.name?.[0]}</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex justify-start items-center gap-3">
              <Avatar>
                <AvatarImage
                  src={user?.profile ?? "https://github.com/imdos.png"}
                  alt="@imdos"
                />
                <AvatarFallback>{user?.name?.[0]}</AvatarFallback>
              </Avatar>
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">{user?.name}</p>
                <p className="text-xs leading-none text-muted-foreground">
                  {user?.role}
                </p>
              </div>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuGroup>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>
                <Palette className="mr-2 h-4 w-4" />
                <span>Theme</span>
              </DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent>
                  <DropdownMenuItem onClick={() => setTheme("light")}>
                    <Sun className="mr-2 h-4 w-4" />
                    <span>Light</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setTheme("dark")}>
                    <Moon className="mr-2 h-4 w-4" />
                    <span>Dark</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setTheme("system")}>
                    <CloudSun className="mr-2 h-4 w-4" />
                    <span>System</span>
                  </DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>
          </DropdownMenuGroup>
          <DropdownMenuItem
            onClick={() => {
              setConfirmAlert({
                open: true,
                action: logOut,
                message: "Are you sure want to logout from your dashboard?",
                confirmText: "Logout",
              });
            }}
          >
            <LogOut className="mr-2 h-4 w-4" />
            <span>Log out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default TopBar;
