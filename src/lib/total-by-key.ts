import { AggregatedSalesInterface } from "@/interfaces/aggregated-sales.interface";

export function totalByKey(data: AggregatedSalesInterface[], key: keyof AggregatedSalesInterface) {
  return data.reduce((acc, el) => acc + Number(el[key])!, 0)
}