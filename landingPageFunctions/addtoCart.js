let remove = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16">
  <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"/>
</svg>`

function loadCart() {
    let mainContainer = document.createElement('div');
    mainContainer.classList.add('mainCartContainer');

    let cartContainer = document.createElement('div');
    cartContainer.classList.add('cartContainer');

    let billContainer = document.createElement('div');
    billContainer.classList.add('billContainer');

    // ✅ Get logged-in user
    let loggedInUserId = sessionStorage.getItem("isLoggedIn");
    let users = JSON.parse(localStorage.getItem("users")) || [];
    let userIndex = users.findIndex(u => u.userId === loggedInUserId && u.active === true);

    if (userIndex === -1) {
        cartContainer.innerHTML = "<p>Please login to see your cart.</p>";
        mainContainer.appendChild(cartContainer);
        document.body.appendChild(mainContainer);
        return;
    }

    let cart = users[userIndex].cart || [];

    let totalMRP = 0;
    let totalDiscount = 0;
    let finalPrice = 0;

    if (cart.length === 0) {
        cartContainer.innerHTML = "<p>Your cart is empty.</p>";
    } else {
        cart.forEach((item, index) => {
            let itemDiv = document.createElement('div');
            itemDiv.classList.add('cartItem');

            // Image
            let img = document.createElement('img');
            img.src = item.image || "";
            img.classList.add('cartImage');

            // Details
            let detailsDiv = document.createElement('div');
            detailsDiv.classList.add('cartDetails');

            // Color circle
            let colorDiv = document.createElement('div');
            colorDiv.classList.add('colorCircle');
            colorDiv.style.backgroundColor = item.color ? item.color.toLowerCase() : "#ccc";

            // Mode
            let modeDiv = document.createElement('div');
            modeDiv.classList.add('modeBox');
            modeDiv.innerText = item.mode || "N/A";

            // Variant
            let variantDiv = document.createElement('div');
            variantDiv.classList.add('variantBox');
            variantDiv.innerText = item.variant || "N/A";

            // Info
            let name = document.createElement('h3');
            name.innerText = item.name;

            let desc = document.createElement('p');
            desc.innerText = item.description;

            let price = document.createElement('p');
            price.innerHTML = `<b>Price:</b> ₹${item.price} × ${item.quantity}`;

            // ✅ Remove button
            let removeBtn = document.createElement('button');
            removeBtn.innerHTML = remove;
            removeBtn.classList.add('removeBtn');

            removeBtn.addEventListener('click', () => {
                // Remove from this user's cart
                users[userIndex].cart.splice(index, 1);
                localStorage.setItem("users", JSON.stringify(users));

                mainContainer.remove(); 
                loadCart(); 
                updateCartCount()
                
                
            });

            detailsDiv.appendChild(name);
            detailsDiv.appendChild(desc);
            detailsDiv.appendChild(document.createTextNode("Color: "));
            detailsDiv.appendChild(colorDiv);
            detailsDiv.appendChild(document.createElement("br"));
            detailsDiv.appendChild(modeDiv);
            detailsDiv.appendChild(variantDiv);
            detailsDiv.appendChild(price);
            detailsDiv.appendChild(removeBtn);

            itemDiv.appendChild(img);
            itemDiv.appendChild(detailsDiv);
            cartContainer.appendChild(itemDiv);

            // ✅ Calculate totals
            let totalItemMRP = item.mrp * item.quantity;
            let totalItemPrice = item.price * item.quantity;
            totalMRP += totalItemMRP;
            totalDiscount += (totalItemMRP - totalItemPrice);
            finalPrice += totalItemPrice;
        });

        // ✅ Bill Summary
        billContainer.innerHTML = `
            <h2>Bill Summary</h2>
            <p><b>Total MRP:</b> ₹${totalMRP.toLocaleString()}</p>
            <p><b>Total Discount:</b> -₹${totalDiscount.toLocaleString()}</p>
            <hr>
            <p><b>Final Price:</b> ₹${finalPrice.toLocaleString()}</p>
            <button class="checkoutBtn" onclick='checkoutBtn()'>Proceed to Checkout</button>
        `;
    }

    mainContainer.appendChild(cartContainer);
    mainContainer.appendChild(billContainer);
    document.body.appendChild(mainContainer);
}

document.addEventListener("DOMContentLoaded", loadCart);

function checkoutBtn(){
    window.location.href = 'contact.html';
}

function updateCartCount(){
    let loggedInUserId  = sessionStorage.getItem('isLoggedIn')

    let users = JSON.parse(localStorage.getItem('users'))

    let loggedInUser = users.find(u=>u.userId===loggedInUserId && u.active === true)

    let cartBtn = document.querySelector('.profileButton')
    if(!cartBtn) return

    let oldCount = cartBtn.querySelector('.cart-count')
    if(oldCount)oldCount.remove()

    if(loggedInUser&&loggedInUser.cart&&loggedInUser.cart.length>0){
        let cartCount = document.createElement('span')
        cartCount.classList.add('cart-count')
        cartCount.textContent = loggedInUser.cart.length
        cartBtn.appendChild(cartCount)
    }

}
document.addEventListener('DOMContentLoaded', updateCartCount);