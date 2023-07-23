import { AggregatedSalesInterface } from "@/interfaces/aggregated-sales.interface";
import { SalesInterface } from "@/interfaces/sales.interface";

export function aggregateByMonth(data: SalesInterface[]): AggregatedSalesInterface[] {
  const aggregatedData: AggregatedSalesInterface[] = [];
  
  data.forEach(item => {
    const date = new Date(item.date);
    const month = date.getMonth();
    const year = date.getFullYear();
    
    // Check if we already have an object for this month/year
    const existingData = aggregatedData.find(d => d.month === month && d.year === year);
    
    if (existingData) {
      // If we already have an object for this month/year, update the values
      existingData.units += parseFloat(item.units);
      existingData.revenue += parseFloat(item.revenue);
      existingData.cogs += parseFloat(item.cogs);
      existingData.ads_cost += parseFloat(item.ads_cost);
    } else {
      // If we don't have an object for this month/year, create a new one
      aggregatedData.push({
        month: month,
        year: year,
        units: parseFloat(item.units),
        revenue: parseFloat(item.revenue),
        cogs: parseFloat(item.cogs),
        ads_cost: parseFloat(item.ads_cost)
      });
    }
  });
  
  return aggregatedData.map(record => ({
    ...record,
    expenses: record.cogs + record.ads_cost,
    net_profit: record.revenue - record.cogs - record.ads_cost,
  }))
}
