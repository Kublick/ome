import { createFileRoute, Outlet } from "@tanstack/react-router";
import { requireUserSession } from "@/lib/require-auth";

export const Route = createFileRoute("/dashboard")({
	beforeLoad: async () => {
		await requireUserSession({ redirectTo: "/signin" });
	},
	component: DashboardLayout,
});

function DashboardLayout() {
	return <Outlet />;
}
