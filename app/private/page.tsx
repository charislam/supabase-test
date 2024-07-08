import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";
import { ResetPassword } from "./reset-password";

export default async function PrivatePage() {
  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/login");
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 p-24">
      <p>Hello {data.user.email}</p>
      <ResetPassword email={data.user.email!} />
    </main>
  );
}
