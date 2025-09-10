
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


function showForm(form) {
      const loginBtn = document.querySelectorAll('.buttons')[0];
      const signupBtn = document.querySelectorAll('.buttons')[1];
      const loginForm = document.getElementById('login-form');
      const signupForm = document.getElementById('signup-form');

      if (form === 'login') {
        loginForm.classList.add('active');
        signupForm.classList.remove('active');
        loginBtn.classList.add('active');
        signupBtn.classList.remove('active');
      } else {
        signupForm.classList.add('active');
        loginForm.classList.remove('active');
        signupBtn.classList.add('active');
        loginBtn.classList.remove('active');
      }
}
    // validation 
function mobileNumberValidator() {
  const mobileInput = document.getElementById('mobileNumber');
  const mobileNumber = mobileInput.value.trim()
  if (!/^[7-9]\d{9}$/.test(mobileNumber)) {
    mobileInput.setCustomValidity('Number should start with more than 6');
  } else {
    mobileInput.setCustomValidity('');
  
  mobileInput.reportValidity();
  }
}  

function mailValidator(){
  const mailInput = document.getElementById('email')
  const email = mailInput.value
  if(!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)){
    mailInput.setCustomValidity('Invalid Email')
  }
  else{
    mailInput.setCustomValidity('')
  
  mailInput.reportValidity();
  }
}  

function passwordCheck() {
  const password = document.getElementById('password');
  const confirmPassword = document.getElementById('confirmPassword');
  const register = document.getElementById('register')
  if (confirmPassword.value.length > 0) {
    if (password.value !== confirmPassword.value) {
      confirmPassword.setCustomValidity('Passwords do not match');
      register.disabled = true;
    } else {
      confirmPassword.setCustomValidity('');
      register.disabled = false;
    }
    confirmPassword.reportValidity();
  } else {
    confirmPassword.setCustomValidity('');
    register.disabled = false;
  }
}
    // password check whether it strong medium like that. update in further.

async function register() {
  const nameInput = document.getElementById('name');
  const mobileInput = document.getElementById('mobileNumber');
  const emailInput = document.getElementById('email');
  const passwordInput = document.getElementById('password');
  const confirmPasswordInput = document.getElementById('confirmPassword');

  const fullname = nameInput.value.trim();
  const mobile_number = mobileInput.value.trim();
  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();
  const confirmPassword = confirmPasswordInput.value.trim();

  if (!fullname || !mobile_number || !email || !password || !confirmPassword) {
    alert("All fields are required.");
    return;
  }

  if (password !== confirmPassword) {
    alert("Passwords do not match.");
    return;
  }

  try {
    const response = await fetch("http://localhost:5000/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ fullname, mobile_number, email, password }),
    });

    const data = await response.json();
    if (response.ok) {
      alert(data.message); // ✅ "Registered successfully!"
      showForm('login'); // switch to login form
      nameInput.value = '';
      mobileInput.value = '';
      emailInput.value = '';
      passwordInput.value = '';
      confirmPasswordInput.value = '';
    } else {
      alert(data.message || "Registration failed");
    }
  } catch (error) {
    console.error("❌ Error:", error);
    alert("Something went wrong, try again later.");
  }
}


async function loginChecker() {
  const loginNumber = document.getElementById('loginNumber').value.trim();
  const loginPassword = document.getElementById('loginPassword').value.trim();

  if (!loginNumber || !loginPassword) {
    alert("Enter Mobile Number or Password!");
    return;
  }

  try {
    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ mobile_number: loginNumber, password: loginPassword }),
    });

    const data = await response.json();
    if (response.ok) {
      alert(data.message); // ✅ "Login successful!"
      
      // Example: redirect based on admin or user
      if (loginNumber === "9951600476") {
        window.location.href = "test.html"; // admin
      } else {
        window.location.href = "index.html"; // normal user
      }
    } else {
      alert(data.message || "Invalid credentials");
    }
  } catch (error) {
    console.error("❌ Error:", error);
    alert("Something went wrong, try again later.");
  }
}


  // admin section 

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
    default:
      content = `
        <div class='page'>
          <img src="under_construction.gif" alt="Under Construction">
        </div>`;
      break;
  
    }
    if (section === 'add') {
      loadExistingProducts(); // Load existing products
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
    html+=`<button class="close-btn" onclick="closePopup()">×</button>`
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
  document.adminBody.appendChild(popupDiv);
}

function closePopup() {
  const popup = document.getElementById('productpopup');
  if (popup) popup.remove();
}

function update_products(){
  if (document.getElementById('productpopup')) return; // if we write like this , if we click Multiple types on + button it wont trigger multiple times. 

  const popupDiv = document.createElement('div');
  popupDiv.classList.add('popup');
  popupDiv.id = 'productpopup'
  popupDiv.innerHTML = `
    <button class="close-btn" onclick="closePopup()">×</button>
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

function closePopup() {
  const popup = document.getElementById('productpopup');
  if (popup) popup.remove();
}

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
    closePopup();
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
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="cyan" viewBox="0 0 16 16">
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



function searchEngine(){
  let productSearch = document.getElementById('productSearch').value
  console.log(productSearch)
  if(productSearch===localStorage.getItem(productSearch)){
    console.log('value is founded')
  }

}



