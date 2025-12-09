import { createFileRoute } from "@tanstack/react-router";
import { LoginForm } from "@/features/login-form";

export const Route = createFileRoute("/(auth)/signin")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div>
			<LoginForm />
		</div>
	);
}
