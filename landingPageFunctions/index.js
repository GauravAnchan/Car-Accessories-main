let chatBotRemove =  `<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="white" class="bi bi-x chatBotClose" viewBox="0 0 16 16">
            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
            </svg>`
let autoChatBot = false

function AvailableBrands() {
    // main div
    let AvailableBrands = document.createElement('div');
    AvailableBrands.setAttribute('class', 'AvailableBrands');
    AvailableBrands.setAttribute('id', 'AvailableBrands');

    // Heading 
    const heading = document.createElement('h2');
    heading.textContent = 'Featured Brands';
    heading.style.textAlign = 'center';
    heading.style.marginTop = '20px';
    heading.style.marginBottom = '20px';
    heading.style.fontSize = '28px';
    heading.style.fontWeight = 'bold';
    AvailableBrands.appendChild(heading);

    // inner div
    const elementsSection = document.createElement('div');
    elementsSection.setAttribute('id', 'elements_section');
    AvailableBrands.appendChild(elementsSection);

    // Finally append to the body
    document.body.appendChild(AvailableBrands);

    loadExistingBrands('landingPage');
}





function categorySection() {
    console.log('categorySection function calling');

    const categoryWrapper = document.createElement('div');
    categoryWrapper.setAttribute('id', 'category_wrapper');

    const heading = document.createElement('h2');
    heading.textContent = 'Featured Categories';
    heading.style.textAlign = 'center';
    heading.style.marginTop = '20px';
    heading.style.fontSize = '28px';
    heading.style.fontWeight = 'bold';

    const availableCategories = document.createElement('div');
    availableCategories.setAttribute('class', 'categorySection');
    availableCategories.setAttribute('id', 'category_section');

    categoryWrapper.appendChild(heading);
    categoryWrapper.appendChild(availableCategories);

    document.body.appendChild(categoryWrapper);

    loadExistingCategories('landingPage');

    console.log('categorySection function calling ending');
}


function footer() {
    console.log('footer function calling started');

    let footerSection = document.createElement('div');
    footerSection.setAttribute('class', 'footerSection');
    footerSection.setAttribute('id', 'footerSection');

    footerSection.innerHTML = `
        <p>© 2025 <strong>MOD SHELTER</strong>. All rights reserved.</p>
        <p>
            At <strong>MOD SHELTER</strong>, we believe your vehicle deserves more than just accessories — it deserves a statement. 
            Based in Mangalore, we are passionate about bringing you premium auto gadgets, stylish modifications, and high-performance 
            essentials that transform every ride into an experience. Whether you’re an off-road adventurer, city cruiser, or car 
            enthusiast, <strong>MOD SHELTER</strong> is your trusted partner in turning ordinary drives into extraordinary journeys.
        </p>
    `;

    document.body.appendChild(footerSection);

    console.log('footer function calling ended.');
}
function landingPageVideo() {

      let landingPageVideoStyle = {
        position : 'fixed',
        bottom: '10px',
        left: '10px',
        height : '240px',
        width : '400px',
        backgroundColor : 'white',
        zIndex: '9999',
        animation: 'slideUp 0.5s ease-out forwards',
        overflow:'hidden'
    }

     let videoControls = {
        attributes:{
            src:'videoAdvertisement.mp4',
            autoplay:true,
            muted:true
        },
        styles:{
            width:'400px',
            height:'240px',
            objectFit:'cover'
        }
    }

    const style = document.createElement('style')
    style.textContent = `
        @keyframes slideUp {
            from {
                transform: translateY(100%);
                opacity: 0;
            }
            to {
                transform: translateY(0);
                opacity: 1;
            }
        }

        @keyframes slideDown {
            from {
                transform: translateY(0);
                opacity: 1;
            }
            to {
                transform: translateY(100%);
                opacity: 0;
            }
        }
    `
    document.head.appendChild(style)

    let landingPageVideo = document.createElement('div')
    Object.assign(landingPageVideo.style, landingPageVideoStyle)

    let video = document.createElement('video')
    Object.assign(video,videoControls.attributes)
    Object.assign(video.style,videoControls.styles)

    landingPageVideo.appendChild(video)

    document.body.appendChild(landingPageVideo)

    setTimeout(() => {
        landingPageVideo.style.animation = 'slideDown 0.5s ease-in forwards'
        setTimeout(() => {
            landingPageVideo.remove()
        }, 500) 
    }, 30000) 
}

