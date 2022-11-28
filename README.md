# How To (DEV)

1. User NodeJs v18
2. Install Ionic, Truffle, and Ganache.
    ```
    npm install -g ionic truffle ganache
    ```
2. Install dependencies
    ```
    npm install
    ```
2. Clone `.env.template` as `.env`
2. Start ganache
2. Update `TEST_PROVIDER` in `.env`
2. Follow [./smart-contracts/README.md](./smart-contracts/README.md)
2. Run locally:
    ```
    ionic serve
    ```
