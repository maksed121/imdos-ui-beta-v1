"use client";
import React from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button, Input } from "@nextui-org/react";
import { DatePicker, DateRangePicker } from "@nextui-org/date-picker";

import {
  Form as FormComponent,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/imdos-ui/form";

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
import MultipleDropdown from "../imdos-ui/multiple-dropdown";
import clsx from "clsx";
import { parseDate } from "@internationalized/date";

const Form = ({ fields, schema, onSubmit, onCancel, layout }) => {
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
        <form onSubmit={form.handleSubmit(handleFormSubmit)}>
          <div className={clsx("gap-3 my-3", layout?.base ?? "space-y-2")}>
            {fields.map((item, index) => {
              if (item.type == "hidden") return;
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
                        errorMessage={
                          form?.formState?.errors[item.uid]?.message
                        }
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
                        selectedKey={field.value}
                        isInvalid={Boolean(form?.formState?.errors[item.uid])}
                        errorMessage={
                          form?.formState?.errors[item.uid]?.message
                        }
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
                      <MultipleDropdown
                        label={item.title}
                        items={item.items}
                        onChange={(value) => {
                          field.onChange(value ?? "");
                          if (item.onChange) {
                            item.onChange(value);
                          }
                        }}
                        selectedKeys={field.value}
                        isInvalid={Boolean(form?.formState?.errors[item.uid])}
                        errorMessage={
                          form?.formState?.errors[item.uid]?.message
                        }
                      />
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
                        errorMessage={
                          form?.formState?.errors[item.uid]?.message
                        }
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
                        errorMessage={
                          form?.formState?.errors[item.uid]?.message
                        }
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
                return (
                  <FormField
                    key={index}
                    control={form.control}
                    name={item.uid}
                    render={({ field }) => (
                      <DatePicker
                        label={item.title}
                        variant="bordered"
                        defaultValue={
                          typeof field?.value === "string" && field?.value
                            ? parseDate(field?.value)
                            : field?.value ?? null
                        }
                        showMonthAndYearPickers
                        isInvalid={Boolean(form?.formState?.errors[item.uid])}
                        errorMessage={
                          form?.formState?.errors[item.uid]?.message
                        }
                        onChange={(value) => {
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
                        value={field.value}
                        isInvalid={Boolean(form?.formState?.errors[item.uid])}
                        errorMessage={
                          form?.formState?.errors[item.uid]?.message
                        }
                        classNames={{
                          base: layout?.span,
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
                        value={field.value}
                        isInvalid={Boolean(form?.formState?.errors[item.uid])}
                        errorMessage={
                          form?.formState?.errors[item.uid]?.message
                        }
                        onChange={(event) => {
                          const { value } = event.target;
                          field.onChange(value);
                          if (item.onChange) {
                            item.onChange(value);
                          }
                          if (item.slug) {
                            const slug = value
                              .toString()
                              .toLowerCase()
                              .replace(/\s+/g, "-")
                              .replace(/[^\w-]+/g, "")
                              .replace(/--+/g, "-")
                              .replace(/^-+/, "")
                              .replace(/-+$/, "");
                            form.setValue("slug", slug);
                          }
                        }}
                      />
                    );
                  }}
                />
              );
            })}
          </div>
          <div className="flex items-center justify-end gap-3">
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
