import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/analisis')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/dashboard/analisis"!</div>
}
