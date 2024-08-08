const products = [
    { image: "../images/dashboard/DellLatitude1st_img.jpg", name: "Acer Laptop", price: 999, category: "Laptop", brand: "Acer", processor: "Intel", background:"../images/dashboard/macbook-background.webp" },
    { image: "../images/dashboard/Apple_img.jpg", name: "Dell G15 5530", price: 2999, category: "Laptop", brand: "Dell", processor: "AMD", background:"../images/dashboard/macbook-background.webp" },
    { image: "../images/dashboard/Acer_img.jpg", name: "Dell Latitude 5450", price: 799, category: "Laptop", brand: "Dell", processor: "Intel", background:"../images/dashboard/macbook-background.webp" },
    { image: "../images/dashboard/hp_image.jpg", name: "HP Pavilion", price: 799, category: "Laptop", brand: "HP", processor: "Intel" , background:"../images/dashboard/mackbook-background.webp"},
    { image: "../images/dashboard/DellLatitude2nd_img.jpg", name: "Sony Vaio", price: 799, category: "Laptop", brand: "Sony", processor: "Intel", background:"../images/dashboard/macbook-background.webp" },
    { image: "../images/dashboard/DellLatitude1st_img.jpg", name: "MacBook Air", price: 1299, category: "MacBook", brand: "Apple", processor: "Apple Chip", background:"../images/dashboard/macbook-background.webp" },
    { image: "../images/dashboard/Dellg15_img.jpg", name: "MacBook Pro", price: 1999, category: "MacBook", brand: "Apple", processor: "Apple Chip", background:"../images/dashboard/macbook-background.webp" },
    { image: "../images/dashboard/Ipad-air-2-1.jpg", name: "Apple iPad Air 2", price: 1200, category: "IPad", brand: "Apple", processor: "Apple Chip", background:"../images/dashboard/macbook-background.webp" }
];

function getProductIdFromUrl() {
    const params = new URLSearchParams(window.location.search);
    return parseInt(params.get('id'));
}

function loadProductDetails() {
    const productId = getProductIdFromUrl();
    const product = products[productId];

    if (product) {
        document.querySelector('.background-image-section .heading h1').textContent = product.name;
        document.querySelector('.background-image-section').style.backgroundImage = `url(${product.background})`;
        document.querySelector('.container .img-fluid').src = product.image;
        document.querySelector('.product-price-range h3').textContent = `₹${product.price}.00`;
        document.querySelector('.product-key-features p').textContent = `Processor: ${product.processor}, Brand: ${product.brand}`;
        document.querySelector('.product-meta p').textContent = `Category: ${product.category}`;
    } else {
        alert('Product not found');
    }
}
document.addEventListener('DOMContentLoaded', loadProductDetails);
