var canvas = document.getElementById('game')
var context = canvas.getContext('2d');

function onPageLoad() {
		let url = new URL(document.location.href);
		player1 = url.searchParams.get("player1_color");
		player2 = url.searchParams.get("player2_color");
			 }

var player1 = 1;
var player2 = 2;

// Total Frames
var frames = 8;
var rows = 2;

// Current Frame
var currentFrame = 0;
var currentRow = 0;

// red Sprite
var redSprite = new Image();
redSprite.src = "img/sprites/redanims.png";
// blue Sprite
var blueSprite = new Image();
blueSprite.src = "img/sprites/blueanims.png";
// red Sprite
var greenSprite = new Image();
greenSprite.src = "img/sprites/greenanims.png";
// blue Sprite
var orangeSprite = new Image();
orangeSprite.src = "img/sprites/orangeanims.png";
// red Sprite
var purpleSprite = new Image();
purpleSprite.src = "img/sprites/purpleanims.png";

function turnLock() {
	if(!slidePhase)
	{
		savedBoardArray[lastSquare[0].index][lastSquare[1].index].color 
		= boardArray[lastSquare[0].index][lastSquare[1].index].color;
		if(player1Turn == true) {
			document.getElementById("HUD").innerHTML = "Player 1 Slide Piece(s)";
		}
		else {
			document.getElementById("HUD").innerHTML = "Player 2 Slide Piece(s)";
		}
	}
	else{
		player1Turn = !player1Turn;
		slid = false;
		if(player1Turn == true) {
			document.getElementById("HUD").innerHTML = "Player 1 Place a Piece";
		}
		else {
			document.getElementById("HUD").innerHTML = "Player 2 Place a Piece";
		}
		for(i = 0; i < boardSize; i++)
	    {
		  for(j = 0; j < boardSize; j++)
		  {
			  boardArray[i][j].selected = false;
			  savedBoardArray[i][j].color = boardArray[i][j].color;
		  }
	    }
	}
	slidePhase = !slidePhase;
	if(victoryCheck(player1)) {
		document.getElementById("HUD").innerHTML = "Player 1 wins";
	}
	if(victoryCheck(player2)) {
		document.getElementById("HUD").innerHTML = "Player 2 wins";
	}	
	if(player1 == player2) {
		document.getElementById("HUD").innerHTML = "Both players are using the same color";
	}	
}

function victoryCheck(color) {
  for(var i = 0; i < boardSize; i++) {
	if(checkHorizontal(color, i) || checkVertical(color, i)) {
		return true;
	}
  }
  
  if(checkDiagonalRight(color, 0, 0) ||
	  checkDiagonalRight(color, 0, 1) ||
	  checkDiagonalRight(color, 1, 0) ||
	  checkDiagonalRight(color, 1, 1)) {
		return true;
  }
 
  if(checkDiagonalLeft(color, 0, boardSize - 2) ||
	  checkDiagonalLeft(color, 1, boardSize - 2) ||
	  checkDiagonalLeft(color, 0, boardSize - 1) ||
	  checkDiagonalLeft(color, 1, boardSize - 1)) {
		return true;
  }
  return false;
}

function checkHorizontal(color, row) {
	var inRow = false;
	var lastSquare = false;
	var counter = 0;
	for(i = 0; i < boardSize; i++)
	{
		if(savedBoardArray[i][row].color == color)
		{
			counter++;
			lastSquare = true;
		}
		else
		{
			lastSquare = false;
			counter = 0;
		}
		if(counter >= 5) {
			inRow = true;
		}
	}
	return inRow;
}

function checkVertical(color, col) {
	var lastSquare = false;
	var counter = 0;
	for(i = 0; i < boardSize; i++)
	{
		if(savedBoardArray[col][i].color == color)
		{
			counter++;
			lastSquare = true;
		}
		else
		{
			lastSquare = false;
			counter = 0;
		}
		if(counter >= 5) {
			return true;
		}
	}
	return false;
}

function checkDiagonalRight(color, i, j) {
	if(savedBoardArray[i][j].color == color &&
		savedBoardArray[i+1][j+1].color == color &&
		savedBoardArray[i+2][j+2].color == color &&
		savedBoardArray[i+3][j+3].color == color &&
		savedBoardArray[i+4][j+4].color == color) {
		return true;
	}
	return false;
}

function checkDiagonalLeft(color, i, j) {
	if(savedBoardArray[i][j].color == color &&
		savedBoardArray[i+1][j-1].color == color &&
		savedBoardArray[i+2][j-2].color == color &&
		savedBoardArray[i+3][j-3].color == color &&
		savedBoardArray[i+4][j-4].color == color) {
		return true;
	}
	return false;
}

