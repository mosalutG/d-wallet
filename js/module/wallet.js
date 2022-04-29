"use strict";

if(localStorage.getItem("accounts") == null) {
	localStorage.setItem("accounts", "[]");
	console.log(localStorage.getItem("accounts"));
}

var [web3, dWallet] = (function($) {
	const EN = 0;
	const ZH = 1;
	var lang = ZH;

	/* Ethereum */
	const NAME_ETHEREUM = ["Ethereum", "以太坊 Ethereum 主网络"];
	const URL_ETHEREUM = "https://mainnet.infura.io/v3/6f813473b9454e169d35a5703370c12e";
	const ID_ETHEREUM = "1";
	const SYMBOL_ETHEREUM = "ETH";
	const BROWSER_ETHEREUM = "https://etherscan.io";

	/* Ropsten */
	const NAME_ROPSTEN = ["Ropsten testnet", "Ropsten 测试网络"];
	const URL_ROPSTEN = "https://ropsten.infura.io/v3/6f813473b9454e169d35a5703370c12e";
	const ID_ROPSTEN = "3";
	const SYMBOL_ROPSTEN = "ETH";
	const BROWSER_ROPSTEN = "https://ropsten.etherscan.io";

	/* Rinkeby */
	const NAME_RINKEBY = ["Rinkeby testnet", "Rinkeby 测试网络"];
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
	const NAME_BSC = ["Binance Smart Chain", "BSC 主网络"];
	const URL_BSC = "https://bsc-dataseed.binance.org/";
	const ID_BSC = "56";
	const SYMBOL_BSC = "BNB";
	const BROWSER_BSC = "https://bscscan.com/";

	/* BSC testnet */
	const NAME_BSC_TESTNET = ["BSC Testnet", "BSC 测试网络"];
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

	Network.prototype.connect = async function() {
		$ = new Web3(new Web3.providers.HttpProvider(this.url));
	}

	const ethereum = new Network(NAME_ETHEREUM[lang], URL_ETHEREUM, ID_ETHEREUM, SYMBOL_ETHEREUM, BROWSER_ETHEREUM);
	const ropsten = new Network(NAME_ROPSTEN[lang], URL_ROPSTEN, ID_ROPSTEN, SYMBOL_ROPSTEN, BROWSER_ROPSTEN);
	const rinkeby = new Network(NAME_RINKEBY[lang], URL_RINKEBY, ID_RINKEBY, SYMBOL_RINKEBY, BROWSER_RINKEBY);
	const localhost = new Network(NAME_LOCALHOST, URL_LOCALHOST, ID_LOCALHOST, SYMBOL_LOCALHOST, "");
	const bsc = new Network(NAME_BSC[lang], URL_BSC, ID_BSC, SYMBOL_BSC, BROWSER_BSC);
	const bscTestNet = new Network(NAME_BSC_TESTNET[lang], URL_BSC_TESTNET, ID_BSC_TESTNET, SYMBOL_BSC_TESTNET, BROWSER_BSC_TESTNET);

	var network = ethereum;
	network.connect();

	const $$ = function() {}

	/* checkout chain */
	$$.checkout = async function(n) {
		network = n;
		await network.connect();
		$.eth.getChainId().then(console.log);

		return network;
	}

	/* create an account */
	$$.createAccount = function(name, fn) {
		let account = $.eth.accounts.create();
		var accounts = JSON.parse(localStorage.getItem("accounts"));
		for(let i = 0; i < accounts.length; i++) {
			if(accounts[i].privKey == account.privateKey) {
				return;
			}
		}
		accounts.push({address: account.address, name: name, privKey: account.privateKey});
		localStorage.setItem("accounts", JSON.stringify(accounts));
		fn(account);
	}

	$$.importAccount = function(name, privKey, fn) {
		var accounts = JSON.parse(localStorage.getItem("accounts"));
		for(let i = 0; i < accounts.length; i++) {
			if(accounts[i].privKey == privKey) {
				return;
			}
		}
		let account = $.eth.accounts.privateKeyToAccount(privKey);
		accounts.push({address: account.address, name: name, privKey: account.privateKey});
		localStorage.setItem("accounts", JSON.stringify(accounts));
		fn(account);
	}

	$$.exportAccount = function(address, fn) {
		var accounts = JSON.parse(localStorage.getItem("accounts"));
		for(let i = 0; i < accounts.length; i++) {
			if(accounts[i].address == address) {
				fn(accounts[i].privKey);
				return accounts[i].privKey;
			}
		}
	}

	$$.removeAccount = function(index) {
		var accounts = JSON.parse(localStorage.getItem("accounts"));
		accounts[index] = accounts[accounts.length - 1];
		accounts.pop();
		localStorage.setItem("accounts", JSON.stringify(accounts));
	}

	$$.loadAccounts = async function() {
		console.log(JSON.parse(localStorage.getItem("accounts")));
		return JSON.parse(localStorage.getItem("accounts"));
	}

	$$.importWallet = function(accounts) {
		localStorage.setItem("accounts", accounts);
	}

	$$.exportWallet = function() {
		navigator.clipboard.writeText(localStorage.getItem("accounts"));
	}

	return [$, $$];
})();
