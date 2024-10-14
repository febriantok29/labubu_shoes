// Dummy data pesanan dan pelanggan
let orderData = [
  {
    customer: "Andi",
    product: "Nike Air Zoom Pegasus",
    quantity: 2,
    status: "Diproses",
  },
  {
    customer: "Budi",
    product: "Adidas Ultraboost",
    quantity: 1,
    status: "Dikirim",
  },
  {
    customer: "Cici",
    product: "Converse Chuck Taylor",
    quantity: 3,
    status: "Selesai",
  },
];

let customers = ["Andi", "Budi", "Cici", "Dian", "Eka"];
let products = [
  "Nike Air Zoom Pegasus",
  "Adidas Ultraboost",
  "Converse Chuck Taylor",
];

let editOrderIndex = null; // Variabel untuk menyimpan index pesanan yang sedang diedit

// Fungsi untuk memperbarui tabel pesanan
function updateOrderTable() {
  const tableBody = document.getElementById("order-table");
  tableBody.innerHTML = ""; // Kosongkan tabel sebelum mengisi ulang

  orderData.forEach((order, index) => {
    const row = document.createElement("tr");
    const statusColor = getStatusColor(order.status);

    row.innerHTML = `
            <td>${order.customer}</td>
            <td>${order.product}</td>
            <td>${order.quantity}</td>
            <td style="background-color:${statusColor};">${order.status}</td>
            <td>
                <button class="btn btn-sm btn-warning" onclick="loadOrderData(${index})">Edit</button>
                <button class="btn btn-sm btn-info" onclick="updateOrderStatus(${index})">Update Status</button>
                <button class="btn btn-sm btn-danger" onclick="deleteOrder(${index})">Hapus</button>
            </td>
        `;

    tableBody.appendChild(row);
  });
}

// Fungsi untuk mendapatkan warna latar belakang status pesanan
function getStatusColor(status) {
  switch (status) {
    case "Diproses":
      return "#f1c40f"; // Kuning
    case "Dikirim":
      return "#3498db"; // Biru
    case "Selesai":
      return "#2ecc71"; // Hijau
    default:
      return "#ecf0f1"; // Abu-abu (untuk status lainnya)
  }
}

// Fungsi untuk menampilkan daftar pelanggan (autocomplete)
function updateCustomerList() {
  const customerList = document.getElementById("customerList");
  customerList.innerHTML = "";
  customers.forEach((customer) => {
    const option = document.createElement("option");
    option.value = customer;
    customerList.appendChild(option);
  });
}

// Fungsi untuk menampilkan daftar produk
function updateProductDropdown() {
  const productDropdown = document.getElementById("orderedProduct");
  productDropdown.innerHTML = "";
  products.forEach((product) => {
    const option = document.createElement("option");
    option.value = product;
    productDropdown.appendChild(option);
  });
}

// Fungsi untuk menambahkan atau memperbarui pesanan
document
  .getElementById("addOrderForm")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    const customerName = document.getElementById("customerName").value;
    const orderedProduct = document.getElementById("orderedProduct").value;
    const orderQuantity = document.getElementById("orderQuantity").value;

    if (editOrderIndex !== null) {
      // Jika sedang dalam mode edit, update data yang ada
      orderData[editOrderIndex] = {
        customer: customerName,
        product: orderedProduct,
        quantity: parseInt(orderQuantity),
        status: "Diproses", // Default status untuk pesanan yang diedit
      };
      editOrderIndex = null; // Reset index setelah edit selesai
    } else {
      // Jika tidak sedang dalam mode edit, tambahkan pesanan baru
      orderData.push({
        customer: customerName,
        product: orderedProduct,
        quantity: parseInt(orderQuantity),
        status: "Dipesan", // Status default untuk pesanan baru
      });
    }

    updateOrderTable();
    document.getElementById("addOrderForm").reset(); // Reset form setelah submit
    const modal = bootstrap.Modal.getInstance(
      document.getElementById("addOrderModal")
    );
    modal.hide(); // Tutup modal setelah submit
  });

// Fungsi untuk memuat data pesanan ke dalam form saat tombol Edit diklik
function loadOrderData(index) {
  const order = orderData[index];

  // Isi form dengan data pesanan yang akan diedit
  document.getElementById("customerName").value = order.customer;
  document.getElementById("orderedProduct").value = order.product;
  document.getElementById("orderQuantity").value = order.quantity;

  editOrderIndex = index; // Simpan index dari pesanan yang sedang diedit
  const modal = new bootstrap.Modal(document.getElementById("addOrderModal"));
  modal.show(); // Tampilkan modal form untuk mengedit data
}

// Fungsi untuk memperbarui status pesanan
function updateOrderStatus(index) {
  const currentStatus = orderData[index].status;

  if (currentStatus === "Dipesan") {
    orderData[index].status = "Diproses";
  } else if (currentStatus === "Diproses") {
    orderData[index].status = "Dikirim";
  } else if (currentStatus === "Dikirim") {
    orderData[index].status = "Selesai";
  }

  updateOrderTable();
}

// Fungsi untuk menghapus pesanan
function deleteOrder(index) {
  orderData.splice(index, 1); // Hapus pesanan dari array
  updateOrderTable();
}

// Inisialisasi tabel pesanan dan komponen lainnya setelah halaman dimuat
document.addEventListener("DOMContentLoaded", () => {
  updateOrderTable();
  updateCustomerList();
  updateProductDropdown();
});
