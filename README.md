# TECNOVISTA2025
# TecnoVista - E-commerce Frontend Project

This repository contains the frontend code for TecnoVista, a modern and interactive e-commerce or product catalog website. The project is built using standard web technologies (HTML, CSS, and JavaScript) with a focus on a clean user interface, responsiveness, and dynamic functionality.

## Key Features

- **Responsive Navigation**: Includes a mobile-friendly hamburger menu and a navigation bar that changes style on scroll.
- **Tab System**: Allows displaying different content within the same section without reloading the page.
- **Functional Contact Form**: Captures user data, displays a confirmation message, and resets automatically.
- **Image Lightbox Gallery**: Enables viewing images in a full-screen modal for better detail.
- **Product Gallery**: Allows changing the main product image by selecting a thumbnail.
- **Persistent Shopping Cart**:
  - Add, remove, and modify the quantity of products.
  - Saved in the browser's `localStorage` to persist across page reloads.
  - A slide-out side panel to view the cart summary.
  - "Toast" notifications when products are added.
- **Checkout Page**: Displays an order summary by loading data from the cart.

---

## Code Structure (`assets/js/script.js`)

The `script.js` file is organized into logical sections, each handling a specific part of the site's functionality.

### 1. Navigation Logic

- **Mobile Menu**: Toggles the visibility of the mobile menu when the menu button is clicked.
- **Scroll-activated Header**: Adds a `scrolled` class to the `header` when the user scrolls down, allowing for different CSS styles (e.g., a solid background).
- **Menu Closing**: Closes the mobile menu when one of its links is clicked.

### 2. Tab Logic

- Manages a tabbed content system. Clicking a tab button hides all other tab content and displays only the one associated with that button.

### 3. Contact Form Logic

- Prevents the default form submission.
- Simulates an asynchronous submission and displays a confirmation message.
- Clears the form fields after the "submission".

### 4. Lightbox Logic

- Allows any image within `.tab-content` or with the `.lightbox-trigger` class to be opened in a modal.
- The modal can be closed by clicking the close button or the dark overlay.

### 5. Product Gallery Logic

- Provides a global `changeImage()` function that updates a product's main image and highlights the selected thumbnail.

### 6. Shopping Cart Logic

- **State Management**: Maintains a `cart` array with the products.
- **Persistence**: Uses `localStorage` to save and load the cart (`saveCart`, `loadCart`), preserving items even if the user closes the tab.
- **Dynamic Rendering**: The `renderCart` function draws the cart items in the side panel.
- **Global Functions**: Exposes functions on the `window` object (`addToCart`, `changeQuantity`, `removeFromCart`) so they can be called directly from the HTML.
- **Notifications**: The `showToast` function displays a temporary message at the bottom of the screen.

### 7. Checkout Page Logic

- **Redirection**: The `goToCheckout` function saves the current cart state and redirects the user to `checkout.html`.
- **Data Loading**: On `checkout.html`, the `loadCheckoutPage` function reads data from `localStorage` and displays a detailed order summary.

---

## HTML Integration

For the script to work correctly, the HTML must follow a specific structure using the following IDs and classes:

### Navigation
- `header`: The main navigation container.
- `#menu-button`: The button to show/hide the mobile menu.
- `#mobile-menu`: The menu to be displayed on mobile. It should have the `hidden` class by default.
- Mobile menu links should call `onclick="closeMenu()"`.

### Tabs
- `.tab-button`: Buttons to switch tabs. They must have a `data-tab` attribute pointing to the content's ID (e.g., `data-tab="content-1"`).
- `.tab-content`: Content containers. They must have an `id` corresponding to the button's `data-tab` and the `hidden` class (except for the one displayed by default).

### Contact Form
- `#contact-form`: The `<form>` element.
- `#confirmation-message`: An element (e.g., `<p>`) to display the confirmation message. It must have the `hidden` class.

### Lightbox
- `#lightbox-overlay`: The modal container (dark background). It must have the `hidden` class.
- `#lightbox-img`: The `<img>` element inside the modal where the image will be loaded.
- `#lightbox-close`: The button to close the modal.
- `.lightbox-trigger`: An optional class for any element that should open the lightbox on click.

### Product Gallery
- `#main-product-image`: The main product image.
- `.thumbnail-image`: The thumbnail images. They must have an `onclick` event that calls `changeImage(this, 'path/to/image.jpg')`.

### Shopping Cart
- `#cart-panel`: The cart's side panel.
- `#cart-button`: The button to open the cart panel.
- `#close-cart-btn`: The button to close the cart panel.
- `#cart-items`: The container where cart products will be rendered.
- `#cart-count`: A span or element to display the total number of items.
- `#cart-subtotal`: An element to display the total price.
- `#toast-notification`: The element for toast notifications.
- **"Add to Cart" Buttons**: Must call the `addToCart('Product Name', price, 'path/to/image.jpg')` function in the `onclick` event.

### Checkout
- `#checkout-link`: A link or button in the cart panel to go to the checkout page.
- **On `checkout.html`**:
  - `#checkout-items`: Container for the product summary.
  - `#checkout-subtotal`: Element for the subtotal.
  - `#checkout-total`: Element for the final total.

---

## Getting Started

1.  Ensure your HTML structure matches the IDs and classes mentioned above.
2.  Include the script at the end of your `<body>` tag to ensure the entire DOM is loaded before the script executes.

    ```html
    <!-- ... your HTML content ... -->
    <script src="assets/js/script.js"></script>
    </body>
    </html>
    ```

3.  Customize the CSS styles for dynamic classes like `.scrolled`, `.menu-active`, and `.active-tab` to match your site's design.

---

## Suggested Improvements

- **Modularization**: For larger projects, the code could be split into ES6 modules for better organization (e.g., `cart.js`, `ui.js`).
- **Cart Rendering Optimization**: Instead of rebuilding the entire `innerHTML` of the cart on every change, only the affected DOM nodes could be updated, added, or removed for better performance.
- **Error Handling**: Add more robust checks to ensure all necessary DOM elements exist before trying to use them, preventing console errors if an element is missing on a page.

```

I hope this documentation is helpful for understanding and maintaining the project's code.

<!--
[PROMPT_SUGGESTION]Can you refactor the shopping cart logic to use JavaScript (ES6) modules?[/PROMPT_SUGGESTION]
[PROMPT_SUGGESTION]Optimize the `renderCart` function so it doesn't rebuild all the HTML every time, but only updates the elements that change.[/PROMPT_SUGGESTION]
