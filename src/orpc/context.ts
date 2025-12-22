import { getRequestHeaders } from "@tanstack/react-start/server";
import { auth } from "@/lib/auth";

export async function createORPCContext() {
	const headers = getRequestHeaders();
	const session = await auth.api.getSession({ headers });

	return {
		session,
		user: session?.user,
	};
}

export type ORPCContext = Awaited<ReturnType<typeof createORPCContext>>;