function chatBot(props) {
    let chatBotDiv = document.createElement('img');
    chatBotDiv.setAttribute('class','chatBotMainDiv')
    chatBotDiv.src = 'chatbot.png'

    chatBotDiv.addEventListener('click', () => {
        if (document.getElementById("chatWindow")) return;

        let chatBotWindow = document.createElement('div');
        chatBotWindow.setAttribute('class','chatBotWindowCss')
        chatBotWindow.id = "chatWindow";
        
        
        let header = document.createElement('div');
        header.setAttribute('class','chatBotHeader');
        header.textContent = "🤖 Welcome to Chat Bot";
        chatBotWindow.appendChild(header);

        
        let msg = [
            'Hi 👋 How May I Help you ?',
            'Looking for product details?',
            'Want to check your orders?'
        ];
        let index = 0;

        let message = document.createElement('div');
        message.setAttribute('class', 'chatBotMessage'); 
        message.textContent = msg[index];
        chatBotWindow.appendChild(message);

        let intervalId = setInterval(() => {
            index = (index + 1) % msg.length;
            message.style.opacity = 0;
            setTimeout(() => {
                message.textContent = msg[index];
                message.style.opacity = 1;
            }, 300);
        }, 3000);

        
        let contentArea = document.createElement('div');
        contentArea.className = "chatBotContent";
        chatBotWindow.appendChild(contentArea);

        
        let buttonWrapper = document.createElement('div');
        buttonWrapper.className = "chatBotButtons";

        let orderBtn = document.createElement('button')
        orderBtn.textContent = "📦 Orders";
        orderBtn.className = "chatBotButton";
        buttonWrapper.appendChild(orderBtn);

        let cartBtn = document.createElement('button')
        cartBtn.textContent = "🛒 Cart";
        cartBtn.className = "chatBotButton";
        buttonWrapper.appendChild(cartBtn);

        let feedBack = document.createElement('button')
        feedBack.textContent = "✍️ Feedback";
        feedBack.className = "chatBotButton";
        buttonWrapper.appendChild(feedBack);

        chatBotWindow.appendChild(buttonWrapper);

    //    fetch the details of the user
        let loggedInUserId = sessionStorage.getItem("isLoggedIn");
        let users = JSON.parse(localStorage.getItem("users")) || [];
        let loggedInUser = users.find(u => u.userId === loggedInUserId);

// orderBtn
    orderBtn.addEventListener('click', () => {
    contentArea.innerHTML = "";

    // If not logged in
    if (!loggedInUser) {
        contentArea.innerHTML = `<p class="emptyMsg">⚠️ Please log in to see your past orders.</p>`;
        return;
    }

    // Collect all orders from contact[]
    let allOrders = [];
    if (loggedInUser.contact && loggedInUser.contact.length > 0) {
        loggedInUser.contact.forEach(c => {
            if (c.orders && c.orders.length > 0) {
                allOrders = allOrders.concat(c.orders);
            }
        });
    }

    // If no orders
    if (allOrders.length === 0) {
        contentArea.innerHTML = `<p class="emptyMsg">📭 No recent orders.</p>`;
        return;
    }

    // If orders exist → display them
    contentArea.innerHTML = `<h3>📦 Your Past Orders</h3>`;
    allOrders.forEach(order => {
        let orderItem = document.createElement("div");
        orderItem.className = "cartItem";
        orderItem.innerHTML = `
            <img src="${order.image || 'placeholder.png'}" alt="${order.name}">
            <div>
                <strong>${order.name}</strong><br>
                Price: ${order.price || 'N/A'}<br>
                Date: ${order.orderDate || 'N/A'}
            </div>
        `;
        contentArea.appendChild(orderItem);
    });
    });


        // --- Cart Btn
        cartBtn.addEventListener('click', () => {
            contentArea.innerHTML = ""; 
            if(!loggedInUser){
                contentArea.innerHTML =   `<p class="emptyMsg">⚠️ Please log in to see your cart</p>`
            }
            if (!loggedInUser.cart || loggedInUser.cart.length === 0) {
                contentArea.innerHTML = `<p class="emptyMsg">🛒 Your cart is empty.</p>`;
            } else {
                contentArea.innerHTML = `<h3>🛍️ Your Cart</h3>`;
                loggedInUser.cart.forEach(item => {
                    let cartItem = document.createElement('div');
                    cartItem.className = "cartItem";
                    cartItem.innerHTML = `
                        <img src="${item.image}" alt="${item.name}">
                        <div>
                            <strong>${item.name}</strong><br>
                            Price: ${item.price}
                        </div>
                    `;
                    contentArea.appendChild(cartItem);
                });
            }
        });

      // --- Feedback Btn
    feedBack.addEventListener('click', () => {
    contentArea.innerHTML = `
        <h3>Give Your Feedback</h3>
        <textarea id="feedbackText" placeholder="Write your feedback here..." rows="4" style="width: 100%; padding: 8px; border-radius: 8px; border: 1px solid #ccc;"></textarea>
        <br>
        <button id="submitFeedback" style="margin-top:10px; padding:6px 12px; border:none; border-radius:6px; background:#343a40; color:white; cursor:pointer;">
            Submit
        </button>
    `;

    // Handle Submit Click
    let submitBtn = document.getElementById('submitFeedback');
    submitBtn.classList.add('chatBotButtons')
    submitBtn.addEventListener('click', () => {
        let feedbackText = document.getElementById('feedbackText').value.trim();

        if (feedbackText === "") {
            alert("⚠️ Please enter your feedback before submitting.");
            return;
        }

        // Here you can save feedback to localStorage or send to server
        console.log("User Feedback:", feedbackText);

        contentArea.innerHTML = `<p class="thanksMsg">🙏 Thanks for giving your feedback!</p>`;
    });
    });


        // --- Append to body ---
        document.body.appendChild(chatBotWindow);

        setTimeout(() => {
            chatBotWindow.style.opacity = "1";
            chatBotWindow.style.transform = "translateY(0)";
        }, 50);

        // --- Close Button ---
        let chatBotClose = document.createElement('div')
        chatBotClose.setAttribute('class','chatBotClose')
        chatBotClose.innerHTML = chatBotRemove

        chatBotClose.addEventListener('click',()=>{
            clearInterval(intervalId);
            chatBotWindow.remove()
        })

        chatBotWindow.appendChild(chatBotClose)
    });
    
    document.body.appendChild(chatBotDiv);

    if(props){
        setTimeout(()=>{
            chatBotDiv.click();
        },5000)

    }
}










