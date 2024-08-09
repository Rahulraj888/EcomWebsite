let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

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
