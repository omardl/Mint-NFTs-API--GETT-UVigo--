/** @type import('hardhat/config').HardhatUserConfig */

require("@nomiclabs/hardhat-ethers");
require("@nomicfoundation/hardhat-verify");

module.exports = {
   solidity: "0.7.3",
   // Red en la que se desplegara el contrato
   defaultNetwork: "goerli",
   networks: {
      hardhat: {},
      goerli: {
         // API Key de Alchemy
         url: "https://eth-goerli.g.alchemy.com/v2/jIqdyZC5gfrzGvw_3qju9Af0sRMBs7IZ",
         // Clave privada de metamask del propietario que creará el contrato
         accounts: ["0x531bf8ad40390c3b38530fcf5997eda7bfca10beb2eb9d5ad2f434e15857d7ce"] 
      }
   },
   // Se requerira una API Key gratuita de Etherscan para poder validar el contrato con hardhat
   etherscan: {
      apiKey: "I6T9WSU7IY1MKK8ACIFA7JEXTJRD3CX1XZ"
   }
}