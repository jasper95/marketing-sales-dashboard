import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import Dashboard from './views/dashboard'

const queryClient = new QueryClient()

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Dashboard />
    </QueryClientProvider>
  )
}