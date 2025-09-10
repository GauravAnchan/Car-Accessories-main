// If backend is running locally
const baseUrl = "http://localhost:5000";

let notification = `<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-bell-fill" viewBox="0 0 16 16">
  <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2m.995-14.901a1 1 0 1 0-1.99 0A5 5 0 0 0 3 6c0 1.098-.5 6-2 7h14c-1.5-1-2-5.902-2-7 0-2.42-1.72-4.44-4.005-4.901"/>
</svg>`

let profile =  ` <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" class="bi bi-person-circle" viewBox="0 0 16 16">
      <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
      <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"/>
    </svg>`

let messageIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="343a40" class="bi bi-chat-left-dots-fill" viewBox="0 0 16 16">
  <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4.414a1 1 0 0 0-.707.293L.854 15.146A.5.5 0 0 1 0 14.793zm5 4a1 1 0 1 0-2 0 1 1 0 0 0 2 0m4 0a1 1 0 1 0-2 0 1 1 0 0 0 2 0m3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2"/>
</svg>`

let notificationRemovelogo = `<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="white" class="bi bi-x notificationRemove" viewBox="0 0 16 16">
  <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
  </svg>`

// load section
let loadEditButton = false;
let loadProductName = true;
let loadProductImage = true;
let loadProductDescription = true;
let loadProductDetails = true;
let loadclosePopup = true;
let loadproductQuantity = true;
let loadRemoveButton = true;

// add product section
let closepopup = true
let addName = true
let addDescription = true
let addImage = true
let addPrice = true
let addDiscount = true
let addbtn = true
let addNext = true
let categoryDdown = true // Add this.
let addQuantity = true // Add this
let brandsDdown = true //Add this

// GET The data from the contacts.
    let contactData = JSON.parse(localStorage.getItem("contact")) || [];


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

  // Greeting section
  let greeting = document.createElement('div');
  greeting.classList.add('greeting');

  // Logo
  let logo = document.createElement('img');
  logo.classList.add('logo');
  logo.src = 'logo.jpeg';

  // Profile Icon
  let profileIcon = document.createElement('button');
  profileIcon.innerHTML = profile.trim();
  profileIcon.classList.add('profileIconadmin');
  profileIcon.addEventListener("click", () => profileData(profileIcon));

  // Notification Icon
  let notificationIcon = document.createElement('button');
  notificationIcon.innerHTML = notification.trim();
  notificationIcon.classList.add('notificationIcon');
  notificationIcon.addEventListener('click', () => notificationData(notificationIcon));

  // ---- Check all users' contacts ----
  let users = JSON.parse(localStorage.getItem('users')) || [];

  // Count unvisited contacts across all users
  let unvisitedCount = users.reduce((count, user) => {
    if (user.contact && Array.isArray(user.contact)) {
      return count + user.contact.filter(c => c.visited === false).length;
    }
    return count;
  }, 0);

  // If any unvisited contacts → show red dot & shake
  if (unvisitedCount > 0) {
    let contactCount = document.createElement('span');
    contactCount.setAttribute('class', 'contactCount');
    contactCount.textContent = unvisitedCount; // show number instead of just dot
    notificationIcon.appendChild(contactCount);

    // Add shake animation
    notificationIcon.classList.add('shake');
    notificationIcon.addEventListener('animationend', () => {
      notificationIcon.classList.remove('shake');
    });
  }

  // ---- Browser / in-app notification ----
  let storedPermission = sessionStorage.getItem('notificationPermission');

  if (storedPermission === 'granted' && unvisitedCount > 0) {
    let notificationMessage = document.createElement('button');
    notificationMessage.setAttribute('class', 'notificationMessage');
    notificationMessage.setAttribute('id', 'notificationMessage');
    notificationMessage.innerHTML = `New Message on Notification`;

    let notificationRemove = document.createElement('div');
    notificationRemove.innerHTML = notificationRemovelogo;

    notificationMessage.addEventListener('click', (event) => {
      if (event.target.classList.contains('notificationMessage')) {
        notificationMessage.remove();
        notificationData(notificationIcon); // ✅ pass icon
      }
    });

    notificationRemove.addEventListener('click', () => {
      notificationMessage.remove();
    });

    setTimeout(() => {
      notificationMessage.remove();
    }, 3000);

    notificationMessage.appendChild(notificationRemove);
    document.body.appendChild(notificationMessage);
  } else if (unvisitedCount > 0) {
    // Either not set or denied → ask / show native notification
    if (Notification.permission === 'granted') {
      sessionStorage.setItem('notificationPermission', 'granted');
      new Notification('New Message!', {
        body: 'You have a New Notification.',
        icon: 'icon.png'
      });
    } else {
      Notification.requestPermission().then(permission => {
        sessionStorage.setItem('notificationPermission', permission);
        if (permission === 'granted') {
          new Notification('New Message!', {
            body: 'You have a New Notification.',
            icon: 'icon.png'
          });
        }
      });
    }
  }

  // ---- Greeting text ----
  const hour = new Date().getHours();
  greeting.textContent =
    hour >= 5 && hour < 12
      ? 'Good Morning, Admin'
      : hour >= 12 && hour < 17
      ? 'Good Afternoon, Admin'
      : 'Good Evening, Admin';

  // ---- Right container ----
  let rightContainer = document.createElement('div');
  rightContainer.classList.add('rightIcons');
  rightContainer.appendChild(notificationIcon);
  rightContainer.appendChild(profileIcon);

  // ---- Final append ----
  header.appendChild(logo);        // logo first
  header.appendChild(greeting);    // greeting in center
  header.appendChild(rightContainer); // icons right side

  document.body.append(header);
}



  function profileData(profileIcon) {
    console.log('profileData Function calling')
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
      let users = JSON.parse(localStorage.getItem('users')) || []
      let loggedInUser = sessionStorage.getItem('isLoggedIn')
      const userIndex = users.findIndex(u=>u.userId === loggedInUser)

      if(userIndex > -1){
        users[userIndex].active = false
        localStorage.setItem('users',JSON.stringify(users))
        sessionStorage.removeItem('isLoggedIn')
        window.location.replace('index.html')
      }
      // window.location.replace('index.html');
      // sessionStorage.removeItem('isLoggedIn')
    });

    profileIconDiv.appendChild(logoutButton);
    profileIcon.appendChild(profileIconDiv);
  }
  
function notificationData(notificationIcon) {
    let existingDiv = document.querySelector('.notificationMainDiv');
    if (existingDiv) {
        existingDiv.remove();
        return;
    }

    // Get full users array
    let users = JSON.parse(localStorage.getItem("users")) || [];

    // Collect all contacts from all users
    let contactData = [];
    users.forEach(user => {
        if (user.contact && Array.isArray(user.contact)) {
            user.contact.forEach(c => {
                contactData.push({ ...c, userId: user.userId, userName: user.name });
            });
        }
    });

    // Main notification container
    let notificationMainDiv = document.createElement('div');
    notificationMainDiv.classList.add('notificationMainDiv');
    notificationMainDiv.id = 'notificationMainDiv';
    
    // Header text
    let newMessagetxt = document.createElement('div');
    newMessagetxt.setAttribute('class', 'newMessageTxt');
    newMessagetxt.innerHTML = contactData.length > 0 ? messageIcon : 'No New Messages';
    notificationMainDiv.appendChild(newMessagetxt);

    // Sort by time
    contactData.sort((a, b) => new Date(b.current) - new Date(a.current));

    // Load all the details
    contactData.forEach((contact) => {
        let contactInformation = document.createElement('button');
        contactInformation.setAttribute('class', 'contactInformation');
        contactInformation.innerHTML = `
            <div class="contactRemove">${notificationRemovelogo}</div>
            ${!contact.visited ? '<span class="red-dot"></span>' : ''}
            <h4>${contact.contactSubject}</h4>
            <p><strong>User:</strong> ${contact.userName}</p>
            <p><strong>Name:</strong> ${contact.contactName}</p>
            <p><strong>Email:</strong> ${contact.contactMail}</p>
            <p><strong>Phone:</strong> ${contact.contactNumber}</p>
            <p><strong>Time:</strong> ${contact.current}</p>
        `;

        // 👇 Click → open popup with full user + orders
        contactInformation.addEventListener('click', () => {
            let user = users.find(u => u.userId === contact.userId);
            if (user) {
                // mark visited
                let cIndex = user.contact.findIndex(c => c.current === contact.current);
                if (cIndex > -1) {
                    user.contact[cIndex].visited = true;
                    localStorage.setItem("users", JSON.stringify(users));
                }
                openUserPopup(user, contact); // 🔥 open popup
            }
        });

        // Remove contact
        contactInformation.querySelector('.contactRemove').addEventListener('click', (e) => {
            e.stopPropagation();
            let user = users.find(u => u.userId === contact.userId);
            if (user) {
                let cIndex = user.contact.findIndex(c => c.current === contact.current);
                if (cIndex > -1) {
                    user.contact.splice(cIndex, 1);
                    localStorage.setItem("users", JSON.stringify(users));
                }
            }
            contactInformation.remove();
        });

        notificationMainDiv.appendChild(contactInformation);
    });

    // Append to body
    document.body.appendChild(notificationMainDiv);

}

function openUserPopup(user, contact) {
    // Remove existing popup if any
    let existingPopup = document.querySelector('.userPopup');
    if (existingPopup) existingPopup.remove();

    let popup = document.createElement('div');
    popup.classList.add('userPopup');

    popup.innerHTML = `
        <div class="popupContent">
            <span class="closePopup">&times;</span>
            <div class="userHeader">
                <img src="${user.profileImage || 'https://via.placeholder.com/100'}" alt="" class="userImage">
                <div class="userInfo">
                    <h2>${user.name}</h2>
                    <p><strong>Email:</strong> ${user.email}</p>
                    <p><strong>Mobile:</strong> ${user.mobileNumber}</p>
                </div>
            </div>

            <div class="section">
                <h3>Contact Message</h3>
                <p><strong>Subject:</strong> ${contact.contactSubject}</p>
                <p><strong>Message:</strong> ${contact.contactMessage || 'N/A'}</p>
            </div>

            <div class="section">
                <h3>Orders</h3>
                ${
                    contact.orders && contact.orders.length > 0 
                    ? `<ul class="ordersList">${contact.orders.map(o => `
                        <li class="orderItem">
                            <img src="${o.image || 'https://via.placeholder.com/50'}" alt="Order Image">
                            <span>${o.name} - ${o.price || ''} (${o.orderDate || ''})</span>
                        </li>
                    `).join('')}</ul>`
                    : '<p>No orders found.</p>'
                }
            </div>
        </div>
    `;

    // Close button
    popup.querySelector('.closePopup').addEventListener('click', () => {
        popup.remove();
    });

    document.body.appendChild(popup);
}




function clearData(event) {
    const searchInput = document.getElementById('categorySearch');
    const suggestions = document.getElementById('suggestions');

    if (!searchInput.contains(event.target) && !suggestions.contains(event.target)) {
        suggestions.innerHTML = '';
    }
}

document.addEventListener("click", clearData);


   function sideBarButtons() {
    let mainDiv = document.createElement('div');
    mainDiv.classList.add('mainDiv');

    let addProducts = document.createElement('button');
    addProducts.classList.add('addProducts');
    addProducts.textContent = 'Add Products';
    addProducts.addEventListener("click",()=>{showsection('add');loadExistingProducts('admin')})

     let Brands = document.createElement('button');
    Brands.classList.add('addProducts');
    Brands.textContent = 'Brands';
    Brands.addEventListener("click",()=>{showsection('brands');loadExistingBrands('admin')})

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
    category.addEventListener("click",()=>{showsection('category');loadExistingCategories('admin')})

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

    mainDiv.appendChild(Brands)
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

function removePopup(removePopup){
  const existingPopup = document.getElementById(removePopup)
  if(existingPopup){
    existingPopup.remove()
  }
}

  function showsection(section){
  const adminBody = document.getElementById('adminBody');
  adminBody.style.display = "block";
  removePopup('productpopup')
  removePopup('categorypopup')
  removePopup('popupBrands') // this will use to remove the pop up.
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

      case 'brands':
      content = `
        <div class='add_section'>
          <button class='add_button' onclick='add_brands()'>+</button>
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
      loadExistingProducts('admin'); 
    }
    adminBody.innerHTML = content
  
} 

