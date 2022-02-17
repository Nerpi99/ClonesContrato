
const TokenERC20 = artifacts.require("TokenERC20");

module.exports = async function (deployer) {
  deployer.deploy(TokenERC20);
}