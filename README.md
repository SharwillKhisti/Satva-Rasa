# SatvaRasa

SatvaRasa is an Ayurvedic products e-commerce web app with a Spring Boot API and a React storefront. The project includes product browsing, search and category filtering, cart management, authentication, and checkout using a shipping form.

## 1. Overview

The application is split into two main projects:

- `SatvaRasa-backend`: Spring Boot REST API with JPA, Spring Security, and JWT-based authentication.
- `SatvaRasa-frontend`: React + Vite storefront for browsing products and placing orders.

Core user flows in the repo are:

- browse the catalogue and filter products by category
- search products by text
- add items to a cart without logging in
- sign in or register to place an order
- complete checkout by entering shipping details
- keep the cart token in localStorage so the cart persists across login

## 2. Tech stack

- Backend: Java 21, Spring Boot 4.1.1, Spring Web, Spring Data JPA, Spring Security
- Database: MySQL
- Authentication: JWT (io.jsonwebtoken)
- Frontend: React 19, Vite, React Router, Axios
- Build tools: Maven, npm

## 3. Architecture

This project follows the standard MVC-style backend split:

- Controller handles HTTP requests
- Service contains business logic
- Repository accesses data through Spring Data JPA
- Entity models map to MySQL tables
- React frontend calls the backend API over HTTP

Request flow:

```text
React -> Controller -> Service -> Repository -> MySQL
```

A simplified flow in the codebase is:

- `SatvaRasa-frontend/src/pages/Products.jsx` calls `api.get("/products")`
- `ProductController` receives the request and delegates to `ProductService`
- `ProductService` calls `ProductRepository`
- Hibernate persists/loads `Product` rows from MySQL

## 4. Backend structure

The backend package is under `SatvaRasa-backend/src/main/java/in/coredemo/satvarasabackend`.

### controller

The `controller` package exposes REST API endpoints.

Examples:

- `ProductController` exposes `GET /api/products` and `GET /api/products/{id}`
- `CartController` exposes cart endpoints such as `GET /api/cart`, `POST /api/cart/items`, `PUT /api/cart/items/{productId}`
- `OrderController` exposes `POST /api/orders/checkout` and reads the authenticated user from `Authentication` in the request

All controllers are annotated with `@CrossOrigin(origins = "http://localhost:5173")` for the frontend.

### dto

The `dto` package contains transport models separated from JPA entities.

Examples:

- `CheckoutRequest` holds shipping fields for order placement
- `CartResponse` returns cart data such as token, items, total items, and total price
- `AuthResponse` returns a message, email, and JWT token

This separation keeps API payloads stable and avoids exposing entity internals directly to the frontend.

### entity/model

The `entity` package contains JPA entities and their relationships.

Examples:

- `Product` maps to the `products` table and includes `name`, `category`, `description`, `ingredients`, `price`, `stock`, and `imageUrl`
- `User` maps to `users` and has a one-to-many relation with `Order`
- `Cart` maps to `carts` and owns a `List<CartItem>` with `@OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)`
- `CartItem` links a cart to a product with `@ManyToOne(fetch = FetchType.EAGER)`
- `Order` maps to `orders` and includes shipping fields plus a `List<OrderItem>`
- `OrderItem` stores the product, quantity, and price for each order entry

### repository

The `repository` package contains Spring Data JPA interfaces.

Examples:

- `ProductRepository extends JpaRepository<Product, Long>`
- `UserRepository` adds `findByEmail` and `existsByEmail`
- `CartRepository` adds `findByCartToken`
- `CartItemRepository` adds `findByCartIdAndProductId`

These interfaces provide CRUD plus custom query methods without writing SQL manually.

### service

The `service` package contains business logic.

Examples:

- `CartService` creates or reuses a cart token, validates quantity and stock, updates quantity, removes items, and builds the `CartResponse`
- `OrderService` loads the authenticated user and their cart, validates stock, decrements stock, creates an `Order`, and saves the order items
- `AuthService` validates registration/login data, encodes passwords, and issues JWTs
- `ProductService` loads all products and returns product details by ID

The repo does not contain a separate “merge cart on login” service; instead, the cart token is persisted in localStorage and reused after login, which keeps the cart across authentication.

### security

Security is implemented in the `security` package and the `config` package.

- `SecurityConfig` disables CSRF, enables stateless sessions, allows public access to `/api/auth/**`, `/api/products/**`, and `/api/cart/**`, and requires authentication for `/api/orders/**`
- `JwtAuthenticationFilter` reads the `Authorization: Bearer <token>` header, validates it, and sets the Spring `SecurityContext`
- `JwtService` creates and validates JWTs with a hardcoded secret key and 24-hour expiration
- `BCryptPasswordEncoder` is registered as the app password encoder

This is the actual auth flow used by the app: register/login returns a JWT, the frontend stores it in `localStorage`, and the backend validates it on protected requests.

### config

The `config` package includes app configuration and seed data.

- `SecurityConfig` registers JWT-based security and CORS settings
- `DataSeeder` seeds 12 example products when the database is empty

## 5. Database

