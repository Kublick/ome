import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { orpc } from "@/orpc/client";

export const Route = createFileRoute("/dashboard/overview")({
	component: RouteComponent,
});

function RouteComponent() {
	const { data } = useSuspenseQuery(orpc.listAccounts.queryOptions());

	const { data: user } = useSuspenseQuery(
		orpc.getUser.queryOptions({
			input: {},
		}),
	);

	return (
		<div>
			{JSON.stringify(data)}
			{user && (
				<div>
					User: {user.name} (ID: {user.id})
				</div>
			)}
		</div>
	);
}
