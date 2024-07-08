"use client";

import { useRouter } from "next/navigation";
import { useEffect, type FormEvent } from "react";

import { createClient } from "@/utils/supabase/client";

function PasswordUpdateForm() {
  const router = useRouter();

  useEffect(() => {
    async function init() {
      const supabase = createClient();

      const { data } = await supabase.auth.getUser();

      if (!data.user) {
        const code = new URLSearchParams(window.location.search).get("code");
        if (!code) {
          console.error("Missing code");
          return;
        }

        const { data: newSession, error: newSessionError } =
          await supabase.auth.exchangeCodeForSession(code);

        console.log("NEW SESSION DATA:", newSession.session);

        if (newSessionError) {
          console.log(newSessionError);
        }
      }
    }

    init();
  }, []);

  async function onSubmit(formEvent: FormEvent<HTMLFormElement>) {
    formEvent.preventDefault();

    const supabase = createClient();

    const formData = new FormData(formEvent.currentTarget);
    const password = formData.get("new-password") as string;
    console.log("NEW PASSWORD:", password);

    if (!password) return;

    const { error } = await supabase.auth.updateUser({
      password,
    });

    if (error) {
      console.error(error);
    } else {
      console.log("Password successfully changed");
    }

    router.push("/");
  }

  return (
    <form onSubmit={onSubmit}>
      <label htmlFor="new-password">New password:</label>
      <input type="password" id="new-password" name="new-password" />
      <button type="submit">Change password</button>
    </form>
  );
}

export { PasswordUpdateForm };
