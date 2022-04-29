// localStorage.removeItem("accounts");

web3.eth.getChainId().then(console.log);

function logCallback(account) {
	console.log(account);
}

function main() {
	web3.eth.getBalance("0x253CCA19F1207627542746B62109CaA543271245").then(console.log);
}

main();

var importWalletData = '[{"address":"0xabD552703D2EFDBc7aD8334405f188cB46E7a8Fc","name":"demo name","privkey":"0x59e5997856aef7925cddf197a261c0fbe3c1e47a42db09e60c00fd4b1157172e"},{"address":"0xb169F4368D8acD6294a8779E1f77f87FA9c29d5F","name":"demo name import","privkey":"0xc91eec8baa8640f6b93aab08176ea0d87d22df8780e59e623f7602905195a99c"}]';
