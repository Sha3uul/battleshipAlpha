// set grid rows and columns and the size of each square
var rows = 10;
var cols = 10;
var squareSize = 50;
var playerWon;

// get the container element
var gameBoardContainer = document.getElementById("owngameBoard");
var botgameBoardContainer = document.getElementById("botgameBoard");
// make the grid columns and rows
for (i = 0; i < cols; i++) {
	for (j = 0; j < rows; j++) {
		
		// create a new div HTML element for each grid square and make it the right size
		var square = document.createElement("div");
		gameBoardContainer.appendChild(square);

    // give each div element a unique id based on its row and column, like "s00"
		square.id = 's' + j + i;			
		
		// set each grid square's coordinates: multiples of the current row or column number
		var topPosition = j * squareSize;
		var leftPosition = i * squareSize;			
		
		// use CSS absolute positioning to place each grid square on the page
		square.style.top = topPosition + 'px';
		square.style.left = leftPosition + 'px';						
	}
}

for (i = 0; i < cols; i++) {
	for (j = 0; j < rows; j++) {
		console.log("i");
		console.log(i);
		console.log("j");
		console.log(j);
		// create a new div HTML element for each grid square and make it the right size
		var botsquare = document.createElement("div");
		botgameBoardContainer.appendChild(botsquare);

    // give each div element a unique id based on its row and column, like "s00"
		botsquare.id = 'b' + j + i;			
		
		// set each grid square's coordinates: multiples of the current row or column number
		var topPosition = j * squareSize;
		var leftPosition = i * squareSize;			
		
		// use CSS absolute positioning to place each grid square on the page
		botsquare.style.top = topPosition + 'px';
		botsquare.style.left = leftPosition + 'px';						
	}
}
/* lazy way of tracking when the game is won: just increment hitCount on every hit
   in this version, and according to the official Hasbro rules (http://www.hasbro.com/common/instruct/BattleShip_(2002).PDF)
   there are 17 hits to be made in order to win the game:
      Carrier     - 5 hits
      Battleship  - 4 hits
      Destroyer   - 3 hits
      Submarine   - 3 hits
      Patrol Boat - 2 hits
*/
var placeCount = 0;
var hitCount = 0;
var hitsLeft = 5;
var placeCount2 = 0;

/* create the 2d array that will contain the status of each square on the board
   and place ships on the board (later, create function for random placement!)
   0 = empty, 1 = part of a ship, 2 = a sunken part of a ship, 3 = a missed shot
*/
var owngameBoard = [
				[0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0]
				]

var botgameBoard = [
				[0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0]
				]				
// set event listener for all elements in gameboard, run fireTorpedo function when square is clicked
gameBoardContainer.addEventListener("click", placeShip, /*fireTorpedo*/ false);

var isReady = new Boolean (false);

function placeShip(e) {
    // if item clicked (e.target) is not the parent element on which the event listener was set (e.currentTarget)
	if (e.target !== e.currentTarget) {
        // extract row and column # from the HTML element's id
		var row = e.target.id.substring(1,2);
		var col = e.target.id.substring(2,3);
        //alert("Clicked on row " + row + ", col " + col);
				
		// if cell is empty, place ship there if player clicks
		if (owngameBoard[row][col] == 0) {
			e.target.style.background = '#bbb';
			placeCount++;
			// if ship is already placed in the selected cell, unselect the cell
			owngameBoard[row][col] = 1;
		} else if (owngameBoard[row][col] == 1){
			e.target.style.background = '#f6f8f9';
			placeCount--;
			owngameBoard[row][col] = 0;
		}

		if (placeCount == 5) {
			alert("Ships are ready!");
			gameBoardContainer.removeEventListener("click", placeShip, false);
			isReady = true;
		}
	}
}

