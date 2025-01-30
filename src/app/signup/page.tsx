import { signIn } from "@/auth";
import SignupClient from "@/components/SignupClient";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { redirect } from "next/navigation";
import getSession from "../action";

async function Page() {
  const user = await getSession();
  if (user) redirect("/");
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <Card className="w-full px-3 md:w-[50%] lg:w-[30%]">
        <CardHeader>
          <CardTitle>Sign up</CardTitle>
        </CardHeader>
        <CardContent>
          <SignupClient />
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
            Already have an account ?
            <Link href="/login" className="hover:outline-2 px-1">
              Login
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}

export default Page;
