# Pharmacy Management API

A REST API for managing customers, pharmacists, medicines, prescriptions,
prescribed items, and sales. It uses Node.js, Express, MySQL2, and ES modules.

The project demonstrates CRUD operations, custom API endpoints, input
validation middleware, and API-to-database integration with SQL `JOIN` queries.

## Requirements

- Node.js
- MySQL server
- A database containing the required `tbl_*` tables

## Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create a `.env` file in the project root:

   ```env
   PORT=3000
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=your_password
   DB_NAME=db_Pharmacy
   ```

3. Start the server:

   ```bash
   npm run dev
   ```

   Or, without Nodemon:

   ```bash
   npm start
   ```

When the database connection succeeds, the API is available at:

```text
http://localhost:3000/api
```

## Project Flow

```text
Thunder Client / Frontend
          ↓
        Routes
          ↓
      Controllers
          ↓
        Models
          ↓
      MySQL Database
```

- **Routes** define the endpoint and HTTP method.
- **Controllers** handle requests and return JSON responses.
- **Models** execute parameterized MySQL queries.
- **Middleware** validates input and checks whether an ID exists.

## Standard Response Format

Successful requests return JSON similar to:

```json
{
  "success": true,
  "message": "Sale created successfully",
  "data": {}
}
```

Errors return JSON similar to:

```json
{
  "success": false,
  "message": "Sale not found",
  "error": "Error details when applicable"
}
```

## API Endpoints

Replace `:id`, `:email`, and other route parameters with actual values from
your database.

### Customers

| Method | Endpoint                           | Description                    |
| ------ | ---------------------------------- | ------------------------------ |
| GET    | `/api/customers`                   | Get all customers              |
| GET    | `/api/customers/:id`               | Get one customer by ID         |
| POST   | `/api/customers`                   | Create a customer              |
| PUT    | `/api/customers/:id`               | Update a customer              |
| DELETE | `/api/customers/:id`               | Delete a customer              |
| GET    | `/api/customers/email/:email`      | Get customer(s) by email       |
| GET    | `/api/customers/:id/prescriptions` | Get a customer's prescriptions |

Create customer body:

```json
{
  "firstname": "Juan",
  "lastname": "Dela Cruz",
  "age": 25,
  "phone": "09171234567",
  "email": "juan@email.com",
  "address": "Manila"
}
```

### Pharmacists

| Method | Endpoint                                | Description              |
| ------ | --------------------------------------- | ------------------------ |
| GET    | `/api/pharmacists`                      | Get all pharmacists      |
| GET    | `/api/pharmacists/:id`                  | Get one pharmacist by ID |
| POST   | `/api/pharmacists`                      | Create a pharmacist      |
| PUT    | `/api/pharmacists/:id`                  | Update a pharmacist      |
| DELETE | `/api/pharmacists/:id`                  | Delete a pharmacist      |
| GET    | `/api/pharmacists/firstname/:firstName` | Search by first name     |
| GET    | `/api/pharmacists/lastname/:lastName`   | Search by last name      |
| GET    | `/api/pharmacists/email/:email`         | Search by email          |
| GET    | `/api/pharmacists/phone/:phone`         | Search by phone number   |
| GET    | `/api/pharmacists/licenseno/:licenseNo` | Search by license number |

Create pharmacist body:

```json
{
  "firstName": "Maria",
  "lastName": "Santos",
  "email": "maria.santos@email.com",
  "phone": "09181234567",
  "licenseNo": "LIC-12345"
}
```

### Medicines

| Method | Endpoint                            | Description            |
| ------ | ----------------------------------- | ---------------------- |
| GET    | `/api/medicines`                    | Get all medicines      |
| GET    | `/api/medicines/:id`                | Get one medicine by ID |
| POST   | `/api/medicines`                    | Create a medicine      |
| PUT    | `/api/medicines/:id`                | Update a medicine      |
| DELETE | `/api/medicines/:id`                | Delete a medicine      |
| GET    | `/api/medicines/name/:name`         | Search by name         |
| GET    | `/api/medicines/brand/:brand`       | Search by brand        |
| GET    | `/api/medicines/category/:category` | Filter by category     |

Create medicine body:

```json
{
  "name": "Amoxicillin",
  "brand": "Generic",
  "category": "Antibiotic",
  "price": 125.5,
  "stock": 100,
  "requires_prescription": true
}
```

### Prescriptions

| Method | Endpoint                 | Description                                   |
| ------ | ------------------------ | --------------------------------------------- |
| GET    | `/api/prescriptions`     | Get all prescriptions with related details    |
| GET    | `/api/prescriptions/:id` | Get a prescription by ID                      |
| POST   | `/api/prescriptions`     | Create a prescription and one prescribed item |

Create prescription body:

```json
{
  "customer_id": 1,
  "pharmacist_id": 1,
  "doctor_name": "Dr. Santos",
  "license_no": "LIC-12345",
  "date_issued": "2026-08-20",
  "description": "Take after meals",
  "medicine_id": 1,
  "quantity": 2
}
```

### Prescribed Items

| Method | Endpoint                                             | Description                                           |
| ------ | ---------------------------------------------------- | ----------------------------------------------------- |
| GET    | `/api/prescribed-items`                              | Get all items with medicine name, brand, and category |
| GET    | `/api/prescribed-items/:id`                          | Get one prescribed item                               |
| POST   | `/api/prescribed-items`                              | Create a prescribed item                              |
| PUT    | `/api/prescribed-items/:id`                          | Update a prescribed item                              |
| DELETE | `/api/prescribed-items/:id`                          | Delete a prescribed item                              |
| GET    | `/api/prescribed-items/prescription/:prescriptionId` | Get items for one prescription                        |

Create prescribed item body:

```json
{
  "prescription_id": 1,
  "medicine_id": 1,
  "quantity": 2
}
```

### Sales

| Method | Endpoint                          | Description                                          |
| ------ | --------------------------------- | ---------------------------------------------------- |
| GET    | `/api/sales`                      | Get all sales with customer and prescription details |
| GET    | `/api/sales/:id`                  | Get one sale                                         |
| POST   | `/api/sales`                      | Create a sale                                        |
| PUT    | `/api/sales/:id`                  | Update a sale                                        |
| DELETE | `/api/sales/:id`                  | Delete a sale                                        |
| GET    | `/api/sales/customer/:customerId` | Get all sales for one customer                       |

Create sale body:

```json
{
  "customer_id": 1,
  "prescription_id": 1,
  "total_amount": 250.0,
  "payment_method": "Cash"
}
```

## Custom Endpoints

These endpoints go beyond basic CRUD because they search, filter, or fetch
related data:

- Medicine search by name, brand, and category
- Customer lookup by email
- Prescriptions belonging to a customer
- Pharmacist lookup by name, email, phone, or license number
- Prescribed items belonging to a prescription
- Sales belonging to a customer
- `POST /api/prescriptions`, which creates a prescription and a prescribed item
  in one request

## Testing in Thunder Client

Use this order when testing to ensure foreign-key IDs already exist:

1. Create a customer, pharmacist, and medicine.
2. Create a prescription using their IDs.
3. Create extra prescribed items if needed.
4. Create a sale using an existing customer and prescription ID.
5. Test the custom GET endpoints.
6. Test updates and deletes last.

For every POST or PUT request, choose **Body → JSON** in Thunder Client and
set `Content-Type` to `application/json`.
