let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [
    {
        name: 'Laptop on Rent',
        image: '/images/cart/c1.jpg',
        quantity: 1,
        price: 50
    }
];


function updateCartCount() {
    let cartCountElement = document.getElementById('cart-count');
    cartCountElement.textContent = cartItems.length;
}


function addToCart(product) {
    cartItems.push(product);
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    updateCartCount();
}


function removeFromCart(index) {
    cartItems.splice(index, 1);
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    updateCartCount();
}

document.addEventListener('DOMContentLoaded', function() {
    updateCartCount(); 
});
