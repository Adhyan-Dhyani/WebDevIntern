// Define an object to store the quantities of each vegetable.
var vegetableQuantities = {};

// Function to add a vegetable to the cart.
function addToCart(vegetableName) {
  // Check if the vegetable quantity is already defined; if not, initialize it to 1.
  if (!vegetableQuantities[vegetableName]) {
    vegetableQuantities[vegetableName] = 1;
  } else {
    // If the quantity is defined, increment it by 1.
    vegetableQuantities[vegetableName]++;
  }

  // Update the quantity displayed for this vegetable.
  updateCartQuantity(vegetableName);

  // Save the cart data to localStorage (optional).
  saveCartData();
}

// Function to remove a vegetable from the cart.
function removeFromCart(vegetableName) {
  // Check if the vegetable quantity is defined and greater than 0.
  if (vegetableQuantities[vegetableName] && vegetableQuantities[vegetableName] > 0) {
    // Decrease the quantity by 1.
    vegetableQuantities[vegetableName]--;

    // Update the quantity displayed for this vegetable.
    updateCartQuantity(vegetableName);

    // Save the cart data to localStorage (optional).
    saveCartData();
  }
}

// Function to update the quantity displayed for a vegetable.
function updateCartQuantity(vegetableName) {
  // Find the corresponding cart quantity div by vegetable name.
  var cartQuantityDiv = document.querySelector('.cart-quantity[data-vegetable="' + vegetableName + '"]');

  // Update the text content of the cart quantity div with the new quantity.
  if (cartQuantityDiv) {
    cartQuantityDiv.textContent = 'Quantity: ' + vegetableQuantities[vegetableName];
  }
}

// Add a click event listener to the "Remove" buttons.
var removeButtons = document.querySelectorAll('.remove-button');
removeButtons.forEach(function (button) {
  button.addEventListener('click', function (event) {
    var vegetableNameToRemove = event.target.getAttribute('data-vegetable');
    removeFromCart(vegetableNameToRemove);
  });
});

// Initialize the displayed quantities for each vegetable.
var vegetableNames = ['Beetroot', 'Onions', 'Brinjal', 'Tomato', 'Capsicum', 'Celery', 'Radicchio', 'Pumpkin'];

// Load cart data from localStorage (optional).
var savedCartData = localStorage.getItem('cartData');
if (savedCartData) {
  vegetableQuantities = JSON.parse(savedCartData);
}

// Call the populateCart function when the cart page loads.
window.addEventListener('load', function () {
  populateCart();
});

// Function to populate the cart page with items and quantities.
function populateCart() {
  // Get the cart container element.
  var cartContainer = document.querySelector('.cart-container');

  // Clear any existing content in the cart container.
  cartContainer.innerHTML = '';

  // Iterate through the vegetableQuantities object and add items to the cart.
  for (var vegetableName in vegetableQuantities) {
    var quantity = vegetableQuantities[vegetableName];

    // Create a cart item element.
    var cartItem = document.createElement('div');
    cartItem.classList.add('cart-item');

    // Create an image element for the vegetable (replace with actual image URLs).
    var cartItemImage = document.createElement('img');
    cartItemImage.src = 'images/' + vegetableName.toLowerCase() + '.png';
    cartItemImage.alt = vegetableName;
    cartItemImage.classList.add('cart-item-image');

    // Create a div for item details.
    var cartItemDetails = document.createElement('div');
    cartItemDetails.classList.add('cart-item-details');

    // Add vegetable name.
    var cartItemName = document.createElement('div');
    cartItemName.textContent = vegetableName;
    cartItemName.classList.add('cart-item-name');

    // Add quantity.
    var cartItemQuantity = document.createElement('div');
    cartItemQuantity.textContent = 'Quantity: ' + quantity;
    cartItemQuantity.classList.add('cart-item-quantity');

    // Append elements to the cart item.
    cartItemDetails.appendChild(cartItemName);
    cartItemDetails.appendChild(cartItemQuantity);
    cartItem.appendChild(cartItemImage);
    cartItem.appendChild(cartItemDetails);

    // Append the cart item to the cart container.
    cartContainer.appendChild(cartItem);
  }
}

// Function to save cart data to localStorage (optional).
function saveCartData() {
  // Convert the vegetableQuantities object to JSON and store it in localStorage.
  localStorage.setItem('cartData', JSON.stringify(vegetableQuantities));
}
