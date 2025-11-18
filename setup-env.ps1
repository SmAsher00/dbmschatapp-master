# MongoDB Setup Script
# This script helps you create the .env file for the backend

Write-Host "=== MongoDB Environment Setup ===" -ForegroundColor Cyan
Write-Host ""

# Check if .env already exists
$envPath = "backend\.env"
if (Test-Path $envPath) {
    Write-Host "WARNING: .env file already exists!" -ForegroundColor Yellow
    $overwrite = Read-Host "Do you want to overwrite it? (y/n)"
    if ($overwrite -ne "y") {
        Write-Host "Setup cancelled." -ForegroundColor Red
        exit
    }
}

Write-Host "Choose your MongoDB setup:" -ForegroundColor Green
Write-Host "1. MongoDB Atlas (Cloud - Recommended)"
Write-Host "2. Local MongoDB (localhost:27017)"
Write-Host ""
$choice = Read-Host "Enter your choice (1 or 2)"

$mongodbUri = ""
$jwtSecret = "326164c773b41f5fb683057dc6d41153afe8199eb0d91ff1632ef4572aec47bb"  # Generated secret

if ($choice -eq "1") {
    Write-Host ""
    Write-Host "For MongoDB Atlas:" -ForegroundColor Yellow
    Write-Host "1. Go to https://www.mongodb.com/cloud/atlas/register"
    Write-Host "2. Create a free cluster"
    Write-Host "3. Create a database user"
    Write-Host "4. Whitelist your IP (or allow from anywhere for dev)"
    Write-Host "5. Get your connection string from 'Connect' -> 'Connect your application'"
    Write-Host ""
    $mongodbUri = Read-Host "Paste your MongoDB Atlas connection string here"
    
    # Validate the connection string
    if (-not $mongodbUri -or -not $mongodbUri.StartsWith("mongodb+srv://")) {
        Write-Host "WARNING: This doesn't look like a valid MongoDB Atlas connection string!" -ForegroundColor Yellow
        Write-Host "It should start with 'mongodb+srv://'" -ForegroundColor Yellow
    }
} elseif ($choice -eq "2") {
    Write-Host ""
    Write-Host "Using local MongoDB..." -ForegroundColor Green
    $mongodbUri = "mongodb://localhost:27017/chatapp"
    
    # Check if MongoDB is running
    $mongoService = Get-Service -Name MongoDB* -ErrorAction SilentlyContinue
    if (-not $mongoService) {
        Write-Host "WARNING: MongoDB service not found!" -ForegroundColor Yellow
        Write-Host "Make sure MongoDB is installed and running." -ForegroundColor Yellow
    }
} else {
    Write-Host "Invalid choice. Exiting." -ForegroundColor Red
    exit
}

# Create .env file content
$envContent = @"
PORT=3000
CLIENT_URL=http://localhost:5173
MONGODB_URI=$mongodbUri
JWT_SECRET=$jwtSecret
"@

# Ensure backend directory exists
if (-not (Test-Path "backend")) {
    Write-Host "ERROR: backend directory not found!" -ForegroundColor Red
    exit
}

# Write .env file
try {
    Set-Content -Path $envPath -Value $envContent -Encoding UTF8
    Write-Host ""
    Write-Host "✓ .env file created successfully!" -ForegroundColor Green
    Write-Host ""
    Write-Host "File location: $((Resolve-Path $envPath).Path)" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "Next steps:" -ForegroundColor Yellow
    Write-Host "1. Verify the MONGODB_URI is correct"
    Write-Host "2. Restart your backend server"
    Write-Host "3. Try signing up again!"
} catch {
    Write-Host "ERROR: Failed to create .env file: $_" -ForegroundColor Red
    exit
}

