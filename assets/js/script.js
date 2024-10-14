// Dummy data untuk penjualan dan stok
const salesData = [5, 8, 12, 20, 15, 18, 25];
const stockData = [50, 45, 30, 25, 20, 15, 10];

function updateDashboard() {
  // Total Stok Sepatu
  const totalStock = stockData.reduce((acc, cur) => acc + cur, 0);
  document.getElementById("total-stock").textContent = totalStock;

  // Penjualan Hari Ini
  const salesToday = salesData[salesData.length - 1];
  document.getElementById("sales-today").textContent = salesToday;

  // Stok Habis
  const outOfStock = stockData.filter((stock) => stock === 0).length;
  document.getElementById("out-of-stock-count").textContent = outOfStock;
}

// Fungsi untuk menampilkan grafik penjualan
function renderSalesChart() {
  const ctx = document.getElementById("salesChart").getContext("2d");
  new Chart(ctx, {
    type: "line",
    data: {
      labels: ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu", "Minggu"],
      datasets: [
        {
          label: "Penjualan Mingguan",
          data: salesData,
          borderColor: "rgba(54, 162, 235, 1)",
          fill: false,
        },
      ],
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
}

// Fungsi untuk menampilkan grafik stok
function renderStockChart() {
  const ctx = document.getElementById("stockChart").getContext("2d");
  new Chart(ctx, {
    type: "bar",
    data: {
      labels: [
        "Nike",
        "Adidas",
        "Converse",
        "Timberland",
        "Clarks",
        "New Balance",
      ],
      datasets: [
        {
          label: "Stok Sepatu",
          data: stockData,
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
}

// Inisialisasi dashboard setelah halaman dimuat
document.addEventListener("DOMContentLoaded", () => {
  updateDashboard();
  renderSalesChart();
  renderStockChart();
});
