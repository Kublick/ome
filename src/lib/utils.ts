import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function getAvatarInitials(nameOrEmail: string): string {
	if (!nameOrEmail) return "";
	const parts = nameOrEmail.trim().split(" ");
	if (parts.length === 1) {
		return parts[0].substring(0, 2).toUpperCase();
	}

	return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}
