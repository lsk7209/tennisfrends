export const n0 = (v: number) => new Intl.NumberFormat().format(v);
export const dYMD = (s: string) => new Date(s).toISOString().slice(0, 10);
