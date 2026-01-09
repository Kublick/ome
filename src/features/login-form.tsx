import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "@tanstack/react-router";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	Field,
	FieldDescription,
	FieldError,
	FieldGroup,
	FieldLabel,
	FieldSeparator,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";

const formSchema = z.object({
	email: z.email({ message: "Email es obligatorio" }),
	password: z
		.string()
		.min(8, { message: "Contraseña es obligatoria de 8 caracteres" }),
});

type formType = z.infer<typeof formSchema>;

export function LoginForm() {
	const navigate = useNavigate();
	const form = useForm<formType>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	const onSubmit = async (formData: formType) => {
		await authClient.signIn.email(
			{
				email: formData.email,
				password: formData.password,
			},
			{
				onSuccess: async () => {
					toast.success("Inicio de sesión exitoso");
					navigate({ to: "/dashboard/overview" });
				},
				onError: (ctx) => {
					console.log(ctx.error.status);
					if (ctx.error.status === 401) {
						toast.error("Error en las credenciales");
					}
					if (ctx.error.status === 403) {
						toast.error("La cuenta no esta verificada");
					}
					return;
				},
			},
		);
	};

	const handleGoogleSignIn = () => {
		authClient.signIn.social({
			provider: "google",
			callbackURL: "/dashboard/overview",
		});
	};

	return (
		<div className="flex flex-col gap-6">
			<Card>
				<CardHeader className="text-center">
					<CardTitle className="text-xl">Bienvenido</CardTitle>
					<CardDescription>
						Ingresa con tu cuenta de Google o con tu email
					</CardDescription>
				</CardHeader>
				<CardContent>
					<form onSubmit={form.handleSubmit(onSubmit)}>
						<FieldGroup>
							<Field>
								<Button
									variant="outline"
									type="button"
									onClick={handleGoogleSignIn}
								>
									<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
										<title>Google Logo</title>
										<path
											d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
											fill="currentColor"
										/>
									</svg>
									Login with Google
								</Button>
							</Field>
							<FieldSeparator className="*:data-[slot=field-separator-content]:bg-card">
								Continua con
							</FieldSeparator>

							<Controller
								name="email"
								control={form.control}
								render={({ field, fieldState }) => (
									<Field data-invalid={fieldState.invalid}>
										<FieldLabel htmlFor="form-rhf-demo-title">Email</FieldLabel>
										<Input
											{...field}
											type="text"
											aria-invalid={fieldState.invalid}
											placeholder="Email"
										/>
										{fieldState.invalid && (
											<FieldError errors={[fieldState.error]} />
										)}
									</Field>
								)}
							/>
							<Controller
								name="password"
								control={form.control}
								render={({ field, fieldState }) => (
									<Field data-invalid={fieldState.invalid}>
										<FieldLabel htmlFor="form-rhf-demo-title">
											Password
										</FieldLabel>
										<Input
											{...field}
											type="password"
											aria-invalid={fieldState.invalid}
											placeholder="Password"
										/>
										{fieldState.invalid && (
											<FieldError errors={[fieldState.error]} />
										)}
									</Field>
								)}
							/>

							<Button type="submit" className="w-full mt-4">
								Ingresar
							</Button>
							<div className="grid gap-2">
								<div className="flex items-center">
									<Link
										to="/forgot"
										className="ml-auto text-sm underline-offset-4 hover:underline"
									>
										¿Olvidaste tu contraseña?
									</Link>
								</div>
							</div>
						</FieldGroup>
					</form>
				</CardContent>
			</Card>
			<FieldDescription className="px-6 text-center">
				No tienes cuenta{" "}
				<Link to="/signup" className="underline underline-offset-4">
					Registrate
				</Link>
			</FieldDescription>
		</div>
	);
}
