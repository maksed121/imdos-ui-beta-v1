"use client";

import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Toaster } from "react-hot-toast";
import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider } from "@/components/imdos-ui/theme-provider";

import ConfirmAlert from "@/components/imdos/confirm-alert";

// Create a context for the application
const AppContext = createContext();

// Create a custom hook to access the context
export function useImdosUI() {
  return useContext(AppContext);
}

// Create a provider component to wrap your entire application
export function ImdosProvider({ children }) {
  const [loading, setLoading] = useState(false);
  const [sideBar, setSideBar] = useState(false);
  const [user, setUser] = useState({
    name: "Imdadullah",
    role: "Admin",
    profile: "https://github.com/imdos.png",
  });
  const [formModal, setFormModal] = useState({
    show: false,
    data: null,
  });
  const [confirmAlert, setConfirmAlert] = useState({
    show: false,
    refId: null,
  });
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const path = pathname.split("/");
    const current = path[path.length - 1];
    const title =
      pathname === "/"
        ? "Dashboard"
        : current
            .split("-")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ");
    document.title = title;
  }, [pathname]);

  // Value to be provided by the context
  const contextValue = {
    loading,
    setLoading,
    sideBar,
    setSideBar,
    router,
    confirmAlert,
    setConfirmAlert,
    formModal,
    setFormModal,
    user,
    setUser,
  };

  return (
    <AppContext.Provider value={contextValue}>
      <NextUIProvider>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster position="top right" />
          <ConfirmAlert />
        </ThemeProvider>
      </NextUIProvider>
    </AppContext.Provider>
  );
}
