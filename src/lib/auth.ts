import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { admin, openAPI } from "better-auth/plugins";
import { tanstackStartCookies } from "better-auth/tanstack-start";
import {
	requestPasswordReset,
	sendVerificationEmail,
} from "@/email/email-functions";
import { clientEnv, env } from "@/env";
import { prisma } from "@/lib/prisma";

export const auth = betterAuth({
	database: prismaAdapter(prisma, {
		provider: "postgresql",
	}),
	emailAndPassword: {
		enabled: true,
		sendResetPassword: async ({ user, token }) => {
			const confirmationUrl = `${clientEnv.VITE_BETTER_AUTH_URL}/auth/reset?token=${token}`;
			await requestPasswordReset({
				userEmail: user.email,
				userName: user.name,
				confirmationUrl,
			});
		},
	},
	emailVerification: {
		sendVerificationEmail: async ({ user, token }) => {
			const confirmationUrl = `${clientEnv.VITE_BETTER_AUTH_URL}/auth/verify?token=${token}`;
			await sendVerificationEmail({
				userEmail: user.email,
				userName: user.name,
				confirmationUrl,
			});
		},
	},
	socialProviders: {
		google: {
			clientId: env.GOOGLE_CLIENT_ID,
			clientSecret: env.GOOGLE_CLIENT_SECRET,
		},
	},
	plugins: [openAPI(), admin(), tanstackStartCookies()],
});
