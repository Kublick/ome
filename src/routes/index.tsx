import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({ component: App });

function handleCreate() {
	alert("Create Category clicked");
}

function App() {
	return (
		<div className="p-10">
			<h1 className="text-3xl font-bold underline">Hello world!</h1>
			{/* <pre>{JSON.stringify(categories, null, 2)}</pre> */}
			<Button onClick={handleCreate}>Create Category</Button>
		</div>
	);
}