function genShip() {

	if(isReady == true){

    var i = 0;

    while(i<5)
    {
        var j = Math.floor(Math.random() * 10);
        console.log("j");
        console.log(j);


        var k = Math.floor(Math.random() * 10);
        console.log("k");
        console.log(k);

		if (botgameBoard[j][k] == 0)
		{
			botgameBoard[j][k] = 1;
			i++; 
		}
    }

	console.log(botgameBoard);

	}else {
		alert("Ships are not ready! Place 5 ships above!");
}}

function userGuess(e)
{
		var moveValid = true;
	    // if item clicked (e.target) is not the parent element on which the event listener was set (e.currentTarget)
		if (e.target !== e.currentTarget) {
			// extract row and column # from the HTML element's id
			var row = e.target.id.substring(1,2);
			var col = e.target.id.substring(2,3);
			//alert("Clicked on row " + row + ", col " + col);
					
			// if player clicks a square with no ship, change the color and change square's value
			if (botgameBoard[row][col] == 0) {
				e.target.style.background = 'blue';
				// set this square's value to 3 to indicate that they fired and missed
				botgameBoard[row][col] = 3;
				
			// if player clicks a square with a ship, change the color and change square's value
			} else if (botgameBoard[row][col] == 1) {
				alert("You hit an enemy ship! " + (4-hitCount) + " left!")
				e.target.style.background = 'red';
				// set this square's value to 2 to indicate the ship has been hit
				botgameBoard[row][col] = 2;
				
				// increment hitCount each time a ship is hit
				hitCount++;
				// this definitely shouldn't be hard-coded, but here it is anyway. lazy, simple solution:
				if (hitCount == 5) {
					botgameBoardContainer.removeEventListener("click",userGuess,false);
					alert("All enemy battleships have been defeated! You win!");
					playerWon = true;
				}
				
			// if player clicks a square that's been previously hit, let them know
			} else if (botgameBoard[row][col] > 1) {
				moveValid = false;
				alert("You already fired at this location. Please choose another.");
			}		
		}

		while(moveValid == true && playerWon != true)
		{
			var j = Math.floor(Math.random() * 10);
			var k = Math.floor(Math.random() * 10);
	
			var chosen = document.getElementById("s" + j + k);
			console.log("bot chose cell " + "[" + j + "," + k + "]")
			console.log(chosen.id)

			if (owngameBoard[j][k] == 0)
			{
				document.getElementById("s" + j + k).style.background = "#0000ff";
				owngameBoard[j][k] = 3;
				break;
			} else if (owngameBoard[j][k] == 1)
			{
				alert("Your ship at [" + j + "," + k + "] was hit! " + (hitsLeft-1) + " remain!")
				document.getElementById("s" + j + k).style.background = "#ff0000";
				hitsLeft--;
				owngameBoard[j][k] = 2;
				break;
			}
		}

		if (hitsLeft <= 0){
			botgameBoardContainer.removeEventListener("click",userGuess,false);
			alert("All your ships have been destroyed! You lose!");
		}

		if(playerWon == true){
			//load AI image of battleship
			console.log("player won")
		}

		console.log("j");
        console.log(j);

		console.log("k");
        console.log(k);
		
		e.stopPropagation();

		console.log(owngameBoard);
}

btn.addEventListener('click', () => {
	// hide button
	if (isReady == true)
	{
	btn.style.display = 'none';
	botgameBoardContainer.addEventListener("click",userGuess,false);
	}
}
);

var myPix = new Array("assets/bship0.jpg","assets/bship1.jpg","assets/bship2.jpg","assets/bship3.jpg","assets/bship4.jpg","assets/bship5.jpg","assets/bship6.jpg","assets/bship7.jpg","assets/bship8.jpg","assets/bship9.jpg","assets/bship10.jpg","assets/bship11.jpg");

