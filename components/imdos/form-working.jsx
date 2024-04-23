"use client";
import React from "react";
import clsx from "clsx";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input as ShadInput } from "@/components/ui/input";
import { Button, Input } from "@nextui-org/react";

import {
  Form as FormComponent,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/imdos-ui/form";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { RadioGroup, Radio } from "@nextui-org/react";

import { Textarea } from "@nextui-org/react";
import { Checkbox } from "@nextui-org/react";

import { Autocomplete, AutocompleteItem } from "@nextui-org/react";

import { Button as ShadButton } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import { Select, SelectItem } from "@nextui-org/react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { LoadingButton } from "./loading-button";
import { useImdosUI } from "@/providers/ImdosProvider";
import InputFile from "../imdos-ui/input-field";

const Form = ({ fields, schema, onSubmit, onCancel }) => {
  const { setLoading } = useImdosUI();
  const validation = fields.reduce((acc, field) => {
    acc[field.uid] = field.default;
    return acc;
  }, {});

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: validation,
  });

  const handleFormSubmit = async (values) => {
    setLoading(true);
    await onSubmit(values);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  return (
    <>
      <FormComponent {...form}>
        <form
          onSubmit={form.handleSubmit(handleFormSubmit)}
          className="space-y-2"
        >
          {fields.map((item, index) => {
            if (item.type == "dropdown") {
              return (
                <FormField
                  key={index}
                  control={form.control}
                  name={item.uid}
                  render={({ field }) => (
                    <Select
                      label={item.title}
                      variant="bordered"
                      defaultSelectedKeys={field.value && [field.value]}
                      isInvalid={Boolean(form?.formState?.errors[item.uid])}
                      errorMessage={form?.formState?.errors[item.uid]?.message}
                      onSelectionChange={(value) => {
                        field.onChange(value);
                        if (item.onChange) {
                          item.onChange(value);
                        }
                      }}
                    >
                      {item?.items?.map((data) => (
                        <SelectItem key={data.value} value={data.value}>
                          {data.label}
                        </SelectItem>
                      ))}
                    </Select>
                  )}
                />
              );
            }
            if (item.type == "select") {
              return (
                <FormField
                  key={index}
                  control={form.control}
                  name={item.uid}
                  render={({ field }) => (
                    <Autocomplete
                      label={item.title}
                      variant="bordered"
                      defaultItems={item.items}
                      isClearable={false}
                      selectedKey={field.value}
                      isInvalid={Boolean(form?.formState?.errors[item.uid])}
                      errorMessage={form?.formState?.errors[item.uid]?.message}
                      onSelectionChange={(value) => {
                        field.onChange(value ?? "");
                        if (item.onChange) {
                          item.onChange(value);
                        }
                      }}
                    >
                      {item?.items?.map((data) => (
                        <AutocompleteItem key={data.value} value={data.value}>
                          {data.label}
                        </AutocompleteItem>
                      ))}
                    </Autocomplete>
                  )}
                />
              );
            }
            if (item.type == "select-multiple") {
              return (
                <FormField
                  key={index}
                  control={form.control}
                  name={item.uid}
                  render={({ field }) => (
                    <Select
                      label={item.title}
                      variant="bordered"
                      selectionMode="multiple"
                      selectedKeys={field.value}
                      isInvalid={Boolean(form?.formState?.errors[item.uid])}
                      errorMessage={form?.formState?.errors[item.uid]?.message}
                      placeholder={`Select ${item.title}`}
                      onSelectionChange={(value) => {
                        field.onChange(value ?? "");
                        if (item.onChange) {
                          item.onChange(value);
                        }
                      }}
                    >
                      {item?.items?.map((data) => (
                        <SelectItem key={data.value} value={data.value}>
                          {data.label}
                        </SelectItem>
                      ))}
                    </Select>
                  )}
                />
              );
            }
            if (item.type == "file") {
              return (
                <FormField
                  key={index}
                  control={form.control}
                  name={item.uid}
                  render={({ field }) => (
                    <InputFile
                      type={item.type}
                      label={item.title}
                      variant="bordered"
                      placeholder={item.title}
                      isInvalid={Boolean(form?.formState?.errors[item.uid])}
                      errorMessage={form?.formState?.errors[item.uid]?.message}
                      onChange={(e) => {
                        field.onChange(e.target.files[0]);
                        if (item.onChange) {
                          item.onChange(e.target.files[0]);
                        }
                      }}
                    />
                  )}
                />
              );
            }
            if (item.type == "radio") {
              return (
                <FormField
                  key={index}
                  control={form.control}
                  name={item.uid}
                  render={({ field }) => (
                    <RadioGroup
                      label={item.title}
                      value={field.value}
                      isInvalid={Boolean(form?.formState?.errors[item.uid])}
                      errorMessage={form?.formState?.errors[item.uid]?.message}
                      onValueChange={(value) => {
                        field.onChange(value);
                        if (item.onChange) {
                          item.onChange(value);
                        }
                      }}
                    >
                      {item.items.map((data, innerIndex) => (
                        <Radio value={data.value} key={innerIndex}>
                          {data.label}
                        </Radio>
                      ))}
                    </RadioGroup>
                  )}
                />
              );
            }
            if (item.type == "date") {
              const isInvalid = Boolean(form?.formState?.errors[item.uid]);
              return (
                <FormField
                  key={index}
                  control={form.control}
                  name={item.uid}
                  render={({ field }) => (
                    <FormItem className="flex flex-col space-y-1">
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <ShadButton
                              variant={"bordered"}
                              className={cn(
                                "pl-3 text-left mt-1 relative border-2 rounded-xl transition-all duration-300 py-[25px] font-normal ring-offset-background",
                                !field.value && "text-muted-foreground",
                                isInvalid
                                  ? "border-danger text-danger"
                                  : "border-foreground-200 hover:border-foreground-400"
                              )}
                            >
                              <span className="absolute left-3 top-2 mb-1 text-tiny">
                                {item.title}
                              </span>
                              {field.value ? (
                                <span className="pt-5">
                                  {format(field.value, "PPP")}
                                </span>
                              ) : (
                                <span className="pt-5">Pick a date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </ShadButton>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={(value) => {
                              field.onChange(value);
                              if (item.onChange) {
                                item.onChange(value);
                              }
                            }}
                            disabled={item.disabled}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage className="text-danger" />
                    </FormItem>
                  )}
                />
              );
            }
            if (item.type == "textarea") {
              return (
                <FormField
                  key={index}
                  control={form.control}
                  name={item.uid}
                  render={({ field }) => (
                    <Textarea
                      label={item.title}
                      placeholder={`Enter your ${item.title.toLowerCase()}`}
                      variant="bordered"
                      defaultValue={form.value}
                      isInvalid={Boolean(form?.formState?.errors[item.uid])}
                      errorMessage={form?.formState?.errors[item.uid]?.message}
                      classNames={{
                        input: "resize-y min-h-[70px]",
                      }}
                      onChange={(event) => {
                        const { value } = event.target;
                        field.onChange(value);
                        if (item.onChange) {
                          item.onChange(value);
                        }
                      }}
                    />
                  )}
                />
              );
            }
            if (item.type == "checkbox") {
              return (
                <FormField
                  key={index}
                  control={form.control}
                  name={item.uid}
                  render={({ field }) => (
                    <Checkbox
                      defaultSelected={field.value}
                      onValueChange={(value) => {
                        field.onChange(value);
                        if (item.onChange) {
                          item.onChange(value);
                        }
                      }}
                    >
                      {item.title}
                    </Checkbox>
                  )}
                />
              );
            }
            return (
              <FormField
                key={index}
                control={form.control}
                name={item.uid}
                render={({ field }) => {
                  return (
                    <Input
                      type={item.type}
                      label={item.title}
                      variant="bordered"
                      defaultValue={field.value}
                      isInvalid={Boolean(form?.formState?.errors[item.uid])}
                      errorMessage={form?.formState?.errors[item.uid]?.message}
                      onChange={(event) => {
                        const { value } = event.target;
                        field.onChange(value);
                        if (item.onChange) {
                          item.onChange(value);
                        }
                      }}
                    />
                  );
                }}
              />
            );
          })}
          <div className="flex items-center justify-between">
            <Button
              type="button"
              variant="flat"
              className="mt-2"
              onPress={onCancel}
            >
              Cancel
            </Button>
            <LoadingButton type="submit" className="mt-2">
              Submit
            </LoadingButton>
          </div>
        </form>
      </FormComponent>
    </>
  );
};

export default Form;
