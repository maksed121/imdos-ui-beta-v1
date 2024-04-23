"use client";
import React from "react";
import { Input } from "@nextui-org/react";
import Form from "@/components/imdos/form-working";
import { z } from "zod";
import { useImdosUI } from "@/providers/ImdosProvider";

const Page = () => {
  const { formModal, setFormModal } = useImdosUI();
  const inputFields = [
    {
      title: "Category Name",
      type: "text",
      uid: "name",
      default: formModal?.data?.name ?? "",
    },
    {
      title: "Priority",
      type: "select-multiple",
      uid: "priority",
      default: formModal?.data?.priority ?? "",
      items: [
        {
          label: "0",
          value: "0",
        },
        {
          label: "1",
          value: "1",
        },
        {
          label: "2",
          value: "2",
        },
        {
          label: "3",
          value: "3",
        },
        {
          label: "4",
          value: "4",
        },
        {
          label: "5",
          value: "5",
        },
      ],
    },
    {
      title: "Logo",
      type: "file",
      uid: "logo",
      default: formModal?.data?.logo ?? "",
    },
    {
      title: "Gender",
      type: "date",
      uid: "gender",
      default: "",
    },
  ];

  const categorySchema = z.object({
    name: z.string().refine((val) => val.length != 0, "Name is required"),
    priority: z.any().refine((val) => val.length != 0, "Priority is required"),
    logo: z.any().refine((val) => val.length != 0, "Logo is required"),
    gender: z.any().refine((val) => val.length != 0, "Gender is required"),
  });

  return (
    <div>
      <Form
        fields={inputFields}
        schema={categorySchema}
        onSubmit={() => {}}
        onCancel={() => {
          setFormModal({ show: false });
        }}
      />
    </div>
  );
};

export default Page;
