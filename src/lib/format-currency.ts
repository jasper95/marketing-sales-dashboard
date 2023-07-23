
const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 0,  // No decimal part
  maximumFractionDigits: 0,  // No decimal part
});

export function formatCurrency(number: number) {
  return formatter.format(number)
}