import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/config/cuentas")({
	component: RouteComponent,
});

function RouteComponent() {
	return <div>Hello "/config/cuentas"!</div>;
}
