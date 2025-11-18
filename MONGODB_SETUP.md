# MongoDB Setup Guide

## Option 1: MongoDB Atlas (Cloud - Recommended for Quick Setup)

MongoDB Atlas is a free cloud database service. This is the easiest way to get started.

### Step 1: Create MongoDB Atlas Account
1. Go to https://www.mongodb.com/cloud/atlas/register
2. Sign up for a free account (or log in if you have one)

### Step 2: Create a Free Cluster
1. After logging in, click "Build a Database"
2. Choose the **FREE (M0)** tier
3. Select a cloud provider and region (choose the closest to you)
4. Give your cluster a name (e.g., "ChatApp")
5. Click "Create"

### Step 3: Create Database User
1. Go to "Database Access" in the left sidebar
2. Click "Add New Database User"
3. Choose "Password" authentication
4. Enter a username (e.g., "chatappuser")
5. Enter a strong password (save this - you'll need it!)
6. Set privileges to "Atlas admin" or "Read and write to any database"
7. Click "Add User"

### Step 4: Whitelist Your IP Address
1. Go to "Network Access" in the left sidebar
2. Click "Add IP Address"
3. Click "Allow Access from Anywhere" (for development) or add your current IP
4. Click "Confirm"

### Step 5: Get Your Connection String
1. Go to "Database" in the left sidebar
2. Click "Connect" on your cluster
3. Choose "Connect your application"
4. Copy the connection string (looks like: `mongodb+srv://username:password@cluster.mongodb.net/`)
5. Replace `<password>` with your database user password
6. Add a database name at the end: `mongodb+srv://username:password@cluster.mongodb.net/chatapp?retryWrites=true&w=majority`

### Step 6: Add to .env File
Add this to your `backend/.env` file:
```
MONGODB_URI=mongodb+srv://your_username:your_password@cluster.mongodb.net/chatapp?retryWrites=true&w=majority
```

---

## Option 2: Local MongoDB Installation (Windows)

If you prefer to run MongoDB locally on your computer:

### Step 1: Download MongoDB
1. Go to https://www.mongodb.com/try/download/community
2. Select:
   - Version: Latest (7.0 or newer)
   - Platform: Windows
   - Package: MSI
3. Download and run the installer

### Step 2: Install MongoDB
1. Run the installer
2. Choose "Complete" installation
3. Check "Install MongoDB as a Service"
4. Choose "Run service as Network Service user"
5. Install MongoDB Compass (optional GUI tool)
6. Click "Install"

### Step 3: Verify Installation
Open a new terminal and run:
```powershell
mongod --version
```

### Step 4: Start MongoDB Service
MongoDB should start automatically as a Windows service. If not:
```powershell
net start MongoDB
```

### Step 5: Add to .env File
Add this to your `backend/.env` file:
```
MONGODB_URI=mongodb://localhost:27017/chatapp
```

---

## Create .env File

After setting up MongoDB (either Atlas or local), create a `.env` file in the `backend` folder:

```env
PORT=3000
CLIENT_URL=http://localhost:5173
MONGODB_URI=your_mongodb_connection_string_here
JWT_SECRET=your_random_secret_key_here
```

### Generate JWT_SECRET
Run this command to generate a secure random key:
```powershell
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Copy the output and use it as your JWT_SECRET.

---

## Test Connection

After creating the .env file, restart your backend server. You should see:
```
MongoDB connected: [your-cluster-host]
```

If you see an error, check:
- MongoDB URI is correct
- Database user password is correct
- IP address is whitelisted (for Atlas)
- MongoDB service is running (for local)

