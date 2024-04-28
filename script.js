document.addEventListener("DOMContentLoaded", function () {
    // Function to create a product card
    function createProductCard(product) {
        const card = document.createElement('div');
        card.className = 'cardd';
        const cardImage = document.createElement('img');
        cardImage.src = product.image;
        cardImage.alt = 'Image';
        cardImage.className = 'product-image';
        const cardContent = document.createElement('div');
        cardContent.className = 'card-content';
        const title = document.createElement('h3');
        title.textContent = product.title;
        const description = document.createElement('p');
        description.textContent = product.description;
        const amount = document.createElement('p');
        amount.textContent = 'Amount: ' + product.amount;
        const addToCartButton = document.createElement('button');
        addToCartButton.textContent = 'Add To Cart';
        addToCartButton.className = 'add-to-cart';
        cardContent.appendChild(title);
        cardContent.appendChild(description);
        cardContent.appendChild(amount);
        cardContent.appendChild(addToCartButton);
        card.appendChild(cardImage);
        card.appendChild(cardContent);
        return card;
    }

    // Fetches data from 'db.json' for products
    fetch('db.json')
        .then(response => response.json())
        .then(data => {
            const productContainer = document.getElementById('product-container');
            data.foodList.forEach(product => {
                const card = createProductCard(product);
                productContainer.appendChild(card);
            });
        })
        .catch(error => console.error('Error fetching product data:', error));

    // Fetches data from 'reviews.json' for reviews
    const reviewsContainer = document.getElementById('reviews-container');
    fetch('reviews.json')
        .then(response => response.json())
        .then(data => {
            data.reviews.forEach(review => {
                const card = document.createElement('div');
                card.className = 'review-card';
                const username = document.createElement('h3');
                username.textContent = review.username;
                const rating = document.createElement('p');
                rating.textContent = `Rating: ${review.rating}`;

                // Creates stars based on rating
                const stars = document.createElement('div');
                stars.className = 'stars';
                for (let i = 0; i < review.rating; i++) {
                    const star = document.createElement('span');
                    star.innerHTML = '&#9733;'; // emoji star symbol
                    stars.appendChild(star);
                }

                const comment = document.createElement('p');
                comment.textContent = review.comment;

                card.appendChild(username);
                card.appendChild(rating);
                card.appendChild(stars);
                card.appendChild(comment);
                reviewsContainer.appendChild(card);
            });
        })
        .catch(error => console.error('Error fetching reviews data:', error));

    // Event listener for adding items to the cart
    document.addEventListener('click', (event) => {
        if (event.target?.classList.contains('add-to-cart')) {
            const title = event.target.parentElement.querySelector('h3').textContent;
            alert(`${title} added to cart successfully!`);
        }
    });

    // Function to handle search functionality 
    document.getElementById('search-form').addEventListener('submit', function (event) {
        event.preventDefault();
        const searchTerm = document.getElementById('search-box').value.toLowerCase();
        const productCards = document.querySelectorAll('.cardd');
        let found = false;

        productCards.forEach(card => {
            const title = card.querySelector('h3').textContent.toLowerCase();
            if (title.includes(searchTerm)) {
                card.scrollIntoView({ behavior: 'smooth' });
                card.classList.add('search-match');
                found = true;
                setTimeout(() => card.classList.remove('search-match'), 1000);
            }
        });

        if (!found) {
            alert('Sorry, we don\'t have that item right now :( ');
        }
    });

    //cart functionality
    let listProductHTML = document.querySelector('.listProduct');
    let listCartHTML = document.querySelector('.listCart');
    let iconCart = document.querySelector('.icon-cart');
    let iconCartSpan = document.querySelector('.icon-cart span');
    let body = document.querySelector('body');
    let closeCart = document.querySelector('.close');
    let products = [];
    let cart = [];

    // Function to toggle cart visibility
    iconCart.addEventListener('click', () => {
        body.classList.toggle('showCart');
    });

    // Function to close the cart

closeCart.addEventListener('click', () => {
    console.log('Close button clicked'); // Debugging statement
    body.classList.toggle('showCart');
});


  // Event listener for adding items to the cart
document.addEventListener('click', (event) => {
    if (event.target?.classList.contains('add-to-cart')) {
        const title = event.target.parentElement.querySelector('h3').textContent;
        const selectedProduct = products.find(product => product.title === title);
        if (selectedProduct) {
            cart.push(selectedProduct); // Add selected product to cart array
            addCartToHTML(); // Update cart display
            updateCartCount(); // Update count on blue circle icon
        }
    }
});
// Function to update the cart display
const addCartToHTML = () => {
    listCartHTML.innerHTML = '';
    let totalAmount = 0; 

    cart.forEach(product => {
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');

        // Create image element
        const productImage = document.createElement('img');
        productImage.src = product.image;
        productImage.alt = product.title;
        productImage.classList.add('product-image-small');
        cartItem.appendChild(productImage);

        // Create product title
        const productTitle = document.createElement('p');
        productTitle.textContent = product.title;
        cartItem.appendChild(productTitle);

        // Create product amount
        const productAmount = document.createElement('p');
        productAmount.textContent = `: ksh ${product.amount}`;
        cartItem.appendChild(productAmount);

        // Create delete button
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Remove from cart';
        deleteButton.classList.add('delete-button');
        deleteButton.addEventListener('click', () => {
            removeItemFromCart(product);
            addCartToHTML();
            updateCartCount();
        });
        cartItem.appendChild(deleteButton);

        listCartHTML.appendChild(cartItem);

        // Calculate total amount
        totalAmount += product.amount;
    });

    // Append total bar to the cart
    const totalBar = document.createElement('div');
    totalBar.classList.add('total-bar');
   totalBar.innerHTML = `<span>Total:  </span><span id="total-amount "> ksh ${totalAmount.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>`; // Adds a comma to total amount
    listCartHTML.appendChild(totalBar);
};

// Function to remove item from cart
const removeItemFromCart = (productToRemove) => {
    cart = cart.filter(product => product !== productToRemove);
};


// Function to update the count on the blue circle icon
const updateCartCount = () => {
    iconCartSpan.textContent = cart.length;
};
// Event listener for the checkout button
const modal = document.getElementById("myModal");
// Get the button that opens the modal
const btn = document.querySelector('.checkOut');
// Get the <span> element that closes the modal
const span = document.getElementsByClassName("close")[0];
// Get reference to the close button in the cart
const closeCartButton = document.querySelector('.close');
// Add event listener to the close button
closeCartButton.addEventListener('click', () => {
    // Toggle the 'showCart' class on the body element to close the cart
    document.body.classList.remove('showCart');
});
// When the user clicks the button, open the modal 
btn.onclick = function() {
  modal.style.display = "block";
}
// When the user clicks on <span> closes the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
// Get references to the profile icon and the login container
const profileIcon = document.getElementById('profile');
const loginContainer = document.getElementById('loginContainer');

// Add event listener to the profile icon
profileIcon.addEventListener('click', function() {
  // Toggle the visibility of the login container
  loginContainer.style.display = loginContainer.style.display === 'block' ? 'none' : 'block';
});

// Close the login container when the user clicks on the close button
const closeButton = document.querySelector('.login-container .close');
closeButton.addEventListener('click', function() {
  loginContainer.style.display = 'none';
});

// Prevent form submission (for demonstration purposes)
document.getElementById('loginForm').addEventListener('submit', function(event) {
  event.preventDefault();
});
// Prevent form submission (for demonstration purposes)
document.getElementById('loginForm').addEventListener('submit', function(event) {
  event.preventDefault();
  
  // Get the username from the input field
  const usernameInput = document.getElementById('username');
  const username = usernameInput.value.trim();
  
  // Hides the login container
  loginContainer.style.display = 'none';
});
document.getElementById('loginForm').addEventListener('submit', function(event) {
  event.preventDefault();
  
  // Gets the username from the input field
  const usernameInput = document.getElementById('username');
  const username = usernameInput.value.trim();
  // Displays an allert with the greeting messsage
 window.alert(`welcome ${username}👋 to Okoa Jua 💛`);
  // Hides the loggin container
  loginContainer.style.display = 'none';

  // Update the content of the profile icon with the logged-in username
  const loggedInUsername = document.getElementById('loggedInUsername');
  loggedInUsername.textContent = `${username}😎`;
});
// Event listener for the "Add review" button
document.querySelector('.revieww').addEventListener('click', function() {
  // Display the reviews form container
  const reviewFormContainer = document.getElementById('reviewFormContainer');
  reviewFormContainer.style.display = 'block';
});

// Event listener for the close button in the review form container
document.querySelector('.review-form-container .close').addEventListener('click', function() {
  // Hide the review form container
  const reviewFormContainer = document.getElementById('reviewFormContainer');
  reviewFormContainer.style.display = 'none';
});



// Function to handle confirming the PIN
document.getElementById("confirm-pin").addEventListener('click', () => {
    const phoneNumber = document.getElementById("phone-number").value;
    const mpesaPin = document.getElementById("mpesa-pin").value;
    if (phoneNumber !== null && phoneNumber.trim() !== '' && mpesaPin !== null && mpesaPin.trim() !== '') {
        const itemNames = cart.map(product => product.title).join(', ');
        alert(`Items (${itemNames}) successfully paid for!`);
        // Clears the cart after successful purchase
        cart = [];
        addCartToHTML();
        updateCartCount();
        modal.style.display = "none"; // Closes the modal after successful payment
    } else {
        alert('Please enter a valid phone number and M-Pesa PIN.');
    }
});


    // Function to initialize the app
    const initApp = () => {
        // Get data product
        fetch('db.json')
            .then(response => response.json())
            .then(data => {
                products = data.foodList;

                // Get data cart from memory
                if (localStorage.getItem('cart')) {
                    cart = JSON.parse(localStorage.getItem('cart'));
                    addCartToHTML();
                }
            })
    }
    initApp();
});
