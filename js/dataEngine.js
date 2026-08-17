/**
 * Macropay Dashboard 2026 - Data Engine
 * Core calculations for Sales and Inventory reports
 */

(function (window) {
  const MONTH_NAMES = {
    enero: 'Enero',
    febrero: 'Febrero',
    marzo: 'Marzo',
    abril: 'Abril',
    mayo: 'Mayo',
    junio: 'Junio',
    julio: 'Julio',
    agosto: 'Agosto'
  };

  const MONTH_ORDER = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto'];

  const DataEngine = {
    formatCurrency(amount) {
      return new Intl.NumberFormat('es-MX', {
        style: 'currency',
        currency: 'MXN',
        maximumFractionDigits: 2
      }).format(amount || 0);
    },

    formatNumber(num) {
      return new Intl.NumberFormat('es-MX').format(num || 0);
    },

    formatPercent(pct) {
      return (pct || 0).toFixed(1) + '%';
    },

    // Filter helper
    filterSales(data, filters) {
      if (!data) return [];
      return data.filter(r => {
        if (filters.supplier && filters.supplier !== 'ALL' && r.proveedor !== filters.supplier) return false;
        if (filters.category && filters.supplier !== 'ALL' && filters.category !== 'ALL' && r.categoria !== filters.category) return false;
        if (filters.month && filters.month !== 'ALL' && r.mes !== filters.month) return false;
        if (filters.cedis && filters.cedis !== 'ALL' && r.cedis !== filters.cedis) return false;
        if (filters.search) {
          const q = filters.search.toLowerCase();
          const match = r.materialText.toLowerCase().includes(q) ||
                        r.proveedor.toLowerCase().includes(q) ||
                        r.sucursal.toLowerCase().includes(q) ||
                        r.cedis.toLowerCase().includes(q) ||
                        r.estado.toLowerCase().includes(q);
          if (!match) return false;
        }
        return true;
      });
    },

    filterInventory(data, filters) {
      if (!data) return [];
      return data.filter(r => {
        if (filters.supplier && filters.supplier !== 'ALL' && r.proveedor !== filters.supplier) return false;
        if (filters.category && filters.category !== 'ALL' && r.categoria !== filters.category) return false;
        if (filters.cedis && filters.cedis !== 'ALL' && r.cedis !== filters.cedis) return false;
        if (filters.search) {
          const q = filters.search.toLowerCase();
          const match = r.materialText.toLowerCase().includes(q) ||
                        r.proveedor.toLowerCase().includes(q) ||
                        r.sucursal.toLowerCase().includes(q) ||
                        r.cedis.toLowerCase().includes(q);
          if (!match) return false;
        }
        return true;
      });
    },

    // --- SALES CALCULATIONS ---

    // 1. Monthly sales by supplier
    getMonthlySalesBySupplier(sales) {
      const result = {};
      MONTH_ORDER.forEach(m => {
        result[m] = { total: 0, bySupplier: {} };
      });

      sales.forEach(r => {
        const m = r.mes;
        const p = r.proveedor;
        const qty = r.cantidad;
        if (result[m]) {
          result[m].total += qty;
          result[m].bySupplier[p] = (result[m].bySupplier[p] || 0) + qty;
        }
      });
      return result;
    },

    // 2. Top 10 bikes by supplier
    getTop10MotosBySupplier(sales, supplier) {
      const filtered = supplier && supplier !== 'ALL' ? sales.filter(r => r.proveedor === supplier) : sales;
      const counts = {};
      let totalQty = 0;

      filtered.forEach(r => {
        const key = r.materialText;
        counts[key] = (counts[key] || 0) + r.cantidad;
        totalQty += r.cantidad;
      });

      const sorted = Object.entries(counts)
        .map(([model, qty]) => ({
          model,
          quantity: qty,
          pct: totalQty > 0 ? (qty / totalQty) * 100 : 0
        }))
        .sort((a, b) => b.quantity - a.quantity)
        .slice(0, 10);

      return sorted;
    },

    // 3. Top 10 states with most sales
    getTop10States(sales) {
      const counts = {};
      let totalQty = 0;

      sales.forEach(r => {
        const st = r.estado;
        counts[st] = (counts[st] || 0) + r.cantidad;
        totalQty += r.cantidad;
      });

      return Object.entries(counts)
        .map(([state, qty]) => ({
          state,
          quantity: qty,
          pct: totalQty > 0 ? (qty / totalQty) * 100 : 0
        }))
        .sort((a, b) => b.quantity - a.quantity)
        .slice(0, 10);
    },

    // 4. Top 10 models sold overall
    getTop10Models(sales) {
      const counts = {};
      let totalQty = 0;

      sales.forEach(r => {
        const model = r.materialText;
        counts[model] = (counts[model] || 0) + r.cantidad;
        totalQty += r.cantidad;
      });

      return Object.entries(counts)
        .map(([model, qty]) => ({
          model,
          quantity: qty,
          pct: totalQty > 0 ? (qty / totalQty) * 100 : 0
        }))
        .sort((a, b) => b.quantity - a.quantity)
        .slice(0, 10);
    },

    // 5 & 6. Units sold and participation % per supplier
    getSalesUnitsBySupplier(sales) {
      const counts = {};
      let totalQty = 0;

      sales.forEach(r => {
        const p = r.proveedor;
        counts[p] = (counts[p] || 0) + r.cantidad;
        totalQty += r.cantidad;
      });

      return Object.entries(counts)
        .map(([proveedor, quantity]) => ({
          proveedor,
          quantity,
          pct: totalQty > 0 ? (quantity / totalQty) * 100 : 0
        }))
        .sort((a, b) => b.quantity - a.quantity);
    },

    getSupplierShareGlobalAndMonthly(filteredSales, rawSales) {
      const rows = [];
      const globalTotals = {};
      let globalGrandTotal = 0;

      const monthlyTotals = {};
      MONTH_ORDER.forEach(m => monthlyTotals[m] = { total: 0, suppliers: {} });

      // Raw sales for denominator
      rawSales.forEach(r => {
        globalGrandTotal += r.cantidad;
        if (monthlyTotals[r.mes]) {
          monthlyTotals[r.mes].total += r.cantidad;
        }
      });

      // Filtered sales for numerator
      filteredSales.forEach(r => {
        const p = r.proveedor;
        globalTotals[p] = (globalTotals[p] || 0) + r.cantidad;
        if (monthlyTotals[r.mes]) {
          monthlyTotals[r.mes].suppliers[p] = (monthlyTotals[r.mes].suppliers[p] || 0) + r.cantidad;
        }
      });

      // Global Rows
      Object.entries(globalTotals).forEach(([p, qty]) => {
        rows.push({
          periodo: 'GLOBAL (Acumulado)',
          proveedor: p,
          quantity: qty,
          pct: globalGrandTotal > 0 ? (qty / globalGrandTotal) * 100 : 0,
          isGlobal: true
        });
      });

      // Monthly Rows
      MONTH_ORDER.forEach(m => {
        const monthData = monthlyTotals[m];
        if (monthData && Object.keys(monthData.suppliers).length > 0) {
          Object.entries(monthData.suppliers).forEach(([p, qty]) => {
            rows.push({
              periodo: MONTH_NAMES[m],
              proveedor: p,
              quantity: qty,
              pct: monthData.total > 0 ? (qty / monthData.total) * 100 : 0,
              isGlobal: false
            });
          });
        }
      });

      return rows;
    },

    getMonthlySupplierShareMatrix(rawSales) {
      const suppliers = new Set();
      const monthlyTotals = {};
      MONTH_ORDER.forEach(m => monthlyTotals[m] = { total: 0, suppliers: {} });

      rawSales.forEach(r => {
        suppliers.add(r.proveedor);
        if (monthlyTotals[r.mes]) {
          monthlyTotals[r.mes].total += r.cantidad;
          monthlyTotals[r.mes].suppliers[r.proveedor] = (monthlyTotals[r.mes].suppliers[r.proveedor] || 0) + r.cantidad;
        }
      });

      const supplierList = Array.from(suppliers).sort();
      const matrix = {};
      supplierList.forEach(s => {
        matrix[s] = MONTH_ORDER.map(m => {
          const mData = monthlyTotals[m];
          return mData.total > 0 ? (mData.suppliers[s] || 0) / mData.total * 100 : 0;
        });
      });

      return { suppliers: supplierList, matrix, months: MONTH_ORDER };
    },

    // 7. Sales by branch type
    getSalesByBranchType(sales) {
      const counts = {};
      let totalQty = 0;

      sales.forEach(r => {
        const type = r.tipoSucursal || 'SIN ESPECIFICAR';
        counts[type] = (counts[type] || 0) + r.cantidad;
        totalQty += r.cantidad;
      });

      return Object.entries(counts)
        .map(([branchType, quantity]) => ({
          branchType,
          quantity,
          pct: totalQty > 0 ? (quantity / totalQty) * 100 : 0
        }))
        .sort((a, b) => b.quantity - a.quantity);
    },

    // 8. Top 10 branches by sales
    getTop10Branches(sales) {
      const counts = {};
      let totalQty = 0;

      sales.forEach(r => {
        const branch = r.sucursal;
        counts[branch] = (counts[branch] || 0) + r.cantidad;
        totalQty += r.cantidad;
      });

      return Object.entries(counts)
        .map(([branch, quantity]) => ({
          branch,
          quantity,
          pct: totalQty > 0 ? (quantity / totalQty) * 100 : 0
        }))
        .sort((a, b) => b.quantity - a.quantity)
        .slice(0, 10);
    },

    // 9. Monthly sales by category
    getMonthlySalesByCategory(sales) {
      const matrix = {};
      const categories = new Set();

      sales.forEach(r => {
        const cat = r.categoria || 'OTRAS';
        const m = r.mes;
        categories.add(cat);
        if (!matrix[cat]) matrix[cat] = {};
        matrix[cat][m] = (matrix[cat][m] || 0) + r.cantidad;
      });

      const catList = Array.from(categories).sort();
      return { matrix, categories: catList, months: MONTH_ORDER };
    },

    // 10. Time-series monthly progression
    getMonthlyTimeline(sales) {
      const monthly = {};
      MONTH_ORDER.forEach(m => monthly[m] = 0);

      sales.forEach(r => {
        if (monthly[r.mes] !== undefined) {
          monthly[r.mes] += r.cantidad;
        }
      });

      return MONTH_ORDER.map(m => ({
        monthKey: m,
        monthName: MONTH_NAMES[m],
        units: monthly[m]
      }));
    },

    // 11. Crecimiento MoM & Proyección de ventas (Fórmula DAX / Excel)
    // Proyectado = IF([Unidades vendidas mes anterior] * (1 + [% Crecimiento proyectado]) < 0, 0, [Unidades vendidas mes anterior] * (1 + [% Crecimiento proyectado]))
    getMoMAndProjection(sales) {
      const timeline = this.getMonthlyTimeline(sales);
      const rows = [];
      let prevUnits = null;
      const growthRates = [];

      timeline.forEach((item, idx) => {
        let growthPct = 0;
        let diff = 0;
        let projectedUnits = item.units;

        if (prevUnits !== null && prevUnits > 0) {
          diff = item.units - prevUnits;
          growthPct = ((item.units - prevUnits) / prevUnits);
          // Store valid historical growth rates for future trend projection
          if (idx < timeline.length - 1) { // excluding partial/atypical last month if needed
            growthRates.push(growthPct);
          }
          
          // User Formula: IF(UnidadesAnterior * (1 + Crecimiento) < 0, 0, UnidadesAnterior * (1 + Crecimiento))
          const calcVal = prevUnits * (1 + growthPct);
          projectedUnits = calcVal < 0 ? 0 : Math.round(calcVal);
        }

        rows.push({
          monthName: item.monthName,
          units: item.units,
          prevUnits: prevUnits,
          diff: diff,
          growthPct: prevUnits === null ? null : (growthPct * 100),
          projectedUnits: projectedUnits
        });

        prevUnits = item.units;
      });

      // Compute average projected growth rate from representative recent months (e.g. Mayo, Junio, Julio)
      let avgGrowthRate = 0.035; // Default ~3.5% baseline
      if (growthRates.length >= 3) {
        const recentRates = growthRates.slice(-4);
        avgGrowthRate = recentRates.reduce((a, b) => a + b, 0) / recentRates.length;
      }

      // Project next 3 months (Septiembre, Octubre, Noviembre) using formula iteratively
      const projections = [];
      let lastPrevUnits = timeline.length > 0 ? timeline[timeline.length - 1].units : 0;
      
      const futureMonths = ['Septiembre (Proyectado)', 'Octubre (Proyectado)', 'Noviembre (Proyectado)'];

      futureMonths.forEach(mName => {
        // Formula: IF(lastPrevUnits * (1 + avgGrowthRate) < 0, 0, lastPrevUnits * (1 + avgGrowthRate))
        const calcProj = lastPrevUnits * (1 + avgGrowthRate);
        const finalUnits = calcProj < 0 ? 0 : Math.round(calcProj);

        projections.push({
          monthName: mName,
          units: finalUnits,
          prevUnits: lastPrevUnits,
          growthPct: avgGrowthRate * 100,
          isProjection: true
        });

        lastPrevUnits = finalUnits;
      });

      return { rows, projections, avgGrowthRatePct: avgGrowthRate * 100 };
    },


    // --- INVENTORY CALCULATIONS ---

    // 1. Total unidades por CEDIS Libre Utilización
    getLibreByCedis(inventory) {
      const cedisMap = {};
      let totalQty = 0;

      inventory.forEach(r => {
        const c = r.cedis || 'SIN CEDIS';
        if (!cedisMap[c]) cedisMap[c] = { qty: 0, val: 0 };
        cedisMap[c].qty += r.libreQty;
        cedisMap[c].val += r.libreVal;
        totalQty += r.libreQty;
      });

      return Object.entries(cedisMap)
        .map(([cedis, data]) => ({
          cedis,
          quantity: data.qty,
          value: data.val,
          pct: totalQty > 0 ? (data.qty / totalQty) * 100 : 0
        }))
        .sort((a, b) => b.quantity - a.quantity);
    },

    // 2 & 3. Porcentaje e Importe Libre Utilización por Modelo
    getLibrePctAndValueByModel(inventory) {
      const models = {};
      let totalQty = 0;
      let totalVal = 0;

      inventory.forEach(r => {
        const m = r.materialText;
        if (!models[m]) models[m] = { qty: 0, val: 0, proveedor: r.proveedor, categoria: r.categoria };
        models[m].qty += r.libreQty;
        models[m].val += r.libreVal;
        totalQty += r.libreQty;
        totalVal += r.libreVal;
      });

      return Object.entries(models)
        .map(([model, data]) => ({
          model,
          proveedor: data.proveedor,
          categoria: data.categoria,
          quantity: data.qty,
          value: data.val,
          pctQty: totalQty > 0 ? (data.qty / totalQty) * 100 : 0,
          pctVal: totalVal > 0 ? (data.val / totalVal) * 100 : 0
        }))
        .sort((a, b) => b.quantity - a.quantity);
    },

    // 4, 5 & 6. Inspección de Calidad (CEDIS, Modelo, Valor)
    getInspByCedisAndModel(inventory) {
      const cedisMap = {};
      const modelMap = {};
      let totalQty = 0;
      let totalVal = 0;

      inventory.forEach(r => {
        const c = r.cedis || 'SIN CEDIS';
        const m = r.materialText;

        if (!cedisMap[c]) cedisMap[c] = { qty: 0, val: 0 };
        cedisMap[c].qty += r.inspQty;
        cedisMap[c].val += r.inspVal;

        if (!modelMap[m]) modelMap[m] = { qty: 0, val: 0, proveedor: r.proveedor };
        modelMap[m].qty += r.inspQty;
        modelMap[m].val += r.inspVal;

        totalQty += r.inspQty;
        totalVal += r.inspVal;
      });

      const byCedis = Object.entries(cedisMap)
        .map(([cedis, data]) => ({
          cedis,
          quantity: data.qty,
          value: data.val,
          pct: totalQty > 0 ? (data.qty / totalQty) * 100 : 0
        }))
        .sort((a, b) => b.quantity - a.quantity);

      const byModel = Object.entries(modelMap)
        .map(([model, data]) => ({
          model,
          proveedor: data.proveedor,
          quantity: data.qty,
          value: data.val,
          pct: totalQty > 0 ? (data.qty / totalQty) * 100 : 0
        }))
        .filter(d => d.quantity > 0)
        .sort((a, b) => b.quantity - a.quantity);

      return { totalQty, totalVal, byCedis, byModel };
    },

    // 7, 8 & 9. Bloqueado (CEDIS, Modelo, Valor)
    getBlockedByCedisAndModel(inventory) {
      const cedisMap = {};
      const modelMap = {};
      let totalQty = 0;
      let totalVal = 0;

      inventory.forEach(r => {
        const c = r.cedis || 'SIN CEDIS';
        const m = r.materialText;

        if (!cedisMap[c]) cedisMap[c] = { qty: 0, val: 0 };
        cedisMap[c].qty += r.bloqQty;
        cedisMap[c].val += r.bloqVal;

        if (!modelMap[m]) modelMap[m] = { qty: 0, val: 0, proveedor: r.proveedor, categoria: r.categoria };
        modelMap[m].qty += r.bloqQty;
        modelMap[m].val += r.bloqVal;

        totalQty += r.bloqQty;
        totalVal += r.bloqVal;
      });

      const byCedis = Object.entries(cedisMap)
        .map(([cedis, data]) => ({
          cedis,
          quantity: data.qty,
          value: data.val,
          pct: totalQty > 0 ? (data.qty / totalQty) * 100 : 0
        }))
        .filter(d => d.quantity > 0)
        .sort((a, b) => b.quantity - a.quantity);

      const byModel = Object.entries(modelMap)
        .map(([model, data]) => ({
          model,
          proveedor: data.proveedor,
          categoria: data.categoria,
          quantity: data.qty,
          value: data.val,
          pct: totalQty > 0 ? (data.qty / totalQty) * 100 : 0
        }))
        .filter(d => d.quantity > 0)
        .sort((a, b) => b.quantity - a.quantity);

      return { totalQty, totalVal, byCedis, byModel };
    },

    // 10. Blocked by Category
    getBlockedByCategory(inventory) {
      const cats = {};
      let totalBloq = 0;

      inventory.forEach(r => {
        const cat = r.categoria || 'SIN CATEGORIA';
        cats[cat] = (cats[cat] || 0) + r.bloqQty;
        totalBloq += r.bloqQty;
      });

      return Object.entries(cats)
        .map(([categoria, quantity]) => ({
          categoria,
          quantity,
          pct: totalBloq > 0 ? (quantity / totalBloq) * 100 : 0
        }))
        .sort((a, b) => b.quantity - a.quantity);
    },

    // 11. Medidor / Ratio Rule: (Libre + Insp) / Bloqueado and Bloqueado / Total (> 5% Red Alert)
    getBlockedGaugeAndRatio(inventory) {
      let totalLibre = 0;
      let totalInsp = 0;
      let totalBloq = 0;

      inventory.forEach(r => {
        totalLibre += r.libreQty;
        totalInsp += r.inspQty;
        totalBloq += r.bloqQty;
      });

      const totalInventory = totalLibre + totalInsp + totalBloq;
      const librePlusInsp = totalLibre + totalInsp;

      const ratioCoverage = totalBloq > 0 ? (librePlusInsp / totalBloq) : 0;
      const pctBlockedOfTotal = totalInventory > 0 ? (totalBloq / totalInventory) * 100 : 0;
      const isRedAlert = pctBlockedOfTotal > 5;

      return {
        totalLibre,
        totalInsp,
        totalBloq,
        totalInventory,
        librePlusInsp,
        ratioCoverage,
        pctBlockedOfTotal,
        isRedAlert,
        statusColor: isRedAlert ? '#DC2626' : '#16A34A',
        statusLabel: isRedAlert ? 'ALERTA ROJA (Supera 5%)' : 'NORMAL (Bajo 5%)'
      };
    },

    // 12. Blocked quantity and percentage per CEDIS with Red Alert flag (>5%)
    getBlockedQtyAndPctByCedis(inventory) {
      const cedisMap = {};

      inventory.forEach(r => {
        const c = r.cedis || 'SIN CEDIS';
        if (!cedisMap[c]) {
          cedisMap[c] = { libre: 0, insp: 0, bloq: 0, bloqVal: 0 };
        }
        cedisMap[c].libre += r.libreQty;
        cedisMap[c].insp += r.inspQty;
        cedisMap[c].bloq += r.bloqQty;
        cedisMap[c].bloqVal += r.bloqVal;
      });

      return Object.entries(cedisMap)
        .map(([cedis, data]) => {
          const totalCedis = data.libre + data.insp + data.bloq;
          const pctBlocked = totalCedis > 0 ? (data.bloq / totalCedis) * 100 : 0;
          const isAlert = pctBlocked > 5;

          return {
            cedis,
            libre: data.libre,
            insp: data.insp,
            bloq: data.bloq,
            bloqVal: data.bloqVal,
            total: totalCedis,
            pctBlocked,
            isAlert
          };
        })
        .sort((a, b) => b.bloq - a.bloq);
    }
  };

  window.DataEngine = DataEngine;
})(window);
