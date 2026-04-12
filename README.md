#  HYDROSPHERE-C

## Overview

HYDROSPHERE-C is a full-stack web application focused on **sustainable living and environmental impact**. It combines e-commerce with real-world ecological contributions by allowing users to purchase products made from recycled materials while tracking their environmental impact.

---

## Core Idea

Every purchase made on the platform contributes directly to:

* Large water bodies plastic removal
* Recycling initiatives
* Reduction of carbon emissions
*  Water conservation

The platform transforms **consumer activity into measurable environmental impact**.

---

## Features

### Shop System

* Browse products by category
* Sort products (price, impact, featured)
* Add to cart with dynamic quantity updates
* Checkout system with backend integration

### Impact Tracking

* Real-time environmental impact calculations
* User-specific impact dashboard
* Metrics tracked:

  * Plastic removed (kg)
  * CO₂ prevented (kg)
  * Water saved (litres)
  * Items recycled

###Interactive UI

* Purchase celebration animations
* Floating UI elements and smooth transitions
* Dynamic counters and visual feedback

### Authentication

* User login & registration
* Protected checkout
* Token-based authentication

---

##  Tech Stack

### Frontend

* React (Vite)
* React Router
* Axios
* Pure CSS (custom animations & styling)

### Backend

* Node.js
* Express.js
* REST API

### Database

* MongoDB

---

## Project Structure

```
client/
 ├── src/
 │   ├── pages/
 │   │   ├── Home.jsx
 │   │   ├── Shop.jsx
 │   │   ├── About.jsx
 │   │   └── Contact.jsx
 │   ├── components/
 │   ├── context/
 │   ├── styles/
 │   └── App.jsx

server/
 ├── controllers/
 ├── routes/
 ├── models/
 └── server.js
```

---

## Installation & Setup

### 1.Repository

```
https://github.com/delarum/hydrosphere-c-client.git
```

### 2. Install dependencies

#### Client

```
cd client
npm install
npm run dev
```

#### Server

```
cd server
npm install
npm run dev
```

---

## Environment Variables

Create a `.env` file in the client:

```
VITE_API_URL=http://localhost:5000/api
```

And in the server:

```
PORT=5000
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key
```

---

## API Endpoints

### Products

* `GET /api/shop/products`

### User Impact

* `GET /api/shop/my-impact`

### Orders

* `POST /api/shop/order`

---

## Screenshot of the page
![alt text](assets\Screenshot_13-2-2026_182932_127.0.0.1.jpeg)

## Future Improvements

* Payment gateway integration (Stripe/PayPal)
* Mobile responsiveness improvements
* Order tracking system
* Live global impact dashboard
*  AI-based product recommendations

---

## Contributing

Contributions are welcome!

1. Fork the project
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

---

## License

This project is licensed under the MIT License.

---

## Inspiration

HYDROSPHERE-C is inspired by the need to bridge the gap between **technology, sustainability, and everyday consumer behavior**.

---
## Known bugs
None

## Support and Contact Information
**Email:** delarum7@gmail.com

**Phone Number:** 0792651083

## Author

Developed with passion for sustainability and innovation by Del Arum.



---

## Final Note

> "Small actions, when multiplied by millions of people, can transform the world."

Every click, every purchase, every interaction matters. 💚
