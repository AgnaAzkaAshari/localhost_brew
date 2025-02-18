// Ambil elemen tombol keranjang dan sidebar
const cartBtn = document.getElementById("cart-btn");
const cartSidebar = document.getElementById("cart-sidebar");
const closeCartBtn = document.getElementById("closeCart");

// Fungsi untuk membuka sidebar keranjang
if (cartBtn && cartSidebar) {
  cartBtn.addEventListener("click", () => {
    cartSidebar.classList.add("active");
  });
}

// Fungsi untuk menutup sidebar keranjang
if (closeCartBtn && cartSidebar) {
  closeCartBtn.addEventListener("click", () => {
    cartSidebar.classList.remove("active");
  });
}

// Inisialisasi keranjang
let cart = [];

// Fungsi untuk menambahkan item ke keranjang
function addToCart(productName, productPrice) {
  cart.push({ name: productName, price: productPrice });
  updateCartDisplay();
}

// Fungsi untuk memperbarui tampilan keranjang
function updateCartDisplay() {
  const cartItemsList = document.getElementById("cart-items");
  const cartTotalPriceElement = document.getElementById("cart-total-price");

  if (!cartItemsList || !cartTotalPriceElement) {
    console.error("Elemen keranjang tidak ditemukan.");
    return;
  }

  cartItemsList.innerHTML = "";
  let totalPrice = 0;

  cart.forEach((item, index) => {
    totalPrice += item.price;

    const listItem = document.createElement("li");
    listItem.innerHTML = `
      ${item.name} - Rp ${item.price.toLocaleString()} 
      <button onclick="removeFromCart(${index})">Hapus</button>
    `;
    cartItemsList.appendChild(listItem);
  });

  cartTotalPriceElement.textContent = `Rp ${totalPrice.toLocaleString()}`;
}

  function showSearchResults() {
    let query = document.getElementById("searchInput").value.toLowerCase();
    let resultsContainer = document.getElementById("searchResults");

    resultsContainer.innerHTML = ""; // Bersihkan hasil sebelumnya

    if (query === "") {
      resultsContainer.style.display = "none";
      return;
    }

    let results = Object.keys(menuRoutes).filter(item => item.includes(query));

    if (results.length > 0) {
      resultsContainer.style.display = "block";
      results.forEach(item => {
        let resultItem = document.createElement("a");
        resultItem.href = menuRoutes[item];
        resultItem.textContent = item;
        resultsContainer.appendChild(resultItem);
      });
    } else {
      resultsContainer.style.display = "none";
    }
  }

  function handleSearch() {
    let query = document.getElementById("searchInput").value.toLowerCase();
    if (menuRoutes[query]) {
      window.location.href = menuRoutes[query];
    } else {
      alert("Menu atau produk tidak ditemukan!");
    }
  }

  // Data rute menu & produk
  let menuRoutes = {
    "home": "/home",
    "about": "/about",
    "contact": "/contact",
    "product a": "/products/a",
    "product b": "/products/b",
    "menu special": "/menu/special",
    "menu drinks": "/menu/drinks",
    "ceo's secret": "/menu/ceos-secret",
    "latte": "/menu/latte",
    "espresso": "/menu/espresso",
    "americano": "/menu/americano",
    "cappuccino": "/menu/cappuccino",
    "mocha": "/menu/mocha"
  };

  // Fungsi untuk menampilkan hasil pencarian dalam dropdown
  function showSearchResults() {
    let query = document.getElementById("searchInput").value.toLowerCase();
    let resultsContainer = document.getElementById("searchResults");

    if (!resultsContainer) {
      console.error("Elemen searchResults tidak ditemukan.");
      return;
    }

    resultsContainer.innerHTML = ""; // Bersihkan hasil sebelumnya

    if (query === "") {
      resultsContainer.style.display = "none";
      return;
    }

    let results = Object.keys(menuRoutes).filter(item => item.includes(query));

    if (results.length > 0) {
      resultsContainer.style.display = "block";
      results.forEach(item => {
        let resultItem = document.createElement("a");
        resultItem.href = menuRoutes[item];
        resultItem.textContent = item;
        resultItem.classList.add("search-result-item");
        resultsContainer.appendChild(resultItem);
      });
    } else {
      resultsContainer.style.display = "none";
    }
  }

  // Fungsi untuk menangani pencarian ketika tombol "Search" ditekan
  function handleSearch(event) {
    event.preventDefault(); // Hindari reload halaman

    let query = document.getElementById("searchInput").value.toLowerCase();
    let foundItem = Object.keys(menuRoutes).find(item => item.includes(query));

    if (foundItem) {
      window.location.href = menuRoutes[foundItem];
    } else {
      alert("Menu atau produk tidak ditemukan! Coba masukkan kata kunci lain.");
    }
  }

  document.addEventListener("DOMContentLoaded", () => {
    // Tambahkan event listener ke form pencarian
    const searchForm = document.getElementById("searchForm");
    if (searchForm) {
      searchForm.addEventListener("submit", handleSearch);
    } else {
      console.error("Form pencarian tidak ditemukan.");
    }

    // Tambahkan event listener ke input search untuk menampilkan hasil pencarian langsung
    const searchInput = document.getElementById("searchInput");
    if (searchInput) {
      searchInput.addEventListener("input", showSearchResults);
    }
  });

