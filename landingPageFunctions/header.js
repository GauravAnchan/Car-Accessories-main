let profileButton = `<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="#343a40;" class="bi bi-person-circle" viewBox="0 0 16 16">
  <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
  <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"/>
</svg>`

let cartButton = `<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="#343a40" class="bi bi-cart4" viewBox="0 0 16 16">
  <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5M3.14 5l.5 2H5V5zM6 5v2h2V5zm3 0v2h2V5zm3 0v2h1.36l.5-2zm1.11 3H12v2h.61zM11 8H9v2h2zM8 8H6v2h2zM5 8H3.89l.5 2H5zm0 5a1 1 0 1 0 0 2 1 1 0 0 0 0-2m-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0m9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2m-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0"/>
</svg>`

function MainHeader() {
  let mainHeader = document.createElement('div');
  mainHeader.setAttribute('class', 'MainHeader');
  mainHeader.setAttribute('id', 'MainHeader');

  let headerLogo = document.createElement('img');
  headerLogo.setAttribute('class', 'HeaderLogo');
  headerLogo.setAttribute('id', 'HeaderLogo');
  headerLogo.src = 'logo.jpeg';

  let headerButtons = document.createElement('div');
  headerButtons.setAttribute('class', 'HeaderButtons');

  let HomeButton = MainButton('Home');
  HomeButton.addEventListener('click', () => window.location.href = 'index.html');

  let ShopButton = MainButton('Shop');
  ShopButton.addEventListener('click', () => window.location.href = 'products.html');

  let cart = MainButton(cartButton);
  cart.classList.add('profileButton');
  cart.addEventListener('click', () => window.location.href = 'addtoCart.html');

  let loggedInUserId = sessionStorage.getItem('isLoggedIn');
  let users = JSON.parse(localStorage.getItem('users')) || [];
  let loggedInUser = users.find(u => u.userId === loggedInUserId && u.active === true);

  if (loggedInUser) {
    if (!Array.isArray(loggedInUser.cart)) {
      loggedInUser.cart = [];
      const userIndex = users.findIndex(u => u.userId === loggedInUserId);
      if (userIndex > -1) {
        users[userIndex].cart = [];
        localStorage.setItem('users', JSON.stringify(users));
      }
    }

    if (loggedInUser.cart.length > 0) {
      let cartCount = document.createElement('span');
      cartCount.classList.add('cart-count');
      cartCount.textContent = loggedInUser.cart.length;
      cart.appendChild(cartCount);
    }
  }

  let ContactButton = MainButton('Contact');
  ContactButton.addEventListener('click', () => window.location.href = 'contact.html');

  // Profile dropdown container
  const profileContainer = document.createElement('div');
  profileContainer.classList.add('profileContainer');

  // Profile button (always visible)
  const profileButton = MainButton(`<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="#343a40;" class="bi bi-person-circle" viewBox="0 0 16 16">
    <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
    <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"/>
  </svg>`);
  profileButton.classList.add('profileButton');

  // Dropdown (hidden initially)
  const logoutDropdown = document.createElement('div');
  logoutDropdown.classList.add('logoutDropdown');
  logoutDropdown.style.display = 'none';

  if (loggedInUser) {
    // Profile icon inside dropdown
    const profileIcon = document.createElement('div');
    profileIcon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="#343a40;" class="bi bi-person-circle" viewBox="0 0 16 16">
      <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
      <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"/>
    </svg>`;
    profileIcon.classList.add('profileIcon');
    logoutDropdown.appendChild(profileIcon);

    // Username
    const userLabel = document.createElement('p');
    userLabel.textContent = `${loggedInUser.name}`;
    userLabel.classList.add('userLabel');
    logoutDropdown.appendChild(userLabel);
  }

  // Logout button
  const logout = document.createElement('button');
  logout.classList.add('logoutButton');
  logout.textContent = 'Logout';

  logout.addEventListener('click', () => {
    if (loggedInUserId) {
      let users = JSON.parse(localStorage.getItem('users')) || [];
      const userIndex = users.findIndex(u => u.userId === loggedInUserId);

      if (userIndex > -1) {
        users[userIndex].active = false;
        localStorage.setItem('users', JSON.stringify(users));
      }
      sessionStorage.removeItem('isLoggedIn');
    }
    window.location.reload();
  });

  logoutDropdown.appendChild(logout);

  profileContainer.appendChild(profileButton);
  profileContainer.appendChild(logoutDropdown);

  // if we click on the profile button then logoutDropDown has to display
  profileButton.addEventListener('click', () => {
    if (loggedInUser) {
      logoutDropdown.style.display =
        logoutDropdown.style.display === 'none' ? 'block' : 'none';
    }
  });

  // if we are clicking out side of the logut drop down then it will remove.
  document.addEventListener('click', (event) => {
    if (
      logoutDropdown.style.display === 'block' &&
      !logoutDropdown.contains(event.target) &&
      !profileButton.contains(event.target)
    ) {
      logoutDropdown.style.display = 'none';
    }
  });


  headerButtons.appendChild(HomeButton);
  headerButtons.appendChild(ShopButton);
  headerButtons.appendChild(cart);
  headerButtons.appendChild(ContactButton);
  headerButtons.appendChild(profileContainer);

  mainHeader.appendChild(headerLogo);
  mainHeader.appendChild(headerButtons);
  document.body.appendChild(mainHeader);
}


function MainButton(name) {
  const button = document.createElement('button');
  button.setAttribute('class', 'HomeButton');
  button.value = name;
  button.innerHTML = name;


  return button;
}

function MainSubHeader() {
  let MainSubHeader = document.createElement('div');
  MainSubHeader.setAttribute('class', 'MainSubHeader');

  let SubHeaderContent = document.createElement('div');
  SubHeaderContent.setAttribute('class', 'SubHeaderContent');

  let SubHeaderName = document.createElement('p');
  SubHeaderName.textContent = 'Welcome to MOD SHELTER';
  SubHeaderName.setAttribute('class', 'SubHeaderName');

  let SubHeaderSub = document.createElement('p');
  SubHeaderSub.textContent = 'Best Accessories & Auto Gadgets Delivered Across Mangalore';
  SubHeaderSub.setAttribute('class', 'SubHeaderSub');

  let loggedInUserId = sessionStorage.getItem('isLoggedIn')
  let users = JSON.parse(localStorage.getItem('users')) || []

  let loggedInUser = users.find(u=> u.userId === loggedInUserId && u.active === true)

  if(!loggedInUser){
    const loginRegisterButton = MainButton('Login/Register')
    loginRegisterButton.setAttribute('class','loginRegisterButton')
    loginRegisterButton.addEventListener('click',()=>{
      window.location.href = 'loginRegister.html'
    })
    MainSubHeader.appendChild(loginRegisterButton)
  }

  MainSubHeader.appendChild(SubHeaderContent);
  SubHeaderContent.appendChild(SubHeaderName);
  SubHeaderContent.appendChild(SubHeaderSub);

  document.body.appendChild(MainSubHeader);
}


function AutoScrollImages() {
      const container = document.createElement('div');
      container.className = 'auto-scroll-banner';

      const imgSources = [
        'https://images.pexels.com/photos/31698030/pexels-photo-31698030.jpeg',
        'img1.jpeg',
        'img2.jpeg',
        'img3.jpeg',
        'img4.jpeg'
      ];

      const images = imgSources.map(src => {
        const img = document.createElement('img');
        img.src = src;
        container.appendChild(img);
        return img;
      });

      document.body.appendChild(container);

      let currentIndex = 0;
      images[currentIndex].classList.add('active');

      setInterval(() => {
        images[currentIndex].classList.remove('active');
        currentIndex = (currentIndex + 1) % images.length;
        images[currentIndex].classList.add('active');
      }, 3000); // Change every 3 seconds
    }


