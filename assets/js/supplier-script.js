// Dummy data supplier
let supplierData = [
  {
    name: "Supplier A",
    contact: "08123456789",
    product: "Nike Air Zoom Pegasus",
    price: 100,
  },
  {
    name: "Supplier B",
    contact: "08198765432",
    product: "Adidas Ultraboost",
    price: 90,
  },
  {
    name: "Supplier C",
    contact: "08122334455",
    product: "Converse Chuck Taylor",
    price: 80,
  },
];

let editIndex = null; // Variabel untuk menyimpan index supplier yang sedang diedit

// Fungsi untuk memperbarui tabel supplier
function updateSupplierTable() {
  const tableBody = document.getElementById("supplier-table");
  tableBody.innerHTML = ""; // Kosongkan tabel sebelum mengisi ulang

  supplierData.forEach((supplier, index) => {
    const row = document.createElement("tr");

    row.innerHTML = `
          <td>${supplier.name}</td>
          <td>${supplier.contact}</td>
          <td>${supplier.product}</td>
          <td>${supplier.price}</td>
          <td>
              <button class="btn btn-sm btn-warning" onclick="loadSupplierData(${index})">Edit</button>
              <button class="btn btn-sm btn-danger" onclick="deleteSupplier(${index})">Hapus</button>
          </td>
      `;

    tableBody.appendChild(row);
  });
}

// Fungsi untuk menambahkan supplier baru
document
  .getElementById("addSupplierForm")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    const supplierName = document.getElementById("supplierName").value;
    const supplierContact = document.getElementById("supplierContact").value;
    const supplierProduct = document.getElementById("supplierProduct").value;
    const productPrice = document.getElementById("productPrice").value;

    if (editIndex !== null) {
      // Jika sedang dalam mode edit, update data yang ada
      supplierData[editIndex] = {
        name: supplierName,
        contact: supplierContact,
        product: supplierProduct,
        price: parseFloat(productPrice),
      };
      editIndex = null; // Reset index setelah edit selesai
    } else {
      // Jika tidak sedang dalam mode edit, tambahkan supplier baru
      supplierData.push({
        name: supplierName,
        contact: supplierContact,
        product: supplierProduct,
        price: parseFloat(productPrice),
      });
    }

    updateSupplierTable();
    document.getElementById("addSupplierForm").reset(); // Reset form setelah submit
    const modal = bootstrap.Modal.getInstance(
      document.getElementById("addSupplierModal")
    );
    modal.hide(); // Tutup modal setelah submit
  });

// Fungsi untuk memuat data supplier ke dalam form saat tombol Edit diklik
function loadSupplierData(index) {
  const supplier = supplierData[index];

  // Isi form dengan data supplier yang akan diedit
  document.getElementById("supplierName").value = supplier.name;
  document.getElementById("supplierContact").value = supplier.contact;
  document.getElementById("supplierProduct").value = supplier.product;
  document.getElementById("productPrice").value = supplier.price;

  editIndex = index; // Simpan index dari supplier yang sedang diedit
  const modal = new bootstrap.Modal(
    document.getElementById("addSupplierModal")
  );
  modal.show(); // Tampilkan modal form untuk mengedit data
}

// Fungsi untuk menghapus supplier
function deleteSupplier(index) {
  supplierData.splice(index, 1); // Hapus supplier dari array
  updateSupplierTable();
}

// Inisialisasi tabel supplier setelah halaman dimuat
document.addEventListener("DOMContentLoaded", () => {
  updateSupplierTable();
});
