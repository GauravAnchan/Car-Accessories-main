// const { json } = require("express");

// load section
let loadEditButton = true;
let loadProductName = true;
let loadProductImage = true;
let loadProductDescription = true;
let loadProductDetails = true;
let loadclosePopup = false;

// add product section
let closepopup = true
let addName = true
let addDescription = true
let addImage = true
let addPrice = true
let addDiscount = true
let addbtn = true
let categoryDdown = true // Add this.

  function mainBody() {
    let adminBody = document.createElement('div');
    adminBody.classList.add('adminBody');
    adminBody.setAttribute('id','adminBody')
    document.body.append(adminBody);
  }

 function header() {
  let header = document.createElement('div');
  header.classList.add('mainHeader');
  header.setAttribute("id", "mainHeader");

  let greeting = document.createElement('div');
  greeting.classList.add('greeting');

  let logo = document.createElement('img');
  logo.classList.add('logo');
  logo.src = 'images/WhatsApp Image 2025-07-14 at 11.20.18 PM.jpeg';

  let profileIcon = document.createElement('button');
  profileIcon.classList.add('profileIcon');
  profileIcon.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" class="bi bi-person-circle" viewBox="0 0 16 16">
      <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
      <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"/>
    </svg>`;

  profileIcon.addEventListener("click", () => profileData(profileIcon));

  const hour = new Date().getHours();
  greeting.textContent =
    hour >= 5 && hour < 12
      ? 'Good Morning, Shashank'
      : hour >= 12 && hour < 17
      ? 'Good Afternoon, Shashank'
      : 'Good Evening, Shashank';

  header.appendChild(greeting);
  header.appendChild(logo);
  header.appendChild(profileIcon);
  document.body.append(header);
}


  function profileData(profileIcon) {
    const existingDiv = profileIcon.querySelector(".profileIconDiv");
    if (existingDiv) {
      existingDiv.remove();
      return;
    }

    let profileIconDiv = document.createElement('div');
    profileIconDiv.classList.add("profileIconDiv");

    let logoutButton = document.createElement('button');
    logoutButton.classList.add('logoutButton');
    logoutButton.textContent = 'LogOut';
    logoutButton.setAttribute("id","logoutButton")

    logoutButton.addEventListener("click", () => {
      window.location.replace('index.html');
    });

    profileIconDiv.appendChild(logoutButton);
    profileIcon.appendChild(profileIconDiv);
  }

   function sideBarButtons() {
    let mainDiv = document.createElement('div');
    mainDiv.classList.add('mainDiv');

    let addProducts = document.createElement('button');
    addProducts.classList.add('addProducts');
    addProducts.textContent = 'Add Products';
    addProducts.addEventListener("click",()=>{showsection('add');loadExistingProducts()})

    let Orders = document.createElement('button');
    Orders.classList.add('addProducts');
    Orders.textContent = 'Orders';
    Orders.addEventListener("click",()=>showsection())

    let loginSignUp = document.createElement('button');
    loginSignUp.classList.add('addProducts');
    loginSignUp.textContent = 'Login/SignUp';
    loginSignUp.addEventListener("click",()=>showsection('login'))

    let landingPage = document.createElement('button');
    landingPage.classList.add('addProducts');
    landingPage.textContent = 'Landing Page';
    landingPage.addEventListener("click",showsection())

    let category = document.createElement('button')
    category.classList.add('addProducts')
    category.textContent = 'Categories'
    category.addEventListener("click",()=>{showsection('category');loadExistingCategories()})

    let advertisement = document.createElement('button')
    advertisement.classList.add('addProducts')
    advertisement.textContent = 'Advertisement'
    advertisement.addEventListener("click",()=>showsection())

    let Profile = document.createElement('button')
    Profile.classList.add('addProducts')
    Profile.textContent = 'Profile'
    Profile.addEventListener("click",()=>showsection())

    let payment = document.createElement('button')
    payment.classList.add('addProducts')
    payment.textContent = 'Payment'
    payment.addEventListener("click",()=>showsection())

    mainDiv.appendChild(addProducts);
    mainDiv.appendChild(Orders);
    mainDiv.appendChild(loginSignUp);
    mainDiv.appendChild(landingPage);
    mainDiv.appendChild(category)
    mainDiv.appendChild(advertisement)
    mainDiv.appendChild(Profile)
    mainDiv.appendChild(payment)

    return mainDiv;
  }

  function menuButtonRotate() {
    let expanded = false;

    const sideBar = document.createElement('div');
    sideBar.classList.add('sideBar');

    const menuButton = document.createElement('div');
    menuButton.classList.add('menuButton');

    const button = document.createElement('button');
    button.classList.add('rotateButton', 'rotateButtonNormal');

    let sideBarSections = null;

    button.addEventListener("click", function () {
      expanded = !expanded;
      const header = document.querySelector('#mainHeader');
      const adminBody = document.querySelector('.adminBody');

      if (expanded) {
        sideBar.classList.add('expanded');
        button.classList.replace('rotateButtonNormal', 'rotateButtonClicked');
        sideBarSections = sideBarButtons();
        sideBar.appendChild(sideBarSections);
        if (header) header.style.marginLeft = '200px';
        if (adminBody) adminBody.style.marginLeft = '200px';
      } else {
        sideBar.classList.remove('expanded');
        button.classList.replace('rotateButtonClicked', 'rotateButtonNormal');
        if (sideBarSections) {
          sideBar.removeChild(sideBarSections);
          sideBarSections = null;
        }
        if (header) header.style.marginLeft = '60px';
        if (adminBody) adminBody.style.marginLeft = '60px';
      }
    });

    button.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor"
           class="bi bi-list" viewBox="0 0 16 16">
        <path fill-rule="evenodd"
              d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 
                 0 0 1-.5-.5m0-4a.5.5 0 0 1 
                 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 
                 0 0 1-.5-.5m0-4a.5.5 0 0 1 
                 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 
                 0 0 1-.5-.5"/>
      </svg>
    `;

    menuButton.appendChild(button);
    sideBar.appendChild(menuButton);
    document.body.appendChild(sideBar);
  }
  function showsection(section){
  const adminBody = document.getElementById('adminBody');
  adminBody.style.display = "block";
  let content = ``
  switch (section) {
    case 'login':
      content = `
        <div class='main_login'>
          <div class='login_Section'>
            <div class='login_section_child'>
              <label class='login_label'>No.of.Registrations : </label><br>
              <input type='text' readonly class='login_input'>
            </div>
          </div>
        </div>`;
      break;
    case 'add':
      content = `
        <div class='add_section'>
          <button class='add_button' onclick='add_products()'>+</button>
          <div class='search_bar'>
            <label for="productSearch">🔍</label>
            <input type='search' id='productSearch' placeholder='Search products...' onchange='searchEngine()'>
          </div>
        </div>
        <div class='elements_section' id='elements_section'></div>`;
      break;

      case 'availableProducts':
        content = `<div class='availableProducts' > </div>`
        break;

    case 'category':
        content = ` <div class='add_section'>
          <button class='add_button' onclick='addCategory()'>+</button>
          <div class='search_bar'>
            <label for="productSearch">🔍</label>
            <input type='search' id='categorySearch' placeholder='Search category...' onchange='searchEngine()'>
            <div id='suggestions'></div>
          </div>
        </div>
        <div class='elements_section' id='elements_section'></div>`
        break;
    default:
      content = `
        <div class='page'>
          <img src="under_construction.gif" alt="Under Construction">
        </div>`;
      break;
  
    }
    if (section === 'add') {
      loadExistingProducts(); 
    }
    adminBody.innerHTML = content
  
} 
function add_products(){
  if (document.getElementById('productpopup')) return; // if we write like this , if we click Multiple types on + button it wont trigger multiple times. 

  const popupDiv = document.createElement('div');
  popupDiv.classList.add('popup');
  popupDiv.id = 'productpopup'

  let html = ''

  if(closepopup){
    html+=`<button class="close-btn" onclick="closePopup('productpopup')">×</button>`
  }

  if(addName){
    html+=`
    <label>Product Name:</label>
    <input type="text" placeholder="Enter product name" id='productName'/>`
  }
  
  if(addDescription){
    html+=`<label>Product Description:</label>
    <input type='text' placeholder='Product Description..' id='productDescription'></input>`
  }
  if(addImage){
    html+=`<label>Product Image:</label>
    <input type="file" id='productFile'/>`
  }
  if(categoryDdown){
    html += `<label>Select Category:</label><div id="categoryDropdownContainer"></div>`
  }
  if(addPrice){
    html +=`<label>Product Price:</label>
    <input type="number" placeholder="Enter price" id='productPrice'/>`
  }
  if(addDiscount){
    html +=`<label>Discount:</label>
    <input type="number" placeholder="Enter discount %" id='productDiscount'/>`
  }
  if(addbtn){
    html +=`<button onclick="product_add()" id='add_button'>Add</button>`
  }
  popupDiv.innerHTML = html
  document.body.appendChild(popupDiv);
  categoryDropdown()
}
function closePopup(popupId) {
  const popup = document.getElementById(popupId);
  if (popup) popup.remove();
}
function update_products(){
  if (document.getElementById('productpopup')) return; // if we write like this , if we click Multiple types on + button it wont trigger multiple times. 

  const popupDiv = document.createElement('div');
  popupDiv.classList.add('popup');
  popupDiv.id = 'productpopup'
  popupDiv.innerHTML = `
    <button class="close-btn" onclick="closePopup('productpopup')">×</button>
    <label>Product Name:</label>
    <input type="text" placeholder="Enter product name" id='productName'/>
    <label>Product Description:</label>
    <input type='text' placeholder='Product Description..' id='productDescription'></input>
    <label>Product Image:</label>
    <input type="file" id='productFile'/
    <label>Product Price:</label>
    <input type="number" placeholder="Enter price" id='productPrice'/>
    <label>Discount:</label>
    <input type="number" placeholder="Enter discount %" id='productDiscount'/>
    <button onclick="loadExistingProducts()" id='add_button'>Update</button>
  `
  document.body.appendChild(popupDiv);
}
// function closePopup() {
//   const popup = document.getElementById('productpopup');
//   if (popup) popup.remove();
// }
function product_add() {
  const productName = document.getElementById('productName').value;
  const productFileInput = document.getElementById('productFile');
  const productPrice = document.getElementById('productPrice').value;
  const productDiscount = document.getElementById('productDiscount').value;
  const productDescription = document.getElementById('productDescription').value
  const file = productFileInput.files[0]
  if (!file) {
    alert("Please select an image file.");
    return;
  }
  // File reader
  const reader = new FileReader();
  reader.onload = function(event) {
    const base64Image = event.target.result
    // file reader ends

    let finalPrice = (productPrice*productDiscount)/100
    finalPrice = productPrice-finalPrice
    const productData = {
      productName,
      productDescription,
      productImage: base64Image,
      productPrice,
      productDiscount,
      finalPrice
    }

    let products = JSON.parse(localStorage.getItem("products")) || [];
    products.push(productData);
    localStorage.setItem(productName,JSON.stringify(productData))
    localStorage.setItem("products", JSON.stringify(products))
    alert("Product added successfully!");
    closePopup('productpopup');
    loadExistingProducts(); // reload product cards
  }
  reader.readAsDataURL(file); // this also used for file reader.
  
}  