function imgGen() {

	var randomNum = Math.floor(Math.random() * myPix.length);

	if(playerWon == true && randomNum == 0)
	{
     document.getElementById("myPicture").src = myPix[0];
	 document.getElementById("imgg").remove();

	 var a = document.createElement('a');

	 var link = document.createTextNode("Claim Your Prize!");

	 a.appendChild(link);

	 a.title = "Claim Your Prize!"

	 a.href = "https://paras.id/token/x.paras.near::481339";

	 a.style.backgroundColor = "#f44336";
	 a.style.Color = "white";
	 a.style.Padding = "70px 70px";
	 a.style.textAlign = "center";
	 a.style.textDecoration = "none";
	 a.style.Display = "inline-block";

	 document.body.appendChild(a);
	} else if(playerWon == true && randomNum == 1)
	{
		document.getElementById("myPicture").src = myPix[1];
		document.getElementById("imgg").remove();
   
		var a = document.createElement('a');
   
		var link = document.createTextNode("Claim Your Prize!");
   
		a.appendChild(link);
   
		a.title = "Claim Your Prize!"
   
		a.href = "https://paras.id/token/x.paras.near::481340";
   
		a.style.backgroundColor = "#f44336";
		a.style.Color = "white";
		a.style.Padding = "70px 70px";
		a.style.textAlign = "center";
		a.style.textDecoration = "none";
		a.style.Display = "inline-block";
   
		document.body.appendChild(a);
	} else if(playerWon == true && randomNum == 2)
	{
		document.getElementById("myPicture").src = myPix[2];
		document.getElementById("imgg").remove();
   
		var a = document.createElement('a');
   
		var link = document.createTextNode("Claim Your Prize!");
   
		a.appendChild(link);
   
		a.title = "Claim Your Prize!"
   
		a.href = "https://paras.id/token/x.paras.near::481341";
   
		a.style.backgroundColor = "#f44336";
		a.style.Color = "white";
		a.style.Padding = "70px 70px";
		a.style.textAlign = "center";
		a.style.textDecoration = "none";
		a.style.Display = "inline-block";
   
		document.body.appendChild(a);
	} else if(playerWon == true && randomNum == 3)
	{
		document.getElementById("myPicture").src = myPix[3];
		document.getElementById("imgg").remove();
   
		var a = document.createElement('a');
   
		var link = document.createTextNode("Claim Your Prize!");
   
		a.appendChild(link);
   
		a.title = "Claim Your Prize!"
   
		a.href = "https://paras.id/token/x.paras.near::481342";
   
		a.style.backgroundColor = "#f44336";
		a.style.Color = "white";
		a.style.Padding = "70px 70px";
		a.style.textAlign = "center";
		a.style.textDecoration = "none";
		a.style.Display = "inline-block";
   
		document.body.appendChild(a);
	} else if(playerWon == true && randomNum == 4)
	{
		document.getElementById("myPicture").src = myPix[4];
		document.getElementById("imgg").remove();
   
		var a = document.createElement('a');
   
		var link = document.createTextNode("Claim Your Prize!");
   
		a.appendChild(link);
   
		a.title = "Claim Your Prize!"
   
		a.href = "https://paras.id/token/x.paras.near::481343";
   
		a.style.backgroundColor = "#f44336";
		a.style.Color = "white";
		a.style.Padding = "70px 70px";
		a.style.textAlign = "center";
		a.style.textDecoration = "none";
		a.style.Display = "inline-block";
   
		document.body.appendChild(a);
	} else if(playerWon == true && randomNum == 5)
	{
		document.getElementById("myPicture").src = myPix[5];
		document.getElementById("imgg").remove();
   
		var a = document.createElement('a');
   
		var link = document.createTextNode("Claim Your Prize!");
   
		a.appendChild(link);
   
		a.title = "Claim Your Prize!"
   
		a.href = "https://paras.id/token/x.paras.near::481344";
   
		a.style.backgroundColor = "#f44336";
		a.style.Color = "white";
		a.style.Padding = "70px 70px";
		a.style.textAlign = "center";
		a.style.textDecoration = "none";
		a.style.Display = "inline-block";
   
		document.body.appendChild(a);
	} else if(playerWon == true && randomNum == 6)
	{
		document.getElementById("myPicture").src = myPix[6];
		document.getElementById("imgg").remove();
   
		var a = document.createElement('a');
   
		var link = document.createTextNode("Claim Your Prize!");
   
		a.appendChild(link);
   
		a.title = "Claim Your Prize!"
   
		a.href = "https://paras.id/token/x.paras.near::481345";
   
		a.style.backgroundColor = "#f44336";
		a.style.Color = "white";
		a.style.Padding = "70px 70px";
		a.style.textAlign = "center";
		a.style.textDecoration = "none";
		a.style.Display = "inline-block";
   
		document.body.appendChild(a);
	} else if(playerWon == true && randomNum == 7)
	{
		document.getElementById("myPicture").src = myPix[7];
		document.getElementById("imgg").remove();
   
		var a = document.createElement('a');
   
		var link = document.createTextNode("Claim Your Prize!");
   
		a.appendChild(link);
   
		a.title = "Claim Your Prize!"
   
		a.href = "https://paras.id/token/x.paras.near::481346";
   
		a.style.backgroundColor = "#f44336";
		a.style.Color = "white";
		a.style.Padding = "70px 70px";
		a.style.textAlign = "center";
		a.style.textDecoration = "none";
		a.style.Display = "inline-block";
   
		document.body.appendChild(a);
	} else if(playerWon == true && randomNum == 8)
	{
		document.getElementById("myPicture").src = myPix[8];
		document.getElementById("imgg").remove();
   
		var a = document.createElement('a');
   
		var link = document.createTextNode("Claim Your Prize!");
   
		a.appendChild(link);
   
		a.title = "Claim Your Prize!"
   
		a.href = "https://paras.id/token/x.paras.near::481348";
   
		a.style.backgroundColor = "#f44336";
		a.style.Color = "white";
		a.style.Padding = "70px 70px";
		a.style.textAlign = "center";
		a.style.textDecoration = "none";
		a.style.Display = "inline-block";
   
		document.body.appendChild(a);
	} else if(playerWon == true && randomNum == 9)
	{
		document.getElementById("myPicture").src = myPix[9];
		document.getElementById("imgg").remove();
   
		var a = document.createElement('a');
   
		var link = document.createTextNode("Claim Your Prize!");
   
		a.appendChild(link);
   
		a.title = "Claim Your Prize!"
   
		a.href = "https://paras.id/token/x.paras.near::481349";
   
		a.style.backgroundColor = "#f44336";
		a.style.Color = "white";
		a.style.Padding = "70px 70px";
		a.style.textAlign = "center";
		a.style.textDecoration = "none";
		a.style.Display = "inline-block";
   
		document.body.appendChild(a);
	} else if(playerWon == true && randomNum == 10)
	{
		document.getElementById("myPicture").src = myPix[10];
		document.getElementById("imgg").remove();
   
		var a = document.createElement('a');
   
		var link = document.createTextNode("Claim Your Prize!");
   
		a.appendChild(link);
   
		a.title = "Claim Your Prize!"
   
		a.href = "https://paras.id/token/x.paras.near::481350";
   
		a.style.backgroundColor = "#f44336";
		a.style.Color = "white";
		a.style.Padding = "70px 70px";
		a.style.textAlign = "center";
		a.style.textDecoration = "none";
		a.style.Display = "inline-block";
   
		document.body.appendChild(a);
	} else if(playerWon == true && randomNum == 11)
	{
		document.getElementById("myPicture").src = myPix[11];
		document.getElementById("imgg").remove();
   
		var a = document.createElement('a');
   
		var link = document.createTextNode("Claim Your Prize!");
   
		a.appendChild(link);
   
		a.title = "Claim Your Prize!"
   
		a.href = "https://paras.id/token/x.paras.near::481351";
   
		a.style.backgroundColor = "#f44336";
		a.style.Color = "white";
		a.style.Padding = "70px 70px";
		a.style.textAlign = "center";
		a.style.textDecoration = "none";
		a.style.Display = "inline-block";
   
		document.body.appendChild(a);
	}
}