import {
	Body,
	Button,
	Container,
	Head,
	Heading,
	Hr,
	Html,
	Link,
	Section,
	Tailwind,
	Text,
} from "@react-email/components";

interface ConfirmationEmailProps {
	name: string;
	confirmationUrl: string;
}

const VerificationEmail = ({
	name,
	confirmationUrl,
}: ConfirmationEmailProps) => {
	return (
		<Html>
			<Tailwind>
				<Head>
					<title>Confirm Your Email Address</title>
				</Head>
				<Body className="bg-gray-100 py-10 font-sans">
					<Container className="mx-auto max-w-[600px] rounded-xl bg-white p-5">
						<Heading className="mt-2.5 mb-6 font-bold text-2xl text-gray-800">
							Welcome, {name}!
						</Heading>
						<Text className="mb-3 text-base text-gray-600 leading-6">
							Thank you for registering with us. We're excited to have you on
							board!
						</Text>
						<Text className="mb-6 text-base text-gray-600 leading-6">
							To complete your registration and verify your account, please
							click the button below:
						</Text>
						<Section className="mb-8 text-center">
							<Button
								className="box-border rounded-lg bg-blue-600 px-6 py-3   text-center font-bold text-white no-underline"
								href={confirmationUrl}
							>
								Confirm Email Address
							</Button>
						</Section>
						<Text className="mb-3 text-sm text-gray-600 leading-6">
							If you did not create an account, you can safely ignore this
							email.
						</Text>
						<Text className="mb-6 text-sm text-gray-600 leading-6">
							This confirmation link will expire in 24 hours.
						</Text>
						<Text className="mb-3 text-sm text-gray-600 leading-6">
							If the button above doesn't work, copy and paste the following
							link into your browser:
						</Text>
						<Text className="mb-6 break-all text-sm text-gray-600 leading-6">
							<Link href={confirmationUrl} className="text-blue-600 underline">
								{confirmationUrl}
							</Link>
						</Text>
						<Hr className="my-6 border-gray-200" />
						<Text className="mb-3 text-xs text-gray-500 leading-4">
							Si tienes preguntas, contacta al equipo de soporte
						</Text>
						<Text className="m-0 text-xs text-gray-500 leading-4">
							© {new Date().getFullYear()} Ometomi . Todos los derechos
							reservados.
						</Text>
						<Text className="m-0 text-xs text-gray-500 leading-4">Mexico</Text>
						<Text className="m-0 text-xs text-gray-500 leading-4">
							<Link href="#" className="text-gray-500 underline">
								Unsubscribe
							</Link>
						</Text>
					</Container>
				</Body>
			</Tailwind>
		</Html>
	);
};

export default VerificationEmail;
