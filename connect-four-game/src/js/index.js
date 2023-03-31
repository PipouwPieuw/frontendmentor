// Initialize grid
var gridW = 7;
var gridH = 6;
//var grid = new Array(gridW).fill([...Array(gridH)]);
var grid = [...new Array(gridW)].map(elem => new Array(gridH))
var activePlayer = '';
var defaultTimer = 30;
var currentTimer = defaultTimer;
var countdown;
var stopTimer = false;

window.onload=function(){
	// Initialize HTML grid
	var gridElem = document.getElementById('grid');
	for(let i=0; i<gridW; i++) {
		// Create cols
		var gridCol = document.createElement('span');
		gridCol.classList.add('grid__col');
		gridCol.setAttribute('data-index', i);
		// Create cells
		for(let i=0; i<gridH; i++) {
			var gridCell = document.createElement('span');
			gridCell.classList.add('grid__cell');
			gridCell.setAttribute('data-index', i);
			gridCol.appendChild(gridCell);
		}
		gridElem.appendChild(gridCol);
	}

	// Initialize game
	changePlayer();

	// Click event
	document.querySelectorAll('.grid__col').forEach(gridCol => {
  		gridCol.addEventListener('click', event => {
  			// Return if column is filled
  			if(gridCol.classList.contains('grid__col--filled'))
  				return false;
  			// Stop timer
  			stopTimer = true;
  			// Prevent click actions on grid
  			document.body.style.pointerEvents = 'none';
  			// Get column index
  			var colIndex = parseInt(gridCol.getAttribute('data-index'));
  			// Get bottom empty cell
  			var query = gridCol.querySelectorAll('.grid__cell:not(.grid__cell--filled)');
    		var targetCell = query[query.length-1];
    		// Create animation
    		var token = document.createElement('span');
    		token.classList.add('grid__token');
    		token.classList.add('grid__token--' + activePlayer);
    		var cellSize = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--cell-size'));
    		var cellIndex = parseInt(targetCell.getAttribute('data-index'));
    		var speed = Math.max((cellIndex + 1) * 40, 100);
    		token.style.transitionDuration = speed + 'ms';
    		gridCol.appendChild(token);
    		sleep(200)
    			.then(() => token.style.top = cellSize * cellIndex + 'px')
    			.then(() => sleep(speed))
    			.then(() => {
    				// Fill cell
		    		targetCell.classList.add('grid__cell--filled');
		    		targetCell.classList.add('grid__cell--' + activePlayer);
		    		// Remove token
		    		gridCol.removeChild(token);
		    		// If last cell, set column as filled
		    		if(cellIndex == 0)
		    			gridCol.classList.add('grid__col--filled');		    		
    			})
    			.then(() => sleep(100))
    			.then(() => {
    				// Update grid array
    				grid[colIndex][cellIndex] = activePlayer;
    				if(checkVictory(activePlayer, colIndex, cellIndex)) {
    					console.log("VICTORY");
    				}
    				else {
			    		// Change player turn
			    		changePlayer();
			  			// Reset click actions on grid
			  			document.body.style.pointerEvents = 'all';
			  		}
    			});
  		})
	});
}

function changePlayer(player = '') {
	if(player == '')
		player = getNewPlayer();
	activePlayer = player;
	document.body.setAttribute('data-player', activePlayer);
	// Launch timer
	launchTimer();
}

function getNewPlayer() {
	return ['p2', ''].includes(activePlayer) ? 'p1' : 'p2';
}

function sleep(ms) {
  	return new Promise(resolve => setTimeout(resolve, ms));
}

function launchTimer() {	
	clearInterval(countdown);
	var timerElem = document.getElementById('countdown');
	currentTimer = defaultTimer;
	timerElem.innerHTML = currentTimer;
	stopTimer = false;
	countdown = setInterval(() => {
		if(currentTimer == 0 || stopTimer) {
			clearInterval(countdown);
		}
		else {
			currentTimer--;
			timerElem.innerHTML = currentTimer;
		}
	}, 1000);	
}

function checkVictory(player, col, cell) {
	var currentCells = [[col, cell]];
	var processLoop = true;
	var counter = col;

	// Check line before
	while(processLoop) {
		counter -= 1;
		if(counter < 0 || grid[counter][cell] != player)
			processLoop = false;
		else
			currentCells.push([counter, cell]);
	}
	// Check line after
	counter = col;
	processLoop = true;
	while(processLoop) {
		counter += 1;
		if(counter >= gridW || grid[counter][cell] != player)
			processLoop = false;
		else
			currentCells.push([counter, cell]);
	}
	if(currentCells.length >= 4)
		return markVictory(currentCells);

	// Check column	
	currentCells = [[col, cell]];
	counter = cell;
	processLoop = true;
	while(processLoop) {
		counter += 1;
		if(counter >= gridH || grid[col][counter] != player)
			processLoop = false;
		else
			currentCells.push([col, counter]);
	}
	if(currentCells.length >= 4)
		return markVictory(currentCells);

	// Check diagonals
	// Bottom left to top right
	currentCells = [[col, cell]];
	currentCol = col;
	currentCell = cell;
	processLoop = true;
	// Check diagonal before
	while(processLoop) {
		currentCol -= 1;
		currentCell += 1;
		if(currentCol < 0 || currentCell >= gridH || grid[currentCol][currentCell] != player)
			processLoop = false;
		else
			currentCells.push([currentCol, currentCell]);
	}
	// Check diagonal after
	currentCol = col;
	currentCell = cell;
	processLoop = true;
	while(processLoop) {
		currentCol += 1;
		currentCell -= 1;
		if(currentCol >= gridW || currentCell < 0 || grid[currentCol][currentCell] != player)
			processLoop = false;
		else
			currentCells.push([currentCol, currentCell]);
	}
	if(currentCells.length >= 4)
		return markVictory(currentCells);

	// Top left to bottom right
	currentCells = [[col, cell]];
	currentCol = col;
	currentCell = cell;
	processLoop = true;
	// Check diagonal before
	while(processLoop) {
		currentCol -= 1;
		currentCell -= 1;
		if(currentCol < 0 || currentCell < 0 || grid[currentCol][currentCell] != player)
			processLoop = false;
		else
			currentCells.push([currentCol, currentCell]);
	}
	// Check diagonal after
	currentCol = col;
	currentCell = cell;
	processLoop = true;
	while(processLoop) {
		currentCol += 1;
		currentCell += 1;
		if(currentCol >= gridW || currentCell >= gridH || grid[currentCol][currentCell] != player)
			processLoop = false;
		else
			currentCells.push([currentCol, currentCell]);
	}
	if(currentCells.length >= 4)
		return markVictory(currentCells);

	// Return false if no victory condition is met
	return false;
}

function markVictory(cells) {
	for(index in cells) {
		var [col, cell] = cells[index];
		document.querySelector('.grid__col[data-index="' + col + '"] .grid__cell[data-index="' + cell + '"]').classList.add('grid__cell--victory');
	}
	return true;
}