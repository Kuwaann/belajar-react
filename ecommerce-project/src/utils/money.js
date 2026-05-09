export function formatMoney(priceCents) {
    let result = priceCents >= 0 ? (priceCents / 100).toFixed(2) : ((priceCents * -1) / 100).toFixed(2);
    return priceCents >= 0 ? `$${result}` : `-$${result}`;
}