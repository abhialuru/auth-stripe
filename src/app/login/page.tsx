import { signIn } from "@/auth";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import LoginClient from "@/components/LoginClient";
import Link from "next/link";
import getSession from "../action";
import { redirect } from "next/navigation";

async function Page() {
  const user = await getSession();
  if (user) redirect("/");

  return (
    <div className="w-full h-[100dvh] flex justify-center items-center px-3">
      <Card className="w-full md:w-[50%] lg:w-[30%]">
        <CardHeader>
          <CardTitle>Login</CardTitle>
        </CardHeader>
        <CardContent>
          <LoginClient />
          <form
            action={async () => {
              "use server";
              await signIn("google");
            }}
            className="flex flex-col gap-2 mt-2 text-center"
          >
            <p>or</p>
            <Button type="submit" variant={"outline"}>
              Continue with Google
            </Button>
          </form>
        </CardContent>
        <CardFooter>
          <p className="text-sm text-gray-600">
            Need an account ?
            <Link href="/signup" className="hover:outline-2 px-1">
              sign up
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}

export default Page;