function leftButtonOnClick() {
	if(slidePhase) {
		if(!slid || !vertical) {
			var topPiece = 0;
			var lastPiece = 0;
			var selectedRow = boardSize;
			var slidable = false;
			var pieceCounter = -1;
			for(i = 0; i < boardSize; i++)
			{
			  for(j = 0; j < boardSize; j++)
			  {
				  if(boardArray[i][j].selected) {
					  if(boardArray[i][j].color != "0") {
						  if(selectedRow == boardSize) {
							  selectedRow = j;
							  topPiece = i;
							  lastPiece = i;
							  slidable = true;
							  pieceCounter++;
						  }
						  else if(selectedRow == j) {
							  lastPiece = i;
							  pieceCounter++;
						  }
						  else {  
							  slidable = false;
						  }
					  }
					  else {
						  slidable = false;
						  selectedRow = boardSize + 1;
					  }
				}
				  
			  }
			}
			if(topPiece > 0) {
				if(boardArray[topPiece-1][selectedRow].color != "0") {
					slidable = false;
				}
			}
			else {
				slidable = false;
			}
			if(pieceCounter < (lastPiece - topPiece)) {
				slidable = false;
			}
			if(slidable) {
				for(i = 1; i < boardSize; i++) {
					if(boardArray[i][selectedRow].selected) {
						boardArray[i-1][selectedRow].color = boardArray[i][selectedRow].color;
						boardArray[i][selectedRow].color = "0";
						boardArray[i-1][selectedRow].selected = boardArray[i][selectedRow].selected;
						boardArray[i][selectedRow].selected = false;
					}
				}
				slid = true;
				vertical = false;
			}
		}
	}
}

function rightButtonOnClick() {
	if(slidePhase) {
		if(!slid || !vertical) {
			var topPiece = 0;
			var lastPiece = boardSize;
			var selectedRow = boardSize;
			var slidable = false;
			var pieceCounter = -1;
			for(i = 0; i < boardSize; i++)
			{
			  for(j = 0; j < boardSize; j++)
			  {
				  if(boardArray[i][j].selected) {
					  if(boardArray[i][j].color != "0") {
						  if(selectedRow == boardSize) {
							  selectedRow = j;
							  topPiece = i;
							  lastPiece = i;
							  slidable = true;
							  pieceCounter++;
						  }
						  else if(selectedRow == j) {
							  lastPiece = i;
							  pieceCounter++;
						  }
						  else {
							  slidable = false;
						  }
					  }
					  else {
						  slidable = false;
						  selectedRow = boardSize + 1;
					  }
				  }
			  }
			}
			if(lastPiece < boardSize - 1) {
				if(boardArray[lastPiece+1][selectedRow].color != "0") {
					slidable = false;
				}
			}
			else {
				slidable = false;
			}
			if(pieceCounter < (lastPiece - topPiece)) {
				slidable = false;
			}
			if(slidable) {
				for(i = boardSize - 2; i >= 0; i--) {
					if(boardArray[i][selectedRow].selected) {
						boardArray[i+1][selectedRow].color = boardArray[i][selectedRow].color;
						boardArray[i][selectedRow].color = "0";
						boardArray[i+1][selectedRow].selected = boardArray[i][selectedRow].selected;
						boardArray[i][selectedRow].selected = false;
					}
				}
				slid = true;
				vertical = false;
			}
		}
	}
}

function upButtonOnClick() {
	if(slidePhase) {
		if(!slid || vertical) {
			var topPiece = 0;
			var lastPiece = 0;
			var selectedCol = boardSize;
			var slidable = false;
			var pieceCounter = -1;
			for(i = 0; i < boardSize; i++)
			{
			  for(j = 0; j < boardSize; j++)
			  {
				  if(boardArray[i][j].selected) {
					  if(boardArray[i][j].color != "0") {
						  if(selectedCol == boardSize) {
							  selectedCol = i;
							  topPiece = j;
							  lastPiece = j;
							  slidable = true;
							  pieceCounter++;
						  }
						  else if(selectedCol == i) {
							  lastPiece = j;
							  pieceCounter++;
						  }
						  else {  
							  slidable = false;
						  }
					  }
					  else {
						  slidable = false;
						  selectedCol = boardSize + 1;
					  }
				}
				  
			  }
			}
			if(topPiece > 0) {
				if(boardArray[selectedCol][topPiece-1].color != "0") {
					slidable = false;
				}
			}
			else {
				slidable = false;
			}
			if(pieceCounter < (lastPiece - topPiece)) {
				slidable = false;
			}
			if(slidable) {
				for(i = 1; i < boardSize; i++) {
					if(boardArray[selectedCol][i].selected) {
						boardArray[selectedCol][i-1].color = boardArray[selectedCol][i].color;
						boardArray[selectedCol][i].color = "0";
						boardArray[selectedCol][i-1].selected = boardArray[selectedCol][i].selected;
						boardArray[selectedCol][i].selected = false;
					}
				}
				slid = true;
				vertical = true;
			}
		}
	}
}

