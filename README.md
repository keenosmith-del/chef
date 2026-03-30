# Chef’s Favourite Meals App

A minimal, modern web application that allows users to generate and manage “chef’s favourite meals” using TheMealDB API.

Built using **HTML, CSS, and JavaScript**, this project demonstrates API integration, DOM manipulation, event-driven programming, and session-based data storage.

---

### How to use
* Enter ingredient and click Generate to render random order
* Click basket to view orders
* Set name in left panel by clicking Profile or Edit Name in Settings
* Complete order by entering order number in left panel
* Clear all orders functionality in left panel under Settings
* Site disabled when message pop-ups appear at bottom left
* Acknowledge pop-up to re-enable

## Features

* Generate meals based on a user-provided ingredient
* Randomly select a meal using TheMealDB API
* Store and manage orders using `sessionStorage`
* View active (incomplete) orders in a cart panel
* Mark orders as complete using order number input
* Custom UI notifications (no browser alerts)
* Clean, minimal UI with blur/glass effects

---

## Technologies Used

* HTML5
* CSS3 (Glassmorphism / minimal UI)
* Vanilla JavaScript
* Fetch API
* sessionStorage
* Lucide Icons

---

## Project Functionality

### 1. Taking Orders

✔ Users can enter a main ingredient
✔ Input is formatted (lowercase + underscores) for API requests
✔ Fetch API retrieves meals from TheMealDB
✔ A random meal is selected using `Math.random()`
✔ If no meals are found, a custom notification is displayed

Each order contains:

* **Description** (meal name)
* **Order number**
* **Completion status (false by default)**

---

### 2. Storing Orders

✔ Orders are stored in `sessionStorage` as a JSON array
✔ Each order has a unique ID
✔ A separate `lastOrderId` value is stored to track order numbers
✔ New orders increment automatically without looping through storage

---

### 3. Displaying & Completing Orders

✔ Only **incomplete orders** are displayed in the cart
✔ Each order shows:

* Meal name
* Order number

✔ Users can:

* Enter an order number
* Click submit OR press Enter

✔ Special cases handled:

* Entering `0` does nothing (as required)
* Invalid order → “order not found” message
* Already completed orders cannot be removed again

✔ When completing an order:

* User is prompted to confirm (✔ / ✖)
* Order is marked as `completed: true`
* UI updates immediately using `filter()`

---

### 4. Storage Format

✔ Orders stored as:

```json
[
  {
    "id": 1,
    "description": "Beef Stroganoff",
    "completed": false
  }
]
```

✔ `lastOrderId` stored separately in sessionStorage

✔ Data retrieved using `getItem()` and parsed with `JSON.parse()`

---

### 5. UI / UX Design

✔ Minimal black-themed interface
✔ Glassmorphism panels with blur effects
✔ Responsive layout (centered design, scalable elements)
✔ Sidebar navigation (expand/collapse)
✔ Slide-out cart panel
✔ Custom notification system (replaces alerts)

---

## 🎯 Key Learning Outcomes

This project demonstrates:

* API integration using Fetch
* Dynamic DOM manipulation
* Event handling (click, keydown)
* State management using sessionStorage
* Conditional rendering with `filter()` and `map()`
* UI/UX design principles for clean web apps

---

## Notes

* The app only displays **incomplete orders**, as required
* Completed orders remain in storage but are filtered out
* Ingredient validation is handled via API response (`meals: null`)
* All user feedback is handled through custom UI messages

---

## Assignment Requirements Checklist

| Requirement               | Status      |
| ------------------------- | ----------- |
| Fetch API usage           | ✔ Completed |
| Filter by ingredient      | ✔ Completed |
| Random meal selection     | ✔ Completed |
| sessionStorage usage      | ✔ Completed |
| Unique order numbers      | ✔ Completed |
| Display incomplete orders | ✔ Completed |
| Complete orders via input | ✔ Completed |
| Handle invalid input      | ✔ Completed |
| Proper storage format     | ✔ Completed |
| Responsive + styled UI    | ✔ Completed |

---

## 👤 Author

**Keeno Smith**
© 2026

---

## Future Improvements (Optional)

* Add animations for order removal
* Add completed orders history view
* Improve mobile responsiveness
* Add search suggestions for ingredients
* in settings, add toggle theme (dark and lighter dark), about (v1.0 built by keeno smith)
* add are you sure you want to change name option

---

## 🏁 Conclusion

This application successfully fulfills all assignment requirements while going beyond with a clean UI, improved user experience, and structured code architecture.
