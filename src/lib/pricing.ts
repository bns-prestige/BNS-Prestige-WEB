// Le prix est calculé par la base (fonction SQL quote_booking). Aucune règle de prix n'est dupliquée ici.
export const eur = (n: number) => `${new Intl.NumberFormat('fr-BE', { maximumFractionDigits: 0 }).format(n)} €`;
export const hoursLabel = (h: number) => `${Number.isInteger(h) ? h : h.toFixed(1).replace('.', ',')} h`;
