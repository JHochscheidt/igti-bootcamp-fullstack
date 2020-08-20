const formatterCurrency = Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
});

const formatterNumber = Intl.NumberFormat('pt-BR', {
  maximumFractionDigits: 2,
});

function formatNumber(value) {
  return formatterNumber.format(value);
}

function formatCurrency(value) {
  return formatterCurrency.format(value);
}

export { formatNumber, formatCurrency };
