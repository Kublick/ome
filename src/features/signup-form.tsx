import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "@tanstack/react-router";
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
	FieldError,
	FieldGroup,
	FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";

const formSchema = z
	.object({
		email: z.email(),
		password: z.string().min(8, "Minimo 8 caracteres").max(24),
		confirmPassword: z.string().min(8, "Minimo 8 caracteres").max(24),
		name: z
			.string()
			.min(3, "Minimo 3 caracteres")
			.max(100, "Maximo 100 caracteres"),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Las contraseñas no coinciden",
		path: ["confirmPassword"],
	});

type formType = z.infer<typeof formSchema>;

export function SignupForm() {
	const form = useForm<formType>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: "",
			password: "",
			name: "",
			confirmPassword: "",
		},
	});

	const onSubmit = async (formData: formType) => {
		await authClient.signUp.email(
			{
				email: formData.email,
				password: formData.password,
				name: formData.name,
			},
			{
				onSuccess: async () => {
					toast.success("Cuenta creada exitosamente");
				},
				onError: (ctx) => {
					if (ctx.error.status === 422) {
						toast.error("La cuenta ya existe");
						return;
					}
				},
			},
		);
	};

	return (
		<div className="flex flex-col gap-6">
			<Card>
				<CardHeader className="text-center">
					<CardTitle className="text-xl">Bienvenido</CardTitle>
					<CardDescription>Crea tu cuenta</CardDescription>
				</CardHeader>
				<CardContent>
					<form onSubmit={form.handleSubmit(onSubmit)}>
						<FieldGroup>
							<Controller
								name="name"
								control={form.control}
								render={({ field, fieldState }) => (
									<Field data-invalid={fieldState.invalid}>
										<FieldLabel htmlFor="form-rhf-demo-title">
											Nombre
										</FieldLabel>
										<Input
											{...field}
											type="text"
											aria-invalid={fieldState.invalid}
											placeholder="Name"
										/>
										{fieldState.invalid && (
											<FieldError errors={[fieldState.error]} />
										)}
									</Field>
								)}
							/>
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
											Contraseña
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
							<Controller
								name="confirmPassword"
								control={form.control}
								render={({ field, fieldState }) => (
									<Field data-invalid={fieldState.invalid}>
										<FieldLabel htmlFor="form-rhf-demo-title">
											Confirmar Contraseña
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
										to="/signin"
										className="ml-auto text-sm underline-offset-4 hover:underline"
									>
										¿Tienes una cuenta?
									</Link>
								</div>
							</div>
						</FieldGroup>
					</form>
				</CardContent>
			</Card>
		</div>
	);
}
