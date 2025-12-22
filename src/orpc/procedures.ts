import { ORPCError, os } from "@orpc/server";

// Base procedure with context
const baseProcedure = os.$context();

// Public procedure (no auth required)
export const publicProcedure = baseProcedure;

// Protected procedure (requires authentication)
export const protectedProcedure = baseProcedure.use(({ context, next }) => {
	if (!context.user) {
		throw new ORPCError("UNAUTHORIZED");
	}

	return next({
		context: {
			...context,
			user: context.user, // Now guaranteed to exist
		},
	});
});
