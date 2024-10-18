// Dummy data vendor dan produk
let vendorData = [
  {
    name: "Vendor A",
    contact: "08123456789",
    qualified: false,
    rating: 4.5,
    pending: true,
    products: [
      { name: "Nike Air Zoom Pegasus", price: 1500000, stock: 10, rating: 4.5 },
      { name: "Adidas Ultraboost", price: 1800000, stock: 5, rating: 4.0 },
    ],
  },
  {
    name: "Vendor B",
    contact: "08198765432",
    qualified: true,
    rating: 4.8,
    pending: false,
    products: [
      { name: "Converse Chuck Taylor", price: 1200000, stock: 8, rating: 4.7 },
    ],
  },
  {
    name: "Vendor C",
    contact: "08122334455",
    qualified: false,
    rating: 3.9,
    pending: true,
    products: [
      {
        name: "Timberland Classic Boot",
        price: 2500000,
        stock: 3,
        rating: 3.5,
      },
    ],
  },
];

// Fungsi untuk memperbarui statistik ringkasan
function updateOverviewStats() {
  const totalVendors = vendorData.length;
  const qualifiedVendors = vendorData.filter(
    (vendor) => vendor.qualified
  ).length;
  const pendingVendors = vendorData.filter((vendor) => vendor.pending).length;
  const totalProducts = vendorData.reduce(
    (sum, vendor) => sum + vendor.products.length,
    0
  );

  document.getElementById("totalVendors").textContent = totalVendors;
  document.getElementById("qualifiedVendors").textContent = qualifiedVendors;
  document.getElementById("pendingVendors").textContent = pendingVendors;
  document.getElementById("totalProducts").textContent = totalProducts;
}

// Fungsi untuk memperbarui grafik kualifikasi vendor
function updateQualificationChart() {
  const ctx = document.getElementById("qualificationChart").getContext("2d");
  const qualifiedVendors = vendorData.filter(
    (vendor) => vendor.qualified
  ).length;
  const pendingVendors = vendorData.filter((vendor) => vendor.pending).length;

  new Chart(ctx, {
    type: "bar",
    data: {
      labels: ["Qualified", "Pending"],
      datasets: [
        {
          label: "Vendor Status",
          data: [qualifiedVendors, pendingVendors],
          backgroundColor: ["#28a745", "#ffc107"],
        },
      ],
    },
  });
}

// Fungsi untuk memperbarui daftar vendor berdasarkan filter
function updateVendorList() {
  const vendorList = document.getElementById("vendor-list");
  const searchQuery = document
    .getElementById("vendorSearch")
    .value.toLowerCase();
  const filterCriteria = document.getElementById("filterCriteria").value;

  vendorList.innerHTML = ""; // Kosongkan daftar sebelum mengisi ulang

  vendorData
    .filter((vendor) => {
      if (searchQuery && !vendor.name.toLowerCase().includes(searchQuery))
        return false;
      if (filterCriteria === "qualified" && !vendor.qualified) return false;
      if (filterCriteria === "pending" && !vendor.pending) return false;
      return true;
    })
    .forEach((vendor) => {
      const statusClass = vendor.qualified
        ? "badge bg-success"
        : "badge bg-danger";
      const pendingBadge = vendor.pending
        ? '<span class="badge bg-warning">Pending</span>'
        : "";

      const card = document.createElement("div");
      card.className = "col-md-4 mb-3";
      card.innerHTML = `
                <div class="card shadow-sm">
                    <div class="card-body">
                        <h5 class="card-title">${
                          vendor.name
                        } ${pendingBadge}</h5>
                        <p><i class="fas fa-phone"></i> ${vendor.contact}</p>
                        <p><span class="${statusClass}">${
        vendor.qualified ? "Qualified" : "Not Qualified"
      }</span></p>
                        <h6>Rating: ${
                          vendor.rating
                        } <i class="fas fa-star"></i></h6>
                        <button class="btn btn-primary" onclick="viewVendorDetails(${vendorData.indexOf(
                          vendor
                        )})">
                            Lihat Detail Vendor
                        </button>
                    </div>
                </div>
            `;
      vendorList.appendChild(card);
    });
}

// Fungsi untuk melihat detail vendor
function viewVendorDetails(vendorIndex) {
  const vendor = vendorData[vendorIndex];
  const modalBody = document.getElementById("vendorDetailModalBody");

  modalBody.innerHTML = `
        <h5>${vendor.name}</h5>
        <p><strong>Kontak:</strong> ${vendor.contact}</p>
        <p><strong>Status:</strong> ${
          vendor.qualified ? "Qualified" : "Not Qualified"
        }</p>
        <p><strong>Rating:</strong> ${
          vendor.rating
        } <i class="fas fa-star"></i></p>
        <h6>Produk yang Dijual:</h6>
        <ul>
            ${vendor.products
              .map(
                (product) => `
                <li>${product.name} (Rp. ${product.price}) - Stok: ${product.stock} - Rating: ${product.rating} <i class="fas fa-star"></i></li>
            `
              )
              .join("")}
        </ul>
        <button class="btn btn-warning" onclick="toggleQualification(${vendorIndex})">
            Ubah Kualifikasi
        </button>
    `;

  // Tampilkan modal
  const vendorDetailModal = new bootstrap.Modal(
    document.getElementById("vendorDetailModal")
  );
  vendorDetailModal.show();
}

// Fungsi untuk mengubah status kualifikasi vendor
function toggleQualification(vendorIndex) {
  vendorData[vendorIndex].qualified = !vendorData[vendorIndex].qualified;
  updateVendorList();
  updateOverviewStats();
  updateQualificationChart();
}

// Inisialisasi data setelah halaman dimuat
document.addEventListener("DOMContentLoaded", () => {
  updateOverviewStats();
  updateQualificationChart();
  updateVendorList();

  // Tambahkan event listener untuk filter
  document
    .getElementById("vendorSearch")
    .addEventListener("input", updateVendorList);
  document
    .getElementById("filterCriteria")
    .addEventListener("change", updateVendorList);
});
