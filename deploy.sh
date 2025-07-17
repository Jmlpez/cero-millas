#!/bin/bash

# Simple deployment script for GitHub Pages

echo "🚀 Starting deployment to GitHub Pages..."

# Build the project
echo "📦 Building project..."
pnpm run build

# Check if build was successful
if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
else
    echo "❌ Build failed!"
    exit 1
fi

# Initialize git if not already initialized
if [ ! -d ".git" ]; then
    echo "🔧 Initializing git repository..."
    git init
    git branch -M main
fi

# Add and commit changes
echo "📝 Committing changes..."
git add .
git commit -m "Deploy Nuvora Store to GitHub Pages"

echo "🎉 Ready to push to GitHub!"
echo ""
echo "Next steps:"
echo "1. Create a GitHub repository called 'nuvora_fakestore'"
echo "2. Run: git remote add origin https://github.com/YOUR_USERNAME/nuvora_fakestore.git"
echo "3. Run: git push -u origin main"
echo "4. Go to your GitHub repository settings and enable GitHub Pages"
echo "5. Set source to 'GitHub Actions'"
echo ""
echo "Your site will be available at: https://YOUR_USERNAME.github.io/nuvora_fakestore/"
