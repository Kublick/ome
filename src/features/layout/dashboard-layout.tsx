import { Link, Outlet, useRouteContext } from "@tanstack/react-router";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarHeader,
	SidebarInset,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarProvider,
	SidebarRail,
	SidebarTrigger,
} from "@/components/ui/sidebar";
import { navigationRoutes } from "@/constants/navigation-routes";
import { NavUser } from "./nav-user";

export function DashboardLayout() {
	const { user } = useRouteContext({ from: "/dashboard" });

	return (
		<SidebarProvider>
			<Sidebar>
				<SidebarHeader>
					<SidebarMenu>
						<SidebarMenuItem>Ometomi</SidebarMenuItem>
					</SidebarMenu>
				</SidebarHeader>
				<SidebarContent>
					{navigationRoutes.map((group) => (
						<SidebarGroup key={group.title}>
							<SidebarGroupLabel>{group.title}</SidebarGroupLabel>
							<SidebarGroupContent>
								<SidebarMenu>
									{group.items.map((item) => {
										const Icon = item.icon
										return (
											<SidebarMenuItem key={item.title}>
												<SidebarMenuButton
													render={<Link {...item.linkOptions} />}
												>
													{Icon && <Icon className="size-4 shrink-0" />}
													<span>{item.title}</span>
												</SidebarMenuButton>
											</SidebarMenuItem>
										)
									})}
								</SidebarMenu>
							</SidebarGroupContent>
						</SidebarGroup>
					))}
				</SidebarContent>
				<SidebarFooter>
					<NavUser user={user} />
				</SidebarFooter>
				<SidebarRail />
			</Sidebar>
			<SidebarInset>
				<header className="flex h-16 shrink-0 items-center gap-2 px-4">
					<SidebarTrigger className="-ml-1" />
				</header>
				<div className="p-4">
					<Outlet />
				</div>
			</SidebarInset>
		</SidebarProvider>
	);
}
