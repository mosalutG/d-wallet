// localStorage.removeItem("accounts");

web3.eth.getChainId().then(console.log);

function createCallback(account) {
	console.log(account);
}

function main() {
	web3.eth.getBalance("0x253CCA19F1207627542746B62109CaA543271245").then(console.log);
}

main();
