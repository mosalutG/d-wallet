"use strict";

// localStorage.removeItem("accounts");

web3.eth.getChainId().then(console.log);

async function init() {
	web3.eth.getBalance("0x253CCA19F1207627542746B62109CaA543271245").then(console.log);
	console.log(web3);
}

onload = main;

init();

/*
 * @mosalut
 * 切换网络
 */
function checkoutNetworks() {
	let doms = document.getElementsByClassName("checkout")

	for(let i = 0; i < doms.length; i++) {
		doms[i].onclick = function() {
			selectNetwork(this);
		}
	}
}

/*
 * @mosalut
 * 判断切换到那个网路
 */
async function selectNetwork(dom) {
	let response;
	switch(parseInt(dom.dataset.chain)) {
		case 0:
			response = await dWallet.checkout(dWallet.ethereum);
			if(!response.success) {
				console.error("selectNetwork:", response.msg)
				break;
			}
			web3.eth.getChainId().then(console.log);
			break;
		case 1:
			response = await dWallet.checkout(dWallet.ropsten);
			if(!response.success) {
				console.error("selectNetwork:", response.msg)
				break;
			}
			web3.eth.getChainId().then(console.log);
			break;
		case 2:
			response = await dWallet.checkout(dWallet.rinkeby);
			if(!response.success) {
				console.error("selectNetwork:", response.msg)
				break;
			}
			web3.eth.getChainId().then(console.log);
			break;
		case 3:
			response = await dWallet.checkout(dWallet.localhost);
			if(!response.success) {
				console.error("selectNetwork:", response.msg)
				break;
			}
			web3.eth.getChainId().then(console.log);
			break;
		case 4:
			response = await dWallet.checkout(dWallet.bsc);
			if(!response.success) {
				console.error("selectNetwork:", response.msg)
				break;
			}
			web3.eth.getChainId().then(console.log);
			break;
		case 5:
			response = await dWallet.checkout(dWallet.bscTestNet);
			if(!response.success) {
				console.error("selectNetwork:", response.msg)
				break;
			}
			web3.eth.getChainId().then(console.log);
			break;
		default:
			console.error("selectNetwork: Invalid network");
	}
}

/*
 * @mosalut
 * 创建账号
 */
function createAccount(name) {
	let dom = document.getElementById("createAccount");
	dom.onclick = function() {
		let response = dWallet.createAccount(name);
		if(!response.success) {
			console.error(response.msg);
			return;
		}
		console.log(response.data);
	}
}

/*
 * @mosalut
 * 导入账号
 */
function importAccount(name, privKey) {
	let dom = document.getElementById("importAccount");
	dom.onclick = function() {
		let response = dWallet.importAccount(name, privKey);
		if(!response.success) {
			console.error(response.msg);
			return;
		}
		console.log(response.data);
	}
}

/*
 * @mosalut
 * 导出账号
 */
function exportAccount(address) {
	let dom = document.getElementById("exportAccount");
	dom.onclick = function() {
		let response = dWallet.exportAccount(address);
		console.log(response);
		if(!response.success) {
			console.error(response.msg);
			return;
		}
		console.log(response.data);
	}
}

/*
 * @mosalut
 * 移除账号
 */
function removeAccount(index) {
	let dom = document.getElementById("removeAccount");
	dom.onclick = function() {
		let response = dWallet.removeAccount(index);
		if(!response.success) {
			console.error(response.msg);
			return;
		}
		console.log(response.data);
	}
}

/*
 * @mosalut
 * 切换账号
 */
function checkoutAccount(index) {
	let dom = document.getElementById("checkoutAccount");
	dom.onclick = async function() {
		let response = await dWallet.checkoutAccount(index);
		if(!response.success) {
			console.error(response.msg);
			return;
		}
		console.log(response.data);
	}
}

/*
 * @mosalut
 * 列出所有账号
 */
function loadAccounts() {
	let dom = document.getElementById("loadAccounts");
	dom.onclick = async function() {
		let response = await dWallet.loadAccounts();
		if(!response.success) {
			console.error(response.msg);
			return;
		}
		console.log(response.data);
	}
}

/*
 * @mosalut
 * 当前所用账号
 */
function loadAccount() {
	let dom = document.getElementById("loadAccount");
	dom.onclick = async function() {
		let response = await dWallet.loadAccount();
		console.log(response);
		if(!response.success) {
			console.error(response.msg);
			return;
		}
		console.log(response.data);
	}
}

/*
 * @mosalut
 * 导入钱包
 */
function importWallet(data) {
	let dom = document.getElementById("importWallet");
	dom.onclick = function() {
		let response = dWallet.importWallet(data);
		if(!response.success) {
			console.error(response.msg);
			return;
		}
		console.log(response.data);
	}
}

/*
 * @mosalut
 * 导出钱包
 */
