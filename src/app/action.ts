import { auth } from "@/auth";

async function getSession() {
  const session = await auth();
  const user = session?.user;
  return user;
}

export default getSession;
