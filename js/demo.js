"use strict";

// localStorage.removeItem("accounts");

web3.eth.getChainId().then(console.log);

async function init() {
	console.log(web3);
}

onload = main;

init();

/*
 * @mosalut
 * 切换网络
 */
function checkoutNetworks() {
	let doms = document.querySelectorAll("#wallet .checkout");

	for(let i = 0; i < doms.length; i++) {
		doms[i].onclick = async function() {
			await selectNetwork(this);
			document.querySelector("#wallet>#content>#network>span").innerText = dWallet.currentNetwork.name;
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
				return;
			}
			web3.eth.getChainId().then(console.log);
			break;
		case 1:
			response = await dWallet.checkout(dWallet.ropsten);
			if(!response.success) {
				console.error("selectNetwork:", response.msg)
				return;
			}
			web3.eth.getChainId().then(console.log);
			break;
		case 2:
			response = await dWallet.checkout(dWallet.rinkeby);
			if(!response.success) {
				console.error("selectNetwork:", response.msg)
				return;
			}
			web3.eth.getChainId().then(console.log);
			break;
		case 3:
			response = await dWallet.checkout(dWallet.localhost);
			if(!response.success) {
				console.error("selectNetwork:", response.msg)
				return;
			}
			web3.eth.getChainId().then(console.log);
			break;
		case 4:
			response = await dWallet.checkout(dWallet.bsc);
			if(!response.success) {
				console.error("selectNetwork:", response.msg)
				return;
			}
			web3.eth.getChainId().then(console.log);
			break;
		case 5:
			response = await dWallet.checkout(dWallet.bscTestNet);
			if(!response.success) {
				console.error("selectNetwork:", response.msg)
				return;
			}
			web3.eth.getChainId().then(console.log);
			break;
		default:
			console.error("selectNetwork: Invalid network");
			return;
	}
	
	let balance = Web3.utils.fromWei(await web3.eth.getBalance(web3.eth.defaultAccount));
	let maincoin = document.querySelector("#wallet>#content>#maincoin");
	maincoin.innerHTML = "余额: " + balance + "<input type='button' value='转账' />";
}

/*
 * @mosalut
 * 创建账号
 */
function createAccount(accountNameInput) {
	let dom = document.querySelector("#wallet #createAccount");
	dom.onclick = function() {
		inputsToggle([accountNameInput]);
		addressNameInput.focus();

		accountNameInput.oninput = function() {
			if(this.value == "") {
				$submit.disabled = true;
			} else {
				$submit.disabled = false;
			}
		}

		$submit.onclick = function() {
			let response = dWallet.createAccount(accountNameInput.value);
			if(!response.success) {
				console.error(response.msg);
				$output.innerText = response.msg;
				return;
			}
			$output.innerText = response.data;
		}
	}
}

/*
 * @mosalut
 * 导入账号
 */
function importAccount(accountNameInput, privKeyInput) {
	let dom = document.querySelector("#wallet #importAccount");
	dom.onclick = function() {
		inputsToggle([privKeyInput]);
		privKeyInput.focus();

		privKeyInput.oninput = function() {
			if(this.value == "") {
				$submit.disabled = true;
			} else {
				$submit.disabled = false;
			}
		}

		$submit.onclick = function() {
			let response = dWallet.importAccount(privKeyInput.value);
			if(!response.success) {
				console.error(response.msg);
				$output.innerText = response.msg;
				return;
			}
			$output.innerText = "地址:" + response.data.address + "\n" + "私钥:" + response.data.privateKey;
		}
	}
}

/*
 * @mosalut
 * 导出账号
 */
