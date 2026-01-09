import { createServerFn } from "@tanstack/react-start";
import { getRequestHeaders } from "@tanstack/react-start/server";
import type { User } from "better-auth";
import { auth } from "@/lib/auth";

export const getUserServer = createServerFn().handler(async () => {
	const headers = getRequestHeaders();
	const session = await auth.api.getSession({ headers });

	if (!session) {
		return null;
	}

	const user = session.user;

	return user as User;
});