// Fungsi untuk menghapus item dari keranjang
function removeFromCart(index) {
  if (index >= 0 && index < cart.length) {
    cart.splice(index, 1);
    updateCartDisplay();
  } else {
    console.error("Index tidak valid untuk penghapusan item.");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const openCartBtn = document.getElementById("open-cart");
  const closeCartSidebarBtn = document.getElementById("close-cart");
  const cartSidebar = document.getElementById("cart-sidebar");

  if (openCartBtn && cartSidebar) {
    openCartBtn.addEventListener("click", () => {
      cartSidebar.classList.add("active");
    });
  }

  if (closeCartSidebarBtn && cartSidebar) {
    closeCartSidebarBtn.addEventListener("click", () => {
      cartSidebar.classList.remove("active");
    });
  }

  const cartButtons = document.querySelectorAll(".cart-button");
  cartButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const card = button.closest(".card");
      if (!card) return;

      const productName = card.querySelector("h3")?.textContent || "Produk Tanpa Nama";
      const productPriceText = card.querySelector("p")?.textContent?.match(/Rp(\d+\.\d+|\d+)/);
      const productPrice = productPriceText ? parseFloat(productPriceText[1].replace(".", "")) : 0;

      addToCart(productName, productPrice);
      alert(`${productName} berhasil ditambahkan ke keranjang!`);
    });
  });

  const shopNowBtn = document.getElementById("btn");
  if (shopNowBtn) {
    shopNowBtn.addEventListener("click", () => {
      window.location.href = "#menu";
    });
  } else {
    console.error("Tombol 'Shop Now' tidak ditemukan.");
  }

  const contactForm = document.getElementById("contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const name = document.getElementById("name").value;
      const email = document.getElementById("email").value;
      const phone = document.getElementById("phone").value;
      const message = document.getElementById("message").value;

      if (!name || !email || !message) {
        alert("Harap lengkapi semua data yang wajib diisi!");
        return;
      }

      const notification = document.getElementById("notification");
      if (!notification) {
        console.error("Elemen notifikasi tidak ditemukan.");
        return;
      }

      notification.style.display = "block";
      notification.innerHTML = "Mengirim pesan...";
      notification.style.color = "blue";

      fetch("send_message.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone, message }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            notification.innerHTML = "Pesan berhasil dikirim!";
            notification.style.color = "green";
            contactForm.reset();
          } else {
            notification.innerHTML = "Gagal mengirim pesan. Silakan coba lagi.";
            notification.style.color = "red";
          }
        })
        .catch((error) => {
          console.error("Error:", error);
          notification.innerHTML = "Terjadi kesalahan. Silakan coba lagi!";
          notification.style.color = "red";
        });
    });
  } else {
    console.error("Form kontak tidak ditemukan.");
  }
});

document.getElementById('checkout-btn').addEventListener('click', function() {
  document.querySelector('form').submit();
});