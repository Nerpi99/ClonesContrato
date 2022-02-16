// Load dependencies
const { deployProxy, upgradeProxy } = require('@openzeppelin/truffle-upgrades');

// Load compiled artifacts
const token_ = artifacts.require('MyToken');
const factory_ = artifacts.require('Factory')
//const factoryv2_ = artifacts.require('FactoryV2')

// Start test block
contract('test', async accounts => {

    before(async () => {
        tokenProxy = await deployProxy(token_, {initializer: false});
        token = await token_.new()
        factory = await deployProxy(factory_, [token.address]);

        console.log("token:", token.address)
        console.log("tokenProxy:", tokenProxy.address)
        console.log("factory:", factory.address)
    });
    
    it('clone', async function() {

        await factory.clonar("1", "1", 1000, 18, { from: accounts[1], value: (web3.utils.toWei("9781055", "Gwei")) })
        await factory.clonar("2", "2", 100, 18,  { from: accounts[0], value: (web3.utils.toWei("9781055", "Gwei")) })

        console.log(await factory.getClones(accounts[0]))
        const cloneAddress = (await factory.getClones(accounts[0]))[0].tokenAddress

        console.log("nueva instancia: ", await new token_(cloneAddress).address)
        console.log(await new token_(cloneAddress).name())

    })
})