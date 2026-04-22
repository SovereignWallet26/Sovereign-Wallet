#!/bin/bash

# Setup git to use SSH instead of HTTPS
echo "🔧 Configuring git to use SSH..."

# Change remote from HTTPS to SSH
CURRENT_REMOTE=$(git remote get-url origin 2>/dev/null)

if [[ $CURRENT_REMOTE == *"https://"* ]]; then
    echo "Changing remote from HTTPS to SSH..."
    git remote set-url origin git@github.com:SovereignWallet26/Sovereign-Wallet.git
    echo "✅ Remote URL updated to SSH"
else
    echo "Remote is already using SSH or not set"
fi

# Verify remote URL
echo "Current remote URL:"
git remote get-url origin

# Test the connection
echo "Testing SSH connection..."
ssh -T git@github.com

if [ $? -eq 1 ]; then
    echo "✅ SSH is properly configured!"
else
    echo "❌ SSH configuration issue. Please check:"
    echo "1. SSH key is added to GitHub"
    echo "2. SSH key has write permissions"
    echo "3. SSH agent is running"
fi