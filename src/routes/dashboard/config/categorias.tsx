import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/config/categorias')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/config/categorias"!</div>
}
