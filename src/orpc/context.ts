import { getRequestHeaders } from "@tanstack/react-start/server";
import { auth } from "@/lib/auth";

export async function createContext() {
	const session = await auth.api.getSession({
		headers: getRequestHeaders(),
	});
	return {
		session,
	};
}

export type ORPCContext = Awaited<ReturnType<typeof createContext>>;
