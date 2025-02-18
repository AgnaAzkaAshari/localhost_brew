<?php
// Menghubungkan ke database
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "coffee_shop";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $product_name = $_POST['product_name'] ?? '';
    $quantity = $_POST['quantity'] ?? '';
    $total_price = $_POST['total_price'] ?? '';

    if ($product_name && $quantity && $total_price) {
        $stmt = $conn->prepare("INSERT INTO orders (product_name, quantity, total_price) VALUES (?, ?, ?)");
        $stmt->bind_param("sii", $product_name, $quantity, $total_price);

        if ($stmt->execute()) {
            echo "<script>alert('Pesanan berhasil disimpan!'); window.location.href='index.html';</script>";
        } else {
            echo "Error: " . $stmt->error;
        }

        $stmt->close();
    } else {
        echo "<script>alert('Semua field harus diisi!');</script>";
    }
}

$conn->close();
?>