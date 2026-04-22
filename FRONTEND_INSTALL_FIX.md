# Frontend install fix

Removed invalid dependency `@walletconnect/modal-react-native` because the declared version `^2.0.0` does not resolve and the package is not imported anywhere in `frontend/src`.

If WalletConnect UI is needed later, re-add a valid maintained package version after checking the current npm registry.
