import { signOut } from "@/auth";
import PaymentDemo from "@/components/ui/PaymentDemo";
import Link from "next/link";
import getSession from "./action";

export default async function Home() {
  const user = await getSession();

  return (
    <>
      <nav className="max-w-4xl mx-auto px-5 md:px-20 bg-gray-50 h-12 flex items-center justify-between">
        <div className="font-bold">Authentication</div>
        <div className="flex gap-5 md:gap-10">
          {user ? (
            <form
              action={async () => {
                "use server";
                await signOut();
              }}
            >
              <button type="submit">Log out</button>
            </form>
          ) : (
            <>
              <Link href="/login">Login</Link>
              <Link href="signup">Sign up</Link>
            </>
          )}
        </div>
      </nav>
      <div className="h-px max-w-3xl mx-auto bg-gray-300" />
      <main className="max-w-4xl mx-auto px-5 bg-gray-50 h-[calc(100dvh-3rem-1px)] flex flex-col gap-20 justify-center items-center">
        <div className="max-w-lg border border-gray-300 bg-white rounded-sm p-3 flex flex-col gap-5">
          <h1 className="text-lg font-bold text-center">
            Authentication is{" "}
            <span className="underline underline-offset-2">
              {user ? "Done" : "Incomplete"}
            </span>
            .
          </h1>
          <p className="text-center">
            I built a project with custom authentication and payment
            integration. For authentication, provided two login options:
            credentials-based login and Google authentication. For payments, I
            integrated Stripe to handle transactions. Both features are fully
            implemented at a production level.
          </p>
        </div>
        {user && <PaymentDemo />}
      </main>
    </>
  );
}
