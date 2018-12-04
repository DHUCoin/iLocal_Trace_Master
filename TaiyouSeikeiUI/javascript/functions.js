$(document).ready(function () {

	//Change address to the database address in use////////////////////////////////////////////////////////
	var DatabaseAddr = '0x41f29382c2909682b54e083edb8bb00ca0359dc3';

	//Initiating web3 provider
	if (typeof web3 !== 'undefined') {
		web3 = new Web3(web3.currentProvider);
	} else {
		web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
	}

	//Set the default account (Makes the executer in MetaMask as default)
	web3.eth.defaultAccount = web3.eth.accounts[0];

	///////////////////////////////////ProductFactory contract//////////////////////////////////////////////

	//ABI for contract
	var ProductFactory = web3.eth.contract([{
			"constant": false,
			"inputs": [{
					"name": "_name",
					"type": "string"
				},
				{
					"name": "_additionalInformation",
					"type": "string"
				},
				{
					"name": "DATABASE_CONTRACT",
					"type": "address"
				},
				{
					"name": "_handlerName",
					"type": "string"
				},
				{
					"name": "_handlerInfo",
					"type": "string"
				}
			],
			"name": "createProduct",
			"outputs": [{
				"name": "",
				"type": "address"
			}],
			"payable": false,
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [],
			"payable": false,
			"stateMutability": "nonpayable",
			"type": "constructor"
		},
		{
			"payable": false,
			"stateMutability": "nonpayable",
			"type": "fallback"
		}
	]);

	//Change address to the productFactory address in use////////////////////////////////////////////////////////////////
	var _ProductFactory = ProductFactory.at('0x773373c43f604c7ce01b55e9e26c055d6c9ecf53');

	//button to use createProduct function of the product factory
	$("#createProductCat").click(function () {
		Showloader();
		var _productName = $("#productCatName").val();
		var _info = $("#info").val();
		var _ownerName = $("#ownerName").val();
		var _ownerInfo = $("#ownerInfo").val();

		_ProductFactory.createProduct(_productName, _info, DatabaseAddr, _ownerName, _ownerInfo, (err, res) => {
			if (err) {
				hideloader();
			} else {
				hideloader();
			}
		});

	});

	///////////////////////////////////Database contract///////////////////////////////////////////////

	//ABI for contract
	var DatabaseContract = web3.eth.contract([{
			"constant": true,
			"inputs": [],
			"name": "getAllProducts",
			"outputs": [{
				"name": "",
				"type": "address[]"
			}],
			"payable": false,
			"stateMutability": "view",
			"type": "function"
		},
		{
			"constant": true,
			"inputs": [{
				"name": "",
				"type": "address"
			}],
			"name": "verified",
			"outputs": [{
				"name": "",
				"type": "bool"
			}],
			"payable": false,
			"stateMutability": "view",
			"type": "function"
		},
		{
			"constant": true,
			"inputs": [{
				"name": "",
				"type": "uint256"
			}],
			"name": "handlers",
			"outputs": [{
				"name": "",
				"type": "address"
			}],
			"payable": false,
			"stateMutability": "view",
			"type": "function"
		},
		{
			"constant": false,
			"inputs": [{
					"name": "_productAddress",
					"type": "address"
				},
				{
					"name": "_handler",
					"type": "address"
				},
				{
					"name": "_handlerName",
					"type": "string"
				},
				{
					"name": "_handlerInfo",
					"type": "string"
				}
			],
			"name": "storeProductReference",
			"outputs": [],
			"payable": false,
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"constant": false,
			"inputs": [{
				"name": "handler",
				"type": "address"
			}],
			"name": "removeVerifiedHandler",
			"outputs": [],
			"payable": false,
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"constant": true,
			"inputs": [{
				"name": "",
				"type": "uint256"
			}],
			"name": "products",
			"outputs": [{
				"name": "",
				"type": "address"
			}],
			"payable": false,
			"stateMutability": "view",
			"type": "function"
		},
		{
			"constant": true,
			"inputs": [],
			"name": "owner",
			"outputs": [{
				"name": "",
				"type": "address"
			}],
			"payable": false,
			"stateMutability": "view",
			"type": "function"
		},
		{
			"constant": false,
			"inputs": [{
				"name": "handler",
				"type": "address"
			}],
			"name": "verifyHandler",
			"outputs": [],
			"payable": false,
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"constant": true,
			"inputs": [],
			"name": "getAllHandlers",
			"outputs": [{
				"name": "",
				"type": "address[]"
			}],
			"payable": false,
			"stateMutability": "view",
			"type": "function"
		},
		{
			"constant": true,
			"inputs": [{
				"name": "_address",
				"type": "address"
			}],
			"name": "getHandler",
			"outputs": [{
					"name": "",
					"type": "string"
				},
				{
					"name": "",
					"type": "string"
				},
				{
					"name": "",
					"type": "address[]"
				}
			],
			"payable": false,
			"stateMutability": "view",
			"type": "function"
		},
		{
			"constant": false,
			"inputs": [{
				"name": "newOwner",
				"type": "address"
			}],
			"name": "transferOwnership",
			"outputs": [],
			"payable": false,
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [],
			"payable": false,
			"stateMutability": "nonpayable",
			"type": "constructor"
		},
		{
			"payable": false,
			"stateMutability": "nonpayable",
			"type": "fallback"
		}
	]);

	var _DatabaseContract = DatabaseContract.at(DatabaseAddr);

	//Get all the products list from the database contract
	function getProductData() {
		_DatabaseContract.getAllProducts((err, res) => {
			if (err) {
				console.log(res);
			} else {
				loadProductData(res);
			}
		});
	}

	//Get all the handlers list from the database contract
	function getHandlerData() {
		_DatabaseContract.getAllHandlers((err, res) => {
			if (err) {
				console.log(res);
			} else {
				loadHandlerDataData(res);
			}
		});
	}

	///////////////////////////////////Product contract/////////////////////////////////////////////////

	//ABI for contract
	var ProductContract = web3.eth.contract([{
			"constant": true,
			"inputs": [],
			"name": "name",
			"outputs": [{
				"name": "",
				"type": "string"
			}],
			"payable": false,
			"stateMutability": "view",
			"type": "function"
		},
		{
			"constant": true,
			"inputs": [{
				"name": "",
				"type": "uint256"
			}],
			"name": "childProducts",
			"outputs": [{
				"name": "",
				"type": "address"
			}],
			"payable": false,
			"stateMutability": "view",
			"type": "function"
		},
		{
			"constant": false,
			"inputs": [],
			"name": "consume",
			"outputs": [],
			"payable": false,
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"constant": true,
			"inputs": [],
			"name": "DATABASE_CONTRACT",
			"outputs": [{
				"name": "",
				"type": "address"
			}],
			"payable": false,
			"stateMutability": "view",
			"type": "function"
		},
		{
			"constant": false,
			"inputs": [{
				"name": "newProductAddress",
				"type": "address"
			}],
			"name": "collaborateInMerge",
			"outputs": [],
			"payable": false,
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"constant": true,
			"inputs": [],
			"name": "ownerInfo",
			"outputs": [{
				"name": "",
				"type": "string"
			}],
			"payable": false,
			"stateMutability": "view",
			"type": "function"
		},
		{
			"constant": true,
			"inputs": [],
			"name": "ownerName",
			"outputs": [{
				"name": "",
				"type": "string"
			}],
			"payable": false,
			"stateMutability": "view",
			"type": "function"
		},
		{
			"constant": true,
			"inputs": [],
			"name": "PRODUCT_CATEGORY",
			"outputs": [{
				"name": "",
				"type": "address"
			}],
			"payable": false,
			"stateMutability": "view",
			"type": "function"
		},
		{
			"constant": true,
			"inputs": [],
			"name": "isConsumed",
			"outputs": [{
				"name": "",
				"type": "bool"
			}],
			"payable": false,
			"stateMutability": "view",
			"type": "function"
		},
		{
			"constant": true,
			"inputs": [{
				"name": "",
				"type": "uint256"
			}],
			"name": "actions",
			"outputs": [{
					"name": "description",
					"type": "string"
				},
				{
					"name": "owner",
					"type": "address"
				},
				{
					"name": "timestamp",
					"type": "uint256"
				},
				{
					"name": "blockNumber",
					"type": "uint256"
				}
			],
			"payable": false,
			"stateMutability": "view",
			"type": "function"
		},
		{
			"constant": true,
			"inputs": [],
			"name": "additionalInformation",
			"outputs": [{
				"name": "",
				"type": "string"
			}],
			"payable": false,
			"stateMutability": "view",
			"type": "function"
		},
		{
			"constant": true,
			"inputs": [],
			"name": "owner",
			"outputs": [{
				"name": "",
				"type": "address"
			}],
			"payable": false,
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [{
					"name": "_name",
					"type": "string"
				},
				{
					"name": "_additionalInformation",
					"type": "string"
				},
				{
					"name": "_DATABASE_CONTRACT",
					"type": "address"
				},
				{
					"name": "_PRODUCT_CATEGORY",
					"type": "address"
				},
				{
					"name": "_handlerName",
					"type": "string"
				},
				{
					"name": "_handlerInfo",
					"type": "string"
				}
			],
			"payable": false,
			"stateMutability": "nonpayable",
			"type": "constructor"
		},
		{
			"payable": false,
			"stateMutability": "nonpayable",
			"type": "fallback"
		}
	]);

	//Get the information of a product by deploying
	//the product contract at the product address
	$("#createProduct").click(function () {
		var _name = $("#productName").val();
		var _additionalInformation = $("#productInfo").val();
		var _PRODUCT_CATEGORY = $("#productCategory").val();
		var _handlerName = $("#productOwnerName").val();
		var _handlerInfo = $("#productOwnerInfo").val();

		//Input check
		if (isEmpty(_PRODUCT_CATEGORY) || !isNumber(_PRODUCT_CATEGORY)) {
			InvalidAddressAlert();
			return;
		}
		Showloader();
		var product = ProductContract.new(
			_name,
			_additionalInformation,
			DatabaseAddr,
			_PRODUCT_CATEGORY,
			_handlerName,
			_handlerInfo, {
				from: web3.eth.accounts[0],
				data: '0x606060405234156200001057600080fd5b6040516200158e3803806200158e8339810160405280805182019190602001805182019190602001805190602001909190805190602001909190805182019190602001805182019190505062000065620004f3565b600087600790805190602001906200007f9291906200053a565b506000600660006101000a81548160ff0219169083151502179055508660089080519060200190620000b39291906200053a565b50856000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555084600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555033600260006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555083600390805190602001906200018e9291906200053a565b508260049080519060200190620001a79291906200053a565b506040805190810160405280601081526020017f50726f64756374206372656174696f6e00000000000000000000000000000000815250826000018190525033826020019073ffffffffffffffffffffffffffffffffffffffff16908173ffffffffffffffffffffffffffffffffffffffff1681525050428260400181815250504382606001818152505060098054806001018281620002489190620005c1565b9160005260206000209060040201600084909190915060008201518160000190805190602001906200027c929190620005f6565b5060208201518160010160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555060408201518160020155606082015181600301555050506000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1690508073ffffffffffffffffffffffffffffffffffffffff166346abeabe30600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1687876040518563ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018060200180602001838103835285818151815260200191508051906020019080838360005b8381101562000416578082015181840152602081019050620003f9565b50505050905090810190601f168015620004445780820380516001836020036101000a031916815260200191505b50838103825284818151815260200191508051906020019080838360005b838110156200047f57808201518184015260208101905062000462565b50505050905090810190601f168015620004ad5780820380516001836020036101000a031916815260200191505b509650505050505050600060405180830381600087803b1515620004d057600080fd5b6102c65a03f11515620004e257600080fd5b505050505050505050505062000770565b608060405190810160405280620005096200067d565b8152602001600073ffffffffffffffffffffffffffffffffffffffff16815260200160008152602001600081525090565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f106200057d57805160ff1916838001178555620005ae565b82800160010185558215620005ae579182015b82811115620005ad57825182559160200191906001019062000590565b5b509050620005bd919062000691565b5090565b815481835581811511620005f157600402816004028360005260206000209182019101620005f09190620006b9565b5b505050565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f106200063957805160ff19168380011785556200066a565b828001600101855582156200066a579182015b82811115620006695782518255916020019190600101906200064c565b5b50905062000679919062000691565b5090565b602060405190810160405280600081525090565b620006b691905b80821115620006b257600081600090555060010162000698565b5090565b90565b6200072191905b808211156200071d5760008082016000620006dc919062000724565b6001820160006101000a81549073ffffffffffffffffffffffffffffffffffffffff02191690556002820160009055600382016000905550600401620006c0565b5090565b90565b50805460018160011615610100020316600290046000825580601f106200074c57506200076d565b601f0160209004906000526020600020908101906200076c919062000691565b5b50565b610e0e80620007806000396000f3006060604052600436106100ba576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806306fdde03146100ca5780630a430d89146101585780631dedc6f7146101bb578063301374c6146101d05780633be53469146102255780634bd834c71461025e57806365ac2320146102ec5780636ffc8aa11461037a5780637a0d0031146103cf57806383240f83146103fc57806387b3eaba146104f65780638da5cb5b14610584575b34156100c557600080fd5b600080fd5b34156100d557600080fd5b6100dd6105d9565b6040518080602001828103825283818151815260200191508051906020019080838360005b8381101561011d578082015181840152602081019050610102565b50505050905090810190601f16801561014a5780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b341561016357600080fd5b6101796004808035906020019091905050610677565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b34156101c657600080fd5b6101ce6106b6565b005b34156101db57600080fd5b6101e36106ed565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b341561023057600080fd5b61025c600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091905050610712565b005b341561026957600080fd5b610271610941565b6040518080602001828103825283818151815260200191508051906020019080838360005b838110156102b1578082015181840152602081019050610296565b50505050905090810190601f1680156102de5780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b34156102f757600080fd5b6102ff6109df565b6040518080602001828103825283818151815260200191508051906020019080838360005b8381101561033f578082015181840152602081019050610324565b50505050905090810190601f16801561036c5780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b341561038557600080fd5b61038d610a7d565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b34156103da57600080fd5b6103e2610aa3565b604051808215151515815260200191505060405180910390f35b341561040757600080fd5b61041d6004808035906020019091905050610ab6565b60405180806020018573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018481526020018381526020018281038252868181546001816001161561010002031660029004815260200191508054600181600116156101000203166002900480156104e45780601f106104b9576101008083540402835291602001916104e4565b820191906000526020600020905b8154815290600101906020018083116104c757829003601f168201915b50509550505050505060405180910390f35b341561050157600080fd5b610509610b14565b6040518080602001828103825283818151815260200191508051906020019080838360005b8381101561054957808201518184015260208101905061052e565b50505050905090810190601f1680156105765780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b341561058f57600080fd5b610597610bb2565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b60078054600181600116156101000203166002900480601f01602080910402602001604051908101604052809291908181526020018280546001816001161561010002031660029004801561066f5780601f106106445761010080835404028352916020019161066f565b820191906000526020600020905b81548152906001019060200180831161065257829003601f168201915b505050505081565b60058181548110151561068657fe5b90600052602060002090016000915054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b600660009054906101000a900460ff16156106d057600080fd5b6001600660006101000a81548160ff021916908315150217905550565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b61071a610bd8565b600660009054906101000a900460ff161561073457600080fd5b600580548060010182816107489190610c1d565b9160005260206000209001600084909190916101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055505030816020019073ffffffffffffffffffffffffffffffffffffffff16908173ffffffffffffffffffffffffffffffffffffffff16815250506040805190810160405280601481526020017f436f6c6c61626f7261746520696e206d6572676500000000000000000000000081525081600001819052504281604001818152505043816060018181525050600980548060010182816108359190610c49565b916000526020600020906004020160008390919091506000820151816000019080519060200190610867929190610c7b565b5060208201518160010160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555060408201518160020155606082015181600301555050503073ffffffffffffffffffffffffffffffffffffffff16631dedc6f76040518163ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401600060405180830381600087803b151561092957600080fd5b6102c65a03f1151561093a57600080fd5b5050505050565b60048054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156109d75780601f106109ac576101008083540402835291602001916109d7565b820191906000526020600020905b8154815290600101906020018083116109ba57829003601f168201915b505050505081565b60038054600181600116156101000203166002900480601f016020809104026020016040519081016040528092919081815260200182805460018160011615610100020316600290048015610a755780601f10610a4a57610100808354040283529160200191610a75565b820191906000526020600020905b815481529060010190602001808311610a5857829003601f168201915b505050505081565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b600660009054906101000a900460ff1681565b600981815481101515610ac557fe5b906000526020600020906004020160009150905080600001908060010160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16908060020154908060030154905084565b60088054600181600116156101000203166002900480601f016020809104026020016040519081016040528092919081815260200182805460018160011615610100020316600290048015610baa5780601f10610b7f57610100808354040283529160200191610baa565b820191906000526020600020905b815481529060010190602001808311610b8d57829003601f168201915b505050505081565b600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b608060405190810160405280610bec610cfb565b8152602001600073ffffffffffffffffffffffffffffffffffffffff16815260200160008152602001600081525090565b815481835581811511610c4457818360005260206000209182019101610c439190610d0f565b5b505050565b815481835581811511610c7657600402816004028360005260206000209182019101610c759190610d34565b5b505050565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f10610cbc57805160ff1916838001178555610cea565b82800160010185558215610cea579182015b82811115610ce9578251825591602001919060010190610cce565b5b509050610cf79190610d0f565b5090565b602060405190810160405280600081525090565b610d3191905b80821115610d2d576000816000905550600101610d15565b5090565b90565b610d9791905b80821115610d935760008082016000610d539190610d9a565b6001820160006101000a81549073ffffffffffffffffffffffffffffffffffffffff02191690556002820160009055600382016000905550600401610d3a565b5090565b90565b50805460018160011615610100020316600290046000825580601f10610dc05750610ddf565b601f016020900490600052602060002090810190610dde9190610d0f565b5b505600a165627a7a72305820e3fc252ae3712f278e927651645f712101d561010e70e9205e7d31e5f5b97a450029',
				gas: '4700000'
			},
			function (e, contract) {
				console.log(e, contract);
				hideloader();
				if (contract) {
					console.log('商品を追加しました。: ' + contract.address + ' transactionHash: ' + contract.transactionHash);
				}
			})
	});

	//Reload the products list table
	$("#reload").click(function () {
		getProductData();
	});

	//Reload the handlers list table
	$("#reloadHandlers").click(function () {
		getHandlerData();
	});

	//populate the products table
	function loadProductData(products) {
		for (i = 0; i < products.length; i++) {
			populateProductTable((i + 1).toString(), products[i]);
		}
	}

	function populateProductTable(number, product) {
		tabBody = document.getElementById("productsTable");
		row = document.createElement("tr");

		//first cell
		cell1 = document.createElement("td");
		textnode1 = document.createTextNode(number);
		cell1.appendChild(textnode1);

		//second cell
		cell2 = document.createElement("td");
		var link = document.createElement("a");
		link.className = "hoverLink";
		link.setAttribute('onclick', 'getIndividualProduct(this.innerHTML);');
		textnode2 = document.createTextNode(product);
		link.appendChild(textnode2);
		cell2.appendChild(link);

		row.appendChild(cell1);
		row.appendChild(cell2);
		tabBody.appendChild(row);
	}

	//populate the handlers table
	function loadHandlerDataData(handlers) {
		for (i = 0; i < handlers.length; i++) {
			populateHandlerTable((i + 1).toString(), handlers[i]);
		}
	}

	function populateHandlerTable(number, handler) {
		tabBody = document.getElementById("handlersTable");
		row = document.createElement("tr");

		//first cell
		cell1 = document.createElement("td");
		textnode1 = document.createTextNode(number);
		cell1.appendChild(textnode1);

		//second cell
		cell2 = document.createElement("td");
		var link = document.createElement("a");
		link.className = "hoverLink";
		link.setAttribute('onclick', 'getIndividualhandler(this.innerHTML);');
		textnode2 = document.createTextNode(handler);
		link.appendChild(textnode2);
		cell2.appendChild(link);

		row.appendChild(cell1);
		row.appendChild(cell2);
		tabBody.appendChild(row);
	}

	//Clear navbar
	function ResetNavbar() {
		showHideLoader(0);
		$("#insTrans").html('');
		$("#transBlock").html('');
		$("#TransHash").html('');
		$("#transactionResult").html('');
	}

	//Common info function (only on successful transaction)
	function TransactionComplete(block) {
		if (block.blockHash != $("#insTrans").html())
			showHideLoader(0);
		$("#insTrans").html('Block hash: ' + block.blockHash);
		$("#transBlock").html('Transaction Block: ' + block.blockNumber);
	}

	//Alert if no address is found
	function InvalidAddressAlert() {
		alert('Please enter a valid address');
	}

	//Empty string check
	function isEmpty(str) {
		return (!str || 0 === str.length);
	}

	//Loading image switch (0: off, 1: on)
	function showHideLoader(onOff) {
		if (onOff == 1) {
			var sLoader = $("#loader").show();
		} else {
			var hLoader = $("#loader").hide();
		}
	}

	//Check if input is a number (address)
	function isNumber(str) {
		if (isNaN(str)) {
			return false;
		} else {
			return true;
		}
	}

	function Showloader() {
		$("#loadingImg").show();
	}

	function hideloader() {
		$("#loadingImg").hide();
	}

});