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

// State mapping derived from Sucursal / CEDIS names
function extractState(sucursal, cedis) {
  const s = (sucursal || '').toUpperCase();
  const c = (cedis || '').toUpperCase();
  const text = s + ' ' + c;

  if (text.includes('AGUASCALIENTES') || text.includes('ALTARIA')) return 'Aguascalientes';
  if (text.includes('BC') || text.includes('TIJUANA') || text.includes('MEXICALI') || text.includes('ENSENADA')) return 'Baja California';
  if (text.includes('BCS') || text.includes('CABOS') || text.includes('LA PAZ')) return 'Baja California Sur';
  if (text.includes('CAMPECHE') || text.includes('CARMEN')) return 'Campeche';
  if (text.includes('CHIAPAS') || text.includes('TUXTLA') || text.includes('TAPACHULA') || text.includes('S CRISTOBAL')) return 'Chiapas';
  if (text.includes('CHIHUAHUA') || text.includes('JUAREZ') || text.includes('DELICIAS')) return 'Chihuahua';
  if (text.includes('CDMX') || text.includes('DF') || text.includes('POLANCO') || text.includes('CENTRO CDMX')) return 'Ciudad de México';
  if (text.includes('COAHUILA') || text.includes('SALTILLO') || text.includes('TORREON') || text.includes('MONCLOVA')) return 'Coahuila';
  if (text.includes('COLIMA') || text.includes('MANZANILLO')) return 'Colima';
  if (text.includes('DURANGO')) return 'Durango';
  if (text.includes('EDOMEX') || text.includes('TOLUCA') || text.includes('TLALNEPANTLA') || text.includes('TEOTIHUACAN') || text.includes('TEXCOCO') || text.includes('CHIMALHUACAN') || text.includes('ECATEPEC') || text.includes('AMECAMECA') || text.includes('APAXCO')) return 'Estado de México';
  if (text.includes('GUANAJUATO') || text.includes('LEON') || text.includes('CELAYA') || text.includes('IRAPUATO')) return 'Guanajuato';
  if (text.includes('GUERRERO') || text.includes('ACAPULCO') || text.includes('IGUALA') || text.includes('CHILPANCINGO')) return 'Guerrero';
  if (text.includes('HIDALGO') || text.includes('PACHUCA') || text.includes('ACTOPAN') || text.includes('APAN') || text.includes('TULA')) return 'Hidalgo';
  if (text.includes('JALISCO') || text.includes('GDL') || text.includes('GUADALAJARA') || text.includes('JALOSTOTITLAN') || text.includes('PUERTO VALLARTA') || text.includes('ZAPOPAN')) return 'Jalisco';
  if (text.includes('MICHOACAN') || text.includes('MORELIA') || text.includes('APATZINGAN') || text.includes('URUAPAN')) return 'Michoacán';
  if (text.includes('MORELOS') || text.includes('JIUTEPEC') || text.includes('CUERNAVACA') || text.includes('CUAUTLA')) return 'Morelos';
  if (text.includes('NAYARIT') || text.includes('TEPIC')) return 'Nayarit';
  if (text.includes('NUEVO LEON') || text.includes('MONTERREY') || text.includes('APODACA') || text.includes('CADEREYTA') || text.includes('GUADALUPE NL') || text.includes('SAN NICOLAS')) return 'Nuevo León';
  if (text.includes('OAXACA') || text.includes('TUXTEPEC') || text.includes('SALINA CRUZ')) return 'Oaxaca';
  if (text.includes('PUEBLA') || text.includes('TEXMELUCAN') || text.includes('ATLIXCO') || text.includes('CORDOBA') || text.includes('ACAJETE') || text.includes('ACATZINGO') || text.includes('AMOZOC') || text.includes('TEHUACAN')) return 'Puebla';
  if (text.includes('QUERETARO') || text.includes('SAN JUAN DEL RIO')) return 'Querétaro';
  if (text.includes('QUINTANA ROO') || text.includes('CUN') || text.includes('CHT') || text.includes('PLAYA DEL C') || text.includes('CHETUMAL') || text.includes('BACALAR') || text.includes('COZUMEL')) return 'Quintana Roo';
  if (text.includes('SAN LUIS') || text.includes('SLP') || text.includes('VALLES')) return 'San Luis Potosí';
  if (text.includes('SINALOA') || text.includes('CULIACAN') || text.includes('MAZATLAN') || text.includes('MOCHIS')) return 'Sinaloa';
  if (text.includes('SONORA') || text.includes('HERMOSILLO') || text.includes('OBREGON') || text.includes('NOGALES')) return 'Sonora';
  if (text.includes('TABASCO') || text.includes('TAB') || text.includes('VILLAHERMOSA') || text.includes('CARDENAS')) return 'Tabasco';
  if (text.includes('TAMAULIPAS') || text.includes('TAMPICO') || text.includes('MANTE') || text.includes('CIUDAD VICTORIA') || text.includes('REYNOSA') || text.includes('MATAMOROS')) return 'Tamaulipas';
  if (text.includes('TLAXCALA') || text.includes('APIZACO')) return 'Tlaxcala';
  if (text.includes('VERACRUZ') || text.includes('VER') || text.includes('HUATUSCO') || text.includes('ACAYUCAN') || text.includes('AGUA DULCE') || text.includes('ALAMO') || text.includes('ALVARADO') || text.includes('ORIZABA') || text.includes('XALAPA') || text.includes('POZA RICA') || text.includes('COATZACOALCOS')) return 'Veracruz';
  if (text.includes('YUCATAN') || text.includes('MID') || text.includes('MERIDA') || text.includes('KANASIN') || text.includes('TIZIMIN') || text.includes('PROGRESO')) return 'Yucatán';
  if (text.includes('ZACATECAS') || text.includes('FRESNILLO')) return 'Zacatecas';

  return 'Otros / Por Definir';
}

