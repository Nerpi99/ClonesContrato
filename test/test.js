const { deployProxy } = require('@openzeppelin/truffle-upgrades');
const truffleAssert = require('truffle-assertions');


const Factory = artifacts.require("Factory");
const TokenERC20 = artifacts.require("TokenERC20");

contract("Factory", accounts => {
    before(async () => {
        tokenerc20 = await TokenERC20.deployed();
        factory = await deployProxy(Factory, [tokenerc20.address],{kind: 'uups'});
    });

    it("Check implementation address: ", async () => {
        console.log(await tokenerc20.address);
    });

    it("Check implementation used and fee: ", async () => {
        console.log(await factory.implementation());
        console.log((await factory.fee()).toString());
    });

    it("Check factory owner: ", async () => {
        console.log("Account 0 address: ", accounts[0]);
        console.log(await factory.owner());
    });

    it("Change Collector address: ", async () => {
        await factory.setCollector(accounts[3]);
    });

    it("Make a clone: ", async () => {
        await factory.clonar("Belgrano", "CAB", 100000, 18, {value: 19781055000000000});
    });

    it("Check for created clones: ", async () => {
        arrayTokens = await factory.getClones(accounts[0]);
        console.log(arrayTokens.toString());
    });

    it("Clone info: ", async () => {
        instanciaClon = await new TokenERC20(arrayTokens[0].tokenAddress);
        console.log(await instanciaClon.name());
        console.log(arrayTokens.length);
    });

    it("Balance of collector address: ", async () => {
        console.log(await web3.eth.getBalance(accounts[0]));
    });

    it("token balance of owner: ", async () => {
        console.log(await instanciaClon.balanceOf(accounts[0]));
    });

    it("Transfer tokens and check balance of receiver: ", async () => {
        await instanciaClon.transfer(accounts[1], 5000);
        console.log((await instanciaClon.balanceOf(accounts[1])).toString());
    });

    it("Burn tokens and check balance: ", async () => {
        await instanciaClon.burn(2500,{from: accounts[1]});
        console.log((await instanciaClon.balanceOf(accounts[1])).toString());
    });

    it("Burn wihtout having: ", async () => {
        await truffleAssert.reverts(instanciaClon.burn(2500,{from: accounts[2]}),"ERC20: burn amount exceeds balance");
    });

    it("Mint tokens and check supply: ", async () => {
        await instanciaClon.mint(accounts[2], 1000000,{from: accounts[0]});
        console.log((await instanciaClon.totalSupply()).toString());
    });

    it("Set a new fee: ", async () => {
        await factory.setFee("978105500000000000");
    });

    it("Try to clone without fee: ", async () => {
        await truffleAssert.reverts(factory.clonar("argentina", "arg", 1000000, 18, {value:"97810500000000000", from: accounts[1]}),"El valor deberia ser mayor a la tarifa");
    });

    it("Make a clone: ", async () => {
        await truffleAssert.reverts(factory.clonar("Belgrano", "CAB", 1000000, 18, {value: 19781055000000000}),"El valor deberia ser mayor a la tarifa");
    });

    it("Pause and try to mint: ", async () => {
        await instanciaClon.pause();
        await instanciaClon.mint(accounts[2], 1000000,{from: accounts[0]});
    });
});