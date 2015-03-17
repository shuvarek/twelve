// some consts
var dim = 5;		// how many cols and rows has the table
var nop = 12;		//	nomber of pieces;
var movof = [0, 3, 5, 2];		// moving sequence (0->3->5->2->0) when 'turning'
var movpoz = [0, 1, 3, 5, 6];	// group of moving pieces start from this offset depends on the key pressed
var poskeyx = [1,1,2,3,3];			// positions of the keys representing the group of pieces around it: x,
var poskeyy = [1,3,2,1,3];			// ... and y

// ...and variables
var movpcsx = [0, 0, 0, 0];		// temporary array of pieces which are moving (from positions in the movof array )

// funcions

function refreshpieces() {
	for (var i = 0; i < nop; i++ ) {
		tcs[posx[i]][posy[i]].innerHTML = String.fromCharCode(i+97);
	}
}

function refreshkeys(colorkeys) {	// i. e. colorkeys = '#cc0'; 
 	for ( i = 0; i<5; i++) {
 		tcs[poskeyy[i]][poskeyx[i]].innerHTML = i+1;
 		tcs[poskeyy[i]][poskeyx[i]].style.backgroundColor = colorkeys;
 	}
}

// To be done - moving pieces
function movepics(keyno, direct) {


}

//===========================================================


// array of the pieces (in which column and row they are or the table)
var posx = new Array(nop);
var posy = new Array(nop);
for (var i = 0; i<nop; i++ ) {
	var n = i * 2 + 1;
	var rem = n % dim;
	posx[i] = rem;
	posy[i] = (n - rem) / dim;
}

// tcs is the array of cells in main table
var tcs = Array(dim);
for ( i1 = 0; i1 < dim; i1++) {
	tcs[i1] = Array(dim);
	for ( i2 = 0; i2 < dim; i2++ ) {
		tcs[i1][i2] = document.getElementById("tc"+i1+i2);
	}
}

// show pieces for first time
refreshpieces();

// show keys to turn for the first time:
refreshkeys('#f88');

		