function exportWallet() {
	let dom = document.getElementById("exportWallet");
	dom.onclick = function() {
		let response = dWallet.exportWallet();
		if(!response.success) {
			console.error(response.msg);
			return;
		}
		console.log(response.data);
	}
}

/*
 * @mosalut
 * 设置密码
 */
function setPassword(password) {
	let dom = document.getElementById("setPassword");
	dom.onclick = function() {
		let response = dWallet.setPassword(password);
		if(!response.success) {
			console.error(response.msg);
			return;
		}
		console.log(response.data);
	}
}

/*
 * @mosalut
 * 锁定钱包
 */
function lock() {
	let dom = document.getElementById("lock");
	dom.onclick = function() {
		let response = dWallet.lock();
		if(!response.success) {
			console.error(response.msg);
			return;
		}
		console.log(response.data);
	}
}

/*
 * @mosalut
 * 解锁钱包
 */
function unlock(password) {
	let dom = document.getElementById("unlock");
	dom.onclick = function() {
		let response = dWallet.unlock(password);
		if(!response.success) {
			console.error(response.msg);
			return;
		}
		console.log(response.data);
	}
}

/*
 * @mosalut
 * 导入代币
 */
function importERC20(address) {
	let dom = document.getElementById("importERC20");
	dom.onclick = async function() {
		let response = await dWallet.importERC20(address);
		console.log(response);
		if(!response.success) {
			console.error(response.msg);
			return;
		}
		console.log(response.data);
	}
}

/*
 * @mosalut
 * 移除代币
 */
function removeERC20(index) {
	let dom = document.getElementById("removeERC20");
	dom.onclick = function() {
		let response = dWallet.removeERC20(index);
		if(!response.success) {
			console.error(response.msg);
			return;
		}
		console.log(response.data);
	}
}

/*
 * @mosalut
 * 列出代币
 */
function loadERC20s() {
	let dom = document.getElementById("loadERC20s");
	dom.onclick = function() {
		let response = dWallet.loadERC20s();
		if(!response.success) {
			console.error(response.msg);
			return;
		}
		console.log(response.data);
	}
}

/*
 * @mosalut
 * 转账
 */
function transferERC20(index, to, value) {
	let dom = document.getElementById("transferERC20");
	dom.onclick = async function() {
		let response = await dWallet.transferERC20(index, to, value);
		console.log(response);
		if(!response.success) {
			console.error(response.msg);
			return;
		}
		console.log(response.data);
	}
}

function transfer(account, erc20, value) {
}

async function main() {
	/*
	 * @mosalut
	 * 模拟用户调用网络切换
	 */
	checkoutNetworks();

	/*
	 * @mosalut
	 * 以下方法:
	 * createAccount, importAccount, exportAccount,
	 * removeAccount, loadAccounts, importWallet,
	 * exportWallet, setPassword, lock, unlock
	 * 模拟用户调用
	 * 参数为模拟用户输入
	 */
	createAccount("demo name");
	importAccount("HN owner", "0x404cc778fdb355c3c2f8136a28471c809a33155d3781f37bcb6eeb50be3e3c44");
	exportAccount("0x0e443357C06B75e9EDA5e95D31d8B8f1952A3Cad");
	removeAccount("0x7442f559efb11b05d8e7187b719a9de7c1f974f5");
	loadAccounts();
	loadAccount();
	checkoutAccount(2);
	importWallet('[{"address":"0xabD552703D2EFDBc7aD8334405f188cB46E7a8Fc","privateKey":"0x59e5997856aef7925cddf197a261c0fbe3c1e47a42db09e60c00fd4b1157172e"},{"address":"0x25a28cd2368B74C4BdD6c058BE1598614DcF21a7","privateKey":"0xc6c8779b17e2aee1137aae4d3c4fffda9b90289856b1aba58629224061d3d8e5"},{"address":"0x0e443357C06B75e9EDA5e95D31d8B8f1952A3Cad","privateKey":"0x404cc778fdb355c3c2f8136a28471c809a33155d3781f37bcb6eeb50be3e3c44"},{"address":"0x7442F559eFB11B05d8E7187B719A9de7C1f974F5","privateKey":"0x901e83c7c076a0a7c72d0afc5bbd871b03d2d774c7a76fa1f5b0f75827f4438b","index":0},{"address":"0x3FDD5b0F7171506c37107B4669199eb77D80C491","privateKey":"0x90e0ce028e1faf8b858d702e41f85a2ec59b3d818df67f13cdfd25e2c46da860","index":1}]');
	exportWallet();
	setPassword('129787x#');
	lock();
	unlock('129787x#');
	importERC20("0xa70D1396F8CCCCB62406c7498f5eD1BB974F513F");
	removeERC20(0);
	loadERC20s();
	transferERC20(0, "0x25a28cd2368B74C4BdD6c058BE1598614DcF21a7", "1");
}
