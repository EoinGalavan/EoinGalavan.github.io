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
}

function buttonOnClick() {
  // alert("Booooommmmmm!!!");
  console.log("Button Pressed");
}

function checkBoard(e){
  var rect = canvas.getBoundingClientRect();
  x = e.clientX - rect.left;
  y = e.clientY - rect.top;
  squareWidth = rect.width / 6;
  squareHeight = rect.height / 6;
  for(i = 0; i < 6; i++)
  {
	  for(j = 0; j < 6; j++)
	{
		if(x > (i * squareHeight) && x < (i + 1)* squareHeight &&
		y > (j * squareWidth) && y < (j + 1)* squareWidth)
		{
			if(boardArray[i][j].color == "#FFFFFF")
			{
				boardArray[lastSquare[0].index][lastSquare[1].index].color 
				= savedBoardArray[lastSquare[0].index][lastSquare[1].index].color;
				if(playerRed == true) {
					boardArray[i][j].color = "#FF0000";
				}
				else{
					boardArray[i][j].color = "#0000FF"
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
  for(i = 0; i < 6; i++)
  {
	  for(j = 0; j < 6; j++)
	{
		context.beginPath();
		context.fillStyle = boardArray[i][j].color;
		context.rect(i * canvas.width/6, j * canvas.height/6, canvas.width/6, canvas.height/6);
		context.fill();
		context.stroke();
	}
  }
}

var boardModes = [{
	"color": "#FFFF00"
  },
  {
    "color": "#00FF00"
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


drawBoard();