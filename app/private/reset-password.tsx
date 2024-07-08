"use client";

import { createClient } from "@/utils/supabase/client";
import { FormEventHandler } from "react";

function ResetPassword({ email }: { email: string }) {
  const onSubmit: FormEventHandler<HTMLFormElement> = async (formEvent) => {
    formEvent.preventDefault();

    const supabase = createClient();

    const formData = new FormData(formEvent.currentTarget);
    const email = formData.get("email") as string;

    if (email) {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: "http://127.0.0.1:3000/login/password-update",
      });
      if (error) {
        console.error(error);
      }
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <input type="hidden" name="email" value={email} />
      <button type="submit">Reset password</button>
    </form>
  );
}

export { ResetPassword };