function downButtonOnClick() {
	if(slidePhase) {
		if(!slid || vertical) {
			var topPiece = 0;
			var lastPiece = boardSize;
			var selectedCol = boardSize;
			var slidable = false;
			var pieceCounter = -1;
			for(i = 0; i < boardSize; i++)
			{
			  for(j = 0; j < boardSize; j++)
			  {
				  if(boardArray[i][j].selected) {
					  if(boardArray[i][j].color != "0") {
						  if(selectedCol == boardSize) {
							  selectedCol = i;
							  topPiece = j;
							  lastPiece = j;
							  slidable = true;
							  pieceCounter++;
						  }
						  else if(selectedCol == i) {
							  lastPiece = j;
							  pieceCounter++;
						  }
						  else {
							  slidable = false;
						  }
					  }
					  else {
						  slidable = false;
						  selectedCol = boardSize + 1;
					  }
				  }
			  }
			}
			if(lastPiece < boardSize - 1) {
				if(boardArray[selectedCol][lastPiece+1].color != "0") {
					slidable = false;
				}
			}
			else {
				slidable = false;
			}
			if(pieceCounter < (lastPiece - topPiece)) {
				slidable = false;
			}
			if(slidable) {
				for(i = boardSize - 2; i >= 0; i--) {
					if(boardArray[selectedCol][i].selected) {
						boardArray[selectedCol][i+1].color = boardArray[selectedCol][i].color;
						boardArray[selectedCol][i].color = "0";
						boardArray[selectedCol][i+1].selected = boardArray[selectedCol][i].selected;
						boardArray[selectedCol][i].selected = false;
					}
				}
				slid = true;
				vertical = true;
			}
			
		}
	}
}


function checkBoard(e){
  var rect = canvas.getBoundingClientRect();
  x = e.clientX - rect.left;
  y = e.clientY - rect.top;
  squareWidth = rect.width / boardSize;
  squareHeight = rect.height / boardSize;
  for(i = 0; i < boardSize; i++)
  {
	  for(j = 0; j < boardSize; j++)
	{
		if(x > (i * squareHeight) && x < (i + 1)* squareHeight &&
		y > (j * squareWidth) && y < (j + 1)* squareWidth)
		{
			if(!slidePhase) {
				if(boardArray[i][j].color == "0")
				{
					boardArray[lastSquare[0].index][lastSquare[1].index].color 
					= savedBoardArray[lastSquare[0].index][lastSquare[1].index].color;
					if(player1Turn == true) {
						boardArray[i][j].color = player1;
					}
					else{
						boardArray[i][j].color = player2;
					}
					lastSquare[0].index = i;
					lastSquare[1].index = j;
				}
			}
			else if(!slid){
				boardArray[i][j].selected = !boardArray[i][j].selected;
			}
		}
	}
  }
}

function reset() {
	for(i = 0; i < boardSize; i++) {
		for(j = 0; j < boardSize; j++){
		  boardArray[i][j].selected = false;
		  boardArray[i][j].color = savedBoardArray[i][j].color;
		}
	}
	slid = false;
}

