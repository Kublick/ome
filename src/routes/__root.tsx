import { TanStackDevtools } from "@tanstack/react-devtools";
import type { QueryClient } from "@tanstack/react-query";
import {
	createRootRouteWithContext,
	HeadContent,
	Link,
	Scripts,
	useRouter,
} from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import { Toaster } from "sonner";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import TanStackQueryDevtools from "../integrations/tanstack-query/devtools";
import appCss from "../styles.css?url";

interface MyRouterContext {
	queryClient: QueryClient;
}

function ErrorComponent({ error }: { error: Error }) {
	const router = useRouter();

	return (
		<div className="flex min-h-96 items-center justify-center">
			<Alert variant="destructive" className="max-w-lg">
				<AlertTitle>Something went wrong</AlertTitle>
				<AlertDescription className="space-y-4">
					<p>{error.message}</p>
					<Button
						variant="outline"
						onClick={() => router.invalidate()}
						className="w-full"
					>
						Try again
					</Button>
				</AlertDescription>
			</Alert>
		</div>
	);
}

function NotFoundComponent() {
	return (
		<div className="flex min-h-96 items-center justify-center">
			<Alert className="max-w-lg">
				<AlertTitle>Página no encontrada</AlertTitle>
				<AlertDescription className="space-y-4">
					<p>La página que buscas no existe.</p>
					<Button className="w-full">
						<Link to="/">Ir a la página principal</Link>
					</Button>
				</AlertDescription>
			</Alert>
		</div>
	);
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
	head: () => ({
		meta: [
			{
				charSet: "utf-8",
			},
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1",
			},
			{
				title: "Ome",
			},
		],
		links: [
			{
				rel: "stylesheet",
				href: appCss,
			},
		],
	}),
	errorComponent: ErrorComponent,
	notFoundComponent: NotFoundComponent,
	shellComponent: RootDocument,
});

function RootDocument({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<head>
				<HeadContent />
			</head>
			<body>
				{children}
				<Toaster />
				<TanStackDevtools
					config={{
						position: "bottom-right",
					}}
					plugins={[
						{
							name: "Tanstack Router",
							render: <TanStackRouterDevtoolsPanel />,
						},
						TanStackQueryDevtools,
					]}
				/>
				<Scripts />
			</body>
		</html>
	);
}
