// Main JavaScript logic for Chef's Favourite Meals App
// Handles:
// - Fetching meals from TheMealDB API
// - Creating and storing orders in sessionStorage
// - Displaying and completing orders
// - Managing user interactions via DOM events


// Toggle dropdown for completing orders (UI interaction)
const completeOrder = document.querySelector(".complete-order");
const dropdown = document.querySelector(".dropdown");
const arrow = document.querySelector(".arrow");

completeOrder.addEventListener("click", () => {
  dropdown.classList.toggle("open");

  arrow.style.transform =
    dropdown.classList.contains("open")
      ? "rotate(180deg)"
      : "rotate(0deg)";
});

//toggle profile
const profileToggle = document.querySelector(".profile-icon");
const profileDropdown = document.querySelector(".profile-dropdown");
const profileArrow = document.querySelector(".profile-arrow");

profileToggle.addEventListener("click", () => {
  if (panel.classList.contains("collapsed")) return;

  profileDropdown.classList.toggle("open");

  profileArrow.style.transform =
    profileDropdown.classList.contains("open")
      ? "rotate(180deg)"
      : "rotate(0deg)";
});

//toggle settings
const settingsToggle = document.querySelector(".settings-icon");
const settingsArrow = document.querySelector(".settings-arrow");
const settingsDropdown = document.querySelector(".settings-dropdown");

// wrapped to make sure lucide icons don't fail
if (settingsToggle && settingsArrow && settingsDropdown) {
  settingsToggle.addEventListener("click", () => {
    if (panel.classList.contains("collapsed")) return;

    settingsDropdown.classList.toggle("open");

    settingsArrow.style.transform =
      settingsDropdown.classList.contains("open")
        ? "rotate(180deg)"
        : "rotate(0deg)";
  });
}

const clearBasketBtn = document.querySelector(".settings-clear");

clearBasketBtn.addEventListener("click", () => {
  showClearConfirm();
});

function showClearConfirm() {
  bottomMessage.classList.remove("hidden");
  overlay.classList.remove("hidden");

  bottomMessage.innerHTML = `
    <span>Are you sure you want to clear all orders</span>
    <div class="actions">
      <i data-lucide="check" class="confirm-clear"></i>
      <i data-lucide="x" class="close-btn"></i>
    </div>
  `;

  lucide.createIcons();

  const confirmBtn = bottomMessage.querySelector(".confirm-clear");
  const closeBtn = bottomMessage.querySelector(".close-btn");

  closeBtn.addEventListener("click", () => {
    bottomMessage.classList.add("hidden");
    overlay.classList.add("hidden");
  });

  confirmBtn.addEventListener("click", () => {
    clearAllOrders();
  });
}

lucide.createIcons();

// profile save
const profileSave = document.querySelector(".profile-save");
const profileInput = document.querySelector(".profile-input");

// on enter key
profileInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    profileSave.click();
  }
});

const profileNameDisplay = document.querySelector(".profile-name");

// load profile name
const savedName = sessionStorage.getItem("profileName");

if (savedName) {
  profileNameDisplay.textContent = savedName;
}

// settings 
const settingsInput = document.querySelector(".settings-input");
const settingsSave = document.querySelector(".settings-save");

settingsSave.addEventListener("click", () => {
  const value = settingsInput.value.trim();

  if (!value) return;

  // save to sessionStorage
  sessionStorage.setItem("profileName", value);

  // update UI (same display as profile)
  profileNameDisplay.textContent = value;

  // reset input
  settingsInput.value = "";
  settingsInput.placeholder = "enter name";

  showProfileUpdated();
});

settingsInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    settingsSave.click();
  }
});

// Sidebar expand/collapse functionality
const panel = document.querySelector(".left-panel");
const closeBtn = document.querySelector(".close-btn");
const expandBtn = document.querySelector(".expand-btn");
const completeBtn = document.querySelector(".complete-order");

const profileBtn = document.querySelector(".profile-icon");
const homeBtn = document.querySelector(".home-icon");
const messageBtn = document.querySelector(".message-icon");
const mailBtn = document.querySelector(".mail-icon");
const settingsBtn = document.querySelector(".settings-icon");

