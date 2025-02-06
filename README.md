## Overview:
The Book Shop is a robust Express.js application built with TypeScript and MongoDB (Mongoose) to efficiently manage books and orders. It supports full CRUD operations, ensuring seamless book management while maintaining data integrity through Mongoose schema validation.
The application features comprehensive error handling, ensuring proper validation, structured error responses, and 404 handling for missing or un matched resources.

# Features:
- Create a Book: Add new books to the store.
- Retrieve All Books: List all books in the database and search through query parameters for title, author and category
- Get Specific Book: Retrieve a book’s details using its ID.
- Update a Book: Modify book/product details
- Delete a Book: Remove a book from the database.
- Order a Book: Place an order for a specific book by hard coding the product ID and update the inventory.
- Get All Order: List all orders form the database.
- Calculate Total Revenue: Get the total revenue generated from orders using MongoDB aggregation.

# Live Link:
- https://m2-m10-a2-book-shop.vercel.app/

# Product management API endpoints:

1. Create a Book → (POST) /api/products – Adds a new book to the inventory.
2. Retrieve All Books → (GET) -> /api/products – Fetches a list of books with optional search filters.
3. Retrieve All Books through query paramter on title, author and category → (GET) -> /api/products/?searchTerm=xyz – Fetches a list of books with optional search filters.
4. Retrieve a Specific Book → (GET) -> /api/products/:productId – Fetches details of a specific book by ID.
5. Update a Book → (PUT) -> /api/products/:productId – Modifies book details such as price or quantity.
6. Delete a Book → (DELETE) -> /api/products/:productId – Removes a book from the database.

# Product Schema (JSON Format):
{
  "title": "The Great Gatsby",
  "author": "F. Scott Fitzgerald",
  "price": 10,
  "category": "Fiction",
  "description": "A story about the American dream.",
  "quantity": 100,
  "inStock": true
} 

# Order management API endpoints:
1. Place an Order → (POST) -> /api/orders (Reduces the product's quantity based on the order quantity.)
3. If product quantity reaches zero, the inStock status is set to false.
4. If order quantity is insufficient, i.e order quantity is more than the available product quantity, the order is rejected with a 404 error.
5. Calculate Total Revenue → (GET) /api/orders/revenue (Uses MongoDB aggregation to compute total sales revenue.)

# Order Schema (JSON Format):
{
  "email": "customer@example.com",
  "product": "648a45e5f0123c45678d9012",  //product id from the available products in the product collection
  "quantity": 2,
  "totalPrice": 30
}

# Installations
1. Node.js (Backend runtime)
2. Express.js (Web framework)
3. TypeScript (For type safety)
4. MongoDB (Database) 
5. Mongoose (MongoDB ORM) | https://mongoosejs.com/docs/typescript/schemas.html
6. ts-node-dev (Fast TypeScript execution in development) | https://www.npmjs.com/package/ts-node-dev
7. ESLint (Code linting) | https://shorturl.at/hHNnC
8. Prettier (Code formatting) | https://shorturl.at/hHNnC
9. Validator (Data validation library for input validation) | https://github.com/validatorjs/validator.js

