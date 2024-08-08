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

const productContainer = document.getElementById('product-list');
const categoryFilters = document.querySelectorAll('.category-filter');
const brandFilters = document.querySelectorAll('.brand-filter');
const processorFilters = document.querySelectorAll('.processor-filter');
const priceRange = document.getElementById('priceRange');
const priceMin = document.getElementById('priceMin');
const priceMax = document.getElementById('priceMax');

function getQueryParams() {
    const params = new URLSearchParams(window.location.search);
    return {
        category: params.get('category') || '',
        brand: params.get('brand') || '',
        processor: params.get('processor') || '',
        maxPrice: params.get('maxPrice') || priceRange.max
    };
}

function setFiltersFromQueryParams() {
    const params = getQueryParams();

    if (params.category) {
        document.getElementById(params.category.toLowerCase()).checked = true;
    }
    if (params.brand) {
        document.getElementById(params.brand.toLowerCase()).checked = true;
    }
    if (params.processor) {
        document.getElementById(params.processor.replace(' ', '-').toLowerCase()).checked = true;
    }
    priceRange.value = params.maxPrice;
    priceMax.innerText = params.maxPrice;
}

priceRange.addEventListener('input', () => {
    priceMax.innerText = priceRange.value;
    filterProducts();
});

categoryFilters.forEach(filter => {
    filter.addEventListener('change', filterProducts);
});

brandFilters.forEach(filter => {
    filter.addEventListener('change', filterProducts);
});

processorFilters.forEach(filter => {
    filter.addEventListener('change', filterProducts);
});

function filterProducts() {
    const selectedCategories = Array.from(categoryFilters)
        .filter(filter => filter.checked)
        .map(filter => filter.value);

    const selectedBrands = Array.from(brandFilters)
        .filter(filter => filter.checked)
        .map(filter => filter.value);

    const selectedProcessors = Array.from(processorFilters)
        .filter(filter => filter.checked)
        .map(filter => filter.value);

    const maxPrice = parseInt(priceRange.value);

    const filteredProducts = products.filter(product => {
        const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(product.category);
        const matchesBrand = selectedBrands.length === 0 || selectedBrands.includes(product.brand);
        const matchesProcessor = selectedProcessors.length === 0 || selectedProcessors.includes(product.processor);
        const matchesPrice = product.price <= maxPrice;
        return matchesCategory && matchesBrand && matchesProcessor && matchesPrice;
    });

    displayProducts(filteredProducts);
}

function displayProducts(products) {
    productContainer.innerHTML = '';

    if (products.length === 0) {
        const noProductsMessage = document.createElement('div');
        noProductsMessage.classList.add('col-12', 'text-center', 'mt-4', 'no-products-message');
        noProductsMessage.innerHTML = `
            <div class="alert alert-warning" role="alert">
                <i class="bi bi-exclamation-circle"></i> No products were found matching your selection.
            </div>`;
        productContainer.appendChild(noProductsMessage);
    } else {
        products.forEach((product, index) => {
            const productCard = document.createElement('div');
            productCard.classList.add('col-md-4', 'col-sm-6', 'mb-4');
            console.log(product + " " + index);
            productCard.innerHTML = `
                <div class="card h-100">
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
}

// Initial display of products
setFiltersFromQueryParams();
filterProducts();