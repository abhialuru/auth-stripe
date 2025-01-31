"use client";
import { register } from "@/app/actions/action";
import { toast } from "sonner";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useRouter } from "next/navigation";

function SignupClient() {
  const router = useRouter();

  return (
    <form
      action={async (formData) => {
        const toastId = toast.loading("Signing up!. Please wait!");

        const check = await register(formData);

        if (!check) {
          toast.success("Sign up Successful. Login Now.", {
            id: toastId,
          });
          router.push("/login");
        } else {
          toast.error("User Already Exists. Try Logging In!", {
            id: toastId,
          });
        }
      }}
      className="flex flex-col gap-3"
    >
      <Input
        type="name"
        name="name"
        placeholder="name"
        minLength={3}
        required
      />
      <Input type="email" name="email" placeholder="email" required />
      <Input
        type="password"
        name="password"
        placeholder="password"
        minLength={4}
        required
      />
      <Button type="submit">Let's get started</Button>
    </form>
  );
}

export default SignupClient;
