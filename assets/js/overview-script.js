// Dummy data vendor dan produk
let vendorData = [
  {
    name: "Vendor A",
    products: ["Nike Air Zoom Pegasus", "Adidas Ultraboost"],
    qualified: true,
  },
  { name: "Vendor B", products: ["Converse Chuck Taylor"], qualified: false },
  { name: "Vendor C", products: ["Timberland Classic Boot"], qualified: true },
];

// Fungsi untuk memperbarui statistik ringkasan
function updateOverviewStats() {
  const totalVendors = vendorData.length;
  const qualifiedVendors = vendorData.filter(
    (vendor) => vendor.qualified
  ).length;
  const totalProducts = vendorData.reduce(
    (sum, vendor) => sum + vendor.products.length,
    0
  );

  document.getElementById("totalVendors").textContent = totalVendors;
  document.getElementById("qualifiedVendors").textContent = qualifiedVendors;
  document.getElementById("totalProducts").textContent = totalProducts;
}

// Fungsi untuk memperbarui grafik kualifikasi vendor
function updateQualificationChart() {
  const ctx = document.getElementById("qualificationChart").getContext("2d");
  const qualifiedVendors = vendorData.filter(
    (vendor) => vendor.qualified
  ).length;
  const notQualifiedVendors = vendorData.length - qualifiedVendors;

  new Chart(ctx, {
    type: "doughnut",
    data: {
      labels: ["Qualified", "Not Qualified"],
      datasets: [
        {
          label: "Vendor Qualification",
          data: [qualifiedVendors, notQualifiedVendors],
          backgroundColor: ["#28a745", "#dc3545"],
        },
      ],
    },
  });
}

// Fungsi untuk memperbarui kartu vendor dan produk
function updateVendorProductCards() {
  const vendorProductCards = document.getElementById("vendorProductCards");
  vendorProductCards.innerHTML = ""; // Kosongkan cards sebelum mengisi ulang

  vendorData.forEach((vendor) => {
    const card = document.createElement("div");
    card.className = "col-md-4 mb-3";
    card.innerHTML = `
            <div class="card shadow-sm">
                <div class="card-body">
                    <h5 class="card-title">${vendor.name}</h5>
                    <ul>
                        ${vendor.products
                          .map((product) => `<li>${product}</li>`)
                          .join("")}
                    </ul>
                    <p class="card-text"><strong>Status:</strong> ${
                      vendor.qualified ? "Qualified" : "Not Qualified"
                    }</p>
                    <a href="vendor-details.html" class="btn btn-primary">Lihat Detail</a>
                </div>
            </div>
        `;
    vendorProductCards.appendChild(card);
  });
}

// Inisialisasi statistik, grafik, dan kartu vendor setelah halaman dimuat
document.addEventListener("DOMContentLoaded", () => {
  updateOverviewStats();
  updateQualificationChart();
  updateVendorProductCards();
});
