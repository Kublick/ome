import { render } from "@react-email/render";
import type { ReactElement } from "react";
import { resend } from "./resend";

const DEFAULT_FROM = "Gestiona tu Psicología <info@gestionatupsicologia.com>";

interface SendEmailOptions {
	to: string | string[];
	subject: string;
	react: ReactElement | string;
	text?: string;
	from?: string;
}

export async function sendEmail({
	to,
	subject,
	react,
	text,
	from = DEFAULT_FROM,
}: SendEmailOptions) {
	let html: string;
	if (typeof react === "string") {
		html = react;
	} else {
		html = await render(react);
	}

	await resend.emails.send({
		from,
		to,
		subject,
		html,
		text,
	});
}
