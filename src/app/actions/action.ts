"use server";
import { signIn } from "@/auth";
import { db } from "@/db";
import { hash } from "bcryptjs";
import { CredentialsSignin } from "next-auth";

async function login(email: string, password: string) {
  try {
    await signIn("credentials", {
      email,
      password,
    });
  } catch (error) {
    const err = error as CredentialsSignin;
    return err.cause;
  }
}

async function register(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const existingUser = await db.user.findUnique({
    where: {
      email: email,
    },
  });

  if (existingUser) {
    return new Error("User already exists");
  }

  const hashPassword = await hash(password, 10);

  await db.user.create({
    data: {
      email: email,
      name: name,
      password: hashPassword,
    },
  });
}

export { login, register };
