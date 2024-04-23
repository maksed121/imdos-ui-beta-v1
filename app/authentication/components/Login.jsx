"use client";
import React from "react";
import toast from "react-hot-toast";

import { Input } from "@nextui-org/react";
import { Eye, EyeOff } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useImdosUI } from "@/providers/ImdosProvider";
import { LoadingButton } from "@/components/imdos/loading-button";
import { loginSchema } from "@/lib/validation-schema";

export default function Login() {
  const [isVisible, setIsVisible] = React.useState(false);
  const { setLoading } = useImdosUI();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    setLoading(true);
    const request = await fetch("/api/auth", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...data }),
    });

    const response = await request.json();

    if (!request.ok) {
      toast.error(response.message);
    }
    if (request.status == 200) {
      toast.success(response.message);
      router.replace("/panel/dashboard");
    }
    setLoading(false);
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col space-y-2"
      >
        <Input
          type="email"
          label="Email"
          {...register("email")}
          isInvalid={Boolean(errors?.email)}
          errorMessage={errors?.email?.message}
        />
        <Input
          type={isVisible ? "text" : "password"}
          label="Password"
          {...register("password")}
          isInvalid={Boolean(errors?.password)}
          errorMessage={errors?.password?.message}
          endContent={
            <button
              className="focus:outline-none"
              type="button"
              onClick={() => setIsVisible(!isVisible)}
            >
              {isVisible ? (
                <EyeOff className="text-xl text-default-400 pointer-events-none mb-[5px]" />
              ) : (
                <Eye className="text-xl text-default-400 pointer-events-none mb-[5px]" />
              )}
            </button>
          }
        />
        <LoadingButton className="py-6">Login</LoadingButton>
      </form>
    </>
  );
}
