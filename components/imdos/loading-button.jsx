"use client";
import React from "react";
import { Button } from "@nextui-org/react";
import { useImdosUI } from "@/providers/ImdosProvider";
import { cn } from "@/lib/utils";

export const LoadingButton = ({ children, className }) => {
  const { loading } = useImdosUI();
  return (
    <Button
      color="primary"
      type="submit"
      className={cn(className)}
      isLoading={loading}
    >
      {children}
    </Button>
  );
};
