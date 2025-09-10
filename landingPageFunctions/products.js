let offersRemove =  `<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="white" class="bi bi-x chatBotClose" viewBox="0 0 16 16">
            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
            </svg>`

function shopProducts(){
    let shopProducts = document.createElement('div')
    shopProducts.setAttribute('class','shopProducts')
    shopProducts.setAttribute('id','shopProducts')

    let productsSection = document.createElement('div')
    productsSection.setAttribute('id','elements_section')


    shopProducts.appendChild(productsSection)
    document.body.appendChild(shopProducts)
    loadExistingProducts('landingPage')

}

function buyNow(productIndex){
    console.log('buyNow Function calling')
    let loggedInUserId = sessionStorage.getItem('isLoggedIn')
    let users = JSON.parse(localStorage.getItem('users')) || []
    let loggedInUser = users.find(u=> u.userId === loggedInUserId && u.active === true)

    if(loggedInUser){
        sessionStorage.setItem('selectedProductIndex',productIndex)
        window.location.href = 'productsMain.html'
    }
    else{
        proceed = confirm('To continue the Purchase , Please Login')
        if(proceed){
            window.location.href = 'loginRegister.html'
        }
    }

}


function offers() {
  let offersMainDiv = document.createElement('div');
  offersMainDiv.classList.add('offersMainDiv');

  let offerLogo = document.createElement('img');
  offerLogo.setAttribute('class','offerLogo');
  offerLogo.src = 'sales.gif';
  offersMainDiv.appendChild(offerLogo);

  let productDetails = document.createElement('div');
  productDetails.classList.add("offerDetails");
  offersMainDiv.appendChild(productDetails);

  let products = JSON.parse(localStorage.getItem("products")) || [];
  if (Array.isArray(products[0])) {
    products = products.flat();
  }


  let maxIndex = 0;
  let maxProductDiscount = products.reduce((max, product, idx) => {
    if (parseFloat(product.productDiscount) > parseFloat(max.productDiscount)) {
      maxIndex = idx;
      return product;
    }
    return max;
  });

  document.body.appendChild(offersMainDiv);


  offerLogo.addEventListener('click', () => {
    if (offersMainDiv.classList.contains("offersDivInc")) {
     
      offersMainDiv.classList.remove("offersDivInc");
      offerLogo.src = "sales.gif";
      productDetails.innerHTML = "";
    } else {
     
      offersMainDiv.classList.add("offersDivInc");
      offerLogo.src = maxProductDiscount.productImage;
      productDetails.innerHTML = `
        <h4 class="offerProductName">${maxProductDiscount.productName}</h4>
        <p class="offerDiscount">🔥 ${maxProductDiscount.productDiscount}% OFF</p>
        <button class="offerBuyBtn">🛒 Buy Now</button>
      `;

     
      productDetails.querySelector(".offerBuyBtn").addEventListener("click", () => {
        offerBuyNow(maxIndex, maxProductDiscount.productName);
      });
    }
  });

  
  setTimeout(() => {
    offerLogo.click();

 
    setTimeout(() => {
      if (offersMainDiv.classList.contains("offersDivInc")) {
        offerLogo.click(); 
      }
    }, 5000);

  }, 3000);
}


function offerBuyNow(index, productName) {
  let loggedInUserId = sessionStorage.getItem("isLoggedIn");
  let users = JSON.parse(localStorage.getItem("users")) || [];
  let loggedInUser = users.find(u => u.userId === loggedInUserId);

  if (!loggedInUser) {
    alert("⚠️ Please login to buy this product.");
    return;
  }

  sessionStorage.setItem("selectedProductIndex", index);

  alert(`You selected: ${productName}`);

  window.location.href = "productsMain.html";
}






