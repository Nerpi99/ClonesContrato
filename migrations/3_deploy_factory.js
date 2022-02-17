const { deployProxy } = require('@openzeppelin/truffle-upgrades');

const Factory = artifacts.require("Factory");
const TokenERC20 = artifacts.require("TokenERC20");

module.exports = async function (deployer) {
  const instance = await deployProxy(Factory, [TokenERC20.address], { deployer, kind:'uups' });
}