The database connection is configured in `SatvaRasa-backend/src/main/resources/application.properties`:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/satvarasa_db
spring.datasource.username=root
spring.datasource.password=

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.format_sql=true
spring.jpa.database-platform=org.hibernate.dialect.MySQLDialect
```

This means:

- MySQL runs on `localhost:3306`
- database name is `satvarasa_db`
- Hibernate/JPA auto-generates or updates tables based on entity mappings
- `ddl-auto=update` keeps the schema in sync with the entities as the app runs

Main tables and relationships in the entity model:

| Table | Entity | Key relationships |
|---|---|---|
| `products` | `Product` | referenced by `cart_items` and `order_items` |
| `users` | `User` | one user has many orders |
| `carts` | `Cart` | one cart has many `CartItem` rows |
| `cart_items` | `CartItem` | many items belong to one cart and one product |
| `orders` | `Order` | each order belongs to one user and contains many order items |
| `order_items` | `OrderItem` | each item belongs to one order and one product |

The model uses JPA relationships such as `@ManyToOne`, `@OneToMany`, and `@JoinColumn` to represent these associations.

## 6. Frontend structure

The frontend lives in `SatvaRasa-frontend/src`.

Folder layout:

```text
src/
  App.jsx
  main.jsx
  components/
    common/
    home/
    products/
  context/
    AuthContext.jsx
    CartContext.jsx
  pages/
    Home.jsx
    Products.jsx
    ProductDetails.jsx
    Cart.jsx
    Login.jsx
    Checkout.jsx
    OrderSuccess.jsx
  services/
    api.js
  data/
    productImages.js
  utils/
    validation.js
```

### Components and pages

- `components/common` contains layout pieces like `Navbar`, `Footer`, and `Layout`
- `components/home` contains landing-page sections and product highlights
- `components/products` contains search controls, category filters, product cards, and grid rendering
- `pages` contains the route-level screens

### Context and state

`main.jsx` wraps the app with both providers:

```jsx
<AuthProvider>
  <CartProvider>
    <App />
  </CartProvider>
</AuthProvider>
```

`AuthContext.jsx` stores the JWT and email in `localStorage` under `satva-token` and `satva-email`.

`CartContext.jsx` stores the cart token in `localStorage` under `satva-rasa-cart-token`, and syncs `cartItems`, `cartTotal`, and `cartCount` from the backend.

### API layer

`src/services/api.js` creates a shared Axios instance with:

```js
baseURL: "http://localhost:8080/api"
```

It also adds the JWT automatically to the request headers when a token exists:

```js
config.headers.Authorization = `Bearer ${token}`;
```

### Cart persistence and protected routes

Cart persistence is handled by a cart token inside localStorage. The cart is fetched from `/api/cart` with the current token, and the frontend reuses the same token after login.

Protected checkout flow:

- `Cart.jsx` checks `isAuthenticated` before allowing checkout
- if not signed in, it redirects to `/login` with `location.state.from = "/checkout"`
- `Checkout.jsx` redirects unauthenticated users back to `/login` using `useEffect`
- `Login.jsx` reads the previous route and navigates back to it after successful login

## 7. API endpoints

The main API routes exposed by the backend controllers are:

| Method | Route | Purpose |
|---|---|---|
| GET | `/api/products` | Get all products |
| GET | `/api/products/{id}` | Get a single product by ID |
| POST | `/api/products` | Create a product |
| POST | `/api/auth/register` | Register a new user and return JWT |
| POST | `/api/auth/login` | Login and return JWT |
| GET | `/api/cart` | Get the current cart for a cart token |
| POST | `/api/cart/items` | Add product(s) to the cart |
| PUT | `/api/cart/items/{productId}` | Update quantity for a cart item |
| DELETE | `/api/cart/items/{productId}` | Remove an item from the cart |
| DELETE | `/api/cart` | Clear the cart |
| POST | `/api/orders/checkout` | Place an order for the authenticated user |

The `SecurityConfig` allows unauthenticated access to `/api/auth/**`, `/api/products/**`, and `/api/cart/**`, while `/api/orders/**` requires authentication.

## 8. Setup and run

### Prerequisites

- Java 21
- Maven
- MySQL server
- Node.js and npm

### 1. Create the database

Create a MySQL database named `satvarasa_db`:

```sql
CREATE DATABASE satvarasa_db;
```

If needed, update the credentials in `SatvaRasa-backend/src/main/resources/application.properties`.

### 2. Run the backend

From the backend directory:

```bash
cd SatvaRasa-backend
./mvnw spring-boot:run
```

On Windows PowerShell:

```powershell
cd SatvaRasa-backend
./mvnw.cmd spring-boot:run
```

The Spring Boot app listens on `http://localhost:8080`.

### 3. Run the frontend

From the frontend directory:

```bash
cd SatvaRasa-frontend
npm install
npm run dev
```

The Vite app runs on the default React/Vite address:

```text
http://localhost:5173
```

### 4. Seed data

`DataSeeder` automatically inserts 12 sample products into the database the first time the backend starts if the `products` table is empty.

## Notes

- The repo contains a backend-first storefront architecture, with the frontend talking to the REST API rather than using a separate server-rendered MVC layer.
- The app is designed around a guest cart token, but checkout itself is protected by login and JWT authentication.
- The codebase currently exposes the product catalog and cart endpoints publicly, while order placement is restricted to authenticated users.
