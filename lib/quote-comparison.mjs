export function quoteTotal(price, includesVat, vatRate, extras) {
  const values = [price, vatRate, extras].map(value => value === "" ? NaN : Number(value));
  if (!Number.isFinite(values[0]) || values[0] <= 0 || !Number.isFinite(values[1]) || values[1] < 0 || values[1] > 100) return null;
  const added = extras === "" ? 0 : values[2];
  if (!Number.isFinite(added) || added < 0) return null;
  return Math.round((values[0] * (includesVat ? 1 : 1 + values[1] / 100) + added) * 100) / 100;
}
