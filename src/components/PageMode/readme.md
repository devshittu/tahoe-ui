Here's a detailed **README** document outlining all functionalities, specifications, behaviors, and characteristics of the **PageMode** component, including everything implemented so far. This will allow you to review, add, or subtract features as you see fit.

---

# **PageMode Component Documentation**

## **Overview**

The `PageMode` component is a versatile, customizable UI element inspired by iOS design principles. It provides a slide-in page behavior that adapts to various use cases, such as modals, drawers, or page-level overlays. The component is designed with accessibility, responsiveness, and user experience in mind, ensuring a polished and modern interaction.

---

## **Key Features**

### **1. Configurable Positioning**

- Supports the following positions:
  - `top`: Slides in from the top.
  - `bottom`: Slides in from the bottom.
  - `left`: Slides in from the left.
  - `right`: Slides in from the right.
- Automatically adjusts its layout based on the specified position.

---

### **2. Drag-and-Close Functionality**

- **Handlebar Zone**:
  - The draggable area is restricted to the handlebar zone at the edge of the `PageMode`.
  - Users can drag the handlebar to initiate a close gesture.
- **Close Threshold**:
  - A customizable threshold determines when the PageMode closes based on drag distance.
  - Default threshold: `50%` of the viewport.
  - Configurable via the `closeThreshold` prop (range: `0.0` to `1.0`).
- **Rubber Band Effect**:
  - When dragged beyond limits (e.g., upward for a bottom-aligned PageMode), the PageMode provides a rubber band effect, snapping back into position upon release.

---

### **3. Visual Feedback**

- **Enhanced "Release to Close" Box**:
  - Displays a prominent box with the text "Release to Close" when the user enters the close zone.
  - Animated with spring-based transitions.
  - Fully responsive and adapts to light/dark themes.
  - Visibility can be toggled via the `enhancedCloseBox` prop.

---

### **4. Theming**

- Fully supports **light mode** and **dark mode**:
  - Automatically adapts based on the current theme.
  - Configurable via Tailwind’s `dark` class for global theme management.
- Allows custom styling to match the application's theme.

---

### **5. Rounded Edges**

- Optional rounded corners for enhanced aesthetics.
- The corners opposite the handlebar are rounded:
  - Example: If positioned at the bottom, the top-left and top-right corners are rounded.
- Responsive across screen sizes using Tailwind utilities.

---

### **6. Wrapper Support**

- Optional integration with Tailwind’s `container` utility:
  - Ensures the `PageMode` aligns with the main content grid of the application.
  - Configurable via the `useContainer` prop.

---

### **7. Accessibility Features**

- Supports robust ARIA attributes for accessibility:
  - `role`: Configurable role (`dialog`, `alertdialog`, etc.).
  - `aria-modal`: Indicates whether the PageMode is modal.
  - `aria-label`, `aria-labelledby`, `aria-describedby`: Customizable for screen reader descriptions.
  - Handlebar-specific ARIA label: Indicates the handlebar’s functionality (e.g., "Drag handle to close or press Escape").
- **Escape Key Support**:
  - Configurable via the `escapeClose` prop.
  - Default: Pressing `Escape` closes the PageMode.
- Fully keyboard navigable with focus trapping using `react-focus-lock`.

---

### **8. Responsiveness**

- Designed to work seamlessly across all screen sizes:
  - Desktop: Adjusts height/width and padding dynamically.
  - Tablet/Mobile: Ensures handlebar size and layout remain user-friendly.
  - Uses Tailwind’s responsive utilities (`sm:`, `md:`, `lg:`) for adaptability.

---

### **9. Lock Scroll**

- Prevents background content scrolling while the PageMode is active.
- Configurable via the `lockScroll` prop.
- Ensures a focused user experience.

---

### **10. Close on Outside Click**

- Allows users to close the PageMode by clicking outside its bounds.
- Configurable via the `closeOnOutsideClick` prop.

---

### **11. Animations**

- Uses **Framer Motion** for smooth and spring-based transitions:
  - Entrance and exit animations:
    - Slide-in and slide-out effects.
    - Adjustable bounce and damping for natural movements.
  - Handlebar and "Release to Close" box animations enhance interactivity.

---

## **Component Props**

| Prop Name          | Type          | Default  | Description                                                           |
| ------------------ | ------------- | -------- | --------------------------------------------------------------------- | -------- | ---------- | -------------------------------------------- |
| `position`         | `"top"        | "bottom" | "left"                                                                | "right"` | `"bottom"` | Determines the PageMode’s slide-in position. |
| `a11yOptions`      | `A11yOptions` | `{}`     | Configures accessibility options (ARIA attributes, escape key, etc.). |
| `useContainer`     | `boolean`     | `false`  | Wraps the PageMode in a Tailwind `container` for alignment.           |
| `roundedEdges`     | `boolean`     | `false`  | Enables rounded corners opposite the handlebar.                       |
| `themeable`        | `boolean`     | `false`  | Enables light and dark mode styling.                                  |
| `closeThreshold`   | `number`      | `0.5`    | Sets the drag distance threshold for closing (0.0–1.0).               |
| `enhancedCloseBox` | `boolean`     | `true`   | Enables enhanced "Release to Close" visual feedback.                  |

---

## **Prop: `a11yOptions`**

The `a11yOptions` object allows for detailed customization of accessibility features.

| Option Name           | Type      | Default    | Description                                                           |
| --------------------- | --------- | ---------- | --------------------------------------------------------------------- |
| `escapeClose`         | `boolean` | `true`     | Allows closing the PageMode with the Escape key.                      |
| `role`                | `string`  | `"dialog"` | Sets the ARIA role (e.g., `dialog`, `alertdialog`).                   |
| `ariaLabel`           | `string`  | `null`     | Provides a custom label for screen readers.                           |
| `ariaLabelledby`      | `string`  | `null`     | Points to an element describing the PageMode (e.g., title).           |
| `ariaDescribedby`     | `string`  | `null`     | Points to an element providing additional details about the PageMode. |
| `ariaModal`           | `boolean` | `true`     | Indicates whether the PageMode is modal.                              |
| `handlebarAriaLabel`  | `string`  | `null`     | Adds a label for the handlebar's functionality.                       |
| `lockScroll`          | `boolean` | `false`    | Locks background scroll while PageMode is open.                       |
| `closeOnOutsideClick` | `boolean` | `true`     | Enables closing the PageMode by clicking outside of it.               |

---

## **Usage Examples**

### **Basic Example**

```tsx
<PageMode
  position="bottom"
  a11yOptions={{
    escapeClose: true,
    role: 'dialog',
    ariaLabel: 'Sample Page Mode',
  }}
/>
```

### **Customizing Threshold and Close Box**

```tsx
<PageMode
  position="top"
  closeThreshold={0.6} // Close at 60% viewport height
  enhancedCloseBox={true} // Enable enhanced visuals
/>
```

### **Theming and Wrapping**

```tsx
<PageMode
  position="left"
  themeable={true}
  roundedEdges={true}
  useContainer={true}
/>
```

---

## **Planned Enhancements**

1. **Customizable Handlebar Designs**:
   - Allow developers to specify custom styles, icons, or visuals for the handlebar.
2. **Nested PageMode Support**:
   - Enable nesting multiple PageModes with stackable layers.
3. **Dynamic Content Loading**:
   - Add support for lazy-loading content inside the PageMode for large datasets.

---

This documentation should give you a comprehensive overview of the `PageMode` component. Let me know if you'd like to add, modify, or expand on any features!
