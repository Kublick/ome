import { render } from "@react-email/render";
import VerificationEmail from "@/email/VerificationEmial";
import { sendEmail } from "@/lib/email";
import PasswordReset from "./PassowrdReset";

export async function sendVerificationEmail({
	userEmail,
	userName,
	confirmationUrl,
}: {
	userEmail: string;
	userName: string;
	confirmationUrl: string;
}) {
	const html = await render(
		<VerificationEmail name={userName} confirmationUrl={confirmationUrl} />,
	);

	await sendEmail({
		to: userEmail,
		subject: "Verifica tu correo electrónico",
		react: html,
		text: `Por favor, verifica tu correo electrónico haciendo clic en el siguiente enlace: ${confirmationUrl}`,
	});

	console.log(
		`Send verification email to ${userEmail} with link: ${confirmationUrl}`,
	);
}

export async function requestPasswordReset({
	userEmail,
	userName,
	confirmationUrl,
}: {
	userEmail: string;
	userName: string;
	confirmationUrl: string;
}) {
	const html = await render(
		<PasswordReset name={userName} url={confirmationUrl} />,
	);

	await sendEmail({
		to: userEmail,
		subject: "Reinicia tu contraseña",
		react: html,
		text: `Reinicia tu contraseña aquí: ${confirmationUrl}`,
	});

	console.log(
		`Send password reset email to ${userEmail} with link: ${confirmationUrl}`,
	);
}
