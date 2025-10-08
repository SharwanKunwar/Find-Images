# React Image Gallery with Pexels API

A React application that showcases an image gallery powered by the Pexels API. Users can search for images by keywords, view images in a grid, download any image, and load more images with pagination.

---

## Features

- Fetches and displays images based on user search queries using Pexels API.
- Responsive grid layout with image thumbnails and photographer details.
- Clickable download button to save images with photographer's name as the filename.
- Pagination with a "Load More" button to fetch additional images.
- Loading spinner while fetching data and error handling via toast notifications.
- Clean and modern UI styled with Tailwind CSS, animated with animate.css, and icons from Remixicon.

---

## Technologies Used

- React (Functional Components and Hooks)
- Axios (API requests)
- Pexels API (Photo data source)
- Tailwind CSS (Styling)
- Animate.css (Animations)
- Remixicon (Icons)
- React Toastify (Error notifications)

---

## Getting Started

### Prerequisites

- Node.js and npm/yarn installed
- Pexels API key (you can get one for free from [Pexels Developer](https://www.pexels.com/api/))

## Usage

- Use the search bar at the top to search for images by keyword.
- Click the "Search" button or press Enter to fetch matching images.
- Scroll through the images displayed in the grid.
- Click the **Download** button on any image to save it locally.
- Press the **More** button to load additional images related to the current search.

---

## Project Structure

- `App.js` — Main React component managing state, API calls, UI rendering.
- `index.js` — Entry point rendering the `App` component.
- `package.json` — Project configuration and dependencies.
- Various styles and assets imported via CDN and npm packages.

---

## Notes

- Image download filenames are derived from the photographer's name, sanitized for spaces.
- Pagination fetches 12 images per page.
- Error handling displays toast messages on API or network issues.
- The UI is responsive and animated for smooth user experience.

---

## License

This project is open source and available under the MIT License.

---

## Acknowledgements

- [Pexels API](https://www.pexels.com/api/)
- [React](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Animate.css](https://animate.style/)
- [Remixicon](https://remixicon.com/)
- [React Toastify](https://fkhadra.github.io/react-toastify/)

---

Feel free to contribute or raise issues if you have suggestions or find bugs!