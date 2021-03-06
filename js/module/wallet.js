"use strict";

var [web3, dWallet] = (function($) {
	const erc20abi = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"subtractedValue","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"addedValue","type":"uint256"}],"name":"increaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"}];

	const EN = 0;
	const ZH = 1;
	var lang = ZH;

	/* Ethereum */
	const NAME_ETHEREUM = ["Ethereum", "????????? Ethereum ?????????"];
	const URL_ETHEREUM = "https://mainnet.infura.io/v3/6f813473b9454e169d35a5703370c12e";
	const ID_ETHEREUM = "1";
	const SYMBOL_ETHEREUM = "ETH";
	const BROWSER_ETHEREUM = "https://etherscan.io";

	/* Ropsten */
	const NAME_ROPSTEN = ["Ropsten testnet", "Ropsten ????????????"];
	const URL_ROPSTEN = "https://ropsten.infura.io/v3/6f813473b9454e169d35a5703370c12e";
	const ID_ROPSTEN = "3";
	const SYMBOL_ROPSTEN = "ETH";
	const BROWSER_ROPSTEN = "https://ropsten.etherscan.io";

	/* Rinkeby */
	const NAME_RINKEBY = ["Rinkeby testnet", "Rinkeby ????????????"];
	const URL_RINKEBY = "https://rinkeby.infura.io/v3/6f813473b9454e169d35a5703370c12e";
	const ID_RINKEBY = "4";
	const SYMBOL_RINKEBY = "ETH";
	const BROWSER_RINKEBY = "https://ropsten.etherscan.io";

	/* Localhost 8545 */
	const NAME_LOCALHOST = "Localhost 8545";
	const URL_LOCALHOST = "https://localhost:8545";
	const ID_LOCALHOST = "1337";
	const SYMBOL_LOCALHOST = "ETH";

	/* BSC */
	const NAME_BSC = ["Binance Smart Chain", "BSC ?????????"];
	const URL_BSC = "https://bsc-dataseed.binance.org/";
	const ID_BSC = "56";
	const SYMBOL_BSC = "BNB";
	const BROWSER_BSC = "https://bscscan.com/";

	/* BSC testnet */
	const NAME_BSC_TESTNET = ["BSC Testnet", "BSC ????????????"];
	const URL_BSC_TESTNET = "https://data-seed-prebsc-1-s1.binance.org:8545/";
	const ID_BSC_TESTNET = "97";
	const SYMBOL_BSC_TESTNET = "BNB";
	const BROWSER_BSC_TESTNET = "https://testnet.bscscan.com/";

	const Network = function(name, url, id, symbol, browser) {
		this.name = name;
		this.url = url;
		this.id = id;
		this.symbol = symbol;
		this.browser = browser;
	}

	const $$ = {};

	const Response = function(success, msg, data) {
		this.success = success;
		this.msg = msg;
		this.data = data;
	}

	$$.ethereum = new Network(NAME_ETHEREUM[lang], URL_ETHEREUM, ID_ETHEREUM, SYMBOL_ETHEREUM, BROWSER_ETHEREUM);
	$$.ropsten = new Network(NAME_ROPSTEN[lang], URL_ROPSTEN, ID_ROPSTEN, SYMBOL_ROPSTEN, BROWSER_ROPSTEN);
	$$.rinkeby = new Network(NAME_RINKEBY[lang], URL_RINKEBY, ID_RINKEBY, SYMBOL_RINKEBY, BROWSER_RINKEBY);
	$$.localhost = new Network(NAME_LOCALHOST, URL_LOCALHOST, ID_LOCALHOST, SYMBOL_LOCALHOST, "");
	$$.bsc = new Network(NAME_BSC[lang], URL_BSC, ID_BSC, SYMBOL_BSC, BROWSER_BSC);
	$$.bscTestNet = new Network(NAME_BSC_TESTNET[lang], URL_BSC_TESTNET, ID_BSC_TESTNET, SYMBOL_BSC_TESTNET, BROWSER_BSC_TESTNET);

	$ = new Web3();
	$.eth.setProvider($$.ethereum.url);
	$.eth.accounts.wallet.load("");
	$$.currentNetwork = $$.ethereum;

	/* checkout chain */
	$$.checkout = async function(n) {
		if(!$$.unlocked) return new Response(false, "Permission denied");
		await web3.eth.setProvider(n.url);
		$$.currentNetwork = n;
		return new Response(true, "ok");
	}

	/* create an account */
	$$.createAccount = function(name) {
		if(!$$.unlocked) return new Response(false, "Permission denied");
		let account = $.eth.accounts.create();
		account.name = name;
		$.eth.accounts.wallet.add(account);
		$.eth.accounts.wallet.save("");
		return new Response(true, "ok", account);
	}

	$$.importAccount = function(privKey) {
		if(!$$.unlocked) return new Response(false, "Permission denied");
		let account;
		try {
			account = $.eth.accounts.privateKeyToAccount(privKey);
		} catch(e) {
			return new Response(false, e);
		}

		$.eth.accounts.wallet.add(account);
		$.eth.accounts.wallet.save("");
		return new Response(true, "ok", account);
	}

	$$.exportAccount = function(index) {
		if(!$$.unlocked) return new Response(false, "Permission denied");
		return new Response(true, "ok", $.eth.accounts.wallet[index].privateKey);
	}

	$$.removeAccount = function(address) {
		if(!$$.unlocked) return new Response(false, "Permission denied");
		$.eth.accounts.wallet.remove(address);
		$.eth.accounts.wallet.save("");
		return new Response(true, "ok");
	}

	$$.loadAccounts = async function() {
		if(!$$.unlocked) return new Response(false, "Permission denied");
		return new Response(true, "ok", $.eth.accounts.wallet);
	}

	$$.checkoutAccount = function(address) {
		if(!$$.unlocked) return new Response(false, "Permission denied");
		for(let i = 0; i < $.eth.accounts.wallet.length; i++) {
			if($.eth.accounts.wallet[i].address == address) {
				$.eth.defaultAccount = address;
				return new Response(true, "ok");
			}
		}
		return new Response(false, "No account matching");
	}

	$$.loadAccount = function() {
		if(!$$.unlocked) return new Response(false, "Permission denied");
		return new Response(true, "ok", $.eth.defaultAccount);
	}

	$$.importWallet = function(accounts) {
		if(!$$.unlocked) return new Response(false, "Permission denied");
		$.eth.accounts.wallet.clear();
		accounts = JSON.parse(accounts);
		for(let i = 0; i < accounts.length; i++) {
			$.eth.accounts.wallet.add(accounts[i]);
			$.eth.accounts.wallet.save("");
		}
		return new Response(true, "ok");
	}

	$$.exportWallet = function() {
		if(!$$.unlocked) return new Response(false, "Permission denied");
		let json = [];
		let accounts = $.eth.accounts.wallet;
		for(let i = 0; i < accounts.length; i++) {
			json.push(accounts[i]);
		}
		navigator.clipboard.writeText(JSON.stringify(json));
		return new Response(true, "ok", JSON.stringify(json));
	}

	$$.unlocked = false;

	$$.setPassword = function(password) {
		if(localStorage.getItem("password") != null) {
			if(!$$.unlocked) return new Response(false, "Permission denied");
		}
		localStorage.setItem("password", MD5(password) + "");
		return new Response(true, "ok");
	}

	$$.unlock = function(password) {
		if(MD5(password) != localStorage.getItem("password")) return new Response(false, "Permission denied");
		$$.unlocked = true;
		return new Response(true, "ok");
	}

	$$.lock = function() {
		if(!$$.unlocked) return new Response(false, "Permission denied");
		$$.unlocked = false;
		return new Response(true, "ok");
	}

	$$.importERC20 = async function(address) {
		if(!$$.unlocked) return new Response(false, "Permission denied");

		let erc20s = JSON.parse(localStorage.getItem("erc20-" + $$.currentNetwork.name));
		if(erc20s == null) {
			erc20s = [];
		}

		for(let i = 0; i < erc20s.length; i++) {
			if(erc20s[i].address == address) {
				return new Response(false, "The address is already there");
			}
		}

		const code = await new web3.eth.getCode(address);
		if(code == "0x") {
			return new Response(false, "The address is not belong to a contract");
		}

		const erc20C = new web3.eth.Contract(erc20abi, address);
		let name;
		let symbol;
		let totalSupply;
		let decimals;
		await Promise.all([
			erc20C.methods.name().call().then(r => {name = r}),
			erc20C.methods.symbol().call().then(r => {symbol = r}),
			erc20C.methods.totalSupply().call().then(r => {totalSupply = r}),
			erc20C.methods.decimals().call().then(r => {decimals = r}),
		]).then();

		if(localStorage.getItem("erc20-" + $$.currentNetwork.name) == null) {
			localStorage.setItem("erc20-" + $$.currentNetwork.name, "[]");
		}

		erc20s.push({"address": address, "name": name, "symbol": symbol, "totalSupply": totalSupply, "decimals": decimals});

		localStorage.setItem("erc20-" + $$.currentNetwork.name, JSON.stringify(erc20s));

		return new Response(true, "ok", {name: name, symbol: symbol, totalSupply: totalSupply, decimals: decimals});
	}

	$$.removeERC20 = function(address) {
		if(!$$.unlocked) return new Response(false, "Permission denied");
		let erc20s = JSON.parse(localStorage.getItem("erc20-" + $$.currentNetwork.name));
		for(let i = 0; i < erc20s.length; i++) {
			if(erc20s[i].address == address) {
				erc20s.splice(i, 1);
				localStorage.setItem("erc20-" + $$.currentNetwork.name, JSON.stringify(erc20s));
				return new Response(true, "ok");
			}
		}
		return new Response(false, "No address matches");
	}

	$$.loadERC20s = function() {
		if(!$$.unlocked) return new Response(false, "Permission denied");
		if(localStorage.getItem("erc20-" + $$.currentNetwork.name) == null) {
			return new Response(true, "ok", []);
		}
		return new Response(true, "ok", JSON.parse(localStorage.getItem("erc20-" + $$.currentNetwork.name)));
	}

	$$.transferERC20 = async function(addressC, to, value) {
		if(!$$.unlocked) return new Response(false, "Permission denied");
		if($.eth.defaultAccount == null) return new Response(false, "Please checkout to an account");
		let erc20s = JSON.parse(localStorage.getItem("erc20-" + $$.currentNetwork.name));
		let erc20C;
		for(let i = 0; i < erc20s.length; i++) {
			if(erc20s[i].address == addressC) {
				erc20C = new web3.eth.Contract(erc20abi, addressC);

				let gas = await erc20C.methods.transfer(to, $.utils.toWei(value)).estimateGas({
					from: $.eth.defaultAccount
				});

				let response;
				try {
					response = await erc20C.methods.transfer(to, web3.utils.toWei(value)).send({from: $.eth.defaultAccount, gas: gas + 1});
				} catch(error) {
					return new Response(false, error);
				}
				return new Response(true, "ok", response);
			}
		}
		return new Response(false, "No contract address matches");
	}

	return [$, $$];
})();
