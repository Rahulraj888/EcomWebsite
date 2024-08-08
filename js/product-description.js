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
    return params.get('id');
}

function loadProductDetails() {
    const productName = getProductIdFromUrl();
    const product = products.find(prod => prod.name === productName);

    if (product) {
        const priceElement = document.querySelector('.product-price h4');
        priceElement.innerHTML = `₹${product.price} <small>Exc GST per month + A Refundable Deposit to be added in Cart</small>`;
        document.querySelector('.background-image-section .heading h1').textContent = product.name;
        document.querySelector('.background-image-section').style.backgroundImage = `url(${product.background})`;
        
        const mainImageElement = document.getElementById('main-product-image');
        mainImageElement.src = product.image;

        const thumbnailImages = document.querySelectorAll('.flex-control-thumbs img');
        if (thumbnailImages.length > 0) {
            thumbnailImages[0].src = product.image;      
            thumbnailImages[1].src = product.background;  
        }

        updatePrice(product.price);
        document.querySelector('.product-key-features p').textContent = `Processor: ${product.processor}, Brand: ${product.brand}`;
        document.querySelector('.product-meta p').textContent = `Category: ${product.category}`;
    } else {
        alert('Product not found');
    }
}

function updatePrice(basePrice) {
    const rentalOptions = document.querySelectorAll('.rental-option');
    const priceElement = document.querySelector('.product-price h4');
    const selectedPeriodElement = document.getElementById('selected-period');

    rentalOptions.forEach(option => {
        option.addEventListener('click', function() {
            rentalOptions.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
            const period = this.getAttribute('data-period');
            selectedPeriodElement.textContent = period;

            let multiplier = 1;
            if (period === '1 Week') multiplier = 1;
            else if (period === '15 Days') multiplier = 1.5;
            else if (period === '1 Month') multiplier = 2;
            else if (period === '3 Months') multiplier = 5;

            const newPrice = (basePrice * multiplier).toFixed(2);
            priceElement.innerHTML = `₹${newPrice} <small>Exc GST per month + A Refundable Deposit to be added in Cart</small>`;
        });
    });
}

document.addEventListener('DOMContentLoaded', () => {
    loadProductDetails();
});


document.querySelector('.add-to-cart button').addEventListener('click', function() {
    const productId = getProductIdFromUrl();
    const product = products[productId];

    const quantity = parseInt(document.querySelector('.quantity-input').value);
    const selectedPeriod = document.querySelector('.rental-option.active').getAttribute('data-period');
    const price = parseFloat(document.querySelector('.product-price h4').textContent.replace('₹', ''));

    const cartProduct = {
        name: product.name,
        image: product.image,
        quantity: quantity,
        price: price,
        period: selectedPeriod
    };

    addToCart(cartProduct);
});


function changeImage(element) {
    var mainImage = document.getElementById('main-product-image');
    mainImage.src = element.src;
}