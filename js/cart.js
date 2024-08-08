$(document).ready(function() {
    let products = cartItems;

    function renderCart() {
        console.log("in render cart");
        let cartItemsList = $('#cart-items');
        cartItemsList.empty();
        let subtotal = 0;
        let depositFee = 10; 
        let gstRate = 0.10; 

        cartItems.forEach((product, index) => {
            let productSubtotal = product.price * product.quantity;
            subtotal += productSubtotal;

            cartItemsList.append(`
                <tr>
                    <td><button class="btn btn-danger btn-sm delete-btn" data-index="${index}">Delete</button></td>
                    <td><img src="${product.image}" alt="${product.name}" class="cart-img"></td>
                    <td>${product.name}</td>
                    <td>
                        <button class="btn btn-secondary btn-sm decrease-quantity" data-index="${index}">-</button>
                        <span class="quantity">${product.quantity}</span>
                        <button class="btn btn-secondary btn-sm increase-quantity" data-index="${index}">+</button>
                    </td>
                    <td>$${productSubtotal.toFixed(2)}</td>
                </tr>
            `);
        });

        let gst = subtotal * gstRate;
        let total = subtotal + depositFee + gst;

        $('#subtotal').text(`₹${subtotal.toFixed(2)}`);
        $('#deposit-fee').text(`₹${depositFee.toFixed(2)}`);
        $('#gst').text(`₹${gst.toFixed(2)}`);
        $('#total').text(`₹${total.toFixed(2)}`);
    }

    renderCart();

    $("#uploadButton").click(function() {
        $("#uploadModal").modal('show');
    });

    $("#documentUploadForm").submit(function(event) {
        event.preventDefault();
        alert("Documents uploaded successfully!");
        $("#uploadModal").modal('hide');
    });

    $('#uploadModal').on('hidden.bs.modal', function () {
        console.log('Modal has been hidden');
    });

    $('#cart-items').on('click', '.delete-btn', function() {
        let index = $(this).data('index');
        cartItems.splice(index, 1);
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        renderCart();
    });

    $('#cart-items').on('click', '.increase-quantity', function() {
        let index = $(this).data('index');
        cartItems[index].quantity += 1;
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        renderCart();
    });

    $('#cart-items').on('click', '.decrease-quantity', function() {
        let index = $(this).data('index');
        if (cartItems[index].quantity > 1) {
            cartItems[index].quantity -= 1;
        } else {
            cartItems.splice(index, 1);
        }
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        renderCart();
    });
});
