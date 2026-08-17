/**
 * Macropay Dashboard 2026 - Main Application Logic
 * Interactive Charts, Dynamic Tables, Authentication & Exporting
 */

(function () {
  'use strict';

  // Global State
  const state = {
    user: null, // { username, role, name, supplier }
    currentTab: 'sales', // 'sales' | 'inventory'
    filters: {
      supplier: 'ALL',
      category: 'ALL',
      month: 'ALL',
      cedis: 'ALL',
      search: ''
    },
    charts: {} // Store Chart.js instances for cleanup
  };

  // Brand Palette Constants
  const PALETTE = [
    '#1F49B6', // Primary Blue
    '#F6DC00', // Primary Yellow
    '#62CBC9', // Teal
    '#F5B335', // Amber/Gold
    '#A2D45E', // Lime Green
    '#C100A6', // Magenta
    '#6F1EAF', // Purple
    '#3B82F6', // Sky Blue
    '#EC4899', // Pink
    '#10B981'  // Emerald
  ];

  // Initialize Application
  document.addEventListener('DOMContentLoaded', () => {
    checkSavedSession();
    setupEventListeners();
  });

  function checkSavedSession() {
    const saved = localStorage.getItem('macropay_user_session');
    if (saved) {
      try {
        state.user = JSON.parse(saved);
        if (state.user.supplier !== 'ALL') {
          state.filters.supplier = state.user.supplier;
        }
        hideLoginModal();
        renderHeader();
        renderDashboard();
        return;
      } catch (e) {
        localStorage.removeItem('macropay_user_session');
      }
    }
    showLoginModal();
  }

  function setupEventListeners() {
    // Login form submission
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
      loginForm.addEventListener('submit', handleLogin);
    }

    // Quick Supplier Select in Login Modal
    const quickButtons = document.querySelectorAll('.quick-login-btn');
    quickButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const u = e.currentTarget.getAttribute('data-user');
        const p = e.currentTarget.getAttribute('data-pass');
        document.getElementById('input-username').value = u;
        document.getElementById('input-password').value = p;
        handleLogin(e);
      });
    });

    // Tab buttons
    const tabSales = document.getElementById('tab-sales-btn');
    const tabInv = document.getElementById('tab-inv-btn');

    if (tabSales) {
      tabSales.addEventListener('click', () => {
        state.currentTab = 'sales';
        tabSales.classList.add('active');
        tabInv.classList.remove('active');
        renderDashboard();
      });
    }

    if (tabInv) {
      tabInv.addEventListener('click', () => {
        state.currentTab = 'inventory';
        tabInv.classList.add('active');
        tabSales.classList.remove('active');
        renderDashboard();
      });
    }

    // Filter controls
    const filterSupplier = document.getElementById('filter-supplier');
    const filterCategory = document.getElementById('filter-category');
    const filterMonth = document.getElementById('filter-month');
    const filterCedis = document.getElementById('filter-cedis');
    const filterSearch = document.getElementById('filter-search');

    if (filterSupplier) {
      filterSupplier.addEventListener('change', (e) => {
        state.filters.supplier = e.target.value;
        renderDashboard();
      });
    }
    if (filterCategory) {
      filterCategory.addEventListener('change', (e) => {
        state.filters.category = e.target.value;
        renderDashboard();
      });
    }
    if (filterMonth) {
      filterMonth.addEventListener('change', (e) => {
        state.filters.month = e.target.value;
        renderDashboard();
      });
    }
    if (filterCedis) {
      filterCedis.addEventListener('change', (e) => {
        state.filters.cedis = e.target.value;
        renderDashboard();
      });
    }
    if (filterSearch) {
      filterSearch.addEventListener('input', (e) => {
        state.filters.search = e.target.value;
        renderDashboard();
      });
    }

    // Logout
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
      logoutBtn.addEventListener('click', handleLogout);
    }
  }

  // --- AUTHENTICATION ---
  function showLoginModal() {
    const modal = document.getElementById('login-modal');
    if (modal) modal.classList.remove('hidden');
  }

  function hideLoginModal() {
    const modal = document.getElementById('login-modal');
    if (modal) modal.classList.add('hidden');
  }

  function handleLogin(e) {
    if (e) e.preventDefault();
    const uInput = document.getElementById('input-username').value.trim().toLowerCase();
    const pInput = document.getElementById('input-password').value.trim();
    const errorEl = document.getElementById('login-error');

    const users = window.MACROPAY_DATA ? window.MACROPAY_DATA.users : [];
    const matched = users.find(usr => usr.username.toLowerCase() === uInput && usr.pass === pInput);

    if (matched) {
      state.user = matched;
      localStorage.setItem('macropay_user_session', JSON.stringify(matched));
      if (errorEl) errorEl.classList.add('hidden');
      if (state.user.supplier !== 'ALL') {
        state.filters.supplier = state.user.supplier;
      } else {
        state.filters.supplier = 'ALL';
      }
      hideLoginModal();
      renderHeader();
      populateFilterOptions();
      renderDashboard();
    } else {
      if (errorEl) {
        errorEl.textContent = 'Usuario o contraseña incorrectos. Por favor intente de nuevo.';
        errorEl.classList.remove('hidden');
      }
    }
  }

  function handleLogout() {
    state.user = null;
    localStorage.removeItem('macropay_user_session');
    state.filters = { supplier: 'ALL', category: 'ALL', month: 'ALL', cedis: 'ALL', search: '' };
    showLoginModal();
  }

  function renderHeader() {
    const userBadge = document.getElementById('header-user-badge');
    if (userBadge && state.user) {
      userBadge.innerHTML = `
        <div class="flex items-center gap-2 bg-blue-50 border border-blue-200 px-3 py-1.5 rounded-full text-xs text-blue-900 font-bold">
          <i class="fa-solid fa-user-shield text-blue-700"></i>
          <span>${state.user.name}</span>
          <span class="bg-blue-600 text-white px-2 py-0.5 rounded-full text-[10px] uppercase">${state.user.role === 'admin' ? 'ADMIN' : 'PROVEEDOR'}</span>
        </div>
      `;
    }

    // Lock supplier filter if supplier user
    const filterSupplier = document.getElementById('filter-supplier');
    if (filterSupplier && state.user) {
      if (state.user.role === 'supplier') {
        filterSupplier.value = state.user.supplier;
        filterSupplier.disabled = true;
      } else {
        filterSupplier.disabled = false;
      }
    }
  }

  function populateFilterOptions() {
    const rawSales = window.MACROPAY_DATA ? window.MACROPAY_DATA.sales : [];
    const rawInv = window.MACROPAY_DATA ? window.MACROPAY_DATA.inventory : [];

    // Categories
    const categories = new Set();
    rawSales.forEach(r => { if (r.categoria) categories.add(r.categoria); });
    rawInv.forEach(r => { if (r.categoria) categories.add(r.categoria); });

    const filterCategory = document.getElementById('filter-category');
    if (filterCategory) {
      filterCategory.innerHTML = '<option value="ALL">Todas las Categorías</option>' +
        Array.from(categories).sort().map(c => `<option value="${c}">${c}</option>`).join('');
    }

    // CEDIS
    const cedisSet = new Set();
    rawSales.forEach(r => { if (r.cedis) cedisSet.add(r.cedis); });
    rawInv.forEach(r => { if (r.cedis) cedisSet.add(r.cedis); });

    const filterCedis = document.getElementById('filter-cedis');
    if (filterCedis) {
      filterCedis.innerHTML = '<option value="ALL">Todos los CEDIS</option>' +
        Array.from(cedisSet).sort().map(c => `<option value="${c}">${c}</option>`).join('');
    }
  }

  // Helper: Destroy Chart Instance
  function destroyChart(id) {
    if (state.charts[id]) {
      state.charts[id].destroy();
      delete state.charts[id];
    }
  }

  // --- RENDER DASHBOARD ---
  function renderDashboard() {
    populateFilterOptions();

    const salesContainer = document.getElementById('sales-dashboard-container');
    const invContainer = document.getElementById('inv-dashboard-container');

    if (state.currentTab === 'sales') {
      if (salesContainer) salesContainer.classList.remove('hidden');
      if (invContainer) invContainer.classList.add('hidden');
      renderSalesDashboard();
    } else {
      if (invContainer) invContainer.classList.remove('hidden');
      if (salesContainer) salesContainer.classList.add('hidden');
      renderInventoryDashboard();
    }
  }

  // ==========================================================================
  // SALES DASHBOARD
  // ==========================================================================
  function renderSalesDashboard() {
    const rawSales = window.MACROPAY_DATA ? window.MACROPAY_DATA.sales : [];
    const sales = window.DataEngine.filterSales(rawSales, state.filters);

    // Render Sales KPIs
    const totalUnits = sales.reduce((acc, r) => acc + r.cantidad, 0);
    const topModel = window.DataEngine.getTop10Models(sales)[0] || { model: 'N/A', quantity: 0 };
    const topState = window.DataEngine.getTop10States(sales)[0] || { state: 'N/A', quantity: 0 };
    const momData = window.DataEngine.getMoMAndProjection(sales);
    const lastMoM = momData.rows.slice(-1)[0] || { growthPct: 0 };

    document.getElementById('kpi-sales-total').textContent = window.DataEngine.formatNumber(totalUnits);
    document.getElementById('kpi-sales-top-model').textContent = topModel.model.length > 25 ? topModel.model.substring(0,25) + '...' : topModel.model;
    document.getElementById('kpi-sales-top-state').textContent = topState.state;
    
    const momEl = document.getElementById('kpi-sales-mom');
    if (lastMoM.growthPct !== null) {
      const isPos = lastMoM.growthPct >= 0;
      momEl.textContent = (isPos ? '+' : '') + lastMoM.growthPct.toFixed(1) + '% vs Mes Anterior';
      momEl.className = isPos ? 'text-xs font-bold text-emerald-600 mt-1' : 'text-xs font-bold text-red-600 mt-1';
    } else {
      momEl.textContent = '0.0%';
    }

    const shareEl = document.getElementById('kpi-sales-share');
    if (state.filters.supplier !== 'all') {
      const globalTotalUnits = rawSales.reduce((acc, r) => acc + r.cantidad, 0);
      const share = globalTotalUnits > 0 ? (totalUnits / globalTotalUnits) * 100 : 0;
      shareEl.textContent = share.toFixed(1) + '%';
    } else {
      shareEl.textContent = '100%';
    }

    // 1. Monthly sales by supplier
    renderSalesBySupplier(sales);

    // 2. Top 10 bikes by supplier
    renderTop10Bikes(sales);

    // 3. Top 10 states
    renderTop10States(sales);

    // 4. Top 10 models sold overall
    renderTop10Models(sales);

    // 5 & 6. Units sold & Market Share by supplier
    renderSupplierUnitsAndShare(sales, rawSales);

    // 7. Sales by branch type
    renderSalesByBranchType(sales);

    // 8. Top 10 branches
    renderTop10Branches(sales);

    // 9. Monthly sales by category
    renderMonthlySalesByCategory(sales);

    // 10. Timeline chart
    renderTimelineChart(sales);

    // 11. MoM Growth & Sales Projections Table & Chart
    renderMoMAndProjections(sales);
  }

  // 1. Monthly Sales by Supplier
  function renderSalesBySupplier(sales) {
    destroyChart('chart-sales-supplier');
    const data = window.DataEngine.getMonthlySalesBySupplier(sales);
    const months = window.DataEngine.getMonthlyTimeline(sales).map(t => t.monthName);
    
    const suppliers = ['BAJAJ', 'BODESA', 'DINAMO', 'MOTO ROAD', 'VELOCI MOTORS'];
    const datasets = suppliers.map((sup, idx) => ({
      label: sup,
      data: window.DataEngine.getMonthlyTimeline(sales).map(t => data[t.monthKey].bySupplier[sup] || 0),
      backgroundColor: PALETTE[idx % PALETTE.length],
      borderRadius: 6
    }));

    const ctx = document.getElementById('chart-sales-supplier').getContext('2d');
    state.charts['chart-sales-supplier'] = new Chart(ctx, {
      type: 'bar',
      data: { labels: months, datasets },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { position: 'bottom' } },
        scales: { x: { stacked: true }, y: { stacked: true, beginAtZero: true } }
      }
    });

    // Dynamic Table
    let tableHtml = `<table class="custom-table">
      <thead>
        <tr>
          <th>Mes</th>
          ${suppliers.map(s => `<th>${s}</th>`).join('')}
          <th>Total Unidades</th>
        </tr>
      </thead>
      <tbody>`;

    window.DataEngine.getMonthlyTimeline(sales).forEach(t => {
      const row = data[t.monthKey];
      tableHtml += `<tr>
        <td class="font-bold">${t.monthName}</td>
        ${suppliers.map(s => `<td>${window.DataEngine.formatNumber(row.bySupplier[s] || 0)}</td>`).join('')}
        <td class="font-bold text-blue-700">${window.DataEngine.formatNumber(row.total)}</td>
      </tr>`;
    });
    tableHtml += `</tbody></table>`;
    document.getElementById('table-sales-supplier').innerHTML = tableHtml;
  }

  // 2. Top 10 Bikes by Supplier
  function renderTop10Bikes(sales) {
    destroyChart('chart-top-bikes');
    const topBikes = window.DataEngine.getTop10MotosBySupplier(sales, state.filters.supplier);

    const ctx = document.getElementById('chart-top-bikes').getContext('2d');
    state.charts['chart-top-bikes'] = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: topBikes.map(b => b.model.length > 20 ? b.model.substring(0, 20) + '...' : b.model),
        datasets: [{
          label: 'Unidades Vendidas',
          data: topBikes.map(b => b.quantity),
          backgroundColor: '#1F49B6',
          borderRadius: 6
        }]
      },
      options: {
        indexAxis: 'y',
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } }
      }
    });

    // Table
    let tableHtml = `<table class="custom-table">
      <thead>
        <tr>
          <th>#</th>
          <th>Modelo / Motocicleta</th>
          <th>Unidades Vendidas</th>
          <th>% Participación</th>
        </tr>
      </thead>
      <tbody>`;
    topBikes.forEach((b, i) => {
      tableHtml += `<tr>
        <td class="font-bold text-slate-400">${i + 1}</td>
        <td class="font-bold text-slate-800">${b.model}</td>
        <td class="font-bold text-blue-700">${window.DataEngine.formatNumber(b.quantity)}</td>
        <td>${window.DataEngine.formatPercent(b.pct)}</td>
      </tr>`;
    });
    tableHtml += `</tbody></table>`;
    document.getElementById('table-top-bikes').innerHTML = tableHtml;
  }

  // 3. Top 10 States
  function renderTop10States(sales) {
    destroyChart('chart-top-states');
    const topStates = window.DataEngine.getTop10States(sales);

    const ctx = document.getElementById('chart-top-states').getContext('2d');
    state.charts['chart-top-states'] = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: topStates.map(s => s.state),
        datasets: [{
          data: topStates.map(s => s.quantity),
          backgroundColor: PALETTE
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { position: 'right' } }
      }
    });

    // Table
    let tableHtml = `<table class="custom-table">
      <thead>
        <tr>
          <th>#</th>
          <th>Estado</th>
          <th>Unidades Vendidas</th>
          <th>% del Total</th>
        </tr>
      </thead>
      <tbody>`;
    topStates.forEach((s, i) => {
      tableHtml += `<tr>
        <td class="font-bold text-slate-400">${i + 1}</td>
        <td class="font-bold">${s.state}</td>
        <td class="font-bold text-blue-700">${window.DataEngine.formatNumber(s.quantity)}</td>
        <td>${window.DataEngine.formatPercent(s.pct)}</td>
      </tr>`;
    });
    tableHtml += `</tbody></table>`;
    document.getElementById('table-top-states').innerHTML = tableHtml;
  }

  // 4. Top 10 Models
  function renderTop10Models(sales) {
    destroyChart('chart-top-models');
    const topModels = window.DataEngine.getTop10Models(sales);

    const ctx = document.getElementById('chart-top-models').getContext('2d');
    state.charts['chart-top-models'] = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: topModels.map(m => m.model.length > 20 ? m.model.substring(0, 20) + '...' : m.model),
        datasets: [{
          label: 'Unidades',
          data: topModels.map(m => m.quantity),
          backgroundColor: '#F6DC00',
          borderColor: '#D4B600',
          borderWidth: 1,
          borderRadius: 6
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } }
      }
    });

    let tableHtml = `<table class="custom-table">
      <thead>
        <tr>
          <th>#</th>
          <th>Modelo</th>
          <th>Unidades Vendidas</th>
          <th>% Participación</th>
        </tr>
      </thead>
      <tbody>`;
    topModels.forEach((m, i) => {
      tableHtml += `<tr>
        <td class="font-bold text-slate-400">${i + 1}</td>
        <td class="font-bold">${m.model}</td>
        <td class="font-bold text-blue-700">${window.DataEngine.formatNumber(m.quantity)}</td>
        <td>${window.DataEngine.formatPercent(m.pct)}</td>
      </tr>`;
    });
    tableHtml += `</tbody></table>`;
    document.getElementById('table-top-models').innerHTML = tableHtml;
  }

  // 5 & 6. Units & Share by Supplier
  function renderSupplierUnitsAndShare(sales, rawSales) {
    destroyChart('chart-supplier-share');
    
    // Get 100% stacked bar chart data over time based on rawSales
    const chartData = window.DataEngine.getMonthlySupplierShareMatrix(rawSales);
    let datasets = chartData.suppliers.map((s, i) => ({
      label: s,
      data: chartData.matrix[s],
      backgroundColor: PALETTE[i % PALETTE.length]
    }));

    if (state.filters.supplier !== 'all') {
      const currentSupplier = state.filters.supplier;
      const supplierData = chartData.matrix[currentSupplier] || chartData.months.map(() => 0);
      const otrosData = chartData.months.map((m, idx) => {
        const sumOthers = chartData.suppliers.reduce((acc, s) => s !== currentSupplier ? acc + (chartData.matrix[s][idx] || 0) : acc, 0);
        return sumOthers;
      });

      const supplierIndex = chartData.suppliers.indexOf(currentSupplier);
      const supplierColor = supplierIndex >= 0 ? PALETTE[supplierIndex % PALETTE.length] : PALETTE[0];

      datasets = [
        {
          label: currentSupplier,
          data: supplierData,
          backgroundColor: supplierColor
        },
        {
          label: 'Resto del Mercado',
          data: otrosData,
          backgroundColor: '#cbd5e1' // slate-300
        }
      ];
    }

    const ctx = document.getElementById('chart-supplier-share').getContext('2d');
    state.charts['chart-supplier-share'] = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: chartData.months.map(m => m.charAt(0).toUpperCase() + m.slice(1)),
        datasets: datasets
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { 
          legend: { position: 'top' },
          tooltip: {
            callbacks: {
              label: function(context) {
                return context.dataset.label + ': ' + context.raw.toFixed(2) + '%';
              }
            }
          }
        },
        scales: {
          x: { stacked: true },
          y: { 
            stacked: true, 
            max: 100,
            ticks: {
              callback: function(value) { return value + '%'; }
            },
            title: {
              display: true,
              text: 'Suma de Cantidad (%)'
            }
          }
        }
      }
    });

    // For the table, we use the new global and monthly calculation
    const tableData = window.DataEngine.getSupplierShareGlobalAndMonthly(sales, rawSales);

    let tableHtml = `<table class="custom-table">
      <thead>
        <tr>
          <th>Mes / Periodo</th>
          <th>Proveedor</th>
          <th>Unidades Proveedor</th>
          <th>Total Mercado (Mes)</th>
          <th>% Participación</th>
        </tr>
      </thead>
      <tbody>`;
    tableData.forEach(d => {
      // Highlight global rows slightly differently
      const bgClass = d.isGlobal ? 'bg-blue-50/50' : '';
      tableHtml += `<tr class="${bgClass}">
        <td class="${d.isGlobal ? 'font-black text-blue-900' : 'font-semibold text-slate-700'}">${d.periodo}</td>
        <td class="font-bold">${d.proveedor}</td>
        <td class="font-bold text-blue-700">${window.DataEngine.formatNumber(d.quantity)}</td>
        <td class="font-bold text-slate-500">${window.DataEngine.formatNumber(d.total)}</td>
        <td class="font-bold text-amber-600">${window.DataEngine.formatPercent(d.pct)}</td>
      </tr>`;
    });
    tableHtml += `</tbody></table>`;
    document.getElementById('table-supplier-share').innerHTML = tableHtml;
  }

  // 7. Sales by Branch Type
  function renderSalesByBranchType(sales) {
    destroyChart('chart-branch-type');
    const data = window.DataEngine.getSalesByBranchType(sales);

    const ctx = document.getElementById('chart-branch-type').getContext('2d');
    state.charts['chart-branch-type'] = new Chart(ctx, {
      type: 'polarArea',
      data: {
        labels: data.map(d => d.branchType),
        datasets: [{
          data: data.map(d => d.quantity),
          backgroundColor: PALETTE.slice(0, data.length)
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { position: 'right' } }
      }
    });

    let tableHtml = `<table class="custom-table">
      <thead>
        <tr>
          <th>Tipo de Sucursal</th>
          <th>Unidades Vendidas</th>
          <th>% Porcentaje de Ventas</th>
        </tr>
      </thead>
      <tbody>`;
    data.forEach(d => {
      tableHtml += `<tr>
        <td class="font-bold">${d.branchType}</td>
        <td class="font-bold text-blue-700">${window.DataEngine.formatNumber(d.quantity)}</td>
        <td>${window.DataEngine.formatPercent(d.pct)}</td>
      </tr>`;
    });
    tableHtml += `</tbody></table>`;
    document.getElementById('table-branch-type').innerHTML = tableHtml;
  }

  // 8. Top 10 Branches
  function renderTop10Branches(sales) {
    destroyChart('chart-top-branches');
    const branches = window.DataEngine.getTop10Branches(sales);

    const ctx = document.getElementById('chart-top-branches').getContext('2d');
    state.charts['chart-top-branches'] = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: branches.map(b => b.branch.length > 22 ? b.branch.substring(0, 22) + '...' : b.branch),
        datasets: [{
          label: 'Unidades Vendidas',
          data: branches.map(b => b.quantity),
          backgroundColor: '#62CBC9',
          borderRadius: 6
        }]
      },
      options: {
        indexAxis: 'y',
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } }
      }
    });

    let tableHtml = `<table class="custom-table">
      <thead>
        <tr>
          <th>#</th>
          <th>Sucursal</th>
          <th>Unidades Vendidas</th>
          <th>% del Total</th>
        </tr>
      </thead>
      <tbody>`;
    branches.forEach((b, i) => {
      tableHtml += `<tr>
        <td class="font-bold text-slate-400">${i + 1}</td>
        <td class="font-bold">${b.branch}</td>
        <td class="font-bold text-blue-700">${window.DataEngine.formatNumber(b.quantity)}</td>
        <td>${window.DataEngine.formatPercent(b.pct)}</td>
      </tr>`;
    });
    tableHtml += `</tbody></table>`;
    document.getElementById('table-top-branches').innerHTML = tableHtml;
  }

  // 9. Monthly Sales by Category
  function renderMonthlySalesByCategory(sales) {
    destroyChart('chart-sales-category');
    const { matrix, categories, months } = window.DataEngine.getMonthlySalesByCategory(sales);

    const datasets = categories.map((cat, idx) => ({
      label: cat,
      data: months.map(m => matrix[cat] ? (matrix[cat][m] || 0) : 0),
      backgroundColor: PALETTE[idx % PALETTE.length],
      borderRadius: 4
    }));

    const ctx = document.getElementById('chart-sales-category').getContext('2d');
    state.charts['chart-sales-category'] = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: months.map(m => m.toUpperCase()),
        datasets
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { position: 'bottom' } },
        scales: { x: { stacked: true }, y: { stacked: true, beginAtZero: true } }
      }
    });

    let tableHtml = `<table class="custom-table">
      <thead>
        <tr>
          <th>Categoría</th>
          ${months.map(m => `<th>${m.toUpperCase()}</th>`).join('')}
          <th>Total Unidades</th>
        </tr>
      </thead>
      <tbody>`;
    categories.forEach(cat => {
      let catTotal = 0;
      const monthVals = months.map(m => {
        const val = matrix[cat] ? (matrix[cat][m] || 0) : 0;
        catTotal += val;
        return val;
      });

      tableHtml += `<tr>
        <td class="font-bold text-slate-800">${cat}</td>
        ${monthVals.map(v => `<td>${window.DataEngine.formatNumber(v)}</td>`).join('')}
        <td class="font-bold text-blue-700">${window.DataEngine.formatNumber(catTotal)}</td>
      </tr>`;
    });
    tableHtml += `</tbody></table>`;
    document.getElementById('table-sales-category').innerHTML = tableHtml;
  }

  // 10. Timeline Chart
  function renderTimelineChart(sales) {
    destroyChart('chart-timeline');
    const timeline = window.DataEngine.getMonthlyTimeline(sales);

    const ctx = document.getElementById('chart-timeline').getContext('2d');
    state.charts['chart-timeline'] = new Chart(ctx, {
      type: 'line',
      data: {
        labels: timeline.map(t => t.monthName),
        datasets: [{
          label: 'Evolución Mensual de Unidades Vendidas',
          data: timeline.map(t => t.units),
          borderColor: '#1F49B6',
          backgroundColor: 'rgba(31, 73, 182, 0.1)',
          fill: true,
          tension: 0.3,
          pointRadius: 6,
          pointBackgroundColor: '#F6DC00',
          pointBorderColor: '#1F49B6',
          pointBorderWidth: 2
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { position: 'top' } },
        scales: { y: { beginAtZero: true } }
      }
    });
  }

  // 11. MoM Growth & Sales Projections
  function renderMoMAndProjections(sales) {
    destroyChart('chart-mom-projections');
    const { rows, projections } = window.DataEngine.getMoMAndProjection(sales);

    const labels = [...rows.map(r => r.monthName), ...projections.map(p => p.monthName)];
    const actualData = [...rows.map(r => r.units), ...projections.map(() => null)];
    const projData = [...rows.map((r, i) => i === rows.length - 1 ? r.units : null), ...projections.map(p => p.units)];

    const ctx = document.getElementById('chart-mom-projections').getContext('2d');
    state.charts['chart-mom-projections'] = new Chart(ctx, {
      type: 'line',
      data: {
        labels,
        datasets: [
          {
            label: 'Ventas Reales 2026',
            data: actualData,
            borderColor: '#1F49B6',
            backgroundColor: '#1F49B6',
            borderWidth: 3,
            pointRadius: 5
          },
          {
            label: 'Proyección de Ventas (3 Meses)',
            data: projData,
            borderColor: '#C100A6',
            borderDash: [6, 6],
            backgroundColor: '#C100A6',
            borderWidth: 3,
            pointRadius: 6,
            pointStyle: 'triangle'
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { position: 'top' } }
      }
    });

    // Table with User's IF Formula Display
    let tableHtml = `<table class="custom-table">
      <thead>
        <tr>
          <th>Mes / Periodo</th>
          <th>Unidades Mes Anterior</th>
          <th>% Crecimiento Proyectado</th>
          <th>Proyectado mes actual (Con % crecimiento a la fecha)</th>
          <th>Estatus</th>
        </tr>
      </thead>
      <tbody>`;

    rows.forEach(r => {
      const growthText = r.growthPct !== null ? (r.growthPct >= 0 ? `+${r.growthPct.toFixed(1)}%` : `${r.growthPct.toFixed(1)}%`) : 'N/A';
      const growthClass = r.growthPct !== null ? (r.growthPct >= 0 ? 'text-emerald-600 font-bold' : 'text-red-600 font-bold') : '';
      const prevUnitsText = r.prevUnits !== null ? window.DataEngine.formatNumber(r.prevUnits) : 'N/A';

      tableHtml += `<tr>
        <td class="font-bold">${r.monthName}</td>
        <td>${prevUnitsText}</td>
        <td class="${growthClass}">${growthText}</td>
        <td class="font-bold text-blue-700">${window.DataEngine.formatNumber(r.projectedUnits)}</td>
        <td><span class="bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded font-bold">REAL</span></td>
      </tr>`;
    });

    projections.forEach(p => {
      const projGrowthText = `+${p.growthPct.toFixed(1)}%`;
      const prevUnitsText = window.DataEngine.formatNumber(p.prevUnits);

      tableHtml += `<tr class="bg-pink-50/60 border-l-4 border-pink-600">
        <td class="font-bold text-pink-900">${p.monthName}</td>
        <td class="font-bold text-slate-700">${prevUnitsText}</td>
        <td class="font-bold text-pink-600">${projGrowthText}</td>
        <td class="font-bold text-pink-700 text-base">${window.DataEngine.formatNumber(p.units)}</td>
        <td><span class="bg-pink-600 text-white text-xs px-2 py-0.5 rounded font-bold">PROYECCIÓN (IF)</span></td>
      </tr>`;
    });

    tableHtml += `</tbody></table>`;
    document.getElementById('table-mom-projections').innerHTML = tableHtml;
  }


  // ==========================================================================
  // INVENTORY DASHBOARD
  // ==========================================================================
  function renderInventoryDashboard() {
    const rawInv = window.MACROPAY_DATA ? window.MACROPAY_DATA.inventory : [];
    const inv = window.DataEngine.filterInventory(rawInv, state.filters);

    const gaugeData = window.DataEngine.getBlockedGaugeAndRatio(inv);

    // Render KPIs
    document.getElementById('kpi-inv-libre-qty').textContent = window.DataEngine.formatNumber(gaugeData.totalLibre);
    document.getElementById('kpi-inv-insp-qty').textContent = window.DataEngine.formatNumber(gaugeData.totalInsp);
    document.getElementById('kpi-inv-bloq-qty').textContent = window.DataEngine.formatNumber(gaugeData.totalBloq);
    document.getElementById('kpi-inv-total-val').textContent = window.DataEngine.formatCurrency(
      inv.reduce((acc, r) => acc + r.libreVal + r.inspVal + r.bloqVal, 0)
    );

    const gaugeKpiEl = document.getElementById('kpi-inv-gauge-status');
    if (gaugeKpiEl) {
      gaugeKpiEl.innerHTML = `
        <span class="${gaugeData.isRedAlert ? 'badge-alert-red' : 'badge-success-green'}">
          <i class="fa-solid ${gaugeData.isRedAlert ? 'fa-triangle-exclamation' : 'fa-circle-check'}"></i>
          ${gaugeData.pctBlockedOfTotal.toFixed(2)}% Bloqueado (${gaugeData.statusLabel})
        </span>
      `;
    }

    // 1, 2, 3. Libre Utilización
    renderLibreInventory(inv);

    // 4, 5, 6. Inspección de Calidad
    renderInspInventory(inv);

    // 7, 8, 9. Bloqueado
    renderBlockedInventory(inv);

    // 10. Bloqueado por Categoría
    renderBlockedByCategory(inv);

    // 11. Medidor / Rule (> 5% Red Alert)
    renderBlockedGaugeTable(inv, gaugeData);

    // 12. Blocked by CEDIS
    renderBlockedByCedis(inv);
  }

  // 1, 2, 3. Libre Utilización
  function renderLibreInventory(inv) {
    destroyChart('chart-inv-libre-cedis');
    destroyChart('chart-inv-libre-models');

    const byCedis = window.DataEngine.getLibreByCedis(inv);
    const byModel = window.DataEngine.getLibrePctAndValueByModel(inv);

    // CEDIS Bar
    const ctxC = document.getElementById('chart-inv-libre-cedis').getContext('2d');
    state.charts['chart-inv-libre-cedis'] = new Chart(ctxC, {
      type: 'bar',
      data: {
        labels: byCedis.map(c => c.cedis),
        datasets: [{
          label: 'Unidades Disponibles',
          data: byCedis.map(c => c.quantity),
          backgroundColor: '#1F49B6',
          borderRadius: 6
        }]
      },
      options: { responsive: true, maintainAspectRatio: false }
    });

    // Model Donut
    const ctxM = document.getElementById('chart-inv-libre-models').getContext('2d');
    state.charts['chart-inv-libre-models'] = new Chart(ctxM, {
      type: 'doughnut',
      data: {
        labels: byModel.slice(0, 8).map(m => m.model.length > 18 ? m.model.substring(0, 18) + '...' : m.model),
        datasets: [{
          data: byModel.slice(0, 8).map(m => m.quantity),
          backgroundColor: PALETTE
        }]
      },
      options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'right' } } }
    });

    // Table
    let tableHtml = `<table class="custom-table">
      <thead>
        <tr>
          <th>Modelo / Motocicleta</th>
          <th>Proveedor</th>
          <th>Categoría</th>
          <th>Unidades Disponibles</th>
          <th>% del Total</th>
          <th>Valor del Inventario ($ MXN)</th>
        </tr>
      </thead>
      <tbody>`;
    byModel.forEach(m => {
      tableHtml += `<tr>
        <td class="font-bold">${m.model}</td>
        <td>${m.proveedor}</td>
        <td>${m.categoria}</td>
        <td class="font-bold text-blue-700">${window.DataEngine.formatNumber(m.quantity)}</td>
        <td>${window.DataEngine.formatPercent(m.pctQty)}</td>
        <td class="font-bold text-emerald-700">${window.DataEngine.formatCurrency(m.value)}</td>
      </tr>`;
    });
    tableHtml += `</tbody></table>`;
    document.getElementById('table-inv-libre').innerHTML = tableHtml;
  }

  // 4, 5, 6. Inspección de Calidad
  function renderInspInventory(inv) {
    destroyChart('chart-inv-insp-cedis');
    const { totalQty, totalVal, byCedis, byModel } = window.DataEngine.getInspByCedisAndModel(inv);

    const ctx = document.getElementById('chart-inv-insp-cedis').getContext('2d');
    state.charts['chart-inv-insp-cedis'] = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: byCedis.map(c => c.cedis),
        datasets: [{
          label: 'Unidades en Inspección de Calidad',
          data: byCedis.map(c => c.quantity),
          backgroundColor: '#F5B335',
          borderRadius: 6
        }]
      },
      options: { responsive: true, maintainAspectRatio: false }
    });

    let tableHtml = `<table class="custom-table">
      <thead>
        <tr>
          <th>Modelo</th>
          <th>Proveedor</th>
          <th>Unidades en Inspección</th>
          <th>% por Modelo</th>
          <th>Valor ($ MXN)</th>
        </tr>
      </thead>
      <tbody>`;
    byModel.forEach(m => {
      tableHtml += `<tr>
        <td class="font-bold">${m.model}</td>
        <td>${m.proveedor}</td>
        <td class="font-bold text-amber-700">${window.DataEngine.formatNumber(m.quantity)}</td>
        <td>${window.DataEngine.formatPercent(m.pct)}</td>
        <td class="font-bold text-emerald-700">${window.DataEngine.formatCurrency(m.value)}</td>
      </tr>`;
    });
    tableHtml += `</tbody></table>`;
    document.getElementById('table-inv-insp').innerHTML = tableHtml;
  }

  // 7, 8, 9. Bloqueado
  function renderBlockedInventory(inv) {
    destroyChart('chart-inv-bloq-models');
    const { totalQty, totalVal, byCedis, byModel } = window.DataEngine.getBlockedByCedisAndModel(inv);

    const ctx = document.getElementById('chart-inv-bloq-models').getContext('2d');
    state.charts['chart-inv-bloq-models'] = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: byModel.slice(0, 8).map(m => m.model.length > 18 ? m.model.substring(0, 18) + '...' : m.model),
        datasets: [{
          data: byModel.slice(0, 8).map(m => m.quantity),
          backgroundColor: PALETTE
        }]
      },
      options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'bottom' } } }
    });

    let tableHtml = `<table class="custom-table">
      <thead>
        <tr>
          <th>Modelo Bloqueado</th>
          <th>Proveedor</th>
          <th>Categoría</th>
          <th>Unidades Bloqueadas</th>
          <th>% del Bloqueado Total</th>
          <th>Valor Bloqueado ($ MXN)</th>
        </tr>
      </thead>
      <tbody>`;
    byModel.forEach(m => {
      tableHtml += `<tr>
        <td class="font-bold text-red-900">${m.model}</td>
        <td>${m.proveedor}</td>
        <td>${m.categoria}</td>
        <td class="font-bold text-red-600">${window.DataEngine.formatNumber(m.quantity)}</td>
        <td>${window.DataEngine.formatPercent(m.pct)}</td>
        <td class="font-bold text-red-700">${window.DataEngine.formatCurrency(m.value)}</td>
      </tr>`;
    });
    tableHtml += `</tbody></table>`;
    document.getElementById('table-inv-bloq').innerHTML = tableHtml;
  }

  // 10. Bloqueado por Categoría
  function renderBlockedByCategory(inv) {
    destroyChart('chart-inv-bloq-category');
    const cats = window.DataEngine.getBlockedByCategory(inv);

    const ctx = document.getElementById('chart-inv-bloq-category').getContext('2d');
    state.charts['chart-inv-bloq-category'] = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: cats.map(c => c.categoria),
        datasets: [{
          label: 'Unidades Bloqueadas',
          data: cats.map(c => c.quantity),
          backgroundColor: '#C100A6',
          borderRadius: 6
        }]
      },
      options: { responsive: true, maintainAspectRatio: false }
    });

    let tableHtml = `<table class="custom-table">
      <thead>
        <tr>
          <th>Categoría</th>
          <th>Unidades Bloqueadas</th>
          <th>% Porcentaje Bloqueado</th>
        </tr>
      </thead>
      <tbody>`;
    cats.forEach(c => {
      tableHtml += `<tr>
        <td class="font-bold">${c.categoria}</td>
        <td class="font-bold text-pink-700">${window.DataEngine.formatNumber(c.quantity)}</td>
        <td>${window.DataEngine.formatPercent(c.pct)}</td>
      </tr>`;
    });
    tableHtml += `</tbody></table>`;
    document.getElementById('table-inv-bloq-category').innerHTML = tableHtml;
  }

  // 11. Medidor / Rule (>5% Red Alert Table)
  function renderBlockedGaugeTable(inv, gauge) {
    const el = document.getElementById('table-inv-gauge');
    if (!el) return;

    let html = `
      <div class="p-4 rounded-xl mb-4 ${gauge.isRedAlert ? 'bg-red-50 border-2 border-red-500' : 'bg-green-50 border-2 border-green-500'} flex items-center justify-between">
        <div class="flex items-center gap-3">
          <div class="w-12 h-12 rounded-full ${gauge.isRedAlert ? 'bg-red-600' : 'bg-green-600'} text-white flex items-center justify-center text-xl font-bold">
            <i class="fa-solid ${gauge.isRedAlert ? 'fa-triangle-exclamation' : 'fa-check'}"></i>
          </div>
          <div>
            <h4 class="font-title text-base font-extrabold ${gauge.isRedAlert ? 'text-red-900' : 'text-green-900'}">
              ${gauge.isRedAlert ? 'ALERTA DE RIESGO: Inventario Bloqueado Excede el 5%' : 'ESTADO DE INVENTARIO SALUDABLE'}
            </h4>
            <p class="text-xs ${gauge.isRedAlert ? 'text-red-700' : 'text-green-700'}">
              Porcentaje actual de inventario bloqueado sobre el total: <strong>${gauge.pctBlockedOfTotal.toFixed(2)}%</strong> (Límite máximo permitido: 5.0%)
            </p>
          </div>
        </div>
        <div class="text-right">
          <span class="${gauge.isRedAlert ? 'badge-alert-red' : 'badge-success-green'} text-sm px-4 py-2">
            ${gauge.isRedAlert ? 'MARCADO EN ROJO (>5%)' : 'DENTRO DE RANGO (<5%)'}
          </span>
        </div>
      </div>

      <table class="custom-table">
        <thead>
          <tr>
            <th>Métrica de Medidor de Inventario</th>
            <th>Fórmula Aplicada</th>
            <th>Valor Calculado</th>
            <th>Estatus de Alerta</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="font-bold">Inventario Libre Utilización</td>
            <td>Suma (Libre Utilización)</td>
            <td class="font-bold text-blue-700">${window.DataEngine.formatNumber(gauge.totalLibre)} un.</td>
            <td><span class="bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded font-bold">Disponible</span></td>
          </tr>
          <tr>
            <td class="font-bold">Inspección de Calidad</td>
            <td>Suma (Inspección Calidad)</td>
            <td class="font-bold text-amber-700">${window.DataEngine.formatNumber(gauge.totalInsp)} un.</td>
            <td><span class="bg-amber-100 text-amber-800 text-xs px-2 py-0.5 rounded font-bold">En Revisión</span></td>
          </tr>
          <tr class="${gauge.isRedAlert ? 'row-alert-red' : ''}">
            <td class="font-bold">Inventario Bloqueado</td>
            <td>Suma (Bloqueado)</td>
            <td class="font-bold text-red-600">${window.DataEngine.formatNumber(gauge.totalBloq)} un.</td>
            <td><span class="badge-alert-red">Retenido</span></td>
          </tr>
          <tr>
            <td class="font-bold">Relación (Libre + Insp) / Bloqueado</td>
            <td>(Libre + Inspección) / Bloqueado</td>
            <td class="font-bold text-purple-700">${gauge.ratioCoverage.toFixed(2)}x</td>
            <td><span class="bg-purple-100 text-purple-800 text-xs px-2 py-0.5 rounded font-bold">Cobertura</span></td>
          </tr>
          <tr class="${gauge.isRedAlert ? 'row-alert-red' : ''}">
            <td class="font-bold">Porcentaje de Inventario Bloqueado sobre Total</td>
            <td>(Bloqueado / Total) * 100</td>
            <td class="font-bold text-red-600">${gauge.pctBlockedOfTotal.toFixed(2)}%</td>
            <td>${gauge.isRedAlert ? '<span class="badge-alert-red"><i class="fa-solid fa-triangle-exclamation"></i> ALERTA > 5%</span>' : '<span class="badge-success-green">NORMAL</span>'}</td>
          </tr>
        </tbody>
      </table>
    `;
    el.innerHTML = html;
  }

  // 12. Blocked by CEDIS with Alert Highlight
  function renderBlockedByCedis(inv) {
    const list = window.DataEngine.getBlockedQtyAndPctByCedis(inv);

    let tableHtml = `<table class="custom-table">
      <thead>
        <tr>
          <th>CEDIS</th>
          <th>Libre Utilización</th>
          <th>Inspección Calidad</th>
          <th>Unidades Bloqueadas</th>
          <th>Total Inventario CEDIS</th>
          <th>% Bloqueado CEDIS</th>
          <th>Semáforo de Alerta</th>
        </tr>
      </thead>
      <tbody>`;

    list.forEach(c => {
      const isAlert = c.isAlert;
      tableHtml += `<tr class="${isAlert ? 'row-alert-red' : ''}">
        <td class="font-bold">${c.cedis}</td>
        <td>${window.DataEngine.formatNumber(c.libre)}</td>
        <td>${window.DataEngine.formatNumber(c.insp)}</td>
        <td class="font-bold text-red-600">${window.DataEngine.formatNumber(c.bloq)}</td>
        <td class="font-bold">${window.DataEngine.formatNumber(c.total)}</td>
        <td class="font-bold ${isAlert ? 'text-red-600' : 'text-green-600'}">${c.pctBlocked.toFixed(2)}%</td>
        <td>
          ${isAlert
            ? '<span class="badge-alert-red"><i class="fa-solid fa-triangle-exclamation"></i> ALERTA > 5%</span>'
            : '<span class="badge-success-green"><i class="fa-solid fa-check"></i> CORRECTO</span>'}
        </td>
      </tr>`;
    });

    tableHtml += `</tbody></table>`;
    document.getElementById('table-inv-cedis-bloq').innerHTML = tableHtml;
  }

  // Export Table to Excel
  window.exportTableToExcel = function (tableId, fileName) {
    const table = document.getElementById(tableId);
    if (!table) return;
    const wb = XLSX.utils.table_to_book(table, { sheet: "Reporte Macropay" });
    XLSX.writeFile(wb, `${fileName || 'Reporte_Macropay'}.xlsx`);
  };

})();