function exportAccount(addressAInput) {
	let dom = document.querySelector("#wallet #exportAccount");
	dom.onclick = function() {
		inputsToggle([addressAInput]);
		addressAInput.focus();

		addressAInput.oninput = function() {
			if(this.value == "") {
				$submit.disabled = true;
			} else {
				$submit.disabled = false;
			}
		}

		$submit.onclick = function() {
			let response = dWallet.exportAccount(addressAInput.value);
			if(!response.success) {
				console.error(response.msg);
				$output.innerText = response.msg;
				return;
			}
			$output.innerText = "私钥:" + response.data;
		}
	}
}

/*
 * @mosalut
 * 移除账号
 */
function removeAccount(addressAInput) {
	let dom = document.querySelector("#wallet #removeAccount");
	dom.onclick = function() {
		inputsToggle([addressAInput]);
		addressAInput.focus();

		addressAInput.oninput = function() {
			if(this.value == "") {
				$submit.disabled = true;
			} else {
				$submit.disabled = false;
			}
		}

		$submit.onclick = function() {
			let response = dWallet.removeAccount(addressAInput.value);
			if(!response.success) {
				console.error(response.msg);
				$output.innerText = response.msg;
				return;
			}
			$output.innerText = response.msg;
		}
	}
}

/*
 * @mosalut
 * 切换账号
 */
function checkoutAccount(addressAInput) {
	let dom = document.querySelector("#wallet #checkoutAccount");
	dom.onclick = function() {
		inputsToggle([addressAInput]);
		addressAInput.focus();

		addressAInput.oninput = function() {
			if(this.value == "") {
				$submit.disabled = true;
			} else {
				$submit.disabled = false;
			}
		}

		$submit.onclick = async function() {
			let response = await dWallet.checkoutAccount(addressAInput.value);
			if(!response.success) {
				console.error(response.msg);
				$output.innerText = response.msg;
				return;
			}
			$output.innerText = response.msg;
		}
	}
}

/*
 * @mosalut
 * 列出所有账号
 */
function loadAccounts() {
	let dom = document.querySelector("#wallet #loadAccounts");
	dom.onclick = async function() {
		inputsToggle([]);

		let response = await dWallet.loadAccounts();
		if(!response.success) {
			console.error(response.msg);
			$output.innerText = response.msg;
			return;
		}

		if(response.data.length == 0) {
			$output.innerHTML += "钱包中没有账户";
			return;
		}

		let ul = document.createElement("ul");
		ul.style.listStyleType = "none";
		for(let i = 0; i < response.data.length; i++) {
			let inputU = document.createElement("input");
			inputU.style.backgroundColor = "#0077ff";
			inputU.style.color = "#ffffff";
			inputU.setAttribute("type", "button");
			inputU.style.border = "none";
			inputU.value = "使用";
			inputU.style.cursor = "pointer";
			inputU.onclick = async function() {
				let res = await dWallet.checkoutAccount(response.data[i].address);
				if(!res.success) {
					console.error(res.msg);
					$output.innerText = res.msg;
					return;
				}
				let balance = Web3.utils.fromWei(await web3.eth.getBalance(web3.eth.defaultAccount));
				let maincoin = document.querySelector("#wallet>#content>#maincoin");
				maincoin.innerHTML = "余额: " + balance + "<input type='button' value='转账' />";
				$output.innerText = res.msg;
			}

			let inputD = document.createElement("input");
			inputD.style.backgroundColor = "#0077ff";
			inputD.style.color = "#ffffff";
			inputD.setAttribute("type", "button");
			inputD.style.border = "none";
			inputD.value = "删除";
			inputD.style.cursor = "pointer";

			let li = document.createElement("li");
			li.style.cursor = "none";
			li.innerText = response.data[i].address;
			li.style.border = "solid 3px #333333";
			li.style.borderRadius = "5px";

			li.appendChild(inputU);
			li.appendChild(inputD);
			ul.appendChild(li);
		}
		$output.appendChild(ul);
	}
}

/*
 * @mosalut
 * 当前所用账号
 */
