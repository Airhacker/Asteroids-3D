// Controls teh first page of tge game

// Variables

let playerName = "";

// Query Selectors
const firstPage = document.querySelector(".first-page");
const beginBtn = document.querySelector("#begin-btn");
const playerNameInput = document.querySelector("#player-name");

// Event Listeners
beginBtn.addEventListener("click", () => {
	playerName = playerNameInput.value;
	if (playerName.length >= 1) {
		firstPage.style.display = "none";
		console.log(playerName);
	} else {
		alert("Please Enter a Name");
	}
});
