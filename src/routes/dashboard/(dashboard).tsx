import { createAsync, redirect, query } from "@solidjs/router";
import { getRequestEvent } from "solid-js/web";

import { Show } from "solid-js";
import { auth } from "~/lib/auth"; // server-side auth instance
import { authClient } from "~/lib/auth-client";

interface User {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  email: string;
  emailVerified: boolean;
  name: string;
  image?: string | null;
}

const requireUser = query(async () => {
  "use server";
  const event = getRequestEvent();
  if (!event) throw redirect("/");
  const session = await auth.api.getSession({ headers: event.request.headers });
  if (!session) {
    throw redirect("/");
  }
  return session.user as User;
}, "require-user-query");

export default function Dashboard() {
  const user = createAsync(() => requireUser());

  return (
    <main style={{ padding: "1.5rem" }}>
      <Show when={user()} fallback={<p>Loading…</p>}>
        <h1>Dashboard Home</h1>
        <p>Welcome {user()?.name || user()?.email}</p>
      </Show>
      <button onClick={async () => await authClient.signOut()}>Sign Out</button>
    </main>
  );
}