function loadAccount() {
	let dom = document.querySelector("#wallet #loadAccount");
	dom.onclick = async function() {
		inputsToggle([]);

		let response = await dWallet.loadAccount();
		if(!response.success) {
			console.error(response.msg);
			$output.innerText = response.msg;
			return;
		}
		if(response.data == null) {
			$output.innerText += "当前没有使用任何账户，请切换";
			return;
		}
		$output.innerText += response.data;
	}
}

/*
 * @mosalut
 * 导入钱包
 */
function importWallet(walletTextarea) {
	let dom = document.querySelector("#wallet #importWallet");
	dom.onclick = function() {
		inputsToggle([walletTextarea]);
		walletTextarea.focus();

		walletTextarea.oninput = function() {
			if(this.value == "") {
				$submit.disabled = true;
			} else {
				$submit.disabled = false;
			}
		}

		$submit.onclick = function() {
			let response = dWallet.importWallet(walletTextarea.value);
			if(!response.success) {
				console.error(response.msg);
				$output.innerText = response.msg;
				return;
			}
			$output.innerText = response.msg;
		}
	}
}

/*
 * @mosalut
 * 导出钱包
 */
function exportWallet() {
	let dom = document.querySelector("#wallet #exportWallet");
	dom.onclick = function() {
		inputsToggle([]);

		let response = dWallet.exportWallet();
		if(!response.success) {
			console.error(response.msg);
			$output.innerText = response.msg;
			return;
		}
		if(response.data == '[]') {
			$output.innerText = "当前钱包中没有账户，没有必要导出";
			return;
		}
		$output.innerText = response.data;
	}
}

/*
 * @mosalut
 * 设置密码
 */
function setPassword(passwordInput, retryInput) {
	let dom = document.querySelector("#wallet #setPassword");
	dom.onclick = function() {
		inputsToggle([passwordInput, retryInput]);
		passwordInput.focus();

		passwordInput.oninput = function() {
			if(this.value == "" || retryInput.value != this.value) {
				$submit.disabled = true;
			} else {
				$submit.disabled = false;
			}
		}

		retryInput.oninput = function() {
			if(this.value == "" || passwordInput.value != this.value) {
				$submit.disabled = true;
			} else {
				$submit.disabled = false;
			}
		}

		$submit.onclick = function() {
			let response = dWallet.setPassword(passwordInput.value);
			if(!response.success) {
				console.error(response.msg);
				$output.innerText = response.msg;
				return;
			}
			$output.innerText = response.msg;
		}
	}
}

/*
 * @mosalut
 * 锁定钱包
 */
function lock() {
	let dom = document.querySelector("#wallet #lock");
	dom.onclick = function() {
		inputsToggle([]);

		let response = dWallet.lock();
		if(!response.success) {
			console.error(response.msg);
			$output.innerText = response.msg;
			return;
		}
		$output.innerText = response.msg;
	}
}

/*
 * @mosalut
 * 解锁钱包
 */
function unlock(passwordInput) {
	let dom = document.querySelector("#wallet #unlock");
	dom.onclick = function() {
		inputsToggle([passwordInput]);
		passwordInput.focus();

		passwordInput.oninput = function() {
			if(this.value == "") {
				$submit.disabled = true;
			} else {
				$submit.disabled = false;
			}
		}

		$submit.onclick = function() {
			let response = dWallet.unlock(passwordInput.value);
			if(!response.success) {
				console.error(response.msg);
				$output.innerText = response.msg;
				return;
			}
			$output.innerText = response.msg;
		}
	}
}

/*
 * @mosalut
 * 导入代币
 */