function drawBoard() {
  // Draw the background
  context.clearRect(0, 0, canvas.width, canvas.height);
  currentFrame++;
  if(currentFrame >= frames)
  {
	  currentFrame = 0;
	  currentRow++;
	  if(currentRow >= rows)
	  {
		  currentRow = 0;
	  }
  }
  for(i = 0; i < boardSize; i++)
  {
	  for(j = 0; j < boardSize; j++)
	{
		context.beginPath();
		context.fillStyle = "#FFFFFF";
		if(slidePhase && boardArray[i][j].selected){
			context.lineWidth = 3;
			context.rect(i * canvas.width/boardSize + 1, j * canvas.height/boardSize + 1, 
				canvas.width/boardSize - 2, canvas.height/boardSize - 2);
		}
		else {
			context.lineWidth = 1;
			context.rect(i * canvas.width/boardSize, j * canvas.height/boardSize, 
				canvas.width/boardSize, canvas.height/boardSize);
		}
		context.fill();
		context.stroke();
		var temp = boardArray[i][j].color;
		if(temp == 1)
		{
			context.drawImage(redSprite, (redSprite.width / 8) * currentFrame, 
			(redSprite.height / 4) * currentRow, 53, 60, 
			i * canvas.width/boardSize + 1, j * canvas.height/boardSize + 1, 
			canvas.width/boardSize - 2, canvas.height/boardSize - 2);
		}
		else if(temp == 2)
		{
			context.drawImage(blueSprite, (blueSprite.width / 8) * currentFrame, 
			(blueSprite.height / 4) * currentRow, 53, 60, 
			i * canvas.width/boardSize + 1, j * canvas.height/boardSize + 1, 
			canvas.width/boardSize - 2, canvas.height/boardSize - 2);
		}
		else if(temp == 3)
		{
			context.drawImage(greenSprite, (greenSprite.width / 8) * currentFrame, 
			(greenSprite.height / 4) * currentRow, 53, 60, 
			i * canvas.width/boardSize + 1, j * canvas.height/boardSize + 1, 
			canvas.width/boardSize - 2, canvas.height/boardSize - 2);
		}
		else if(temp == 4)
		{
			context.drawImage(orangeSprite, (orangeSprite.width / 8) * currentFrame, 
			(orangeSprite.height / 4) * currentRow, 53, 60, 
			i * canvas.width/boardSize + 1, j * canvas.height/boardSize + 1, 
			canvas.width/boardSize - 2, canvas.height/boardSize - 2);
		}
		else if(temp == 5)
		{
			context.drawImage(purpleSprite, (purpleSprite.width / 8) * currentFrame, 
			(purpleSprite.height / 4) * currentRow, 53, 60, 
			i * canvas.width/boardSize + 1, j * canvas.height/boardSize + 1, 
			canvas.width/boardSize - 2, canvas.height/boardSize - 2);
		}
	}
  }
  window.requestAnimationFrame(drawBoard);
}

var boardArray = [[{ "color": "0", "selected": false}, 
{ "color": "0", "selected": false},
{ "color": "0", "selected": false}, 
{ "color": "0", "selected": false},
{ "color": "0", "selected": false}, 
{ "color": "0", "selected": false}],
[{ "color": "0", "selected": false}, 
{ "color": "0", "selected": false},
{ "color": "0", "selected": false}, 
{ "color": "0", "selected": false},
{ "color": "0", "selected": false}, 
{ "color": "0", "selected": false}],
[{ "color": "0", "selected": false}, 
{ "color": "0", "selected": false},
{ "color": "0", "selected": false}, 
{ "color": "0", "selected": false},
{ "color": "0", "selected": false}, 
{ "color": "0", "selected": false}],
 [{ "color": "0", "selected": false}, 
{ "color": "0", "selected": false},
{ "color": "0", "selected": false}, 
{ "color": "0", "selected": false},
{ "color": "0", "selected": false}, 
{ "color": "0", "selected": false}],
 [{ "color": "0", "selected": false}, 
{ "color": "0", "selected": false},
{ "color": "0", "selected": false}, 
{ "color": "0", "selected": false},
{ "color": "0", "selected": false}, 
{ "color": "0", "selected": false}],
[{ "color": "0", "selected": false}, 
{ "color": "0", "selected": false},
{ "color": "0", "selected": false}, 
{ "color": "0", "selected": false},
{ "color": "0", "selected": false}, 
{ "color": "0", "selected": false}]];
 
var savedBoardArray = [[{ "color": "0"}, { "color": "0"},
 { "color": "0"}, { "color": "0"},
 { "color": "0"}, { "color": "0"}],
 [{ "color": "0"}, { "color": "0"},
 { "color": "0"}, { "color": "0"},
 { "color": "0"}, { "color": "0"}],
 [{ "color": "0"}, { "color": "0"},
 { "color": "0"}, { "color": "0"},
 { "color": "0"}, { "color": "0"}],
 [{ "color": "0"}, { "color": "0"},
 { "color": "0"}, { "color": "0"},
 { "color": "0"}, { "color": "0"}],
 [{ "color": "0"}, { "color": "0"},
 { "color": "0"}, { "color": "0"},
 { "color": "0"}, { "color": "0"}],
 [{ "color": "0"}, { "color": "0"},
 { "color": "0"}, { "color": "0"},
 { "color": "0"}, { "color": "0"}]];
 
var lastSquare = [{index: "0"},{index: "0"}];
  
var player1Turn = false;
var slidePhase = true;
var slid = false;
var vertical = false;

var boardSize = 6;

onload();
turnLock();
window.requestAnimationFrame(drawBoard);