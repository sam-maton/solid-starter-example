import { createAsync } from "@solidjs/router";
import { Show, Suspense } from "solid-js";
import Card from "~/components/dashboard/card";

import RevenueChart from "~/components/dashboard/revenue-chart";


export default function DashboardPage() {
  return (
    <div>
      <h1 class="mb-4 text-xl md:text-2xl">Dashboard</h1>
      <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Suspense>
          <Card
            title="Collected"
            value={9999}
            type="collected"
          />
          <Card
            title="Pending"
            value={99999}
            type="pending"
          />
          <Card
            title="Total Invoices"
            value={999999}
            type="invoices"
          />
          <Card
            title="Total Customers"
            value={999999}
            type="customers"
          />
        </Suspense>
      </div>

      <div class="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        <Suspense>
          <Show when={true}>
            <RevenueChart revenue={[]} />
          </Show>
        </Suspense>
      </div>
    </div>
  );
}