function loadExistingProducts() {

  const container = document.getElementById('elements_section');
  if (!container) return;

  container.innerHTML = '';
  const products = JSON.parse(localStorage.getItem("products")) || [];

  products.forEach(product => {
    const div = document.createElement('div');
    div.classList.add('add_element')

    let html = ''

    if(loadEditButton){
      html+=`<button class="edit_button" onclick="update_products('${products.productName}')">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="white" viewBox="0 0 16 16">
          <path
            d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 
            .708l-10 10a.5.5 0 0 1-.168.11l-5 
            2a.5.5 0 0 1-.65-.65l2-5a.5.5 
            0 0 1 .11-.168zM11.207 2.5 13.5 
            4.793 14.793 3.5 12.5 1.207zm1.586 
            3L10.5 3.207 4 9.707V10h.5a.5.5 
            0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 
            5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 
            0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 
            0 0 1-.468-.325"/>
        </svg>
      </button>`
    }

    if(loadclosePopup){
      html+=`<button class="close-btn" onclick="closePopup()">×</button>`
    }

    if(loadProductName){
      html+=`<h3>${product.productName}</h3>`
    }

    if(loadProductImage){
      html+=`<img src="${product.productImage}" />`
    }

    if(loadProductDescription){
      html+=`<p class='productDescription'>${product.productDescription}</p>`
    }
    
    if(loadProductDetails){
      html += `
      <table class='product_tabel'>
      <tr>
      <th style='text-align:left'><strong>Price</strong></th>
      <th>:</th>
      <th style='text-align:right'><del>₹${product.productPrice}</del></th>
      </tr>

      <tr>
      <td style='text-align:left'><strong>Discount</strong></td>
      <td>:</td>
      <td style='text-align:right'>${product.productDiscount}%</td>
      </tr>

      <tr>
      <td style='text-align:left'><b>Discounted Price </b></td>
      <td>:</td>
      <td style='text-align:right'>${product.finalPrice}</td>
      </tr>

      </table>`
    }

      div.innerHTML = html;
    container.appendChild(div);
  });
}

