const { deployProxy } = require('@openzeppelin/truffle-upgrades');

const Token = artifacts.require("MyToken");
const Factory = artifacts.require("Factory");
//const FactoryV1 = artifacts.require("FactoryV1")

/** Deploy contract using openzeppelin deployProxy, which will create a proxy address for you */
module.exports = async (deployer) => {
    //const tokenProxy = await deployProxy(Token, { deployer, initializer: false });
    await deployer.deploy(Token)
    const token = await Token.deployed()
    const factory = await deployProxy(Factory, [token.address], { deployer });
    console.log(factory.address)
    //console.log(tokenProxy.address)
    console.log(token.address)
};