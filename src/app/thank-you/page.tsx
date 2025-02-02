import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import getSession from "../action";
import { redirect } from "next/navigation";

async function Page() {
  const user = await getSession();

  if (!user) redirect("/");

  return (
    <div className="w-full h-dvh flex justify-center items-center">
      <div className="flex flex-col gap-5 text-center border border-gray-400 p-10 rounded-md bg-slate-50">
        <h1 className="text-3xl font-bold text-green-500">
          Payment Successfull!
        </h1>
        <h1 className="text-2xl text-gray-700 font-bold">
          Thank you for trying it out.
        </h1>
        <Button variant={"link"}>
          <Link href="/">Home Page</Link>
        </Button>
      </div>
    </div>
  );
}

export default Page;
