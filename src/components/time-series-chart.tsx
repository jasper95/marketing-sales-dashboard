import { AggregatedSalesInterface } from '@/interfaces/aggregated-sales.interface';
import { formatCurrency } from '@/lib/format-currency';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,  } from 'recharts';
import { NameType, ValueType } from 'recharts/types/component/DefaultTooltipContent';
import { ContentType } from 'recharts/types/component/Tooltip';

// Custom tick formatter
const formatXAxis = (month: number) => {
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  // Return the name of the current month
  return monthNames[month];
};


const CustomTooltip: ContentType<ValueType, NameType> = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip bg-white p-3 rounded shadow text-base">
        <p className="label">{`Month : ${formatXAxis(label)}`}</p>
        {payload.map((entry, index) => (
          <p key={`item-${index}`} style={{ color: entry.color }}>
            {`${entry.name} : ${formatCurrency(Number(entry.value))}`}
          </p>
        ))}
      </div>
    );
  }
  return null;
};
const CustomLegend: ContentType<ValueType, NameType> = (props) => {
  const { payload } = props;

  if(payload?.length) {
    return (
      <ul className="flex items-center space-x-4 justify-center">
        {payload.map((entry, index) => (
          <li key={`item-${index}`} className="flex items-center space-x-2">
            <svg width="10" height="10">
              <circle cx="5" cy="5" r="5" fill={entry.color} />
            </svg>
            <span>{entry.value}</span>
          </li>
        ))}
      </ul>
    );
  }
  return null
};

interface TimeSeriesChartProps {
  data: AggregatedSalesInterface[]
}
export const TimeSeriesChart = ({ data }: TimeSeriesChartProps) => {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <LineChart
        data={data}
        margin={{
          top: 5, right: 30, left: 20, bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" vertical={false}/>
        <XAxis padding={{ left: 30, right: 30 }} dataKey="month" tickFormatter={formatXAxis} />
        <YAxis  tickFormatter={formatCurrency} />
        <Tooltip content={CustomTooltip}/>
        <Legend content={<CustomLegend/>} />
        <Line strokeWidth={3} dot={false} type="monotone" dataKey="revenue" stroke="#6AADE4" name="Revenue" />
        <Line strokeWidth={3} dot={false} type="monotone" dataKey="expenses" stroke="#FFBD3C" name="Expenses" />
        <Line strokeWidth={3} dot={false} type="monotone" dataKey="net_profit" stroke="#FF7E36" name="Net Profit" />
      </LineChart>
    </ResponsiveContainer>
  );
};

