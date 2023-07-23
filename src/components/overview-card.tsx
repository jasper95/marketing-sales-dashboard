import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ReactNode } from 'react'
import { Skeleton } from '@/components/ui/skeleton'

interface OverviewCardProps {
  title: string
  icon: ReactNode
  value: string
  isLoading?: boolean
}

export function OverviewCard({ title, icon, value, isLoading }: OverviewCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        {isLoading ? <Skeleton className='h-4 w-1/3'/> : (
          <CardTitle className="text-sm font-medium">
            {title}
          </CardTitle>
        )}
        {isLoading ? <Skeleton className='h-6 w-6 rounded-full'/> : icon}
      </CardHeader>
      <CardContent className='space-y-1'>
        {isLoading ? <Skeleton className='h-4 w-1/2'/> : <div className="text-2xl font-bold">{value}</div>}
      </CardContent>
    </Card>
  )
}