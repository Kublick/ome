/**
 * Navigation routes configuration for TanStack Router
 * Following best practices with type-safe route definitions
 */

export interface NavigationItem {
	title: string;
	to: string;
	icon?: string;
	isActive?: boolean;
}

export interface NavigationGroup {
	title: string;
	items: NavigationItem[];
}

/**
 * Main navigation configuration for the dashboard
 * Uses TanStack Router's type-safe route paths
 */
export const navigationRoutes: NavigationGroup[] = [
	{
		title: "Dashboard",
		items: [
			{
				title: "Overview",
				to: "/dashboard/overview",
			},
			{
				title: "Análisis",
				to: "/dashboard/analisis",
			},
		],
	},
	{
		title: "Finanzas",
		items: [
			{
				title: "Presupuestos",
				to: "/dashboard/finanzas/presupuestos",
			},
			{
				title: "Recurrentes",
				to: "/dashboard/finanzas/recurrentes",
			},
		],
	},
	{
		title: "Configuración",
		items: [
			{
				title: "Categorías",
				to: "/config/categorias",
			},
			{
				title: "Cuentas",
				to: "/config/cuentas",
			},
		],
	},
	{
		title: "Cuenta",
		items: [
			{
				title: "Perfil",
				to: "/profile",
			},
		],
	},
];

/**
 * Flat list of all navigation routes for easy access
 */
export const allRoutes = navigationRoutes.flatMap((group) => group.items);

/**
 * Helper function to find a route by path
 */
export const findRouteByPath = (path: string): NavigationItem | undefined => {
	return allRoutes.find((route) => route.to === path);
};

/**
 * Helper function to check if a route is active
 */
export const isRouteActive = (
	currentPath: string,
	routePath: string,
): boolean => {
	return currentPath === routePath || currentPath.startsWith(`${routePath}/`);
};
