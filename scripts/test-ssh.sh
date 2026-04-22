#!/bin/bash

# Test SSH connection to GitHub
echo "🔐 Testing SSH connection to GitHub..."

# Test basic SSH connection
ssh -T git@github.com

if [ $? -eq 1 ]; then
    echo "✅ SSH connection successful! Authentication works."
else
    echo "❌ SSH connection failed. Please check your SSH key configuration."
    exit 1
fi

# Test repository access
echo "🔍 Testing repository access..."
REPO_URL="git@github.com:SovereignWallet26/Sovereign-Wallet.git"

# Try to clone (shallow)
echo "Testing clone access..."
git ls-remote $REPO_URL --heads 2>/dev/null

if [ $? -eq 0 ]; then
    echo "✅ Repository access confirmed!"
else
    echo "❌ Cannot access repository. Check deploy key permissions."
    exit 1
fi

echo "🎉 All SSH tests passed! Ready to push code."