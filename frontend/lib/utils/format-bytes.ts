export const formatBytes = (bytes: number) => {
  const units = ['byte', 'kilobyte', 'megabyte', 'gigabyte', 'terabyte'];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  const value = bytes / Math.pow(1024, i);

  const formatter = new Intl.NumberFormat('pt-BR', {
    style: 'unit',
    unit: units[i],
    unitDisplay: 'short',
    maximumFractionDigits: 2,
  });

  return formatter.format(value);
};
