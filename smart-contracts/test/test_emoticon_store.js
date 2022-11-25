const TestEmoticonStore = artifacts.require("EmoticonStore");
const BN = web3.utils.BN;

const getBalance = async (acc) => new BN(await web3.eth.getBalance(acc));

/*
 * uncomment accounts to access the test accounts made available by the
 * Ethereum client
 * See docs: https://www.trufflesuite.com/docs/truffle/testing/writing-tests-in-javascript
 */
contract("Test Emoticon Store Contract", function (accounts) {
  let emoticonStore;

  it("should be deployed", async function () {
    emoticonStore = await TestEmoticonStore.deployed({ from: accounts[0] });
    return assert.isTrue(true);
  });

  it("should have correct owner", async function () {
    const owner = await emoticonStore.getStoreOwner();
    return assert.equal(owner, accounts[0]);
  });

  it("should process a purchase", async function () {
    const sellerBalanceBefore = await getBalance(accounts[0]);
    const buyerBalanceBefore = await  getBalance(accounts[1]);

    const result = await emoticonStore.purchase(12345, { from: accounts[1], value: 10 });

    const sellerBalanceAfter = await getBalance(accounts[0]);
    const buyerBalanceAfter = await getBalance(accounts[1]);

    // Check event
    const event = result.logs.find(e => e.event == "Purchase");
    assert.isObject(event);
    assert.equal(event.args.codePoint, 12345);
    assert.equal(event.args.buyer, accounts[1]);

    // Check balance
    assert.isTrue(sellerBalanceAfter.gt(sellerBalanceBefore));
    assert.isTrue(buyerBalanceAfter.lt(buyerBalanceBefore));
  });

  it("should return purchased list", async function () {
    let emoticons = await emoticonStore.getPurcashed();
    emoticons = emoticons.map(bn => bn.toNumber());
    return assert.include(emoticons, 12345);
  });

  it("should return the buyer", async function () {
    const buyer = await emoticonStore.getBuyer(12345);
    return assert.equal(buyer, accounts[1]);
  });

  it("cannot purchase an already purchased item", async function () {
    let error;
    try {
      await emoticonStore.purchase(12345, { from: accounts[2], value: 10 });
    } catch (err) {
      error = err;
    }
    assert.include(error.message, "Emoticon is sold");
    return assert.isTrue(error instanceof Error);
    
  });

});
