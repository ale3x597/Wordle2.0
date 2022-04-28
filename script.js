const tiles = document.querySelector(".tiles");
const keyboard = document.querySelector(".keyboard");
const word = "TEARS";

const keys = [
  "Q",
  "W",
  "E",
  "R",
  "T",
  "Y",
  "U",
  "I",
  "O",
  "P",
  "A",
  "S",
  "D",
  "F",
  "G",
  "H",
  "J",
  "K",
  "L",
  "ENTER",
  "Z",
  "X",
  "C",
  "V",
  "B",
  "N",
  "M",
  "«",
];

//this loop handles making a keyboard. adds a button for each key in the keys array, and adds an event listener for when clicked.
keys.forEach((key) => {
  const button = document.createElement("button");
  button.textContent = key;
  button.setAttribute("id", key);
  button.addEventListener("click", () => handleClick(key)); //avoids calling function straight away
  keyboard.append(button);
});

const rows = [
  ["", "", ""],
  ["", "", ""],
  ["", "", ""],
  ["", "", ""],
  ["", "", ""],
  ["", "", ""],
];
// 2 loops, firsg creates a div for each row, second creates a id for each tile
rows.forEach((row, rowIndex) => {
  const rowElement = document.createElement("div");
  rowElement.setAttribute("id", "row-" + rowIndex);
  row.forEach((guess, guessIndex) => {
    const tileElement = document.createElement("div");
    tileElement.setAttribute("id", "row-" + rowIndex + "-tile-" + guessIndex);
    tileElement.classList.add("tile");
    rowElement.append(tileElement);
  });
  tiles.append(rowElement);
});
//if clicked key gets passed through to function letters
const handleClick = (key) => {
  console.log("clicked", key);
  
  if (key === "«") {
    letterDelete();
    console.log("rows", rows);
    return;
  }
  if (key === "ENTER") {
    guessCheck();
    console.log("rows", rows);
    return;
  }
  letters(key);
  console.log("rows", rows);
};

let currentTile = 0;
let currentRow = 0;
//finds tile needed to add letter
const letters = (key) => {
  if (currentTile < 3 && currentRow < 6) {
    const tile = document.getElementById(
      "row-" + currentRow + "-tile-" + currentTile
    );
    tile.textContent = key;
    rows[currentRow][currentTile] = key;
    tile.setAttribute("data", key); //for when we start adding color;
    currentTile++;
    
  }
};
//function to delete letter
const letterDelete =() =>{
    if (currentTile>0){
        currentTile--;
        const tile = document.getElementById( "row-" + currentRow + "-tile-" + currentTile);
        tile.textContent='';
        rows[currentRow][currentTile] = '';
        tile.setAttribute("data", '');
    }
}

const guessCheck =() =>{
    const guess=  rows[currentRow].join('');
    if (currentTile===5){
        console.log('my guess : '+ guess, ' word is '+ word);
        if(word == guess){
            showMessage('awesome!');
        }

    }
}

const showMessage = (message)=>{
   const messageElement= document.createElement('p')
}
