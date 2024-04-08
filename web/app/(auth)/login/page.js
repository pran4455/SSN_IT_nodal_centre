import { headers, cookies } from "next/headers";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export default async function Login({
  searchParams,
}) {
  const signIn = async (formData) => {
    "use server";

    const origin = headers().get("origin");
    const email = formData.get("email");
    const password = formData.get("password");
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      redirect("/login?message=Could not authenticate user");
    }

    redirect(`${origin}/dashboard`);
  };

  return (
    <div className="flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center gap-2 mt-16">
      <form
        className="flex-1 flex flex-col w-full justify-center gap-2 text-foreground"
        action={signIn}
      >
        <Label className="text-md" htmlFor="email">
          Email
        </Label>
        <Input
          className="mb-2"
          name="email"
          placeholder="you@example.com"
          required
        />
        <Label className="text-md" htmlFor="password">
          Password
        </Label>
        <Input
          className="mb-2"
          type="password"
          name="password"
          placeholder="••••••••"
          required
        />
        <Button>
          Sign In
        </Button>
        {searchParams?.message && (
          <p className="mt-4 p-4 bg-foreground/10 text-foreground text-center">
            {searchParams.message}
          </p>
        )}
      </form>
    </div>
  );
}
