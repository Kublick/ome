import { createFileRoute, redirect } from "@tanstack/react-router";
import { DashboardLayout } from "@/features/layout/dashboard-layout";
import { getUserServer } from "@/functions/getUser";

export const Route = createFileRoute("/dashboard")({
	loader: async () => {
		const user = await getUserServer();

		if (!user) {
			throw redirect({ to: "/login" });
		}
		return user;
	},
	component: RouteComponent,
});

function RouteComponent() {
	const data = Route.useLoaderData();

	return (
		<div>
			<DashboardLayout user={data} />
		</div>
	);
}
