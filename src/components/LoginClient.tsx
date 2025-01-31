"use client";
import { login } from "@/app/actions/action";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

function LoginClient() {
  const router = useRouter();

  return (
    <form
      className="flex flex-col gap-3"
      action={async (formData) => {
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;

        if (!email || !password) {
          toast.error("Provide all essential credentials!");
        }

        const toastId = toast.loading("Logging you In. Please wait!");

        const err = await login(email, password);

        if (!err) {
          toast.success("Login Successful", {
            id: toastId,
          });
          router.push("/");
        } else {
          toast.error(String(err), {
            id: toastId,
          });
        }
      }}
    >
      <Input type="email" name="email" placeholder="email" required />
      <Input type="password" name="password" placeholder="password" required />
      <Button type="submit">Let's get started</Button>
    </form>
  );
}

export default LoginClient;
