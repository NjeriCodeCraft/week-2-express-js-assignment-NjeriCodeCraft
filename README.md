cat > README.md << 'EOF'
# 🛠️ Express.js Products API

A RESTful API built with Express.js to manage products, including:

- Full CRUD operations
- Authentication using API key
- Validation middleware
- Custom error handling
- Logger middleware
- Advanced features: filtering, pagination, search, and statistics

---

## 🚀 Getting Started

### 1. Clone the repo

```bash
git clone <https://github.com/NjeriCodeCraft/week-2-express-js-assignment-NjeriCodeCraft.git>
cd express-app

2. Install dependencies
npm install

3. Set environment variables
Create a .env file from the example:
cp .env.example .env

Edit .env and add your actual API key.

4. Run the server
node server.js

🔐 Required Headers
| Header       | Value            |
| ------------ | ---------------- |
| Content-Type | application/json |
| x-api-key    | mysecretapikey   |

📦 API Endpoints
| Method | Endpoint            | Description       |
| ------ | ------------------- | ----------------- |
| GET    | `/api/products`     | List all products |
| GET    | `/api/products/:id` | Get product by ID |
| POST   | `/api/products`     | Create product    |
| PUT    | `/api/products/:id` | Update product    |
| DELETE | `/api/products/:id` | Delete product    |

Advanced Features
| Endpoint                                 | Description        |
| ---------------------------------------- | ------------------ |
| GET `/api/products?category=electronics` | Filter by category |
| GET `/api/products?page=1&limit=2`       | Pagination         |
| GET `/api/products/search?name=laptop`   | Search by name     |
| GET `/api/products/stats`                | Product statistics |

🧪 Example POST Body
{
  "name": "Lamp",
  "description": "Desk lamp",
  "price": 19.99,
  "category": "furniture",
  "inStock": true
}

📂 Project Structure
express-app/
│
├── server.js
├── routes/
│   └── products.js
├── middleware/
│   ├── auth.js
│   ├── validateProduct.js
│   └── logger.js
├── Utils/
│   └── errors.js
├── .env.example
├── README.md
└── package.json