function addCategory() {
  if (document.getElementById('categorypopup')) return;

  const popupDiv = document.createElement('div');
  popupDiv.classList.add('popupCategory');
  popupDiv.id = 'categorypopup';

  let html = '';

  if (closepopup) {
    html += `<button class="close-btn" onclick="closePopup('categorypopup')">×</button>`;
  }

  if (addName) {
    html += `
      <label>Category Name:</label>
      <input type="text" placeholder="Enter Category name" id="categoryName"/>`;
  }

  if (addDescription) {
    html += `
      <label>Category Description:</label>
      <input type="text" placeholder="Category Description.." id="categoryDescription"/>`;
  }

  if (addImage) {
    html += `
      <label>Category Image:</label>
      <input type="file" id="categoryFile"/>`;
  }

  if (addbtn) {
    html += `<button onclick="category_add()" id="add_button">Add</button>`;
  }

  popupDiv.innerHTML = html;
  document.body.appendChild(popupDiv);
}


function category_add() {
  const categoryName = document.getElementById('categoryName').value.trim();
  const categoryDescription = document.getElementById('categoryDescription').value.trim();
  const categoryFileInput = document.getElementById('categoryFile');
  const file = categoryFileInput.files[0];

  if (!categoryName || !categoryDescription || !file) {
    alert("Please fill all fields and choose an image.");
    return;
  }

  const reader = new FileReader();
  reader.onload = function (event) {
    const base64Image = event.target.result;

    fetch('http://localhost:5000/api/categories/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: categoryName,
        description: categoryDescription,
        image: base64Image
      })
    })
    .then(res => res.text())
    .then(msg => {
      alert(msg);
      closePopup('categorypopup');
      loadExistingCategories();
    })
    .catch(err => {
      console.error(err);
      alert("Something went wrong while adding the category.");
    });
  };

  reader.readAsDataURL(file);
}

