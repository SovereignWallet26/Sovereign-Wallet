# Contributing to Sovereign Wallet

Thank you for your interest in contributing to Sovereign Wallet! We welcome contributions from everyone.

## 🎯 Code of Conduct

Please read and follow our [Code of Conduct](./CODE_OF_CONDUCT.md).

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- Git
- Basic understanding of Ethereum/Web3

### Development Setup
1. Fork the repository
2. Clone your fork:
   ```bash
   git clone https://github.com/YOUR_USERNAME/Sovereign-Wallet
   cd Sovereign-Wallet
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Create a new branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```

## 📝 Contribution Guidelines

### Types of Contributions
1. **Bug fixes** - Fix issues reported in GitHub Issues
2. **Features** - Implement new features (discuss first in Issues)
3. **Documentation** - Improve docs, add examples
4. **Tests** - Add unit/integration tests
5. **Code review** - Review Pull Requests

### Workflow
1. **Discuss first** - For major changes, open an issue first to discuss
2. **Keep PRs focused** - One feature/fix per Pull Request
3. **Write tests** - All code changes should include tests
4. **Follow conventions** - Use existing code style and patterns
5. **Update docs** - Update relevant documentation

## 💻 Development

### Smart Contracts
```bash
cd contracts
npm install
npm run compile    # Compile contracts
npm run test       # Run tests
npm run coverage   # Test coverage
npm run lint       # Lint Solidity code
```

### Frontend
```bash
cd frontend
npm install
npm run ios        # iOS simulator
npm run android    # Android emulator
npm run web        # Web version
npm run test       # Run tests
npm run lint       # Lint JavaScript/TypeScript
```

### Code Style
- **Solidity:** Follow [Solidity Style Guide](https://docs.soliditylang.org/en/v0.8.19/style-guide.html)
- **JavaScript/TypeScript:** ESLint + Prettier configuration
- **Commit messages:** Use [Conventional Commits](https://www.conventionalcommits.org/)

### Testing
- Write unit tests for all new code
- Aim for >80% test coverage
- Test both success and failure cases
- Include integration tests for complex features

## 🐛 Reporting Bugs

### Before Submitting a Bug Report
1. Check if the bug has already been reported
2. Update to the latest version
3. Check if it's a configuration issue

### How to Submit a Good Bug Report
1. **Use the bug report template**
2. **Describe the bug** - Clear, concise description
3. **Steps to reproduce** - Step-by-step reproduction guide
4. **Expected behavior** - What should happen
5. **Actual behavior** - What actually happens
6. **Screenshots/Logs** - If applicable
7. **Environment** - OS, Node version, browser, etc.
8. **Additional context** - Any other relevant information

## 💡 Suggesting Features

### Before Submitting a Feature Request
1. Check if the feature has already been requested
2. Consider if it aligns with project goals

### How to Submit a Good Feature Request
1. **Use the feature request template**
2. **Problem statement** - What problem does this solve?
3. **Proposed solution** - How should it work?
4. **Alternatives considered** - Other approaches you considered
5. **Additional context** - Screenshots, mockups, etc.

## 🔧 Pull Request Process

1. **Update your fork** with latest changes from main
2. **Run tests** to ensure everything passes
3. **Update documentation** if needed
4. **Create Pull Request** with:
   - Clear title and description
   - Reference related issues
   - List of changes
   - Screenshots (for UI changes)
5. **Address review comments** promptly
6. **Wait for CI** to pass
7. **Get approval** from maintainers

### PR Review Criteria
- ✅ Code follows project conventions
- ✅ Tests pass and coverage is maintained
- ✅ Documentation is updated
- ✅ No security vulnerabilities
- ✅ Backward compatibility considered

## 🏗️ Project Structure

```
sovereign-wallet/
├── contracts/           # Smart contracts
│   ├── src/            # Source code
│   ├── test/           # Tests
│   └── scripts/        # Deployment scripts
├── frontend/           # React Native app
│   ├── src/            # Source code
│   └── assets/         # Images, fonts
├── docs/               # Documentation
└── .github/            # GitHub workflows
```

## 🛡️ Security

### Reporting Security Issues
**DO NOT** create a public issue for security vulnerabilities.

Email security reports to: `security@sovereignwallet.xyz`

Include:
- Description of the vulnerability
- Steps to reproduce
- Potential impact
- Suggested fix (if any)

### Security Best Practices
- Never commit secrets or private keys
- Use environment variables for sensitive data
- Follow secure coding practices
- Keep dependencies updated

## 📚 Documentation

### Writing Documentation
- Use clear, concise language
- Include code examples
- Keep up-to-date with code changes
- Use Markdown formatting

### Documentation Structure
- **README.md** - Project overview
- **docs/** - Detailed documentation
- **Code comments** - Inline documentation

## 🏆 Recognition

All contributors will be:
- Listed in CONTRIBUTORS.md
- Mentioned in release notes (for significant contributions)
- Eligible for project governance (for ongoing contributions)

## ❓ Getting Help

- **GitHub Issues** - For bugs and feature requests
- **Discussions** - For questions and discussions
- **Telegram** - For real-time chat (link in README)

## 📄 License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing to Sovereign Wallet! 🚀