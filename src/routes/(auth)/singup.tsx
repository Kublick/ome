import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(auth)/singup')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/(auth)/singup"!</div>
}
