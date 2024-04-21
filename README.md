# Desarrollo de una API que permite la creación de NFTs y otros tokens digitales.

Con el objetivo de exponer de manera sencilla el proceso de creación de tokens digitales, se ha desarrollado una aplicación en Angular que permite la creación de NFTs y tokens fungibles, permitiendo además visualizar los tokens del usuario en su cartera digital.

Para el uso de la aplicación, será necesario realizar un login con una cartera digital para poder crear nuevos tokens y subirlos a la blockchain, proceso conocido como minteo, y visualizarlos posteriormente. El minteo de un token deben estar asociado a quien lo crea, en este caso a través del ID único de su cartera digital, por lo que no es posible el uso de la aplicación sin ella. En este caso, se ha optado por compatibilizar la API con el uso de Metamask, una de las carteras digitales más populares en la actualidad.

Para la aplicación desarrollada se ha usado una red de prueba dentro de la blockchain de Ethereum, denominada Göerli, que permite obtener criptomonedas de uso exclusivo para dicha red de manera gratuíta. Las redes de prueba, precisamente, están ideadas para que los desarrolladores puedan experimentar y realizar diferentes pruebas antes de utilizar la blockchain principal.

![Home page](https://github.com/omardl/Minting-NFTs-API--NST-GETT-UVigo--/assets/105445540/7f151c9a-ffc4-4b53-b464-540b6f4343fe)

Para el uso de la API, como se ha mencionado, será necesario usar la cartera Metamask y la red de prueba Göerli. La primera es facilmente configurable gracias a una extensión disponible para la mayoría de navegadores, y su conexión a la red de prueba también se realiza de manera sencilla. Se han facilitado dos enlaces que el usuario puede utilizar para realizar ámbas operaciones de manera sencilla.


## Tokens

![Standard selection](https://github.com/omardl/Minting-NFTs-API--NST-GETT-UVigo--/assets/105445540/50c44992-d3f1-4d8c-9633-5da846f6c880)

### NFTs o tokens no fungibles -  Estándar 721

Los NFTs (Non fungible tokens) son activos digitales únicos que permiten asegurar la autoría de un elemento de manera segura, fiable y pública. Esto es gracias a la tecnología blockchain, que garantiza la autenticidad de su contenido y su seguridad. Todo aquello almacenado en una blockchain no puede ser modificado y es de acceso público, pudiendo ver en el caso de los NFTs quién es el creador. Ésto permite asegurar la autenticidad de un elemento, pero no el plagio. Si otra persona tratase de crear un NFT idéntico, la única forma de saber cuál de ellos es el original de un autor concreto, es que el mismo verifique, mediante otros medios de manera pública, cuál es el suyo.

El estándar ERC-721, definido por el EIPs (Ethereum Improvement Proposals), define las reglas principales a las que está sujeta la creación de NFTs. Por una parte, el NFT poseerá un identificador único exclusivo en la blockchain. Además, podrá estar asociado a unos metadatos que puedan contener información relevante como imágen, descripción y otros datos relevantes para su uso. El estándar define también una serie de funciones comúnes a todos que permitan su transferencia, cambios de propietario, etc.

![Mint ERC 721 token](https://github.com/omardl/Minting-NFTs-API--NST-GETT-UVigo--/assets/105445540/f7c5735b-1f7c-4c51-a62e-ad11faa66a87)

Las ventajas de los NFTs pueden tener diversas aplicaciones en el mundo actual:
- La creación de un nuevo tipo de entrada o ticket digital para diferentes eventos (deportivos, musicales, etc).
- El uso como llave digital para hoteles y establecimientos similares sujetos a una estancia temporal.
- La representación de derechos de autor de cualquier obra artística o cultural: cine, música, arte, literatura, etc.
- El seguimiento y la logística de transporte para una gran variedad de artículos.

## IPFS

Los metadatos (en formato json, tal como define el estándar) e imágenes asociadas a los NFTs, están almacenadas en un sistema de archivos distribuído llamado IPFS (Interplanetary File System). Éste permite el almacenamiento de datos de manera fiable y asegurando su integridad mediante funciones hash. La API desarrollada realiza llamadas a una API externa denominada pinata que permite el almacenamiento en IPFS.



### Tokens fungibles - Estándar ERC 1155

Fungible es una palabra equivalente a intercambiable, es decir, cualquier objeto que pueda ser intercambiado por otro objeto de su mismo tipo y valor como, por ejemplo, el dinero. Criptomonedas como Bitcoin o Ethereum son ejemplos de tokens fungibles. Un Bitcoin es igual a otro en términos de valor y funcionalidad.

El estándar ERC 1155 define la creación y las funciones a las que están sujetos los tokens fungibles. Al ser intercambiables, puede realizarse la creación o transferencia de los mismos en grupo, permitiendo una mayor eficiencia en términos de coste. A mayores de las funciones que comparten con los NFTs, cada token puede estar limitado a un número máximo del mismo en la red.

Otros de los posibles usos de este tipo de token, a mayores de las criptomonedas, pueden servir para definir items asociados al coleccionismo digital o a videojuegos online, permitiendo crear una cantidad concreta de items del mismo tipo que deba ser repartida entre todos los usuarios.

![Mint ERC 1155 tokens](https://github.com/omardl/Minting-NFTs-API--NST-GETT-UVigo--/assets/105445540/b16a0b73-91ae-4d9a-8b78-a39024121b89)

En la API desarrollada, se ha usado a modo de ejemplo un contrato que permite 4 diferentes tipos de tokens. Éstos están limitados a un número máximo que cada usuario puede poseer de cada tipo, y también un máximo de la cantidad que puede mintear a la vez. Cabe apreciar que, si se limita la cantidad de tokens a 1 de manera global (sólo sería propiedad de un usuario exclusivo), tendría un funcionamiento similar a un NFT.

## Smart Contracts

Los smart contracts o contratos inteligentes, son código alojado en blockchain que define todas las funciones que un token puede realizar (transferencia, cambios de propietario, creación, asociación a los metadatos, etc).

Permiten establecer las principales características de cada estándar, como un identificador único en el caso de los NFTs o el límite de cantidad de tokens del mismo tipo que pueden crearse, en el caso de los tokens fungibles.

Están alojados en la blockchain, por lo que el código no puede ser modificado y se muestra de forma pública.

Por otro lado, el uso de cualquier función dentro de un smart contract está ligado a un coste variable denominado gas. El gas funciona como una pequeña tasa a pagar para poder realizar la operación, ya que tendrá un coste de funcionamiento que se verá reflejado en la red (los equipos que forman parte de la red, denominados nodos de la blockchain, están sujetos a un elevado coste en términos de computación). En el caso de una red de prueba, se pueden conseguir criptomonedas de la misma de forma gratuíta, como ya se ha mencionado. 

## Visualización

Existen diferentes plataformas que permiten ver los tokens de una colección. Plataformas como OpenSea, pueden ser usadas para buscar tokens asociados a un usuario concreto o a un smart contract específico. La API desarrollada realiza llamadas precisamente a la API de OpenSea para obtener los tokens asociados a la cartera del usuario. 

![Visualizing tokens](https://github.com/omardl/Minting-NFTs-API--NST-GETT-UVigo--/assets/105445540/902b7d68-a0c8-4bb3-b547-9680e1a9fb75)

------------

### Proyecto desarrollado para la asignatura "Nuevos Servicios Telemáticos" del grado en Ingeniería de Tecnologías de Telecomunicación de la UVigo

### Autor - Omar Delgado
