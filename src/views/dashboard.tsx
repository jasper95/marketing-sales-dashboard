import { DateRangePicker } from '@/components/date-range-picker'
import { OverviewCard } from '@/components/overview-card'
import { TimeSeriesChart } from '@/components/time-series-chart'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent } from '@/components/ui/tabs'
import { SalesInterface } from '@/interfaces/sales.interface'
import { aggregateByMonth } from '@/lib/aggregate-by-month'
import { formatCurrency } from '@/lib/format-currency'
import { totalByKey } from '@/lib/total-by-key'
import {
  useQuery,
} from '@tanstack/react-query'
import { isWithinInterval } from 'date-fns/esm'
import sub from 'date-fns/sub'
import { useMemo, useState } from 'react'
import { DateRange } from 'react-day-picker'

const today = new Date()
export default function Dashboard() {
  const [date, setDate] = useState<DateRange | undefined>({
    from: sub(today, { months: 6}),
    to: today,
  })
  const { isLoading, data } = useQuery<{ payload: { results: SalesInterface[]}}>({
    queryKey: ['report'],
    queryFn: () =>
      fetch('/api/reports/test-data').then(
        (res) => res.json(),
      ),
  })
  const aggregatedData = useMemo(() => (data?.payload.results && date?.from && date?.to) ? aggregateByMonth(data?.payload.results.filter(e => isWithinInterval(new Date(e.date), { start: date.from!, end: date.to!})) || []) : [], [data, date])
  const overViewData = useMemo(() => {
    const totalRevenue = totalByKey(aggregatedData, 'revenue')
    const totalProfit = totalByKey(aggregatedData, 'net_profit')
    const totalCost = totalByKey(aggregatedData, 'expenses')
    const totalUnits = totalByKey(aggregatedData, 'units')
    return [
      {
        title: 'Total Profit',
        value: formatCurrency(totalProfit),
        icon: (
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
          </svg>
        )
      },
      {
        title: 'Total Revenue',
        value: `${formatCurrency(totalRevenue)}`,
        icon: (
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        )
      },
      {
        title: 'Total Expenses',
        value: `${formatCurrency(totalCost)}`,
        icon: (
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
          </svg>
        )
      },
      {
        title: 'Total Units Sold',
        value: `${totalUnits}`,
        icon: (
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
          </svg>
        )
      },
    ]
  }, [data, date])

  return (
    <div className='p-8 space-y-4 min-w-screen min-h-screen'>
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <div className="flex items-center space-x-2">
          <DateRangePicker date={date} onChange={setDate} />
        </div>
      </div>
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {overViewData.map(e => (
              <OverviewCard key={e.title} {...e} isLoading={isLoading} />
            ))}
          </div>
          <Card className="col-span-4">
            <CardHeader>
              <CardTitle>Overview</CardTitle>
            </CardHeader>
            <CardContent className="pl-2">
              <TimeSeriesChart data={aggregatedData}/>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}