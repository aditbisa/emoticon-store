const TestEmoticonStore = artifacts.require("EmoticonStore");
const BN = web3.utils.BN;

const getBalance = async (acc) => new BN(await web3.eth.getBalance(acc));
const { OWNER_ADDRESS } = process.env;

/*
 * See docs: https://www.trufflesuite.com/docs/truffle/testing/writing-tests-in-javascript
 */
contract("Test Emoticon Store Contract", function (accounts) {
  let emoticonStore;

  it("should be deployed", async function () {
    emoticonStore = await TestEmoticonStore.deployed();
    return assert.isTrue(true);
  });

  it("should have correct owner", async function () {
    const owner = await emoticonStore.getStoreOwner();
    return assert.equal(owner, OWNER_ADDRESS);
  });

  it("should process a purchase", async function () {
    const sellerBalanceBefore = await getBalance(OWNER_ADDRESS);
    const buyerBalanceBefore = await  getBalance(accounts[0]);

    const result = await emoticonStore.purchase(12345, { from: accounts[0], value: 10 });

    const sellerBalanceAfter = await getBalance(OWNER_ADDRESS);
    const buyerBalanceAfter = await getBalance(accounts[0]);

    // Check event
    const event = result.logs.find(e => e.event == "Purchase");
    assert.isObject(event);
    assert.equal(event.args.codePoint, 12345);
    assert.equal(event.args.buyer, accounts[0]);

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
    return assert.equal(buyer, accounts[0]);
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
