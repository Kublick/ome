import { redirect } from "@tanstack/react-router";
import { type AuthSession, getSession } from "@/lib/session";

export async function requireUserSession(opts?: {
	redirectTo?: string;
}): Promise<NonNullable<AuthSession>> {
	const session = await getSession();
	if (!session?.user) {
		throw redirect({ to: opts?.redirectTo ?? "/signin" });
	}
	return session;
}

export async function requireUserId(opts?: {
	redirectTo?: string;
}): Promise<string> {
	const session = await requireUserSession(opts);
	return String(session.user.id);
}
