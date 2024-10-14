// Dummy data sepatu
let shoeStockData = [
  {
    name: "Nike Air Zoom Pegasus",
    category: "Olahraga",
    stock: 5,
    status: "Tersedia",
  },
  {
    name: "Adidas Ultraboost",
    category: "Olahraga",
    stock: 2,
    status: "Hampir Habis",
  },
  {
    name: "Converse Chuck Taylor",
    category: "Casual",
    stock: 0,
    status: "Habis",
  },
];

// Fungsi untuk memperbarui tabel stok sepatu
function updateShoeStockTable() {
  const tableBody = document.getElementById("shoe-stock-table");
  tableBody.innerHTML = ""; // Kosongkan tabel sebelum mengisi ulang

  shoeStockData.forEach((shoe, index) => {
    const row = document.createElement("tr");

    row.innerHTML = `
            <td>${shoe.name}</td>
            <td>${shoe.category}</td>
            <td>${shoe.stock}</td>
            <td>${shoe.status}</td>
            <td>
                <button class="btn btn-sm btn-primary" onclick="restock(${index})">Restock</button>
                <button class="btn btn-sm btn-danger" onclick="deleteShoe(${index})">Hapus</button>
                <button class="btn btn-sm btn-warning" onclick="markDamaged(${index})">Rusak</button>
            </td>
        `;

    tableBody.appendChild(row);
  });
}

// Fungsi untuk menambahkan sepatu baru
document.getElementById("addShoeForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const shoeName = document.getElementById("shoeName").value;
  const shoeCategory = document.getElementById("shoeCategory").value;
  const shoeStock = document.getElementById("shoeStock").value;

  shoeStockData.push({
    name: shoeName,
    category: shoeCategory,
    stock: parseInt(shoeStock),
    status:
      shoeStock > 3 ? "Tersedia" : shoeStock > 0 ? "Hampir Habis" : "Habis",
  });

  updateShoeStockTable();
  document.getElementById("addShoeForm").reset(); // Reset form setelah submit
  const modal = bootstrap.Modal.getInstance(
    document.getElementById("addShoeModal")
  );
  modal.hide(); // Tutup modal setelah submit
});

// Fungsi untuk restock sepatu
function restock(index) {
  shoeStockData[index].stock += 5; // Tambahkan stok sepatu sebanyak 5
  shoeStockData[index].status =
    shoeStockData[index].stock > 3 ? "Tersedia" : "Hampir Habis";
  updateShoeStockTable();
}

// Fungsi untuk menghapus sepatu
function deleteShoe(index) {
  shoeStockData.splice(index, 1); // Hapus sepatu dari array
  updateShoeStockTable();
}

// Fungsi untuk menandai sepatu rusak
function markDamaged(index) {
  shoeStockData[index].status = "Rusak";
  updateShoeStockTable();
}

// Inisialisasi tabel stok setelah halaman dimuat
document.addEventListener("DOMContentLoaded", () => {
  updateShoeStockTable();
});