// add products pop up
let productAdded = false; // global flag

function add_products() {
  if (document.getElementById('productpopup')) return;

  const popupDiv = document.createElement('div');
  popupDiv.classList.add('popup');
  popupDiv.id = 'productpopup';

  let html = '';

  if (closepopup) {
    html += `<button class="close-btn" onclick="closePopup('productpopup')">×</button>`;
  }

  // if product is not added yet → show product input fields
  if (!productAdded) {
    if (addName) {
      html += `
      <label>Product Name:</label>
      <input type="text" placeholder="Enter product name" id='productName'/>`;
    }
    if (addDescription) {
      html += `<label>Product Description:</label>
      <input type='text' placeholder='Product Description..' id='productDescription'>`;
    }
    if (addImage) {
      html += `<label>Product Image:</label>
      <input type="file" id='productFile' multiple/>`;
    }
    if (categoryDdown) {
      html += `<label>Select Category:</label><div id="categoryDropdownContainer"></div>`;
    }
    if (brandsDdown) {
      html += `<label>Select Brands:</label><div id="brandsDropdownContainer"></div>`;
    }
    if (addQuantity) {
      html += `<label>Available Quantity :</label>
      <input type='number' id='productQuantity' placeholder="Available Quantity">`;
    }
    if (addPrice) {
      html += `<label>Product Price:</label>
      <input type="number" placeholder="Enter price" id='productPrice'/>`;
    }
    if (addDiscount) {
      html += `<label>Discount:</label>
      <input type="number" placeholder="Enter discount %" id='productDiscount'/>`;
    }

    if (addNext) {
      html += `<button onclick="next()" id='add_button'>Next</button>`;
    }
  } else {
    // if product is already added → only show "Add Specifications"
    html += `
    <div class='popupBack'><button onclick='back()'>Back</button>
      <button onclick="addSpecifications()">Add Specification</button>
    </div>

    <button onclick='productSubmit()' class='productSubmit'>Submit</button>
    `;
  }

  popupDiv.innerHTML = html;
  document.body.appendChild(popupDiv);

  if (!productAdded) {
    Dropdown('category');
    Dropdown('brands');
  }

  const elementsSection = document.getElementById('elements_section');
  if (elementsSection) {
    elementsSection.classList.add('blur');
  }
}