//prevent settings panel from being expanded on left panel collapse 
closeBtn.addEventListener("click", () => {
  panel.classList.add("collapsed");
  closeSettingsDropdown();
});

function closeSettingsDropdown() {
  if (settingsDropdown) {
    settingsDropdown.classList.remove("open");
  }

  if (settingsArrow) {
    settingsArrow.style.transform = "rotate(0deg)";
  }
}

expandBtn.addEventListener("click", () => {
  panel.classList.remove("collapsed");
});

completeBtn.addEventListener("click", () => {
  panel.classList.remove("collapsed");
});

homeBtn.addEventListener("click", () => {
  panel.classList.remove("collapsed");
});

messageBtn.addEventListener("click", () => {
  showChatUnavailable();
});

mailBtn.addEventListener("click", () => {
  window.location.href = "mailto:business.keenosmith@icloud.com?subject=Chef App&body=Hi there";
});

profileBtn.addEventListener("click", () => {
  panel.classList.remove("collapsed");
});

settingsBtn.addEventListener("click", () => {
  panel.classList.remove("collapsed");
});

lucide.createIcons();

// Toggle right panel (cart) visibility
const basket = document.querySelector(".basket-wrapper");
const rightPanel = document.querySelector(".right-panel");

basket.addEventListener("click", () => {
    rightPanel.classList.toggle("open");
});

//cart count
const cartCount = document.querySelector(".cart-count");

//storage helpers
// Retrieve stored orders from sessionStorage (returns array or empty array)
function getOrders() {
  return JSON.parse(sessionStorage.getItem("orders")) || [];
}

// Save updated orders array to sessionStorage
function saveOrders(orders) {
  sessionStorage.setItem("orders", JSON.stringify(orders));
}

// Retrieve last generated order ID to ensure unique order numbers
function getLastId() {
  return parseInt(sessionStorage.getItem("lastOrderId")) || 0;
}

// Store latest order ID in sessionStorage
function setLastId(id) {
  sessionStorage.setItem("lastOrderId", id);
}

const ordersList = document.querySelector(".orders-list");

// Display only incomplete orders in the cart
// Uses filter() to exclude completed orders as per assignment requirement
function renderOrders() {
  const orders = getOrders().filter(order => !order.completed);

  // disable clear cart if no items
  if (clearBasketBtn) {
    if (orders.length === 0) {
      clearBasketBtn.classList.add("disabled");
    } else {
      clearBasketBtn.classList.remove("disabled");
    }
  }

  //cart count
  cartCount.textContent = orders.length;

  if (cartCount) {
    cartCount.textContent = orders.length;
  }

  ordersList.innerHTML = "";

  // Show message if there are no active (incomplete) orders
  if (orders.length === 0) {
    ordersList.innerHTML = `
      <p class="empty-message">
        no orders<br/>
        enter an ingredient
      </p>
    `;
    return;
  }

  orders.forEach(order => {
    const div = document.createElement("div");
    div.classList.add("order-item");

    // hightlight new order briefly
    if (order.id === getLastId()) {
      div.classList.add("new-order")
    }

    div.innerHTML = `
      <div class="order-top">
        <div class="order-left">
          <i data-lucide="utensils" class="order-icon"></i>
          <span class="order-name">${order.description}</span>
        </div>
      </div>
      <div class="order-number">Order #: ${order.id}</div>
    `;

    ordersList.appendChild(div);
  });
  lucide.createIcons();
}

//generate button
const generateBtn = document.querySelector(".generate-btn");
const input = document.querySelector(".ingredient-input");

