# 🛒 Products RESTful API 
# Products-Api
This project is a RESTful API built with Express.js, Prisma, and PostgreSQL for managing product inventory, including creating, updating, retrieving, and deleting products. It also supports filtering products that are currently on offer using a simple Boolean flag.
### ✨ Features
The API supports the following operations:

- 🔍 Get all products

- 🔎 Get a specific product by ID

- ➕ Create a new product

- ✏️ Update an existing product

- ❌ Delete a product

- 🏷️ Get all products that are on offer

- 🧾 Product Model
  
### Each product has the following fields:

1. productTitle (string): The name of the product

1. productDescription (string): A brief description of the product

1. unitsLeft (integer): Quantity of the product remaining

1. pricePerUnit (float): Price per unit of the product

1. isOnOffer (boolean): Indicates if the product is currently on offer (true = on offer, false = not on offer)
