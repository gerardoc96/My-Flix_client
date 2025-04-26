# My Flix
 
MyFlix is a responsive React-based single-page application (SPA) for browsing movies, managing user profiles, and marking favorites. It connects to an external API for user authentication and movie data.

Live site: [https://c-myflix.netlify.app/]

Backend API: [https://my-flix1-a5a1dc031ab1.herokuapp.com]

---

## Tech Stack

- **React**
- **Redux Toolkit**
- **React Router**
- **Axios**
- **Parcel**
- **Bootstrap**

---

## Features

**Authentication**
  - Sign up / Login with secure JWT
  - Session persistence via `localStorage`
  - Profile update & delete

  **Movie Listings**
  - Browse all movies
  - Movie detail view with director/genre info

  **Favorites**
  - Add/remove favorites
  - Favorites saved to backend and shown on profile

  **Search**
  - Live search bar with case-insensitive filtering

  **Protected Routes**
  - Profile and movies are secured behind login

---

## Getting Started (Local Development)

### Prerequisites

- Node.js
- Backend API (deployed or running locally on `http://localhost:8080`)

### Run locally

```bash
# Clone the repo
git clone https://github.com/gerardoc96/My-Flix_client.git
cd My-Flix_client

# Install dependencies
npm install

# Run the dev server
npm run dev
```

App runs at: `http://localhost:1234`

>  You can create a `.env` file and set:
> ```
> VITE_API_URL=http://localhost:8080
> ```

---

## Deployment (Netlify)

### Build script
```bash
npm run build
```

### Output folder
```
dist/
```

### Redirect handling for SPA
Make sure your `netlify.toml` includes:

```toml
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### Environment Variables on Netlify

- `VITE_API_URL=https://your-backend-url.com`

---

## Project Structure

```
src/
├── components/         # Reusable UI components
├── pages/              # Route pages (Login, Signup, Movies, Profile)
├── features/           # Redux slices: auth, movies
├── app/                # Redux store
├── index.jsx           # App entry point
├── index.html          # HTML template
```

---

## License

MIT

---

## Author

Developed by gerardoc96 on github (https://github.com/gerardoc96)
Feel free to fork, contribute, or reach out!
