var canvas = document.getElementById('game')
var context = canvas.getContext('2d');

function onPageLoad() {
  console.log("Page Loaded");
  
			 }

function turnLock() {
	savedBoardArray[lastSquare[0].index][lastSquare[1].index].color 
	= boardArray[lastSquare[0].index][lastSquare[1].index].color;
	playerRed = !playerRed;
	if(playerRed == true) {
		document.getElementById("HUD").innerHTML = "Red Player Place a Piece";
	}
	else {
		document.getElementById("HUD").innerHTML = "Blue Player Place a Piece";
	}
	if(victoryCheck("#FF0000")) {
		document.getElementById("HUD").innerHTML = "Red Player wins";
	}
	if(victoryCheck("#0000FF")) {
		document.getElementById("HUD").innerHTML = "Blue Player wins";
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

function buttonOnClick() {
  // alert("Booooommmmmm!!!");
  console.log("Button Pressed");
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
			if(boardArray[i][j].color == "#FFFFFF")
			{
				boardArray[lastSquare[0].index][lastSquare[1].index].color 
				= savedBoardArray[lastSquare[0].index][lastSquare[1].index].color;
				if(playerRed == true) {
					boardArray[i][j].color = boardColors[0].color;
				}
				else{
					boardArray[i][j].color = boardColors[1].color;
				}
				lastSquare[0].index = i;
				lastSquare[1].index = j;
			}
		}
	}
  }
  drawBoard();
}

// Draw a HealthBar on Canvas, can be used to indicate players health
function drawBoard() {
  // Draw the background
  context.clearRect(0, 0, canvas.width, canvas.height);
  for(i = 0; i < boardSize; i++)
  {
	  for(j = 0; j < boardSize; j++)
	{
		context.beginPath();
		context.fillStyle = boardArray[i][j].color;
		context.rect(i * canvas.width/boardSize, j * canvas.height/boardSize, canvas.width/boardSize, canvas.height/boardSize);
		context.fill();
		context.stroke();
	}
  }
}

var boardColors = [{
	"color": "#FF0000"
  },
  {
    "color": "#0000FF"
  }
];
var boardArray = [[{ "color": "#FFFFFF"}, { "color": "#FFFFFF"},
 { "color": "#FFFFFF"}, { "color": "#FFFFFF"},
 { "color": "#FFFFFF"}, { "color": "#FFFFFF"}],
 [{ "color": "#FFFFFF"}, { "color": "#FFFFFF"},
 { "color": "#FFFFFF"}, { "color": "#FFFFFF"},
 { "color": "#FFFFFF"}, { "color": "#FFFFFF"}],
 [{ "color": "#FFFFFF"}, { "color": "#FFFFFF"},
 { "color": "#FFFFFF"}, { "color": "#FFFFFF"},
 { "color": "#FFFFFF"}, { "color": "#FFFFFF"}],
 [{ "color": "#FFFFFF"}, { "color": "#FFFFFF"},
 { "color": "#FFFFFF"}, { "color": "#FFFFFF"},
 { "color": "#FFFFFF"}, { "color": "#FFFFFF"}],
 [{ "color": "#FFFFFF"}, { "color": "#FFFFFF"},
 { "color": "#FFFFFF"}, { "color": "#FFFFFF"},
 { "color": "#FFFFFF"}, { "color": "#FFFFFF"}],
 [{ "color": "#FFFFFF"}, { "color": "#FFFFFF"},
 { "color": "#FFFFFF"}, { "color": "#FFFFFF"},
 { "color": "#FFFFFF"}, { "color": "#FFFFFF"}]];
 
var savedBoardArray = [[{ "color": "#FFFFFF"}, { "color": "#FFFFFF"},
 { "color": "#FFFFFF"}, { "color": "#FFFFFF"},
 { "color": "#FFFFFF"}, { "color": "#FFFFFF"}],
 [{ "color": "#FFFFFF"}, { "color": "#FFFFFF"},
 { "color": "#FFFFFF"}, { "color": "#FFFFFF"},
 { "color": "#FFFFFF"}, { "color": "#FFFFFF"}],
 [{ "color": "#FFFFFF"}, { "color": "#FFFFFF"},
 { "color": "#FFFFFF"}, { "color": "#FFFFFF"},
 { "color": "#FFFFFF"}, { "color": "#FFFFFF"}],
 [{ "color": "#FFFFFF"}, { "color": "#FFFFFF"},
 { "color": "#FFFFFF"}, { "color": "#FFFFFF"},
 { "color": "#FFFFFF"}, { "color": "#FFFFFF"}],
 [{ "color": "#FFFFFF"}, { "color": "#FFFFFF"},
 { "color": "#FFFFFF"}, { "color": "#FFFFFF"},
 { "color": "#FFFFFF"}, { "color": "#FFFFFF"}],
 [{ "color": "#FFFFFF"}, { "color": "#FFFFFF"},
 { "color": "#FFFFFF"}, { "color": "#FFFFFF"},
 { "color": "#FFFFFF"}, { "color": "#FFFFFF"}]];
 
var lastSquare = [{index: "0"},{index: "0"}];
  
var playerRed = true;

var boardSize = 6;


drawBoard();