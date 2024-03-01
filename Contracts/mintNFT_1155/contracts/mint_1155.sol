pragma solidity ^0.7.3;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";

contract mint_1155 is ERC1155 {
    
    // Los mapeos permiten llevar la cuenta de determinados valores asociados a variables
    //  En este caso, el balance o cantidad total de items asociados a un usuario,
    //  el número máximo de cada item que se puede mintear en una sola operación
    //  y el número total de elementos que se crean a la vez.
      
    mapping(uint256 => mapping(address => uint256)) private _itemBalances;

    mapping(uint256 => uint256) private _maxMintPerItem;
    mapping(uint256 => uint256) private _totalMinted;

    constructor() ERC1155("https://gateway.pinata.cloud/ipfs/QmcQKjv4Np3g2vtAaecjvh5eo1XLxTZ3ES7H3w9jNdFwcY/{id}.json") {

        // Se limita de cantidad de cada tipo de token que se puede crear a la vez
        _maxMintPerItem[1] = 1; 
        _maxMintPerItem[2] = 10;  
        _maxMintPerItem[3] = 100;
        _maxMintPerItem[4] = 1000;
    
    }

    // Se crea un único token
    function mintToken(uint256 itemId, uint256 amount) public {
        // Se comprueba que el usuario no sobrepasa la cantidad de tokens creados permitidos
        require(_itemBalances[itemId][msg.sender] + amount <= _maxMintPerItem[itemId], "Exceeds maximum mint limit");
        
        // Se comprueba que el usuario no excede la cantidad total de tokens permitidos
        require(_totalMinted[itemId] + amount <= _maxTotalMint(itemId), "Exceeds total mint limit");

        _mint(msg.sender, itemId, amount, "");

        // Se actualizan los parametros del usuario
        _itemBalances[itemId][msg.sender] += amount;
        _totalMinted[itemId] += amount;
    }

    // Se crea un lote de múltiples tipos de token
    function mintBatch(uint256[] memory itemIds, uint256[] memory amounts) public {
        require(itemIds.length == amounts.length, "Invalid input length");
        
        for (uint256 i = 0; i < itemIds.length; i++) {
            mintToken(itemIds[i], amounts[i]);
        }
    }

    // Se comprueba la cantidad de un tipo de token que posee un usuario
    function getBalances(address account, uint256[] memory itemIds) external view returns (uint256[] memory) {
        uint256[] memory balances = new uint256[](itemIds.length);

        for (uint256 i = 0; i < itemIds.length; i++) {
            balances[i] = balanceOf(account, itemIds[i]);
        }

        return balances;
    }

    // Se limita el numero maximo de tokens que se pueden mintear en una sola operacion
    function _maxTotalMint(uint256 itemId) private pure returns (uint256) {
        if (itemId == 1) {
            return 1; 
        } else if (itemId == 2) {
            return 100;   
        } else if (itemId == 3) {
            return 1000;
        } else if (itemId == 4) {
            return 10000;
        }
        return 0; 
    }

}
