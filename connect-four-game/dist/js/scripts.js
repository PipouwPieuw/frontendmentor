// Initialize grid
var gridW = 7;
var gridH = 6;
var grid = Array(gridW).fill([...Array(gridH)]);
var activePlayer = '';

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
	document.querySelectorAll('.grid__col').forEach(item => {
  		item.addEventListener('click', event => {
  			var query = item.querySelectorAll('.grid__cell:not(.grid__cell--filled)');
    		if(!query.length)
    			return
    		var targetCell = query[query.length-1];
    		targetCell.classList.add('grid__cell--filled');
    		targetCell.classList.add('grid__cell--' + activePlayer);
    		changePlayer();
  		})
	});
}

function changePlayer() {
	if(activePlayer != '')
		document.body.classList.remove(activePlayer);
	var newPlayer = ['p2', ''].includes(activePlayer) ? 'p1' : 'p2';
	activePlayer = newPlayer;
	document.body.classList.add(activePlayer);
}