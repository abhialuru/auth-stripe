import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Link from "next/link";

function Page() {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <Card className="w-[30vw]">
        <CardHeader>
          <CardTitle>Sign up</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="flex flex-col gap-3">
            <Input type="name" name="name" placeholder="name" required />
            <Input type="email" name="email" placeholder="email" required />
            <Input
              type="password"
              name="password"
              placeholder="password"
              required
            />
            <Button>Let's get started</Button>
          </form>
          <form className="flex flex-col gap-2 mt-2 text-center">
            <p>or</p>
            <Button variant={"outline"}>Continue with Google</Button>
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
