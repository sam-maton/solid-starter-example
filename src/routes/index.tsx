import { action, useSubmission } from "@solidjs/router";
import { authClient } from "~/lib/auth-client";
import { Show } from "solid-js";

const signUpUser = action(async (formData: FormData) => {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const name = formData.get("name") as string;

  if (!email || !password || !name) {
    return { ok: false, error: "Missing required fields." };
  }

  const { data, error } = await authClient.signUp.email({
    email,
    password,
    name,
  });

  await new Promise((resolve) => setTimeout(resolve, 3000));

  if (error) {
    return { ok: false, error: error.message };
  }

  return { ok: true, user: data?.user };
}, "sign-up-action");

export default function Home() {
  const submission = useSubmission(signUpUser);
  return (
    <main style={{ padding: "1.5rem", "max-width": "600px", margin: "0 auto" }}>
      <h1>Sign Up</h1>
      <Show when={submission.pending}>
        <div style={{ padding: "0.5rem", "background-color": "#eef" }}>
          Creating account…
        </div>
      </Show>

      <Show
        when={submission.result && !submission.pending && submission.result.ok}
      >
        <div style={{ padding: "0.5rem", "background-color": "#e6ffed" }}>
          Account created for {submission.result?.user?.email || "new user"}.
        </div>
      </Show>

      <Show
        when={submission.result && !submission.pending && !submission.result.ok}
      >
        <div
          style={{
            padding: "0.5rem",
            "background-color": "#ffe6e6",
            color: "#900",
          }}
        >
          {submission.result?.error}
        </div>
      </Show>
      <form action={signUpUser} method="post">
        <label style={{ display: "block", margin: "0.5rem 0" }}>
          Email:
          <input
            type="email"
            name="email"
            required
            style={{
              width: "100%",
              padding: "0.5rem",
              "margin-top": "0.25rem",
            }}
            value="test@email.com"
          />
        </label>
        <label style={{ display: "block", margin: "0.5rem 0" }}>
          Name:
          <input
            type="text"
            name="name"
            required
            style={{
              width: "100%",
              padding: "0.5rem",
              "margin-top": "0.25rem",
            }}
            value="Steve"
          />
        </label>
        <label style={{ display: "block", margin: "0.5rem 0" }}>
          Password:
          <input
            type="password"
            name="password"
            required
            style={{
              width: "100%",
              padding: "0.5rem",
              "margin-top": "0.25rem",
            }}
            value="••••••••"
          />
        </label>

        <button
          type="submit"
          style={{ padding: "0.6rem 1rem", "margin-top": "1rem" }}
        >
          Submit
        </button>
      </form>

      <hr style={{ margin: "2rem 0" }} />
    </main>
  );
}
