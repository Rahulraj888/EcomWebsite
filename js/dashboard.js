const productContainer = document.getElementById('product-list');
const categoryFilters = document.querySelectorAll('.category-filter');
const brandFilters = document.querySelectorAll('.brand-filter');
const processorFilters = document.querySelectorAll('.processor-filter');
const priceRange = document.getElementById('priceRange');
const priceMin = document.getElementById('priceMin');
const priceMax = document.getElementById('priceMax');

let products = [];

function loadProducts() {
    fetch('/json/products.json')
        .then(response => response.json())
        .then(data => {
            products = data; //load products from json
            setFiltersFromQueryParams();
            filterProducts();
        })
        .catch(error => console.error('Error loading products:', error));
}

function getQueryParams() {
    const params = new URLSearchParams(window.location.search);
    return {
        category: params.get('category') || '',
        brand: params.get('brand') || '',
        processor: params.get('processor') || '',
        maxPrice: params.get('maxPrice') || priceRange.max
    };
}

//get params from URL
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

//filter out products based on filters selected
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

//display products
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

// Load products and initialize
loadProducts();