function loadExistingCategories() {
  console.log('loadExistingCategories Function started');
  const container = document.getElementById('elements_section');
  if (!container) return;

  container.innerHTML = '';

  fetch('http://localhost:5000/api/categories/all')
    .then(res => res.json())
    .then(categories => {
      categories.forEach(category => {
        const div = document.createElement('div');
        div.classList.add('category_element');

        let html = '';

        if (loadclosePopup) {
          html += `<button class="close-btn" onclick="closePopup('categorypopup')">×</button>`;
        }

        if (loadProductName) {
          html += `<h3>${category.name}</h3>`;
        }

        if (loadProductImage) {
          html += `<img src="data:image/jpeg;base64,${category.image}" />`;
        }

        if (loadProductDescription) {
          html += `<p class='productDescription'>${category.description}</p>`;
        }

        div.innerHTML = html;
        container.appendChild(div);
      });
    })
    .catch(err => {
      console.error(err);
    });
}


function searchEngine(){
    const searchInput = document.getElementById('categorySearch').value.trim().toLowerCase()
    const suggestions = document.getElementById('suggestions')

    suggestions.innerHTML = ''

    const categoryData = JSON.parse(localStorage.getItem("categories")) || []

    let match = categoryData.filter(item=>
        item.categoryName.trim().toLowerCase().includes(searchInput)
    )

    if(searchInput === '' || match.length === 0){
        const searchResult = document.createElement('button')
        searchResult.classList.add('searchResult')
        searchResult.innerHTML = "Not Matches"
        searchResult.disabled = true
        suggestions.appendChild(searchResult)
        return;
    }

    match.forEach(item=>{
        const matchResult = document.createElement('button')
        matchResult.classList.add("matchResult")
        matchResult.textContent = item.categoryName
        suggestions.appendChild(matchResult)
    })

}


// This will clear the selected data when we click out side of the div
function clearData(event){
    const searchInput = document.getElementById('categorySearch')
    const suggestions = document.getElementById('suggestions')
    if(!searchInput.contains(event.target) && !suggestions.contains(event.target)){
        suggestions.innerHTML = ''
    }
}
document.addEventListener("click",clearData)

function categoryDropdown() {
            const categoryData = JSON.parse(localStorage.getItem("categories"));

            const categorySelect = document.createElement("select");

            const categoryMainOption = document.createElement("option");
            categoryMainOption.textContent = "Select the Category";
            categoryMainOption.disabled = true;
            categoryMainOption.selected = true;
            categorySelect.appendChild(categoryMainOption);


            categoryData.forEach(element => {
                const categoryOption = document.createElement("option");
                categoryOption.value = element.categoryName;
                categoryOption.textContent = element.categoryName;
                categorySelect.appendChild(categoryOption);
            });

  
        // document.body.append(categorySelect);
        const container = document.getElementById("categoryDropdownContainer");
        container.appendChild(categorySelect);
}

// next function. present category names has to come as drop down 


