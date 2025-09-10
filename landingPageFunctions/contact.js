
function createContactPage() {
  const container = document.createElement('div');
  container.className = 'contact-container';

  const heading = document.createElement('h2');
  heading.innerText = 'Contact Us';
  container.appendChild(heading);

  const form = document.createElement('form');
  form.onsubmit = handleContactSubmit;

  // Name
  const nameInput = document.createElement('input');
  nameInput.type = 'text';
  nameInput.placeholder = 'Your Name';
  nameInput.required = true;
  nameInput.id = 'contactName';
  form.appendChild(nameInput);

  // Email
  const emailInput = document.createElement('input');
  emailInput.type = 'email';
  emailInput.placeholder = 'Your Email';
  emailInput.required = true;
  emailInput.id = 'contactMail';
  form.appendChild(emailInput);

  // Number
  const numberInput = document.createElement('input');
  numberInput.type = 'number';
  numberInput.placeholder = 'Your Number';
  numberInput.required = true;
  numberInput.id = 'contactNumber';
  form.appendChild(numberInput);

  // Subject
  const subjectInput = document.createElement('input');
  subjectInput.type = 'text';
  subjectInput.placeholder = 'Subject';
  subjectInput.required = true;
  subjectInput.id = 'contactSubject';
  form.appendChild(subjectInput);

  // Submit Button
  const submitBtn = document.createElement('button');
  submitBtn.type = 'submit';
  submitBtn.innerText = 'Send Message';
  form.appendChild(submitBtn);

  container.appendChild(form);

  // Add to the body or a specific section
  document.body.appendChild(container);
}
function handleContactSubmit(event) {
    event.preventDefault(); // Prevent default form submission

    let loggedInUserId = sessionStorage.getItem("isLoggedIn"); // you store userId in sessionStorage
    let users = JSON.parse(localStorage.getItem("users")) || [];

    // Find logged-in user
    let loggedInUser = users.find(u => u.userId === loggedInUserId);

    if (loggedInUser) {
        let contactName = document.getElementById('contactName').value;
        let contactMail = document.getElementById('contactMail').value;
        let contactNumber = document.getElementById('contactNumber').value;
        let contactSubject = document.getElementById('contactSubject').value;
        let now = new Date();
        let current = now.toLocaleString(); // date and time added

        // Prepare contact object with empty orders
        let contact = {
            contactName,
            contactMail,
            contactNumber,
            contactSubject,
            current,
            visited: false,
            orders: []  // store orders here instead of in loggedInUser
        };

        // If cart has items, move them into contact.orders
        if (loggedInUser.cart && loggedInUser.cart.length > 0) {
            loggedInUser.cart.forEach(item => {
                item.orderDate = current;
                contact.orders.push(item); // push into contact.orders
            });

            loggedInUser.cart = [];
        }

        if (!Array.isArray(loggedInUser.contact)) {
            loggedInUser.contact = [];
        }

        // Push the full contact object (with orders inside)
        loggedInUser.contact.push(contact);

        // Save back to localStorage
        localStorage.setItem('users', JSON.stringify(users));

        alert('Your message and orders have been sent successfully!');

        let cartCount = document.querySelector('.cart-count');
        if (cartCount) cartCount.remove();

        // Reset form
        document.getElementById('contactName').value = "";
        document.getElementById('contactMail').value = "";
        document.getElementById('contactNumber').value = "";
        document.getElementById('contactSubject').value = "";

        console.log("Contact:", contact);
        console.log("Updated User:", loggedInUser);
    } else {
        let proceed = confirm('To continue the Process, Please Log in');
        if (proceed) {
            window.location.href = 'loginRegister.html';
        }
    }
}


