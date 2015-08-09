	var turn = true; //Determines turn. True = X, False = O.
	var gridx = [false, false, false, false, false, false, false, false, false]; //Used for win detection
	var grido = [false, false, false, false, false, false, false, false, false]; //Used for win detection
	var masterGrid = [false, false, false, false, false, false, false, false, false] //Used for tie detection

	function status (toSet) {
		document.getElementById("status").innerHTML=toSet;
	};

	function setCellProperties (id) {

		var cellId = id;
		var cell = document.getElementById(cellId.toString());
		cell.unWritten = true; //Determines if cell has been written to or not.

		cell.onclick = function () { //Sets action when cell is clicked. Where all the meat of the code is.

			//Cell write
			cellClick(cellId, cell);
			//Win detection
			var gameOver = false;
			gameOver = checkWin(gridx, "X");
			if(!gameOver) gameOver = checkWin(grido, "O");
			//Tie detection
			if(!gameOver) checkTie(masterGrid);
		};

	};

	for (var i = 0; i<9; i++) {

		setCellProperties(i); //Sets cell's onclick write and grid setup
	}

	function cellClick (cellId, cell) {

		if (turn) { //Checks if X turn or not.
			if (cell.unWritten) { //Checks if cell can be written to.

				cell.innerHTML="x";
				turn=false; //It is now O's turn.
				status("O's turn");
				cell.unWritten=undefined;
				gridx[cellId]=true;
				grido[cellId]=false;
				masterGrid[cellId]=true;
			}

		} else if (cell.unWritten) { //Checks if cell can be written to.

			cell.innerHTML="o";
			turn=true; //It is now X's turn.
			status("X's turn");
			cell.unWritten=undefined;
			grido[cellId]=true;
			gridx[cellId]=false;
			masterGrid[cellId]=true;
		}
	}

	function checkWin (gridToCheck, who) {
		
		var gameOver = false;
		if (gridToCheck[0] === true && gridToCheck[1] === true && gridToCheck[2] === true) {
			
			gameOver = win(who);
			bold([0, 1, 2]);

		} else if (gridToCheck[0] === true && gridToCheck[4] === true && gridToCheck[8] === true) {
				
			gameOver = win(who);
			bold([0, 4, 8]);

		} else if (gridToCheck[0] === true && gridToCheck[3] === true && gridToCheck[6] === true) {

			gameOver = win(who);
			bold([0, 3, 6]);

		} else if (gridToCheck[1] === true && gridToCheck[4] === true && gridToCheck[7] === true) {

			gameOver = win(who);
			bold([1, 4, 7]);

		} else if (gridToCheck[2] === true && gridToCheck[5] === true && gridToCheck[8] === true) {

			gameOver = win(who);
			bold([2, 5, 8]);

		} else if (gridToCheck[6] === true && gridToCheck[4] === true && gridToCheck[2] === true) {

			gameOver = win(who);
			bold([6, 4, 2]);

		} else if (gridToCheck[3] === true && gridToCheck[4] === true && gridToCheck[5] === true) {

			gameOver = win(who);
			bold([3, 4, 5]);

		} else if (gridToCheck[6] === true && gridToCheck[7] === true && gridToCheck[8] === true) {

			gameOver = win(who);
			bold([6, 7, 8]);
		}

		return gameOver;

		function win (who) {

			status(who + " won!");
			writeAll(undefined);
			return true;

		};
	};

	function checkTie (grid) {

		if(grid[0] === true && grid[1] === true && grid[2] === true && grid[3] === true && grid[4] === true && grid[5] === true && grid[6] === true && grid[7] === true && grid[8] === true) { //Checks if board is full

			status("Cat's game!");
			writeAll(undefined);
		}
	};

	function writeAll (bool) {
		for(var i = 0; i<9; i++) {

			document.getElementById(i.toString()).unWritten=bool;
		}
	};

	function bold (toBold) {

		for(var i = 0; i<3; i++) {

			document.getElementById(toBold[i].toString()).classList.add("bold");
		}
	};

	document.getElementById("reset").onclick = function () {

		writeAll(true);
		status("X's turn");
		turn=true;
		gridx=[false, false, false, false, false, false, false, false, false];
		grido=[false, false, false, false, false, false, false, false, false];
		masterGrid=[false, false, false, false, false, false, false, false, false];
		for(var i = 0; i<9; i++) {

			document.getElementById(i.toString()).classList.remove("bold");
		}

		for(var i = 0; i<9; i++) {

			document.getElementById(i.toString()).innerHTML=" - ";
		}
	};

/*

0    1    2
3    4    5
6    7    8


*/