// some consts
var dim = 5;		// how many cols and rows has the table
var nop = 12;		//	nomber of pieces;
var movof = [0, 3, 5, 2];		// moving sequence (0->3->5->2->0) when 'turning'
var movpoz = [0, 1, 3, 5, 6];	// group of moving pieces start from this offset depends on the key pressed
var poskeyx = [1,1,2,3,3];			// positions of the keys representing the group of pieces around it: x,
var poskeyy = [1,3,2,1,3];			// ... and y

// ...and variables

// array of pieces - which number is in any (+96 gives a letter)
var piece = [0,1,2,3,4,5,6,7,8,9,10,11];
var pieceoffset = [0,1,3,5,6];	// offset of turning pieces depends on which key is pressed 
											// not used as it is not made in loop now (in movepieces)
											
// array of the pieces (in which column and row they are or the table)
var posx = new Array(nop);
var posy = new Array(nop);
for (var i = 0; i<nop; i++ ) {
	var n = i * 2 + 1;
	var rem = n % dim;
	posx[i] = rem;
	posy[i] = (n - rem) / dim;
}


//*************
// this values are dependable of the rendered page.
//*************

var maintitle = document.getElementById("maintitle");
var myfooter = document.getElementById("myfooter");

// tcs is the array of cells in main table
var tcs = Array(dim);
for ( i1 = 0; i1 < dim; i1++) {
	tcs[i1] = Array(dim);
	for ( i2 = 0; i2 < dim; i2++ ) {
		tcs[i1][i2] = document.getElementById("tc"+i1+i2);
	}
}


//*************
// funcions
//*************

function refreshpieces() {
	for (var i = 0; i < nop; i++ ) {
		tcs[posx[i]][posy[i]].innerHTML = String.fromCharCode(piece[i]+97);
	}
}

function refreshkeys(colorkeys) {	// i. e. colorkeys = '#cc0'; 
 	for (var i = 0; i<5; i++) {
 		tcs[poskeyy[i]][poskeyx[i]].innerHTML = i+1;
 		tcs[poskeyy[i]][poskeyx[i]].style.backgroundColor = colorkeys;
 	}
}

function resetpieces() {
	for (var i = 0; i<nop; i++) {
		piece[i] = i;
	}
}

// moving pieces - main part of the game
function movepics(num, direct) {	// num is the key - 1 (so 0 is for the key 1)
	var whichtcs = tcs[poskeyy[num]][poskeyx[num]];
	if(direct) {	
		whichtcs.style.backgroundColor = "#88f";
		//[0, 3, 5, 2]		
		var tmp = piece[0+pieceoffset[num]];
		piece[0+pieceoffset[num]] = piece[3+pieceoffset[num]];
		piece[3+pieceoffset[num]] = piece[5+pieceoffset[num]];
		piece[5+pieceoffset[num]] = piece[2+pieceoffset[num]];
		piece[2+pieceoffset[num]] = tmp;
			
	} else {
		whichtcs.style.backgroundColor = "#8f8";
		var tmp = piece[0+pieceoffset[num]];
		piece[0+pieceoffset[num]] = piece[2+pieceoffset[num]];
		piece[2+pieceoffset[num]] = piece[5+pieceoffset[num]];
		piece[5+pieceoffset[num]] = piece[3+pieceoffset[num]];
		piece[3+pieceoffset[num]] = tmp;
	
	}
	refreshpieces();
	whichtcs.style.backgroundColor = "#f88";
}

function mykeydown(e) {
	var keycode = e.keyCode;
	var keychar = String.fromCharCode(keycode);
	
	var num = keycode - 49;	// num would be from 0 - 4 (so the key is one value bigger, but this is better for index)
	if (( num >= 0 && num <= 4))  movepics(num, e.shiftKey);
}


//===========================================================
// Main Programm
//===========================================================

// show pieces for first time
refreshpieces();

// show keys to turn for the first time:
refreshkeys('#f88');

window.addEventListener("keydown", mykeydown, false);
		
