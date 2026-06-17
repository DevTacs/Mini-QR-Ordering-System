# Mini-QR-Ordering-System

## Installation Guide

### 1. Clone the Repository

```bash
git clone https://github.com/DevTacs/Mini-QR-Ordering-System.git
cd Mini-QR-Ordering-System
```

---

### 2. Install Dependencies

Install the client dependencies:

```bash
cd client
npm install
```

Open a new terminal and install the server dependencies:

```bash
cd server
npm install
```

---

### 3. Setup Environment Variables

#### Server (`server/.env`)

Create a `.env` file inside the `server` directory and add:

```env
CLIENT_URL=http://localhost:5173

DB_HOST=localhost
DB_USER=your_mysql_username
DB_PASS=your_mysql_password
DB_NAME=qr_ordering
```

> Replace `DB_USER` and `DB_PASS` with your MySQL credentials.

#### Client (`client/.env`)

Create a `.env` file inside the `client` directory and add:

```env
VITE_API_URL=http://localhost:3000
VITE_PRODUCT_PAGE_URL=http://localhost:5173
```

---

### 4. Import the Database

1. Open MySQL Workbench.

2. Go to **Server → Data Import**.
3. Select **Import from Self-Contained File**.
4. Browse and select the `backup.sql` file.
5. Click **Start Import**.

---

### 5. Run the Application

#### Start the Client

```bash
cd client
npm run dev
```

#### Start the Server

Open another terminal:

```bash
cd server
npm run dev
```

---

### 6. Open the Application

Client:

```
http://localhost:5173
```

API:

```
http://localhost:3000
```

## Navigate through features

### Customer Flow

1. Open the homepage: http://localhost:5173/
2. Browse products
3. Add items to cart
4. Update quantity or remove items
5. Proceed to checkout (mock payment flow: success and failed)

### Admin Flow

1. Open the admin orders page: http://localhost:5173/admin/orders
2. Update payment status: (pending -> failed or paid, failed -> pending or success)
3. Click the order for more details

### QR Feature

- Admin can generate/export QR code
- QR leads users directly to the ordering page
