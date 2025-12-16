import {
	Body,
	Button,
	Container,
	Head,
	Heading,
	Html,
	Preview,
	Section,
	Tailwind,
	Text,
} from "@react-email/components";

interface ConfirmationEmailProps {
	name: string;
	url: string;
}

const PasswordReset = ({ name, url }: ConfirmationEmailProps) => {
	return (
		<Html>
			<Tailwind>
				<Head>
					<title>Restablecer contraseña</title>
					<Preview>Solicitud de restablecimiento de contraseña</Preview>
				</Head>
				<Body className="bg-gray-100 py-10 font-sans">
					<Container className="mx-auto max-w-[600px] rounded-xl bg-white p-5">
						<Heading className="my-[30px] text-center font-bold text-[24px] text-black">
							Hola {name},
						</Heading>

						<Text className="mb-3 text-[16px] text-gray-700 leading-6">
							Recibimos una solicitud para restablecer la contraseña de tu
							cuenta. Para continuar con este proceso, haz clic en el botón de
							abajo.
						</Text>

						<Section className="mt-8 mb-8 text-center">
							<Button
								className="box-border rounded-lg bg-blue-600 px-5 py-3 text-center font-bold text-white no-underline"
								href={url}
							>
								Restablecer Contraseña
							</Button>
						</Section>

						<Text className="mb-3 text-[16px] text-gray-700 leading-6">
							Si tú no solicitaste este cambio, puedes ignorar este correo y tu
							contraseña permanecerá sin cambios.
						</Text>

						<Text className="mb-3 text-[16px] text-gray-700 leading-6">
							Este enlace expirará en 24 horas por razones de seguridad.
						</Text>

						<Text className="mb-6 text-[16px] text-gray-700 leading-6">
							Gracias,
							<br />
							El Equipo de Ometomi
						</Text>

						{/* <Hr className="border-gray-300 my-[24px]" />

            <Text className="text-[12px] leading-[16px] text-gray-500 m-0">
              © 2025 Tu Empresa. Todos los derechos reservados.
            </Text>
            <Text className="text-[12px] leading-[16px] text-gray-500 m-0">
              Av. Revolución 123, Col. Centro, Ciudad de México, CDMX, México
            </Text>
            <Text className="text-[12px] leading-[16px] text-gray-500 m-0">
              <a
                href="https://example.com/unsubscribe"
                className="text-blue-500 underline"
              >
                Cancelar suscripción
              </a>
            </Text> */}
					</Container>
				</Body>
			</Tailwind>
		</Html>
	);
};

export default PasswordReset;