const salesPath = path.join(__dirname, '..', 'Reporte de proveedores_2026', 'Unidades vendidas por Mes.csv');
const invPath = path.join(__dirname, '..', 'Reporte de proveedores_2026', 'Inventario Disponible - Bloqueado.csv');

const rawSales = parseCSV(salesPath);
const rawInv = parseCSV(invPath);

// Process sales records (Filter for 2026 only)
const sales = rawSales
  .map(r => ({
    proveedor: r['Proveedor'] || 'SIN PROVEEDOR',
    materialText: r['Texto breve material'] || 'DESCONOCIDO',
    materialCode: r['Material'] || '',
    categoria: r['CATEGORIA'] || 'SIN CATEGORÍA',
    cedis: r['CEDIS MOTOS'] || 'SIN CEDIS',
    centro: r['Centro'] || '',
    sucursal: r['SUCURSAL'] || 'SIN SUCURSAL',
    tipoSucursal: r['TIPO DE SUCURSAL'] || 'GENERAL',
    anio: r['Año'] || '2026',
    mes: (r['Mes'] || '').toLowerCase(),
    dia: r['Día'] || '',
    cantidad: parseFloat(r['Suma de Cantidad']) || 0,
    estado: extractState(r['SUCURSAL'], r['CEDIS MOTOS'])
  }))
  .filter(r => r.anio === '2026');

// Process inventory records
const inventory = rawInv.map(r => {
  const libreU = parseFloat(r['Suma de Libre utilización']) || 0;
  const libreV = parseFloat((r['Suma de Valor libre util.'] || '').replace(/[\$,]/g, '')) || 0;
  
  const inspU = parseFloat(r['Suma de Inspecc.de calidad']) || 0;
  const inspV = parseFloat((r['Suma de Valor en insp.cal.'] || '').replace(/[\$,]/g, '')) || 0;
  
  const bloqU = parseFloat(r['Suma de Bloqueado']) || 0;
  const bloqV = parseFloat((r['Suma de Valor stock bloq.'] || '').replace(/[\$,]/g, '')) || 0;

  return {
    proveedor: r['Proveedor'] || 'SIN PROVEEDOR',
    materialText: r['Texto breve material'] || 'DESCONOCIDO',
    categoria: r['CATEGORIA'] || 'SIN CATEGORÍA',
    cedis: r['CEDIS MOTOS'] || 'SIN CEDIS',
    sucursal: r['SUCURSAL'] || 'SIN SUCURSAL',
    centro: r['Centro'] || '',
    almacen: r['Almacén'] || '',
    imeiSerie: r['IMEI/SERIE'] || '',
    libreQty: libreU,
    libreVal: libreV,
    bloqQty: bloqU,
    bloqVal: bloqV,
    inspQty: inspU,
    inspVal: inspV
  };
});

// Calculate Monthly Sales Order
const monthOrder = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto'];

// Ensure target dir exists
const jsDir = path.join(__dirname, '..', 'js');
if (!fs.existsSync(jsDir)) fs.mkdirSync(jsDir, { recursive: true });

const bundleData = {
  months: monthOrder,
  sales: sales,
  inventory: inventory,
  users: [
    { username: 'admin', pass: 'admin2026', role: 'admin', name: 'Administrador General', supplier: 'ALL' },
    { username: 'bajaj', pass: 'bajaj2026', role: 'supplier', name: 'BAJAJ Motos', supplier: 'BAJAJ' },
    { username: 'bodesa', pass: 'bodesa2026', role: 'supplier', name: 'BODESA', supplier: 'BODESA' },
    { username: 'dinamo', pass: 'dinamo2026', role: 'supplier', name: 'DINAMO', supplier: 'DINAMO' },
    { username: 'motoroad', pass: 'motoroad2026', role: 'supplier', name: 'MOTO ROAD', supplier: 'MOTO ROAD' },
    { username: 'veloci', pass: 'veloci2026', role: 'supplier', name: 'VELOCI MOTORS', supplier: 'VELOCI MOTORS' }
  ]
};

fs.writeFileSync(path.join(jsDir, 'data.json'), JSON.stringify(bundleData, null, 2));
fs.writeFileSync(path.join(jsDir, 'dataBundle.js'), 'window.MACROPAY_DATA = ' + JSON.stringify(bundleData) + ';');

console.log('Successfully generated js/data.json and js/dataBundle.js');
console.log('Total Sales Records:', sales.length);
console.log('Total Inventory Records:', inventory.length);