// Fetch meals from TheMealDB API based on user input ingredient
// Then randomly select one meal to create an order
generateBtn.addEventListener("click", async () => {
  const value = input.value.trim();

  if (!value) {
    showEmptyIngredient();
    return;
  }

  // Format input to match API requirements (lowercase + underscores)
  const formatted = value.toLowerCase().replaceAll(" ", "_");

  const url = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${formatted}`;

  // Use Fetch API to retrieve meals filtered by main ingredient
  const res = await fetch(url);
  const data = await res.json();

  // Handle case where API returns null (ingredient not found)
  if (!data.meals) {
    showIngredientNotFound();
    return;
  }

  // Select a random meal from API response
  const randomMeal =
    data.meals[Math.floor(Math.random() * data.meals.length)];

  const lastId = getLastId();
  const newId = lastId + 1;

  // Create new order object with required fields
  // description = meal name, id = unique order number, completed = false
  const newOrder = {
    id: newId,
    description: randomMeal.strMeal,
    completed: false
  };

  // Store new order in sessionStorage
  const orders = getOrders()
  orders.push(newOrder);
  saveOrders(orders);
  setLastId(newId);

  //open right panel
  rightPanel.classList.add("open");

  //render UI
  renderOrders();

  //clear input
  input.value = "";
  input.focus();
});

// Allow user to press Enter instead of clicking generate button
input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    generateBtn.click();
  }
});

renderOrders();

//start submit button logic
//selectors
const bottomMessage = document.querySelector(".bottom-message");
const submitBtn = document.querySelector(".dropdown button");
const orderInput = document.querySelector(".dropdown input");
const overlay = document.querySelector(".overlay");

//enter key for order number
orderInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    submitBtn.click();
  }
});

// Handle order completion based on user-entered order number
submitBtn.addEventListener("click", () => {
  const value = parseInt(orderInput.value);

  // If user enters 0, do nothing (as per assignment requirement)
  if (value === 0) {
    orderInput.value = "";
    orderInput.focus();
    return;
  }

  if (!orderInput.value.trim()) {
    showEmptyOrderNumber();
    return;
  }

  const orders = getOrders();

  // Find matching incomplete order (prevents re-completing already completed orders)
  const order = orders.find(o => o.id === value && !o.completed);

  if (order) {
    showRemoveMessage(value);
  } else
    showNotFoundMessage();
});

// Display confirmation message before marking order as complete
function showRemoveMessage(id) {
  bottomMessage.classList.remove("hidden");
  overlay.classList.remove("hidden");

  bottomMessage.innerHTML = `
    <span>Remove order number #${id}?</span>
    <div class="actions">
      <i data-lucide="check" class=confirm-btn></i>
      <i data-lucide="x" class="close-btn"></i>
    </div>
  `;

  lucide.createIcons();
  const closeBtn = bottomMessage.querySelector(".close-btn");

  closeBtn.addEventListener("click", () => {
    bottomMessage.classList.add("hidden");
    overlay.classList.add("hidden");

    orderInput.value = "";
    orderInput.focus();
  });

  const confirmBtn = bottomMessage.querySelector(".confirm-btn");

  confirmBtn.addEventListener("click", () => {

    let orders = getOrders();

    // Mark selected order as completed without deleting it from storage
    orders = orders.map(order =>
      order.id === id
        ? { ...order, completed: true }
        : order
    );

    saveOrders(orders);

    renderOrders();

    showSuccessMessage(id);

    orderInput.value = "";
    orderInput.focus();
  });
}

// Show confirmation that order has been successfully completed
function showSuccessMessage(id) {
  bottomMessage.innerHTML = `
    <span>Order number #${id} removed</span>
    <div class="actions">
      <i data-lucide="x" class="close-btn"></i>
    </div>
  `;

  lucide.createIcons();

  const closeBtn = bottomMessage.querySelector(".close-btn");

  closeBtn.addEventListener("click", () => {
    bottomMessage.classList.add("hidden");
    overlay.classList.add("hidden");

    orderInput.value = "";
    orderInput.focus();

    //open right panel
    rightPanel.classList.add("open");
  });
}

// Display message if entered order number does not exist
function showNotFoundMessage() {
  bottomMessage.classList.remove("hidden");
  overlay.classList.remove("hidden");

  bottomMessage.innerHTML = `
    <span>Order not found</span>
    <div class="actions">
      <i data-lucide="x" class="close-btn"></i>
    </div>
  `;

  lucide.createIcons();

  const closeBtn = bottomMessage.querySelector(".close-btn");

  closeBtn.addEventListener("click", () => {
    bottomMessage.classList.add("hidden");
    overlay.classList.add("hidden");

    orderInput.value = "";
    orderInput.focus();
  });
}

// Display message if no meals are found for given ingredient
function showIngredientNotFound() {
  bottomMessage.classList.remove("hidden");
  overlay.classList.remove("hidden");

  bottomMessage.innerHTML = `
    <span>No meal found with that ingredient</span>
    <div class="actions">
      <i data-lucide="x" class="close-btn"></i>
    </div>
  `;

  lucide.createIcons();

  const closeBtn = bottomMessage.querySelector(".close-btn");

  closeBtn.addEventListener("click", () => {
    bottomMessage.classList.add("hidden");
    overlay.classList.add("hidden");

    input.value = "";
    input.focus();
  });
}

// display message when profile name updated
function showProfileUpdated() {
  bottomMessage.classList.remove("hidden");
  overlay.classList.remove("hidden");

  bottomMessage.innerHTML = `
    <span>Name updated</span>
    <div class="actions">
      <i data-lucide="x" class="close-btn"></i>
    </div>
  `;

  lucide.createIcons();

  const closeBtn = bottomMessage.querySelector(".close-btn");

  closeBtn.addEventListener("click", () => {
    bottomMessage.classList.add("hidden");
    overlay.classList.add("hidden");
  });
}

// chat message
function showChatUnavailable() {
  bottomMessage.classList.remove("hidden");
  overlay.classList.remove("hidden");

  bottomMessage.innerHTML = `
    <span>AI chatbot feature not available</span>
    <div class="actions">
      <i data-lucide="x" class="close-btn"></i>
    </div>
  `;

  lucide.createIcons();

  const closeBtn = bottomMessage.querySelector(".close-btn");

  closeBtn.addEventListener("click", () => {
    bottomMessage.classList.add("hidden");
    overlay.classList.add("hidden");
  });
}

// if no ingredient in input and generate is clicked
function showEmptyIngredient() {
  bottomMessage.classList.remove("hidden");
  overlay.classList.remove("hidden");

  bottomMessage.innerHTML = `
    <span>Please enter ingredient</span>
    <div class="actions">
      <i data-lucide="x" class="close-btn"></i>
    </div>
  `;

  lucide.createIcons();

  const closeBtn = bottomMessage.querySelector(".close-btn");

  closeBtn.addEventListener("click", () => {
    bottomMessage.classList.add("hidden");
    overlay.classList.add("hidden");

    input.focus();
  });
}

//if no order number in input and submit is clicked
function showEmptyOrderNumber() {
  bottomMessage.classList.remove("hidden");
  overlay.classList.remove("hidden");

  bottomMessage.innerHTML = `
    <span>Please enter an order number</span>
    <div class="actions">
      <i data-lucide="x" class="close-btn"></i>
    </div>
  `;

  lucide.createIcons();

  const closeBtn = bottomMessage.querySelector(".close-btn");

  closeBtn.addEventListener("click", () => {
    bottomMessage.classList.add("hidden");
    overlay.classList.add("hidden");

    orderInput.focus();
  });
}

profileSave.addEventListener("click", () => {
  const value = profileInput.value.trim();

  if (!value) return;

  // save to sessionStorage
  sessionStorage.setItem("profileName", value);

  // update UI
  profileNameDisplay.textContent = value;

  // reset input
  profileInput.value = "";
  profileInput.placeholder = "enter name";

  showProfileUpdated();
});

//clear cart
function clearAllOrders() {
  // clear orders + reset ID
  sessionStorage.removeItem("orders");
  sessionStorage.setItem("lastOrderId", 0);

  // update UI
  renderOrders();

  showBasketCleared();
}

function showBasketCleared() {
  bottomMessage.innerHTML = `
    <span>Basket cleared</span>
    <div class="actions">
      <i data-lucide="x" class="close-btn"></i>
    </div>
  `;

  lucide.createIcons();

  const closeBtn = bottomMessage.querySelector(".close-btn");

  closeBtn.addEventListener("click", () => {
    bottomMessage.classList.add("hidden");
    overlay.classList.add("hidden");
  });
}
