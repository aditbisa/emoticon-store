# How to (DEV)

1. Setup local blockchain network (e.g. using Ganache).
2. Update `OWNER_ADDRESS` in [parent dotenv file](../.env) with last account from the network.
2. Run migration:
    ```
    truffle migrate
    ```
2. Update `CONTRACT_ADDRESS` with the account for `EmoticonStore` in migration output.
2. Run test:
    ```
    truffle test
    ```
