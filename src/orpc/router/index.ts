import type { RouterClient } from "@orpc/server";

import { protectedProcedure, publicProcedure } from "../index";
import {
	createCategory,
	deleteCategory,
	getCategory,
	listCategories,
	updateCategories,
} from "./categories";

export const appRouter = {
	healthCheck: publicProcedure.handler(() => {
		return "OK";
	}),
	privateData: protectedProcedure.handler(({ context }) => {
		return {
			message: "This is private",
			user: context.session?.user,
		};
	}),
	category: {
		createCategory,
		listCategories,
		updateCategories,
		deleteCategory,
		getCategory,
	},
};
export type AppRouter = typeof appRouter;
export type AppRouterClient = RouterClient<typeof appRouter>;