function closePopup(popupId) {
  const popup = document.getElementById(popupId);
  if (popup) popup.remove();

  const elementsSection = document.getElementById('elements_section');
  if (elementsSection) {
    elementsSection.classList.remove('blur');
  }
}

// this function is pending , when we click on the edit button then product details has to come in the fields 
// function update_products(){
//   if (document.getElementById('productpopup')) return; // if we write like this , if we click Multiple types on + button it wont trigger multiple times. 
//   add_products()

//   let product = localStorage.getItem(JSON.parse('products'))


//   document.getElementById('productName').value = product.productName
//   document.getElementById('productFile') = product.productFileInput
//   document.getElementById('productPrice').value = product.productPrice
//   document.getElementById('productDiscount').value = product.productDiscount
//   document.getElementById('productDescription').value = product.productDescription
//   document.getElementById('productCategory').value = product.productCategory
//   document.getElementById('brands').value = product.productBrand
//   document.getElementById('productQuantity').value = product.productQuantity

// }


// this function will add the products to the database.
function product_add() {
  const productName = document.getElementById('productName').value;
  const productFileInput = document.getElementById('productFile');
  const productPrice = document.getElementById('productPrice').value;
  const productDiscount = document.getElementById('productDiscount').value;
  const productDescription = document.getElementById('productDescription').value
  const productCategory = document.getElementById('productCategory').value
  const productBrand = document.getElementById('brands').value
  const productQuantity = document.getElementById('productQuantity').value
  const file = productFileInput.files
  if (!file && !!productCategory && !!productBrand) {
    alert("Please fill all the Details");
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
      productImage: [],
      productCategory,
      productBrand, // add this
      productQuantity, // add this
      productPrice,
      productDiscount,
      finalPrice
    }

    let products = JSON.parse(localStorage.getItem("products")) || [];
    products.push(productData);
    // localStorage.setItem(productName,JSON.stringify(productData))
    localStorage.setItem("products", JSON.stringify(products))
    alert("Product added successfully!");
    closePopup('productpopup');
    loadExistingProducts(); // reload product cards
  }
  reader.readAsDataURL(file); // this also used for file reader.
  
}  


