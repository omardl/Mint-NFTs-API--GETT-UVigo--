async function main() {
    const mint_1155 = await ethers.getContractFactory("mint_1155");
    
    const mint1155 = await mint_1155.deploy();
    console.log("Contract deployed to address:", mint1155.address);
 }
 main()
   .then(() => process.exit(0))
   .catch(error => {
     console.error(error);
     process.exit(1);
   });