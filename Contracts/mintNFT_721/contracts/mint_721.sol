pragma solidity ^0.7.3;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract mint_721 is ERC721 {

    // Variable que nos permite incrementar el identificador único del NFT 
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    // Variable que define al propietario del NFT
    address private _owner;
    
    constructor() ERC721("NST APP", "NFT") {}
    
    /** Funcion definida por el usuario que recibe como parametros el URI a los metadatos y la direccion del propietario del NFT
            Devuelve el ID del nuevo token
    */
    function mintNFT(address recipient, string memory tokenURI) public returns (uint256) {
        
        _tokenIds.increment();
        
        // Identificador unico del NFT
        uint256 newItemId = _tokenIds.current();
        
        /** Llamadas a dos funciones predefinidas en el estándar ERC-721
                _mint para mintear el NFT asociandolo a su propietario y un ID unico
                _setTokenURI para asociar el URI con los metadatos al identificador del NFT
        */
        _mint(recipient, newItemId);
        _setTokenURI(newItemId, tokenURI);
        
        return newItemId;
    }

}
