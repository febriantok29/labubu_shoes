// Dummy data vendor dan produk
let vendorData = [
  {
    name: "Vendor A",
    contact: "08123456789",
    qualified: false,
    products: [
      { name: "Nike Air Zoom Pegasus", price: 1500000, stock: 10 },
      { name: "Adidas Ultraboost", price: 1800000, stock: 5 },
    ],
  },
  {
    name: "Vendor B",
    contact: "08198765432",
    qualified: true,
    products: [{ name: "Converse Chuck Taylor", price: 1200000, stock: 8 }],
  },
  {
    name: "Vendor C",
    contact: "08122334455",
    qualified: false,
    products: [{ name: "Timberland Classic Boot", price: 2500000, stock: 3 }],
  },
];

// Fungsi untuk memperbarui tampilan vendor
function updateVendorCards() {
  const vendorCards = document.getElementById("vendor-cards");
  vendorCards.innerHTML = ""; // Kosongkan sebelum mengisi ulang

  vendorData.forEach((vendor, index) => {
    const status = vendor.qualified ? "Qualified" : "Not Qualified";
    const statusClass = vendor.qualified
      ? "badge bg-success"
      : "badge bg-danger";

    const card = document.createElement("div");
    card.className = "col-md-4 mb-3";
    card.innerHTML = `
            <div class="card shadow-sm">
                <div class="card-body">
                    <h5 class="card-title">${vendor.name}</h5>
                    <p><i class="fas fa-phone"></i> ${vendor.contact}</p>
                    <p><span class="${statusClass}">${status}</span></p>
                    <h6>Produk yang Disuplai:</h6>
                    <ul>
                        ${vendor.products
                          .map(
                            (product) =>
                              `<li>${product.name} (Rp. ${product.price}) - Stok: ${product.stock}</li>`
                          )
                          .join("")}
                    </ul>
                    <button class="btn btn-primary" onclick="toggleQualification(${index})">
                        Ubah Kualifikasi
                    </button>
                </div>
            </div>
        `;
    vendorCards.appendChild(card);
  });
}

// Fungsi untuk mengubah status kualifikasi vendor
function toggleQualification(index) {
  vendorData[index].qualified = !vendorData[index].qualified; // Ubah status kualifikasi
  updateVendorCards(); // Perbarui kartu vendor
}

// Inisialisasi tampilan vendor setelah halaman dimuat
document.addEventListener("DOMContentLoaded", () => {
  updateVendorCards();
});
