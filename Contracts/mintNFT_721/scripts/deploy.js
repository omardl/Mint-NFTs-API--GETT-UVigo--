async function main() {
    const mint_721 = await ethers.getContractFactory("mint_721");
    
    const mint721 = await mint_721.deploy();
    console.log("Contract deployed to address:", mint721.address);
 }
 main()
   .then(() => process.exit(0))
   .catch(error => {
     console.error(error);
     process.exit(1);
   });