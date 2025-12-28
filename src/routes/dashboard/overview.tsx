import {
	useMutation,
	useQueryClient,
	useSuspenseQuery,
} from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { orpc } from "@/orpc/client";

export const Route = createFileRoute("/dashboard/overview")({
	component: RouteComponent,
});

function RouteComponent() {
	const queryClient = useQueryClient();
	const { data } = useSuspenseQuery(orpc.privateData.queryOptions());
	const categoryMutation = useMutation(
		orpc.category.createCategory.mutationOptions({
			onSuccess: () => {
				toast.success("Category created successfully");
				queryClient.invalidateQueries({
					queryKey: orpc.category.listCategories.key(),
				});
			},
		}),
	);

	const { data: categories } = useSuspenseQuery(
		orpc.category.listCategories.queryOptions(),
	);

	function handleCreate() {
		categoryMutation.mutate({ name: "Chicken" });
	}

	return (
		<div>
			Overview
			<pre>{JSON.stringify(data, null, 2)}</pre>
			<div>
				<h1>Categories</h1>
				<pre>{JSON.stringify(categories, null, 2)}</pre>
			</div>
			<Button onClick={handleCreate}>Create Category</Button>
		</div>
	);
}