// This function will reload the products once it is added successfully.
function loadExistingProducts(props) {
if (props === 'admin') {
  const container = document.getElementById('elements_section');
  if (!container) return;

  container.innerHTML = '';

  let products = JSON.parse(localStorage.getItem("products")) || [];
  console.log('loaded products before flatten:', products);

  // ✅ Fix nested array issue
  // If first element is an array, flatten once
  if (Array.isArray(products[0])) {
    products = products.flat();
  }

  console.log('loaded products after flatten:', products);

  products.forEach(product => {
    const div = document.createElement('div');
    div.classList.add('add_element');

    let html = '';

    if (loadEditButton) {
      html += `<button class="edit_button" onclick="update_products()">
        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="#343a40" viewBox="0 0 16 16">
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
      </button>`;
    }

    if (loadclosePopup) {
      html += `<button class="close-btn" onclick="closePopup()">×</button>`;
    }

    if (loadProductName) {
      html += `<h3>${product.productName}</h3>`;
    }

    if (loadProductImage) {
      if (product.productImages && product.productImages.length > 0) {
        // limit to max 5 images
        let images = product.productImages.slice(0, 5);

        html += `
          <div class="image-slider">
            <div class="slider-track">
              ${images.map(img => `<img src="${img}" class="slider-img" />`).join("")}
            </div>
            <div class="dots"></div>
          </div>
        `;
      } else {
        // fallback single image
        html += `<img src="${product.productImage}" />`;
      }
    }

    if (loadProductDescription) {
  let desc = product.productDescription;
  let shortDesc = desc.length > 100 ? desc.substring(0, 100) + "..." : desc;

  html += `
    <p class='productDescription' data-full='${desc}'>
      ${shortDesc}
    </p>
    ${desc.length > 100 ? `<button class='toggleDesc'>More</button>` : ""}
  `;
}

    if (loadProductDetails) {
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

        <tr>
          <td style='text-align:left'><b>Available Quantity</b></td>
          <td>:</td>
          <td style='text-align:right'>${product.productQuantity}</td>
        </tr>
      </table>`;
    }

    div.innerHTML = html;
    container.appendChild(div);
    initSliders();
  });
}


if (props === 'landingPage') {
  const container = document.getElementById('elements_section');
  if (!container) return;

  container.innerHTML = '';

  // Get and flatten products
  let products = JSON.parse(localStorage.getItem("products")) || [];
  products = products.flat(); // <-- flatten nested array

  products.forEach((product, index) => {
    const div = document.createElement('div');
    div.classList.add('add_element');

    let html = '';

    if (loadProductName) {
      html += `<h3>${product.productName}</h3>`;
    }

    if (loadProductImage) {
      if (product.productImages && product.productImages.length > 0) {
        let images = product.productImages.slice(0, 5);

        html += `
          <div class="hover-slider">
            <div class="hover-track">
              ${images.map(img => `<img src="${img}" class="hover-img" />`).join("")}
            </div>
          </div>
        `;
      } else {
        html += `<img src="${product.productImage}" />`;
      }
    }

    html += `<button class="productBtn" onclick='buyNow(${index})'>Buy Now</button>`;

    div.innerHTML = html;
    container.appendChild(div);
    initHoverSliders();
  });
}

}

document.addEventListener("click", function(e) {
  if (e.target.classList.contains("toggleDesc")) {
    let descPara = e.target.previousElementSibling;
    if (descPara.classList.contains("expanded")) {
      // Collapse
      descPara.classList.remove("expanded");
      descPara.innerText = descPara.getAttribute("data-full").substring(0, 100) + "...";
      e.target.innerText = "More";
    } else {
      // Expand
      descPara.classList.add("expanded");
      descPara.innerText = descPara.getAttribute("data-full");
      e.target.innerText = "Less";
    }
  }
});


function initHoverSliders() {
  document.querySelectorAll(".hover-slider").forEach(slider => {
    const track = slider.querySelector(".hover-track");
    const images = slider.querySelectorAll(".hover-img");
    const dotsContainer = document.createElement("div");
    dotsContainer.className = "hover-dots";
    slider.appendChild(dotsContainer);

    let index = 0;
    let interval;

    // Cube setup
    track.style.transformStyle = "preserve-3d";
    track.style.transition = "transform 1s ease-in-out";

    const total = images.length;
    const angle = 360 / total;

    // Calculate translateZ based on width
    const sliderWidth = slider.offsetWidth;
    const translateZ = (sliderWidth / 2) / Math.tan(Math.PI / total);

    images.forEach((img, i) => {
      img.style.position = "absolute";
      img.style.top = 0;
      img.style.left = 0;
      img.style.backfaceVisibility = "hidden";
      img.style.transform = `rotateY(${i * angle}deg) translateZ(${translateZ}px)`;
    });

    // Create dots dynamically
    images.forEach((_, i) => {
      const dot = document.createElement("span");
      dot.className = "dot";
      if (i === 0) dot.classList.add("active");
      dot.addEventListener("click", () => {
        index = i;
        updateSlider();
      });
      dotsContainer.appendChild(dot);
    });

    const dots = dotsContainer.querySelectorAll(".dot");

    function updateSlider() {
      track.style.transform = `rotateY(-${index * angle}deg)`;
      dots.forEach((dot, i) => {
        dot.classList.toggle("active", i === index);
      });
    }

    function startScroll() {
      interval = setInterval(() => {
        index = (index + 1) % images.length;
        updateSlider();
      }, 2000);
    }

    function stopScroll() {
      clearInterval(interval);
    }

    slider.addEventListener("mouseenter", startScroll);
    slider.addEventListener("mouseleave", stopScroll);

    updateSlider();
  });
}


function initSliders() {
  document.querySelectorAll(".image-slider").forEach(slider => {
    const track = slider.querySelector(".slider-track");
    const images = slider.querySelectorAll(".slider-img");
    const dotsContainer = slider.querySelector(".dots");
    let index = 0;

    // create dots
    images.forEach((_, i) => {
      const dot = document.createElement("span");
      dot.classList.add("dot");
      if (i === 0) dot.classList.add("active");
      dot.addEventListener("click", () => {
        index = i;
        updateSlider();
      });
      dotsContainer.appendChild(dot);
    });

    const dots = dotsContainer.querySelectorAll(".dot");

    function updateSlider() {
      track.style.transform = `translateX(-${index * 100}%)`;
      dots.forEach((dot, i) => dot.classList.toggle("active", i === index));
    }

    function autoScroll() {
      index = (index + 1) % images.length;
      updateSlider();
    }

    updateSlider();
    setInterval(autoScroll, 4000); // auto scroll every 4s
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

  const elementsSection = document.getElementById('elements_section');
  if (elementsSection) {
    elementsSection.classList.add('blur');
  }
}


async function category_add() {
  const name = document.getElementById('categoryName').value.trim();
  const description = document.getElementById('categoryDescription').value.trim();
  const fileInput = document.getElementById('categoryFile');
  const file = fileInput.files[0];

  if (!name || !description || !file) {
    alert("All fields are required");
    return;
  }

  const formData = new FormData();
  formData.append("name", name);
  formData.append("description", description);
  formData.append("image", file);

  try {
    const res = await fetch("http://localhost:5000/api/categories/add", {
      method: "POST",
      body: formData
    });

    const data = await res.json();
    alert(data.message);

    if (res.ok) {
      closePopup('categorypopup');
      loadExistingCategories('admin');
      loadExistingCategories('landingPage');
    }
  } catch (err) {
    console.error("❌ Error:", err);
    alert("Something went wrong!");
  }
}


async function loadExistingCategories(popup) {
  console.log('loadExistingCategory Function started');

  try {
    const res = await fetch("http://localhost:5000/api/categories");
    const categories = await res.json();

    if (popup === 'admin') {
      const container = document.getElementById('elements_section');
      if (!container) return;
      container.innerHTML = '';

      categories.forEach(category => {
        const div = document.createElement('div');
        div.classList.add('category_element');

        let html = '';

        if (loadclosePopup) {
          html += `<button class="close-btn" onclick="closePopup('categorypopup')">×</button>`;
        }

        if (loadProductName) {
          html += `<h3>${category.name}</h3>`;  // ✅ DB column
        }

       if (loadProductImage && category.image) {
  html += `<img src="${category.image}" alt="${category.name}" />`;
}



        if (loadProductDescription) {
          html += `<p class='productDescription'>${category.description}</p>`; // ✅ DB column
        }

        div.innerHTML = html;
        container.appendChild(div);
      });
    }

    if (popup === 'landingPage') {
      const container = document.getElementById('category_section');
      if (!container) return;
      container.innerHTML = '';

      categories.forEach(category => {
        const div = document.createElement('div');
        div.classList.add('category_element');

        let html = '';

        if (loadProductName) {
          html += `<h3>${category.name}</h3>`;
        }

        if (loadProductImage) {
          html += `<img src="${category.image}" />`;
        }

        if (loadProductDescription) {
          html += `<p class='productDescription'>${category.description}</p>`;
        }

        html += `<button onclick='exploreButton(${category.id})'>Explore</button>`; // ✅ pass category id

        div.innerHTML = html;
        container.appendChild(div);
      });
    }
  } catch (err) {
    console.error("❌ Error fetching categories:", err);
  }
}


function exploreButton(){
  window.location.href = 'products.html'
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
    const notification = document.getElementById('notificationMainDiv')
    if(!searchInput.contains(event.target) && !suggestions.contains(event.target)){
        suggestions.innerHTML = ''
    }

    if(notification && !notification.contains(event.target)){
      notification.remove()
    }
}
document.addEventListener("click",clearData)



// add this function
function Dropdown(props) {
         if(props==='category'){
             const categoryData = JSON.parse(localStorage.getItem("categories"));

            const categorySelect = document.createElement("select");
            categorySelect.id = 'productCategory'

            const categoryMainOption = document.createElement("option");
            categoryMainOption.textContent = "Select the Category";
            categoryMainOption.disabled = true;
            categoryMainOption.selected = true;
            categorySelect.appendChild(categoryMainOption);


            categoryData.forEach(element => {
                const categoryOption = document.createElement("option");
                categoryOption.value = element.categoryName;
                categoryOption.setAttribute("id","categoryDropdown")
                categoryOption.textContent = element.categoryName;
                categorySelect.appendChild(categoryOption);
            });

  
        // document.body.append(categorySelect);
        const container = document.getElementById("categoryDropdownContainer");
        container.appendChild(categorySelect);

         }
         if(props==='brands'){
              const brandData = JSON.parse(localStorage.getItem("brands"));

            const brandSelect = document.createElement("select");
            brandSelect.id = 'brands'

            const brandMainOption = document.createElement("option");
            brandMainOption.textContent = "Select the Brand";
            brandMainOption.disabled = true;
            brandMainOption.selected = true;
            brandSelect.appendChild(brandMainOption);


            brandData.forEach(element => {
                const brandOption = document.createElement("option");
                brandOption.value = element.brandName;
                brandOption.setAttribute("id","brandDropdown")
                brandOption.textContent = element.brandName;
                brandSelect.appendChild(brandOption);
            });

  
        // document.body.append(categorySelect);
        const container = document.getElementById("brandsDropdownContainer");
        container.appendChild(brandSelect);
         }
}

    

// this function will give popup to the brands..

function add_brands(){
  if (document.getElementById('productpopup')) return; // if we write like this , if we click Multiple types on + button it wont trigger multiple times. 

  const popupDiv = document.createElement('div');
  popupDiv.classList.add('popupBrands');
  popupDiv.id = 'popupBrands'

  let html = ''

  if(closepopup){
    html+=`<button class="close-btn" onclick="closePopup('popupBrands')">×</button>`
  }

  if(addName){
    html+=`
    <label>Brand Name:</label>
    <input type="text" placeholder="Enter Brand name" id='brandName'/>`
  }
  if(addImage){
    html+=`<label>Brand Image:</label>
    <input type="file" id='brandFile'/>`
  }
  if(addbtn){
    html +=`<button onclick="brand_add()" id='add_button'>Add Brand</button>`
  }

  popupDiv.innerHTML = html
  document.body.appendChild(popupDiv);

  const elementsSection = document.getElementById('elements_section');
  if (elementsSection) {
    elementsSection.classList.add('blur');
  }

}

async function brand_add() {
  const brandName = document.getElementById('brandName').value.trim();
  const brandFileInput = document.getElementById('brandFile');
  const file = brandFileInput.files[0];

  if (!brandName || !file) {
    alert("Please provide brand name and image.");
    return;
  }

  const formData = new FormData();
  formData.append("name", brandName);
  formData.append("image", file);

  try {
    const res = await fetch(`${baseUrl}/api/brands/add`, {
      method: "POST",
      body: formData
    });

    const data = await res.json();

    if (!res.ok) {
      console.error("Brand add failed:", data);
      alert(data.message || "Failed to add brand");
      return;
    }

    alert(data.message || "Brand added successfully!");
    // remove any old localStorage copy to avoid confusion:
    try { localStorage.removeItem("brands"); } catch(e) {}
    closePopup('popupBrands');
    // refresh UI:
    loadExistingBrands('admin');
  } catch (err) {
    console.error("Error uploading brand:", err);
    alert("Something went wrong while uploading brand.");
  }
}

async function loadExistingBrands(props) {
  console.log('loadExistingBrands calling..');

  try {
    const res = await fetch(`${baseUrl}/api/brands`);
    if (!res.ok) {
      console.error("Failed to fetch brands", await res.text());
      return;
    }
    const brands = await res.json();

    // ✅ ADMIN PANEL VIEW
    if (props === 'admin') {
      const container = document.getElementById('elements_section');
      if (!container) return;
      container.innerHTML = '';

      brands.forEach(brand => {
        const div = document.createElement('div');
        div.classList.add('loadBrands');

        let html = '';

        // edit button
        if (loadEditButton) {
          html += `<button class="edit_button" onclick="editBrand(${brand.id})">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="white" viewBox="0 0 16 16">
              <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 
              .708l-10 10a.5.5 0 0 1-.168.11l-5 
              2a.5.5 0 0 1-.65-.65l2-5a.5.5 
              0 0 1 .11-.168z"/>
            </svg>
          </button>`;
        }

        // delete button
        if (loadRemoveButton) {
          html += `<button class="remove-btn" onclick="removeBrandById(${brand.id})">×</button>`;
        } 

        // ✅ Always prepend uploads/brands path
        const imgSrc = brand.image
  ? `${baseUrl}${brand.image}`   // ✅ no double "uploads/brands"
  : 'https://via.placeholder.com/...';


        if (loadProductImage) {
          html += `<img src="${imgSrc}" alt="${brand.name}" />`;
        }

        if (loadProductName) {
          html += `<h3>${brand.name}</h3>`;
        }

        div.innerHTML = html;
        container.appendChild(div);
      });
    }

    // ✅ LANDING PAGE VIEW
    else if (props === 'landingPage') {
      const container = document.getElementById('brand_section'); // different container
      if (!container) return;
      container.innerHTML = '';

      // create scroll container
      const scrollContainer = document.createElement('div');
      scrollContainer.setAttribute('id', 'brand_scroll_container');
      scrollContainer.style.overflow = 'hidden';
      scrollContainer.style.whiteSpace = 'nowrap';
      scrollContainer.style.position = 'relative';
      scrollContainer.style.width = '100%';

      const scrollContent = document.createElement('div');
      scrollContent.setAttribute('id', 'scroll_content');
      scrollContent.style.display = 'inline-block';
      scrollContent.style.whiteSpace = 'nowrap';
      scrollContent.style.position = 'relative';
      scrollContent.style.left = '0px';

      function createBrandElements() {
        const fragment = document.createDocumentFragment();
        brands.forEach(brand => {
          const div = document.createElement('div');
          div.classList.add('loadBrands');
          div.style.display = 'inline-block';
          div.style.margin = '0 20px';
          div.style.textAlign = 'center';

          const imgSrc = brand.image
          ? `${baseUrl}${brand.image}`   // DB returns "/uploads/brands/xxx.png"
          : 'https://via.placeholder.com/250x300?text=No+Image';



          div.innerHTML = `
            <img src="${imgSrc}" style="width: 250px; height: 300px; border-radius: 8px;" />
            <h3 style="font-size: 16px;">${brand.name}</h3>
          `;
          fragment.appendChild(div);
        });
        return fragment;
      }

      scrollContent.appendChild(createBrandElements());
      scrollContent.appendChild(createBrandElements()); // duplicate for seamless scroll
      scrollContainer.appendChild(scrollContent);
      container.appendChild(scrollContainer);

      // start scroll
      startSeamlessScroll(scrollContent, brands.length);
    }
  } catch (err) {
    console.error("❌ Error fetching brands:", err);
  }
}



async function removeBrandById(brandId) {
  if (!confirm("Delete this brand?")) return;
  try {
    const res = await fetch(`${baseUrl}/api/brands/${brandId}`, { method: "DELETE" });
    if (!res.ok) {
      const txt = await res.text();
      console.error("Delete failed:", txt);
      alert("Failed to delete brand");
      return;
    }
    alert("Brand deleted");
    loadExistingBrands('admin');
  } catch (err) {
    console.error("Error deleting brand:", err);
    alert("Something went wrong while deleting brand.");
  }
}


// this function will use for smooth scrolling
function startSeamlessScroll(content) {
  let position = 0;
  const resetPoint = content.offsetWidth / 2;

  function animate() {
    position -= 1;
    content.style.left = position + 'px';

    if (Math.abs(position) >= resetPoint) {
      position = 0;
    }

    requestAnimationFrame(animate);
  }

  animate();
}

function next() {
  const productName = document.getElementById('productName').value;
  const productFileInput = document.getElementById('productFile');
  const productPrice = document.getElementById('productPrice').value;
  const productDiscount = document.getElementById('productDiscount').value;
  const productDescription = document.getElementById('productDescription').value;
  const productCategory = document.getElementById('productCategory').value;
  const productBrand = document.getElementById('brands').value;
  const productQuantity = document.getElementById('productQuantity').value;

  const file = productFileInput.files[0];
  if (!file || !productCategory || !productBrand) {
    alert("Please fill all the Details");
    return;
  }

  const reader = new FileReader();
  reader.onload = function (event) {
    const base64Image = event.target.result;

    let finalPrice = (productPrice * productDiscount) / 100;
    finalPrice = productPrice - finalPrice;

    const productData = {
      productName,
      productDescription,
      productImage: base64Image,
      productCategory,
      productBrand,
      productQuantity,
      productPrice,
      productDiscount,
      finalPrice
    };

    let products = JSON.parse(sessionStorage.getItem("products")) || [];
    products.push(productData);
    sessionStorage.setItem("products", JSON.stringify(products));

    let userConfirm = confirm("Product Added Successfully. Now Add Specifications?");
    if (userConfirm) {
      productAdded = true; // update global flag
      closePopup('productpopup');
      add_products(); // reopen popup → this time will only show specifications
    } else {
      closePopup('productpopup');
    }

    loadExistingProducts('admin');
  };
  reader.readAsDataURL(file);
}


function addSpecifications() {
  if (document.querySelector(".specification-block")) return;  // prevent duplicates

  // color
  let colorBlock = document.createElement('div');
  colorBlock.classList.add('specification-block');
  colorBlock.innerHTML = `
    <label>Product Color:</label>
    <input type="text" placeholder="e.g. Red" class="specColor"/><br>
    <label>Product Image:</label>
    <input type="file" class="specImage"/><br>
    <label>Product Price:</label>
    <input type="number" placeholder="e.g. 500" class="specPrice"/><br>
    <button type="button" onclick="saveSpecification(this, 'color')">Add</button>
    <button type="button" onclick="specificationRemove(this)">Remove</button>
  `;

  //model
  let modelBlock = document.createElement('div');
  modelBlock.classList.add('specification-block');
  modelBlock.innerHTML = `
    <label>Model:</label>
    <input type="text" placeholder="e.g. iPhone 15" class="specModel"/><br>
    <button type="button" onclick="saveSpecification(this, 'model')">Add</button>
    <button type="button" onclick="specificationRemove(this)">Remove</button>
  `;

  // variant block
  let variantBlock = document.createElement('div');
  variantBlock.classList.add('specification-block');
  variantBlock.innerHTML = `
    <label>Variants:</label>
    <input type="text" placeholder="e.g. XL, 128GB" class="specVariant"/><br>
    <button type="button" onclick="saveSpecification(this, 'variant')">Add</button>
    <button type="button" onclick="specificationRemove(this)">Remove</button>
  `;

  // Append all to popup
  const popup = document.getElementById('productpopup');
  popup.appendChild(colorBlock);
  popup.appendChild(modelBlock);
  popup.appendChild(variantBlock);

  // disable add button until blocks are saved/removed
  document.querySelector("#productpopup button[onclick='addSpecifications()']").disabled = true;
}


function specificationRemove(button){
  const block = button.closest(".specification-block");
  block.remove();  
  document.querySelector("#productpopup button[onclick='addSpecifications()']").disabled = false;
}

function saveSpecification(button, type) {
  const block = button.closest(".specification-block");
  let products = JSON.parse(sessionStorage.getItem("products")) || [];

  if (products.length === 0) {
    alert("No product found to attach this specification.");
    return;
  }

  let lastProduct = products[products.length - 1];
  if (!lastProduct.specifications) {
    lastProduct.specifications = { colors: [], variants: [], modes: [] };
  }

  if (type === "color") {
    const color = block.querySelector(".specColor").value;
    const price = block.querySelector(".specPrice").value;
    const fileInput = block.querySelector(".specImage");
    const file = fileInput.files[0];

    if (!color || !price || !file) {
      alert("Please fill all color specification details");
      return;
    }

    const reader = new FileReader();
    reader.onload = function (event) {
      const base64Image = event.target.result;

      lastProduct.specifications.colors.push({
        color,
        specPrice: price,
        specImage: base64Image
      });

      sessionStorage.setItem("products", JSON.stringify(products));
      alert("Color added successfully!");
      
      block.querySelector(".specColor").value = "";
      block.querySelector(".specPrice").value = "";
      block.querySelector(".specImage").value = "";


    };
    reader.readAsDataURL(file);
  }

  if (type === "variant") {
    console.log('variant is calling')
    const variant = block.querySelector(".specVariant").value;

    if (!variant) {
      alert("Please fill all variant details");
      return;
    }

    lastProduct.specifications.variants.push({
      variant
    });

    sessionStorage.setItem("products", JSON.stringify(products));
    alert("Variant added successfully!");

    block.querySelector('.specVariant').value = ""
  }

  if (type === "model") {
    console.log('model is calling')
    const mode = block.querySelector(".specModel").value;

    if (!mode) {
      alert("Please fill all mode details");
      return;
    }

    lastProduct.specifications.modes.push({ mode });

    sessionStorage.setItem("products", JSON.stringify(products));
    alert("Model added successfully!");

    block.querySelector('.specModel').value = ''
  }
}


function back() {
  productAdded = false;
  closePopup('productpopup'); 
  add_products(); 

  
  let products = JSON.parse(sessionStorage.getItem('products')) || [];
  
  if (products.length > 0) {
    let lastProduct = products[products.length - 1];

    document.getElementById('productName').value = lastProduct.productName || "";
    document.getElementById('productPrice').value = lastProduct.productPrice || "";
    document.getElementById('productDiscount').value = lastProduct.productDiscount || "";
    document.getElementById('productDescription').value = lastProduct.productDescription || "";
    document.getElementById('productCategory').value = lastProduct.productCategory || "";
    document.getElementById('brands').value = lastProduct.productBrand || "";
    document.getElementById('productQuantity').value = lastProduct.productQuantity || "";


  }
}

function productSubmit() {
    let product = JSON.parse(sessionStorage.getItem("products"));

    if (!product) {
        alert("No product data found to submit!");
        return;
    }

    if (!product.specifications || product.specifications.length === 0) {
        let confirmSkip = confirm("Really don't want to add specification?");
        if (!confirmSkip) {
            return;
        }
    }

    let products = JSON.parse(localStorage.getItem("products")) || [];

    
    products.push(product);

    localStorage.setItem("products", JSON.stringify(products));

    sessionStorage.removeItem("products");

    alert("Product submitted successfully!");

    loadExistingProducts('admin')
    closePopup('productpopup')
}
