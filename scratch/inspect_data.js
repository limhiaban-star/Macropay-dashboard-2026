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
console.log('Sales record count:', sales.length);
console.log('Sample Sales:', sales[0]);
console.log('Unique Proveedores Sales:', [...new Set(sales.map(r => r['Proveedor']))]);
console.log('Unique Años Sales:', [...new Set(sales.map(r => r['Año']))]);
console.log('Unique Meses Sales:', [...new Set(sales.map(r => r['Mes']))]);
console.log('Unique Categorias Sales:', [...new Set(sales.map(r => r['CATEGORIA']))]);
console.log('Unique Tipo Sucursal:', [...new Set(sales.map(r => r['TIPO DE SUCURSAL']))]);

// Let's check how state (Estado) can be extracted from SUCURSAL, CEDIS MOTOS, or if there is a pattern in SUCURSAL names (e.g. MACROPAY CORDOBA, MACROPAY ATLIXCO, etc.)
const sampleSucursales = [...new Set(sales.map(r => r['SUCURSAL']))].slice(0, 20);
console.log('Sample Sucursales:', sampleSucursales);

const inv = parseCSV(invPath);
console.log('\nInventory record count:', inv.length);
console.log('Sample Inventory:', inv[0]);
console.log('Unique Proveedores Inv:', [...new Set(inv.map(r => r['Proveedor']))]);
console.log('Unique Categorias Inv:', [...new Set(inv.map(r => r['CATEGORIA']))]);
console.log('Unique CEDIS Motos Inv:', [...new Set(inv.map(r => r['CEDIS MOTOS']))]);
