# How To (DEV)

1. Setup local blockchain network (e.g. using Ganache).
2. Update `TEST_PROVIDER` in `.env`
2. Run env update script from root project
    ```
    node ./setenv.js
    ```
2. Run migration:
    ```
    truffle migrate
    ```
2. Update `CONTRACT_ADDRESS` with the account for `EmoticonStore` in migration output.
2. Run test:
    ```
    truffle test
    ```
