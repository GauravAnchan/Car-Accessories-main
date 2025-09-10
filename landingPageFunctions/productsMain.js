function selectedProduct() {
    console.log('selected product function is called ');

    let productIndex = sessionStorage.getItem('selectedProductIndex');

    if (productIndex != null) {
        // flatten products
        let products = JSON.parse(localStorage.getItem('products')) || [];
        products = products.flat();

        const product = products[productIndex];

        if (product) {
            // main 
            let productDiv = document.createElement('div');
            productDiv.classList.add('productCard');

            // left side for image 
            let leftDiv = document.createElement('div');
            leftDiv.classList.add('leftDiv');

            let img = document.createElement('img');
            img.classList.add('productImage');
            
            // Set main image
            if (product.productImages && product.productImages.length > 0) {
                img.src = product.productImages[0];
            } else {
                img.src = product.productImage || "";
            }

            leftDiv.appendChild(img);

            // right side for details
            let rightDiv = document.createElement('div');
            rightDiv.classList.add('rightDiv');

            let name = document.createElement('h2');
            name.innerText = product.productName;

            let description = document.createElement('p');
            description.innerText = product.productDescription;

            rightDiv.appendChild(name);
            rightDiv.appendChild(description);

            // ✅ Colors section
            if (product.specifications && product.specifications.colors) {
                let colorsContainer = document.createElement('div');
                colorsContainer.classList.add('colorsContainer');

                product.specifications.colors.forEach(c => {
                    // Main
                    let colorDotMain = document.createElement('div');
                    colorDotMain.setAttribute('class','colorDotMain')

                    // Inner 
                    let colorDot = document.createElement('div');
                    colorDot.setAttribute('class','colorDot')
                    colorDot.style.backgroundColor = c.color.toLowerCase();

                    colorDotMain.addEventListener('click', () => {
                        // Remove active from others
                        document.querySelectorAll('.colorDotMain').forEach(dot => dot.classList.remove('active'));
                        colorDotMain.classList.add('active');
                        colorDotMain.dataset.color = c.color; // store color

                        console.log("Selected color:", c.color, "with price:", c.specPrice);

                        // ✅ Change image if specImage exists
                        img.src = c.specImage || img.src;

                        if (c.specPrice) {
                            // Update MRP
                            price.innerText = "MRP: ₹" + c.specPrice;

                            // Apply discount
                            let discountPercent = parseFloat(product.productDiscount) || 0;
                            let discountedPrice = c.specPrice - (c.specPrice * discountPercent / 100);

                            // Update Final Price
                            finalPrice.innerText = "₹" + discountedPrice.toFixed(2);
                        }
                    });

                    colorDotMain.appendChild(colorDot);
                    colorsContainer.appendChild(colorDotMain);
                });

                rightDiv.appendChild(colorsContainer);
            }

            // ✅ Modes section
            if (product.specifications && product.specifications.modes) {
                let modesContainer = document.createElement('div');
                modesContainer.classList.add('modesContainer');

                let modesLabel = document.createElement('p');
                modesLabel.setAttribute('class','modesLabel')
                modesLabel.innerText = "Available Models:";
                modesContainer.appendChild(modesLabel);

                product.specifications.modes.forEach(m => {
                    let modeBtn = document.createElement('button');
                    modeBtn.innerText = m.mode;
                    modeBtn.classList.add('modeBtn');

                    modeBtn.addEventListener('click', () => {
                        sessionStorage.setItem("selectedMode", m.mode);
                        console.log("Selected mode:", m.mode);

                        // Optional: Highlight selected button
                        document.querySelectorAll('.modeBtn').forEach(btn => btn.classList.remove('active'));
                        modeBtn.classList.add('active');
                    });

                    modesContainer.appendChild(modeBtn);
                });

                rightDiv.appendChild(modesContainer);
            }

            // ✅ Variants section
            if (product.specifications && product.specifications.variants) {
                let variantsContainer = document.createElement('div');
                variantsContainer.classList.add('variantsContainer');

                let variantsLabel = document.createElement('p');
                variantsLabel.innerText = "Available Variants:";
                variantsLabel.setAttribute('class','modesLabel')
                variantsContainer.appendChild(variantsLabel);

                product.specifications.variants.forEach(v => {
                    let variantBtn = document.createElement('button');
                    variantBtn.innerText = v.variant;
                    variantBtn.classList.add('variantBtn');

                    variantBtn.addEventListener('click', () => {
                        sessionStorage.setItem("selectedVariant", v.variant);
                        console.log("Selected variant:", v.variant);

                        // Optional: Highlight selected button
                        document.querySelectorAll('.variantBtn').forEach(btn => btn.classList.remove('active'));
                        variantBtn.classList.add('active');
                    });

                    variantsContainer.appendChild(variantBtn);
                });

                rightDiv.appendChild(variantsContainer);
            }

            // ✅ Discount
            let discount = document.createElement('p');
            discount.innerText = "-" + (product.productDiscount || 0) + "%";
            discount.classList.add('discountPrice');
            discount.style.color = 'red'

            // ✅ Final Price
            let discountPercent = parseFloat(product.productDiscount) || 0;
            let basePrice = parseFloat(product.productPrice) || 0;
            let discountedPrice = basePrice - (basePrice * discountPercent / 100);

            let finalPrice = document.createElement('p');
            finalPrice.innerText = "₹" + discountedPrice.toLocaleString(); // formatted with commas
            finalPrice.classList.add('finalPrice');

            // ✅ MRP
            let price = document.createElement('p');
            price.innerText = "M.R.P.: ₹" + basePrice.toLocaleString();
            price.classList.add('mrpPrice');

            let a2cBuyNowMain = document.createElement('div');

            let addToCartBtn = document.createElement('button');
            addToCartBtn.innerText = 'Add to cart';
            addToCartBtn.setAttribute('class','a2cBuyNowMain');

            // ✅ Add to Cart logic

addToCartBtn.addEventListener('click', () => {
    let selectedColor = null;
    const activeColor = document.querySelector('.colorDotMain.active');
    if (activeColor && activeColor.dataset.color) {
        selectedColor = activeColor.dataset.color;
    }

    let selectedMode = sessionStorage.getItem("selectedMode") || null;
    let selectedVariant = sessionStorage.getItem("selectedVariant") || null;
    let selectedImage = img.src || '';

    // Convert to numbers
    let mrp = basePrice;  // original product price
    let discountPercent = parseFloat(product.productDiscount) || 0;
    let discountedPrice = mrp - (mrp * discountPercent / 100);

    const cartItem = {
        name: product.productName,
        description: product.productDescription,
        color: selectedColor,
        mode: selectedMode,
        variant: selectedVariant,
        mrp: mrp,
        price: discountedPrice, // final price after discount
        discountPercent: discountPercent,
        image: selectedImage,
        quantity: 1
    };

    // ✅ Get logged-in user
    let loggedInUserId = sessionStorage.getItem("isLoggedIn");
    let users = JSON.parse(localStorage.getItem("users")) || [];
    let userIndex = users.findIndex(u => u.userId === loggedInUserId && u.active === true);

    if (userIndex === -1) {
        alert("Please login to add products to your cart.");
        return;
    }

    // ✅ Work with that user's cart
    let cart = users[userIndex].cart || [];

    // ✅ Check if product already exists in user’s cart
    let existingIndex = cart.findIndex(p =>
        p.name === cartItem.name &&
        p.color === cartItem.color &&
        p.mode === cartItem.mode &&
        p.variant === cartItem.variant
    );

    if (existingIndex > -1) {
        cart[existingIndex].quantity += 1;
    } else {
        cart.push(cartItem);
    }

    // ✅ Update user's cart in users array
    users[userIndex].cart = cart;
    localStorage.setItem("users", JSON.stringify(users));

    console.log("Added to cart:", cartItem);
    alert(product.productName + " added to cart!");
    window.location.href = 'addtoCart.html';

    // clear temp selections
    sessionStorage.removeItem("selectedMode");
    sessionStorage.removeItem("selectedVariant");
});



            let buyNow = document.createElement('button');
            buyNow.innerText = 'Buy Now';
            buyNow.setAttribute('class','a2cBuyNowMain');

            buyNow.addEventListener('click',()=>{
                window.location.href = 'contact.html'
            })

            a2cBuyNowMain.appendChild(addToCartBtn);
            a2cBuyNowMain.appendChild(buyNow);

            rightDiv.appendChild(discount);
            rightDiv.appendChild(finalPrice)
            rightDiv.appendChild(price);
            rightDiv.appendChild(a2cBuyNowMain);

            productDiv.appendChild(leftDiv);
            productDiv.appendChild(rightDiv);

            document.body.appendChild(productDiv);
        }
    }
}

// mandatory to load products
document.addEventListener("DOMContentLoaded", selectedProduct);
