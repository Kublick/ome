import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard/overview")({
	component: RouteComponent,
});

function RouteComponent() {
	const { user } = Route.useRouteContext();

	return (
		<div>
			<h1>Overview</h1>
			{user && <p>Welcome, {user.name}!</p>}
		</div>
	);
}
