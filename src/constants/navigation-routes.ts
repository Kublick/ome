/**
 * Navigation routes configuration for TanStack Router
 * Following best practices with type-safe route definitions using linkOptions
 */

import {
	BankIcon,
	ChartBarIcon,
	LayoutIcon,
	ListChecksIcon,
	UserGearIcon,
	UserListIcon,
} from "@phosphor-icons/react";
import type { LinkOptions } from "@tanstack/react-router";
import { linkOptions } from "@tanstack/react-router";
import { RepeatIcon } from "lucide-react";
import type { ComponentType, SVGProps } from "react";

export interface NavigationItem {
	title: string;
	linkOptions: LinkOptions;
	// Icon is an optional React component (SVG) from phosphor or similar
	icon?: ComponentType<SVGProps<SVGSVGElement>>;
}

export interface NavigationGroup {
	title: string;
	items: NavigationItem[];
}

/**
 * Main navigation configuration for the dashboard
 * Uses TanStack Router's linkOptions for type-safe route definitions
 */
export const navigationRoutes: NavigationGroup[] = [
	{
		title: "Dashboard",
		items: [
			{
				title: "Overview",
				linkOptions: linkOptions({
					to: "/dashboard/overview",
				}),
				icon: LayoutIcon,
			},
			{
				title: "Análisis",
				linkOptions: linkOptions({
					to: "/dashboard/analisis",
				}),
				icon: ChartBarIcon,
			},
		],
	},
	{
		title: "Finanzas",
		items: [
			{
				title: "Presupuestos",
				linkOptions: linkOptions({
					to: "/dashboard/finanzas/presupuestos",
				}),
				icon: BankIcon,
			},
			{
				title: "Recurrentes",
				linkOptions: linkOptions({
					to: "/dashboard/finanzas/recurrentes",
				}),
				icon: RepeatIcon,
			},
		],
	},
	{
		title: "Configuración",
		items: [
			{
				title: "Categorías",
				linkOptions: linkOptions({
					to: "/dashboard/config/categorias",
				}),
				icon: ListChecksIcon,
			},
			{
				title: "Cuentas",
				linkOptions: linkOptions({
					to: "/dashboard/config/cuentas",
				}),
				icon: UserListIcon,
			},
		],
	},
	{
		title: "Cuenta",
		items: [
			{
				title: "Perfil",
				linkOptions: linkOptions({
					to: "/profile",
				}),
				icon: UserGearIcon,
			},
		],
	},
];

/**
 * Flat list of all navigation routes for easy access
 */
export const allRoutes = navigationRoutes.flatMap((group) => group.items);
