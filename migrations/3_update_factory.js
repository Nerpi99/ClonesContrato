const { upgradeProxy } = require('@openzeppelin/truffle-upgrades');

const Factory = artifacts.require("Factory");
//const FactoryV2 = artifacts.require("FactoryV2");

module.exports = async (deployer) => {
    
  const existing = await Factory.deployed();
  console.log('Existing Address ===', existing.address);

  //const instance = await upgradeProxy(existing.address,  FactoryV2, { deployer });
  //console.log("Upgraded Address ===", instance.address);
};