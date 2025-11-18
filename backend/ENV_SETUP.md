# Environment Variables Setup

To fix the signup issue, you need to create a `.env` file in the `backend` folder with the following variables:

## Required Variables

Create a file named `.env` in the `backend` folder with these contents:

```env
PORT=3000
CLIENT_URL=http://localhost:5173
MONGODB_URI=your_mongodb_connection_string_here
JWT_SECRET=your_jwt_secret_key_here
```

## How to get these values:

### 1. MONGODB_URI
- **Local MongoDB**: If you have MongoDB installed locally, use: `mongodb://localhost:27017/chatapp`
- **MongoDB Atlas** (Cloud): Get your connection string from MongoDB Atlas dashboard
  - Format: `mongodb+srv://username:password@cluster.mongodb.net/chatapp?retryWrites=true&w=majority`

### 2. JWT_SECRET
- Generate a random secret key (at least 32 characters)
- You can use an online generator or run: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`
- Example: `a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6`

### 3. PORT (Optional)
- Defaults to 3000 if not specified

### 4. CLIENT_URL (Optional)
- Defaults to http://localhost:5173 if not specified

## Quick Setup

1. Create `backend/.env` file
2. Copy the template above
3. Replace `your_mongodb_connection_string_here` with your actual MongoDB URI
4. Replace `your_jwt_secret_key_here` with a random secret key
5. Restart the backend server

## Example .env file:

```env
PORT=3000
CLIENT_URL=http://localhost:5173
MONGODB_URI=mongodb://localhost:27017/chatapp
JWT_SECRET=my_super_secret_jwt_key_12345678901234567890
```

