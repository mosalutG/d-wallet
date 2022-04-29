"use strict";

// localStorage.removeItem("accounts");

web3.eth.getChainId().then(console.log);

function main() {
	web3.eth.getBalance("0x253CCA19F1207627542746B62109CaA543271245").then(console.log);
}

main();

onload = function() {
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
	createAccount('demo name');
	importAccount('demo name import', '0xc91eec8baa8640f6b93aab08176ea0d87d22df8780e59e623f7602905195a99c');
	exportAccount('0xb169F4368D8acD6294a8779E1f77f87FA9c29d5F');
	removeAccount(1);
	loadAccounts();
	importWallet('[{"address":"0xabD552703D2EFDBc7aD8334405f188cB46E7a8Fc","name":"demo name","privKey":"0x59e5997856aef7925cddf197a261c0fbe3c1e47a42db09e60c00fd4b1157172e"},{"address":"0xb169F4368D8acD6294a8779E1f77f87FA9c29d5F","name":"demo name import","privKey":"0xc91eec8baa8640f6b93aab08176ea0d87d22df8780e59e623f7602905195a99c"}]');
	exportWallet();
	setPassword('129787x#');
	lock();
	unlock('129787x#');
}

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
			web3 = response.data;
			web3.eth.getChainId().then(console.log);
			break;
		case 1:
			response = await dWallet.checkout(dWallet.ropsten);
			if(!response.success) {
				console.error("selectNetwork:", response.msg)
				break;
			}
			web3 = response.data;
			web3.eth.getChainId().then(console.log);
			break;
		case 2:
			response = await dWallet.checkout(dWallet.rinkeby);
			if(!response.success) {
				console.error("selectNetwork:", response.msg)
				break;
			}
			web3 = response.data;
			web3.eth.getChainId().then(console.log);
			break;
		case 3:
			response = await dWallet.checkout(dWallet.localhost);
			if(!response.success) {
				console.error("selectNetwork:", response.msg)
				break;
			}
			web3 = response.data;
			web3.eth.getChainId().then(console.log);
			break;
		case 4:
			response = await dWallet.checkout(dWallet.bsc);
			if(!response.success) {
				console.error("selectNetwork:", response.msg)
				break;
			}
			web3 = response.data;
			web3.eth.getChainId().then(console.log);
			break;
		case 5:
			response = await dWallet.checkout(dWallet.bscTestNet);
			if(!response.success) {
				console.error("selectNetwork:", response.msg)
				break;
			}
			web3 = response.data;
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
		console.log(response);
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
		console.log(response);
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
		console.log(response);
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
		console.log(response);
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
		console.log(response);
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
		console.log(response);
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
		console.log(response)
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
		console.log(response);
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
		console.log(response);
	}
}
