import { z } from "zod";

// Account related schemas
export const FinancialAccountType = z.enum([
	"CASH",
	"CHECKING",
	"SAVINGS",
	"CREDIT_CARD",
	"INVESTMENT",
	"LOAN",
	"OTHER",
]);

export const AccountOutput = z.object({
	id: z.string(),
	userId: z.string(),
	name: z.string(),
	type: FinancialAccountType,
	// amounts are returned as decimal strings (e.g. "1234.56") matching DB NUMERIC/Decimal
	balance: z.string(),
	currency: z.string(),
	description: z.string().nullable().optional(),
	institution: z.string().nullable().optional(),
	lastFourDigits: z.string().nullable().optional(),
	isActive: z.boolean(),
	createdAt: z.string(),
	updatedAt: z.string(),
});

export const CreateAccountInput = z.object({
	name: z.string(),
	type: FinancialAccountType,
	currency: z.string().optional(),
	description: z.string().optional(),
	institution: z.string().optional(),
	lastFourDigits: z.string().optional(),
	// initial balance as a string amount (dollars.cents) or cents string
	initialBalance: z.string().optional(),
});

export const UpdateAccountInput = z.object({
	id: z.string(),
	name: z.string().optional(),
	currency: z.string().optional(),
	description: z.string().optional(),
	institution: z.string().optional(),
	lastFourDigits: z.string().optional(),
	isActive: z.boolean().optional(),
});

export const ListAccountsInput = z.object({
	isActive: z.boolean().optional(),
	skip: z.number().int().min(0).optional(),
	take: z.number().int().optional(),
});

export const TransferInput = z.object({
	fromAccountId: z.string(),
	toAccountId: z.string(),
	// amount as a decimal string, e.g. "123.45"
	amount: z.string(),
	description: z.string().optional(),
	currency: z.string().optional(),
});

export const AdjustBalanceInput = z.object({
	accountId: z.string(),
	// signed decimal string e.g. "-12.34" or "100.00"
	amount: z.string(),
	reason: z.string().optional(),
});

export const CategoryInput = z.object({
	name: z.string().min(3, "El nombre debe tener al menos 3 caracteres"),
	color: z.string().optional(),
	icon: z.string().optional(),
	type: z.enum(["INCOME", "EXPENSE", "TRANSFER"]).optional(),
});

export const CategoryUpdateInput = z.object({
	id: z.string(),
	name: z
		.string()
		.min(3, "El nombre debe tener al menos 3 caracteres")
		.optional(),
	color: z.string().optional(),
	icon: z.string().optional(),
	type: z.enum(["INCOME", "EXPENSE", "TRANSFER"]).optional(),
	description: z.string().optional(),
	isActive: z.boolean().optional(),
	order: z.number().int().optional(),
});

export const CategoryOutput = z.object({
	id: z.string(),
	userId: z.string(),
	name: z.string(),
	description: z.string().nullable().optional(),
	isActive: z.boolean(),
	order: z.number().int(),
	type: z.enum(["INCOME", "EXPENSE", "TRANSFER"]),
	color: z.string().nullable().optional(),
	icon: z.string().nullable().optional(),
	createdAt: z.string(),
	updatedAt: z.string(),
});
