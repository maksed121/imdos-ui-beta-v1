"use client";
import React, { useEffect, useState } from "react";
import { Card, CardHeader } from "@nextui-org/react";
import { LoaderIcon, icons } from "lucide-react";
import { useRouter } from "next/navigation";
import useSWR from "swr";
import { AlertDanger } from "@/components/imdos/alert";
// import { Chart } from "./chart";

const Dashboard = () => {
  const router = useRouter();
  const { data, error, mutate } = useSWR(
    "/api/custom/dashboard-stats",
    fetchData
  );

  async function fetchData() {
    const request = await fetch("/api/custom/dashboard-stats", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        encryptedKey: Math.floor(Math.random() * 9876543234567),
      }),
    });

    return await request.json();
  }

  const widgets = [
    {
      title: "Students",
      icon: "Contact",
      link: "/panel/students",
    },
    {
      title: "Faculties",
      icon: "Users",
      link: "/panel/faculties",
    },
    {
      title: "Classes",
      icon: "Computer",
      link: "/panel/classes",
    },
    {
      title: "Subjects",
      icon: "Notebook",
      link: "/panel/subjects",
    },
    {
      title: "Chapters",
      icon: "NotebookText",
      link: "/panel/chapters",
    },
    {
      title: "Courses",
      icon: "AlignVerticalJustifyEnd",
      link: "/panel/courses",
    },
    {
      title: "Subscriptions",
      icon: "CalendarClock",
      link: "/panel/subscriptions",
    },
    {
      title: "Videos",
      icon: "Clapperboard",
      link: "/panel/videos",
    },
    {
      title: "Lives",
      icon: "Youtube",
      link: "/panel/lives",
    },
    {
      title: "Notes",
      icon: "NotebookPen",
      link: "/panel/notes",
    },
  ];

  if (error) {
    return (
      <AlertDanger
        title="Network Error"
        description="We're unable to retrieve the requested data because our servers are currently unreachable. Please ensure you have a stable internet connection or try again later."
      />
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {widgets.map((item, index) => {
          const LucideIcon = icons[item.icon];
          return (
            <Card
              key={index}
              isPressable
              onPress={() => router.push(item.link)}
            >
              <CardHeader className="flex justify-between gap-3 p-5">
                <div className="flex flex-col items-start">
                  <p className="text-[14px] text-default-500">{item.title}</p>
                  <p className="text-2xl font-bold">
                    {!data ? (
                      <LoaderIcon className="animate-spin my-1" />
                    ) : (
                      data?.widgets[item?.title?.toLowerCase()]
                    )}
                  </p>
                  <p className="text-[12px] text-foreground-400">
                    Since last updated
                  </p>
                </div>
                <LucideIcon size={30} />
              </CardHeader>
            </Card>
          );
        })}
      </div>
      {/* <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
        <Card className="pr-4 pb-2">
          <CardHeader className="font-bold ml-3 mt-2">
            Students Overview
          </CardHeader>
          <Chart data={data?.students} />
        </Card>
        <Card className="pr-4 pb-2">
          <CardHeader className="font-bold ml-3 mt-2">
            Subscription Overview
          </CardHeader>
          <Chart data={data?.subscriptions} />
        </Card>
      </div> */}
    </>
  );
};

export default Dashboard;
