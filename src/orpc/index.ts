import { ORPCError, os } from "@orpc/server";
import type { ResponseHeadersPluginContext } from "@orpc/server/plugins";
import { getRequestHeaders } from "@tanstack/react-start/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const base = os
	.$context<ResponseHeadersPluginContext>()
	.use(async ({ next }) => {
		const session = await auth.api.getSession({ headers: getRequestHeaders() });

		return await next({
			context: {
				user: session?.user,
				session: session?.session,
				db: prisma,
			},
		});
	});

export const publicProcedure = () => base;

export const protectedProcedure = () =>
	base.use(async ({ context, next }) => {
		const { user, session } = context;

		if (!user || !session) {
			throw new ORPCError("UNAUTHORIZED");
		}

		return await next({
			context: {
				...context,
				user,
				session,
			},
		});
	});
