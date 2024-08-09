let products = [];

function loadProducts() {
    fetch('/json/products.json')
        .then(response => response.json())
        .then(data => {
            products = data;
            loadProductDetails(); // Load product details after products are fetched
        })
        .catch(error => console.error('Error loading products:', error));
}

document.querySelector('.add-to-cart button').addEventListener('click', function() {
    const productName = getProductIdFromUrl();
    const product = products.find(prod => prod.name === productName);

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

        const filteredProducts = products.filter(p => p.category === product.category && p.name !== product.name);
        let suggestedProducts = filteredProducts.slice(0, 3);
        // If fewer than 3 products are found, fill with other products
        if (suggestedProducts.length < 3) {
            const remainingProducts = products.filter(p => p.name !== product.name && !suggestedProducts.includes(p));
            suggestedProducts = suggestedProducts.concat(remainingProducts.slice(0, 3 - suggestedProducts.length));
        }
        console.log(suggestedProducts);
        displaySuggestedProducts(suggestedProducts);
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
    loadProducts(); // Load products when the DOM is ready
});

function changeImage(element) {
    var mainImage = document.getElementById('main-product-image');
    mainImage.src = element.src;
}

function displaySuggestedProducts(products) {
    const productContainer = document.getElementById('product-list');
    productContainer.innerHTML = '';
    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.classList.add('col-lg-4', 'col-md-6', 'col-sm-12', 'd-flex', 'justify-content-center', 'mb-4');
        productCard.innerHTML = `
            <div class="card" style="width: 18rem;">
                <img src="${product.image}" class="card-img-top" alt="${product.name}">
                <div class="card-body">
                    <h5 class="card-title">${product.name}</h5>
                    <p class="card-text">₹${product.price}</p>
                    <a href="/html/product-description.html?id=${encodeURIComponent(product.name)}" class="btn btn-primary">Select Options</a>
                </div>
            </div>
        `;
        
        productContainer.appendChild(productCard);
    });
}
