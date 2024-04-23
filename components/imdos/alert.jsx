import { AlertCircle, AlertTriangle, Terminal } from "lucide-react";
import { cn } from "@/lib/utils";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export function AlertDanger({ title, description, className }) {
  return (
    <Alert
      className={cn(
        "text-destructive bg-red-50 dark:bg-zinc-900 border border-destructive",
        className
      )}
    >
      <AlertCircle className="h-6 w-6" color="#ff4949" />
      <AlertTitle className="ml-2 font-bold">{title}</AlertTitle>
      <AlertDescription className="ml-2">{description}</AlertDescription>
    </Alert>
  );
}

export function AlertInfo({ title, description, className }) {
  return (
    <Alert
      className={cn(
        "text-sky-800 bg-sky-50 dark:bg-gray-800 dark:text-sky-400 border border-sky-500",
        className
      )}
    >
      <Terminal className="h-4 w-4" />
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>{description}</AlertDescription>
    </Alert>
  );
}

export function AlertWarning({ title, description, className }) {
  return (
    <Alert
      className={cn(
        "text-yellow-800 bg-yellow-50 dark:bg-gray-800 dark:text-yellow-400 border border-yellow-500",
        className
      )}
    >
      <AlertTriangle className="h-4 w-4" />
      <AlertTitle className="font-bold">{title}</AlertTitle>
      <AlertDescription>{description}</AlertDescription>
    </Alert>
  );
}