function importERC20(addressCInput, nameInput, symbolInput, decimalsInput, totalSupplyInput) {
	let dom = document.querySelector("#wallet #importERC20");
	dom.onclick = function() {
		inputsToggle([addressCInput, nameInput, symbolInput, decimalsInput, totalSupplyInput]);
		addressCInput.focus();

		addressCInput.oninput = function() {
			if(this.value == "") {
				$submit.disabled = true;
			} else {
				$submit.disabled = false;
			}
		}

		$submit.onclick = async function() {
			let response = await dWallet.importERC20(addressCInput.value);
			if(!response.success) {
				console.error(response.msg);
				$output.innerText = response.msg;
				return;
			}
			nameInput.value = response.data.name;
			symbolInput.value = response.data.symbol;
			decimalsInput.value = response.data.decimals;
			totalSupplyInput.value = response.data.totalSupply;
			$output.innerText = response.msg;
		}
	}
}

/*
 * @mosalut
 * 移除代币
 */
function removeERC20(addressCInput) {
	let dom = document.querySelector("#wallet #removeERC20");
	dom.onclick = function() {
		inputsToggle([addressCInput]);
		addressCInput.focus();

		addressCInput.oninput = function() {
			if(this.value == "") {
				$submit.disabled = true;
			} else {
				$submit.disabled = false;
			}
		}

		$submit.onclick = function() {
			let response = dWallet.removeERC20(addressCInput.value);
			if(!response.success) {
				console.error(response.msg);
				$output.innerText = response.msg;
				return;
			}
			$output.innerText = response.msg;
		}
	}
}

/*
 * @mosalut
 * 列出代币
 */
function loadERC20s() {
	let dom = document.querySelector("#wallet #loadERC20s");
	dom.onclick = function() {
		inputsToggle([]);

		let response = dWallet.loadERC20s();
		if(!response.success) {
			console.error(response.msg);
			return;
		}

		if(response.data.length == 0) {
			$output.innerText = "暂无ERC-20";
		}

		let ul = "<ul style='list-style:none; text-align:left'>";
		for(let i = 0; i < response.data.length; i++) {
			ul += "<hr /><li>地址:" + response.data[i].address + "</li><li>名称:" + response.data[i].name + "</li><li>符号:" + response.data[i].symbol + "</li><li>小数长度:" + response.data[i].decimals + "</li><li>总供应量:" + response.data[i].totalSupply + "</li>";
		}
		ul += "</ul>";
		$output.innerHTML = ul;
	}
}

/*
 * @mosalut
 * 转账
 */
function transferERC20(addressCInput, addressAInput, amountInput) {
	let dom = document.querySelector("#wallet #transferERC20");
	dom.onclick = async function() {
		inputsToggle([addressCInput, addressAInput, amountInput]);
		addressCInput.focus();

		addressCInput.oninput = function() {
			if(this.value == "" || addressAInput.value == "" || amountInput.value == "") {
				$submit.disabled = true;
			} else {
				$submit.disabled = false;
			}
		}

		addressAInput.oninput = function() {
			if(this.value == "" || addressCInput.value == "" || amountInput.value == "") {
				$submit.disabled = true;
			} else {
				$submit.disabled = false;
			}
		}

		amountInput.oninput = function() {
			if(this.value == "" || addressCInput.value == "" || addressAInput.value == "") {
				$submit.disabled = true;
			} else {
				$submit.disabled = false;
			}
		}

		$submit.onclick = async function() {
			let response = await dWallet.transferERC20(addressCInput.value, addressAInput.value, amountInput.value);
			if(!response.success) {
				console.error(response.msg);
				$output.innerText = response.msg;
				return;
			}
			console.log(response.data);
			$output.innerHTML += "<div>block hash: " + response.data.blockHash + "</div>";
			$output.innerHTML += "<div>block number: " + response.data.blockNumber + "</div>";
			$output.innerHTML += "<div>transaction hash: " + response.data.transactionHash + "</div>";
		}
	}
}

async function main() {
	/*
	 * @mosalut
	 * 模拟用户调用网络切换
	 */
	checkoutNetworks();
	console.log("defaultAccount:", web3.eth.defaultAccount);

	viewInteractive();

	web3.eth.getBalance("0x253CCA19F1207627542746B62109CaA543271245").then(console.log);
}
