"use strict";

var $walletView;
var $submit;
var $cancel;
var $inputView;
var $cover;
var $output;

const $inputs = [];

function viewInteractive() {
	$walletView = document.getElementById("wallet");
	$submit = document.querySelector("#wallet #input #submit");
	$cancel = document.querySelector("#wallet #input #cancel");
	$inputView = document.querySelector("#wallet #input");
	$cover = document.querySelector("#wallet #cover");
	$output = document.querySelector("#wallet #output");

	let bars = document.querySelectorAll("#wallet>#bar li"); 
	barToggle(bars);

	let tabs = document.querySelectorAll("#wallet>#content>nav>h4");
	let menus = document.querySelectorAll("#wallet>#content>#menu>menu");
	menuToggle(tabs, menus);

	let accountNameInput = document.querySelector("#wallet #input #accountName");
	let privKeyInput = document.querySelector("#wallet #input #privKey");
	let addressAInput = document.querySelector("#wallet #input #addressA");
	let walletTextarea = document.querySelector("#wallet #input #wallet");
	let passwordInput = document.querySelector("#wallet #input #password");
	let retryInput = document.querySelector("#wallet #input #retry");
	let addressCInput = document.querySelector("#wallet #input #addressC");
	let nameInput = document.querySelector("#wallet #input #name");
	let symbolInput = document.querySelector("#wallet #input #symbol");
	let decimalsInput = document.querySelector("#wallet #input #decimals");
	let totalSupplyInput = document.querySelector("#wallet #input #totalSupply");
	let amountInput = document.querySelector("#wallet #input #amount");

	$inputs.push(accountNameInput);
	$inputs.push(privKeyInput);
	$inputs.push(addressAInput);
	$inputs.push(walletTextarea);
	$inputs.push(passwordInput);
	$inputs.push(retryInput);
	$inputs.push(addressCInput);
	$inputs.push(nameInput);
	$inputs.push(symbolInput);
	$inputs.push(decimalsInput);
	$inputs.push(totalSupplyInput);
	$inputs.push(amountInput);

	$cancel.onclick = cancelInput;

	/*
	 * @mosalut
	 * 以下方法:
	 * createAccount, importAccount, exportAccount,
	 * removeAccount, loadAccounts, importWallet,
	 * exportWallet, setPassword, lock, unlock
	 * 模拟用户调用
	 * 参数为模拟用户输入
	 */
	createAccount(accountNameInput);
	importAccount(accountNameInput, privKeyInput);
	exportAccount(addressAInput);
	removeAccount(addressAInput);
	loadAccounts();
	loadAccount();
	checkoutAccount(addressAInput);
	importWallet(walletTextarea);
	exportWallet();
	setPassword(passwordInput, retryInput);
	lock();
	unlock(passwordInput);
	importERC20(addressCInput, nameInput, symbolInput, decimalsInput, totalSupplyInput);
	removeERC20(addressCInput);
	loadERC20s();
	transferERC20(addressCInput, addressAInput, amountInput);
}

function barToggle(bars) {
	bars[0].onclick = function() {
		$walletView.style.right = "0px";
		this.classList.remove("displayBlock");
		this.classList.add("displayNone");
		bars[1].classList.remove("displayNone");
		bars[1].classList.add("displayBlock");
	}

	bars[1].onclick = function() {
		$walletView.style.right = "-268px";
		this.classList.remove("displayBlock");
		this.classList.add("displayNone");
		bars[0].classList.remove("displayNone");
		bars[0].classList.add("displayBlock");
	}
}

function menuToggle(tabs, menus) {
	for(let i = 0; i < tabs.length; i++) {
		let that = menus[i];
		tabs[i].onclick = function() {
			for(let j = 0; j < tabs.length; j++) {
				tabs[j].classList.remove("current_tab");
				tabs[j].classList.add("other_tab");
				menus[j].classList.remove("displayBlock");
				menus[j].classList.add("displayNone");
			}
			this.classList.remove("other_tab");
			this.classList.add("current_tab");
			that.classList.remove("displayNone");
			that.classList.add("displayBlock");
		}
	}
}

function inputsToggle(inputs) {
	for(let i = 0; i < $inputs.length; i++) {
		$inputs[i].classList.remove("displayInlineBlock");
		$inputs[i].classList.add("displayNone");
	}

	for(let i = 0; i < inputs.length; i++) {
		inputs[i].classList.remove("displayNone");
		inputs[i].classList.add("displayInlineBlock");
	}

	$inputView.classList.remove("displayNone");
	$inputView.classList.add("displayBlock");
	$cover.classList.remove("displayNone");
	$cover.classList.add("displayBlock");
}

function cancelInput() {
	for(let i = 0; i < $inputs.length; i++) {
		$inputs[i].value = "";
		$inputs[i].classList.remove("displayInlineBlock");
		$inputs[i].classList.add("displayNone");
	}

	$output.innerText = "";
	$output.innerHTML = "";
	$submit.disabled = true;
	$inputView.classList.remove("displayBlock");
	$inputView.classList.add("displayNone");
	$cover.classList.remove("displayBlock");
	$cover.classList.add("displayNone");
}
