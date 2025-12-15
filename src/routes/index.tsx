import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({ component: App });

function App() {
	return (
		<div className="p-10">
			<h1 className="text-3xl font-bold underline">Hello world!</h1>
		</div>
	);
}
