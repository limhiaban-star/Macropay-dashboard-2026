const fs = require('fs');
const path = require('path');

function parseCSVLine(line) {
  const result = [];
  let cur = '';
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const c = line[i];
    if (c === '"') {
      inQuotes = !inQuotes;
    } else if (c === ',' && !inQuotes) {
      result.push(cur);
      cur = '';
    } else {
      cur += c;
    }
  }
  result.push(cur);
  return result;
}

function parseCSV(filePath) {
  const text = fs.readFileSync(filePath, 'utf-8').replace(/^\uFEFF/, '');
  const lines = text.split(/\r?\n/);
  if (lines.length === 0) return [];
  const headers = parseCSVLine(lines[0]);
  const records = [];
  for (let i = 1; i < lines.length; i++) {
    if (!lines[i].trim()) continue;
    const row = parseCSVLine(lines[i]);
    if (row.length === headers.length) {
      const obj = {};
      headers.forEach((h, idx) => obj[h.trim()] = row[idx].trim());
      records.push(obj);
    }
  }
  return records;
}

const salesPath = path.join(__dirname, '..', 'Reporte de proveedores_2026', 'Unidades vendidas por Mes.csv');
const invPath = path.join(__dirname, '..', 'Reporte de proveedores_2026', 'Inventario Disponible - Bloqueado.csv');

const sales = parseCSV(salesPath);
const inv = parseCSV(invPath);

console.log('=== SALES STATS ===');
const totalSalesUnits = sales.reduce((acc, r) => acc + (parseFloat(r['Suma de Cantidad']) || 0), 0);
console.log('Total Units Sold:', totalSalesUnits);

const salesByProv = {};
sales.forEach(r => {
  const p = r['Proveedor'] || 'SIN PROVEEDOR';
  const qty = parseFloat(r['Suma de Cantidad']) || 0;
  salesByProv[p] = (salesByProv[p] || 0) + qty;
});
console.log('Sales by Proveedor:', salesByProv);

const salesByMonth = {};
sales.forEach(r => {
  const m = r['Mes'] || 'DESCONOCIDO';
  const qty = parseFloat(r['Suma de Cantidad']) || 0;
  salesByMonth[m] = (salesByMonth[m] || 0) + qty;
});
console.log('Sales by Month:', salesByMonth);

console.log('\n=== INVENTORY STATS ===');
let totalLibreUnits = 0;
let totalLibreVal = 0;
let totalInspUnits = 0;
let totalInspVal = 0;
let totalBloqUnits = 0;
let totalBloqVal = 0;

inv.forEach(r => {
  const libreU = parseFloat(r['Suma de Libre utilización']) || 0;
  const libreV = parseFloat((r['Suma de Valor libre util.'] || '').replace(/[\$,]/g, '')) || 0;
  
  const inspU = parseFloat(r['Suma de Inspecc.de calidad']) || 0;
  const inspV = parseFloat((r['Suma de Valor en insp.cal.'] || '').replace(/[\$,]/g, '')) || 0;
  
  const bloqU = parseFloat(r['Suma de Bloqueado']) || 0;
  const bloqV = parseFloat((r['Suma de Valor stock bloq.'] || '').replace(/[\$,]/g, '')) || 0;

  totalLibreUnits += libreU;
  totalLibreVal += libreV;
  totalInspUnits += inspU;
  totalInspVal += inspV;
  totalBloqUnits += bloqU;
  totalBloqVal += bloqV;
});

console.log('Libre Utilización:', { totalLibreUnits, totalLibreVal });
console.log('Inspección Calidad:', { totalInspUnits, totalInspVal });
console.log('Bloqueado:', { totalBloqUnits, totalBloqVal });

const ratio1 = ((totalLibreUnits + totalInspUnits) / (totalBloqUnits || 1)) * 100;
const ratio2 = (totalBloqUnits / (totalLibreUnits + totalInspUnits + totalBloqUnits || 1)) * 100;
console.log('Calculated Ratios:');
console.log('  (Libre + Insp) / Bloqueado =', ratio1.toFixed(2) + '%');
console.log('  Bloqueado / Total =', ratio2.toFixed(2) + '%');
