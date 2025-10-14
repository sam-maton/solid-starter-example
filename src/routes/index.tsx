import { action } from "@solidjs/router";
import { authClient } from "~/lib/auth-client";

const myAction = action(async (formData: FormData) => {
  console.log("Form submitted:", formData);
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const name = formData.get("name") as string;

  console.log(email, password, name);

  const { data, error } = await authClient.signUp.email(
    {
      email,
      password,
      name,
    },
    {
      onRequest: (ctx) => {
        console.log("Request started");
      },
      onSuccess: (ctx) => {
        console.log("User signed up:", ctx);
      },
      onError: (ctx) => {
        console.log("Error signing up user:");
        console.log(ctx.error);
      },
    }
  );
}, "my-action");

export default function Home() {
  return (
    <main style={{ padding: "1.5rem", "max-width": "600px", margin: "0 auto" }}>
      <h1>Login</h1>
      <form action={myAction} method="post">
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
