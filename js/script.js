let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [
  {
    name: 'Laptop on Rent',
    image: '/images/cart/c1.jpg',
    quantity: 2,
    price: 50
  }
];

function updateCartCount() {
  let cartCountElement = document.getElementById('cart-count');
  if (cartCountElement) {
    cartCountElement.textContent = cartItems.length;
  }
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
  loadComponent('/html/header.html', 'header', updateCartCount);
  loadComponent('/html/footer.html', 'footer');
});

// Call back mechanism to update cart
function loadComponent(url, elementId, callback = null) {
  fetch(url)
      .then(response => response.text())
      .then(data => {
          document.getElementById(elementId).innerHTML = data;
          if (callback) {
              callback();
          }
      })
      .catch(error => console.error('Error loading component:', error));
}
