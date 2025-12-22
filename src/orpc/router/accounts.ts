import { protectedProcedure, publicProcedure } from "..";

const accounts = [
	{ id: 1, name: "Max 1 " },
	{ id: 2, name: "Max 2" },
	{ id: 3, name: "Max 3" },
];

export const listAccounts = publicProcedure().handler(() => {
	return accounts;
});

export const getUser = protectedProcedure().handler(({ context }) => {
	return context.user;
});
