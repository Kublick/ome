import { createIsomorphicFn } from "@tanstack/react-start";
import { getRequestHeaders } from "@tanstack/react-start/server";
import { auth } from "@/lib/auth";

export type AuthSession = {
	session: Record<string, unknown>;
	user: { id: string } & Record<string, unknown>;
} | null;

export const getSession = createIsomorphicFn()
	.server(async (): Promise<AuthSession> => {
		const headers = getRequestHeaders();
		const session = await auth.api
			.getSession({ headers, asResponse: false })
			.catch(() => null);
		return (session as AuthSession) ?? null;
	})
	.client(async (): Promise<AuthSession> => {
		const res = await fetch("/api/auth/get-session", {
			method: "GET",
			credentials: "include",
		});
		if (!res.ok) return null;
		const data = (await res.json()) as AuthSession;
		return data ?? null;
	});
