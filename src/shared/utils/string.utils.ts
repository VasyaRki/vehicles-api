export function maskVin(vin: string): string {
  if (!vin || vin.length <= 8) return vin;

  const start = vin.slice(0, 4);
  const end = vin.slice(-4);
  const masked = '*'.repeat(vin.length - 8);

  return `${start}${masked}${end}`;
}
