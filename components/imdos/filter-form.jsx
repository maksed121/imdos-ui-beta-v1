import React from "react";
import { Button, Select, SelectItem } from "@nextui-org/react";
import { Search } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const FilterForm = ({ filterInputs, onSubmit }) => {
  const validation = filterInputs.reduce((acc, field) => {
    acc[field.uid] = z
      .string()
      .refine((val) => val.length > 0, `${field.title} is required`);
    return acc;
  }, {});

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(z.object(validation)),
  });

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col space-y-2"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {filterInputs.map((item, index) => (
            <Select
              key={index}
              label={item.title}
              variant="bordered"
              isLoading={item?.showLoading && !item.items}
              {...register(item.uid)}
              disabledKeys={["select"]}
              onChange={(e) => {
                item?.onChange && item?.onChange(e.target.value);
                register(item.uid).onChange(e);
              }}
              isInvalid={Boolean(errors?.[item?.uid])}
              errorMessage={errors?.[item.uid]?.message}
            >
              <SelectItem
                key={"select"}
                className="text-foreground-400 focus:bg-transparent"
                textValue={item.title}
              >
                Select {item.title}
              </SelectItem>
              {item?.items?.map((options) => (
                <SelectItem key={options.value} value={options.value}>
                  {options.label}
                </SelectItem>
              ))}
            </Select>
          ))}
        </div>
        <div className="flex justify-end">
          <Button
            className="mt-3 px-6"
            size="md"
            color="secondary"
            type="submit"
          >
            <Search />
            Filter
          </Button>
        </div>
      </form>
    </>
  );
};

export default FilterForm;
