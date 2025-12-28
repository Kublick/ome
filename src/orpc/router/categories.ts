import { ORPCError } from "@orpc/client";
import z from "zod";
import { prisma } from "@/lib/prisma";
import { protectedProcedure } from "..";
import { CategoryInput, CategoryOutput, CategoryUpdateInput } from "../schema";

const createCategory = protectedProcedure
	.input(CategoryInput)
	.route({ tags: ["Categories"], summary: "Create a new category" })
	.handler(async ({ input, context }) => {
		const category = await prisma.category.create({
			data: {
				name: input.name,
				userId: context.session?.user?.id,
			},
		});

		return category;
	});

const getCategory = protectedProcedure
	.input(z.object({ id: z.string() }))
	.route({
		method: "GET",
		tags: ["Categories"],
		summary: "Get a category by ID",
	})
	.output(CategoryOutput)
	.handler(async ({ input, context }) => {
		const category = await prisma.category.findFirst({
			where: {
				id: input.id,
				userId: context.session?.user?.id,
			},
		});

		if (!category) {
			throw new ORPCError("NOT_FOUND", {
				message: "Categoría no encontrada",
				status: 404,
			});
		}

		const { createdAt, updatedAt, ...rest } = category;
		return {
			...rest,
			createdAt: createdAt.toISOString(),
			updatedAt: updatedAt.toISOString(),
		};
	});

const listCategories = protectedProcedure
	.route({
		method: "GET",
		tags: ["Categories"],
		summary: "List all categories",
	})
	.handler(async ({ context }) => {
		const categories = await prisma.category.findMany({
			where: {
				userId: context.session?.user?.id,
			},
		});

		return categories;
	});

const updateCategories = protectedProcedure
	.input(CategoryUpdateInput)
	.route({ method: "PUT", tags: ["Categories"], summary: "Update a category" })
	.handler(async ({ input, context }) => {
		try {
			await prisma.category.update({
				where: {
					id: input.id,
				},
				data: {
					name: input.name,
					description: input.description,
					isActive: input.isActive,
					order: input.order,
					type: input.type,
					color: input.color,
					icon: input.icon,
					userId: context.session?.user?.id,
				},
			});
		} catch {
			throw new ORPCError("BAD_REQUEST", {
				message: "No se pudo actualizar la categoría",
				status: 400,
			});
		}
	});

const deleteCategory = protectedProcedure
	.input(z.object({ id: z.string() }))
	.route({
		method: "DELETE",
		tags: ["Categories"],
		summary: "Delete a category",
	})
	.handler(async ({ input, context }) => {
		try {
			await prisma.category.delete({
				where: {
					id: input.id,
					userId: context.session?.user?.id,
				},
			});
		} catch {
			throw new ORPCError("BAD_REQUEST", {
				message: "No se pudo eliminar la categoría",
				status: 400,
			});
		}
	});
export {
	createCategory,
	listCategories,
	updateCategories,
	deleteCategory,
	getCategory,
};
