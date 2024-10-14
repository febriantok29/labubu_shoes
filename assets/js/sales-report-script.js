// Dummy data penjualan untuk tiga kategori sepatu
const salesData = {
  harian: {
    Olahraga: [5, 8, 6, 10, 4, 9, 7],
    Kerja: [2, 3, 4, 5, 3, 2, 1],
    Casual: [4, 6, 8, 5, 7, 4, 6],
  },
  mingguan: {
    Olahraga: [35, 42, 31],
    Kerja: [12, 15, 11],
    Casual: [25, 30, 27],
  },
  bulanan: {
    Olahraga: [150, 130],
    Kerja: [55, 50],
    Casual: [90, 100],
  },
};

// Fungsi untuk menampilkan grafik penjualan
function renderSalesChart(period = "harian", category = "Semua") {
  const ctx = document.getElementById("salesReportChart").getContext("2d");

  let labels = [];
  let datasets = [];

  if (period === "harian") {
    labels = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu", "Minggu"];
  } else if (period === "mingguan") {
    labels = ["Minggu 1", "Minggu 2", "Minggu 3"];
  } else if (period === "bulanan") {
    labels = ["Bulan 1", "Bulan 2"];
  }

  if (category === "Semua") {
    datasets = [
      {
        label: "Olahraga",
        data: salesData[period]["Olahraga"],
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
      {
        label: "Kerja",
        data: salesData[period]["Kerja"],
        backgroundColor: "rgba(255, 206, 86, 0.2)",
        borderColor: "rgba(255, 206, 86, 1)",
        borderWidth: 1,
      },
      {
        label: "Casual",
        data: salesData[period]["Casual"],
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ];
  } else {
    datasets = [
      {
        label: category,
        data: salesData[period][category],
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
    ];
  }

  new Chart(ctx, {
    type: "bar",
    data: {
      labels: labels,
      datasets: datasets,
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

// Event listener untuk filter
document.getElementById("filterPeriod").addEventListener("change", function () {
  const selectedPeriod = this.value;
  const selectedCategory = document.getElementById("filterCategory").value;
  renderSalesChart(selectedPeriod, selectedCategory);
});

document
  .getElementById("filterCategory")
  .addEventListener("change", function () {
    const selectedCategory = this.value;
    const selectedPeriod = document.getElementById("filterPeriod").value;
    renderSalesChart(selectedPeriod, selectedCategory);
  });

// Fungsi untuk ekspor laporan ke PDF (simulasi)
function exportToPDF() {
  alert("Laporan berhasil diekspor ke PDF!");
}

// Fungsi untuk ekspor laporan ke Excel (simulasi)
function exportToExcel() {
  alert("Laporan berhasil diekspor ke Excel!");
}

// Fungsi untuk menampilkan hasil ekspor di halaman
function showReport() {
  const reportBody = document.getElementById("exported-report-body");
  reportBody.innerHTML = ""; // Kosongkan tabel sebelum mengisi ulang

  const period = document.getElementById("filterPeriod").value;
  const category = document.getElementById("filterCategory").value;

  const categoriesToShow =
    category === "Semua" ? ["Olahraga", "Kerja", "Casual"] : [category];
  const salesToShow = salesData[period];

  categoriesToShow.forEach((cat) => {
    salesToShow[cat].forEach((sales, index) => {
      const row = document.createElement("tr");
      row.innerHTML = `
                <td>${
                  period === "harian"
                    ? [
                        "Senin",
                        "Selasa",
                        "Rabu",
                        "Kamis",
                        "Jumat",
                        "Sabtu",
                        "Minggu",
                      ][index]
                    : period === "mingguan"
                    ? `Minggu ${index + 1}`
                    : `Bulan ${index + 1}`
                }</td>
                <td>${cat}</td>
                <td>${sales}</td>
            `;
      reportBody.appendChild(row);
    });
  });

  document.getElementById("exported-report").style.display = "block";
}

// Inisialisasi grafik penjualan setelah halaman dimuat
document.addEventListener("DOMContentLoaded", () => {
  renderSalesChart();
});
