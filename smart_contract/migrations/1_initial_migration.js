const MyContrat = artifacts.require("MyContract");

module.exports = function(deployer) {
  deployer.deploy(MyContrat);
};
