import React from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@nextui-org/react";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "../ui/calendar";

const DateField = (props) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"bordered"}
          className={cn(
            "pl-3 text-left border-3 rounded-xl transition-all duration-300 py-6 font-normal ring-offset-background",
            !field.value && "text-muted-foreground"
          )}
        >
          {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          {...props}
          //   mode="single"
          //   selected={field.value}
          //   onSelect={(value) => {
          //     field.onChange(value);
          //     if (item.onChange) {
          //       item.onChange(value);
          //     }
          //   }}
          //   disabled={item.disabled}
          //   initialFocus
        />
      </PopoverContent>
    </Popover>
  );
};

export default DateField;
