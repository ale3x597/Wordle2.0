const tiles = document.querySelector(".tiles");
const keyboard = document.querySelector(".keyboard");
const messDisplay = document.querySelector(".message");

let gameOver=false;
let  word;

const getWord =()=>{
  fetch('http://localhost:8000/word')
    .then(response => response.json())
    .then(json=>{
      console.log(json)
      word = json.toUpperCase()
    })
    .catch( error=> console.log(error))
}

getWord();
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
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
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
  if (currentTile < 5 && currentRow < 6) {
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
    console.log('guess', guess);

    if (currentTile>4){
      fetch(`http://localhost:8000/check/?word=${guess}`)
        .then(response => response.json())
        .then(json => {
          console.log(json)
          if (json == 'Entry word not found'){
            showMessage('Word not Found')
            return;
          }else {
            console.log('my guess : '+ guess);
            flip()
            if(word == guess){
                showMessage('awesome!');
                gameOver=true;
                return;
            } else {
                if (currentRow>=5){
                    gameOver=true;
                    showMessage('Game Over!');  //if on last row and click enter, game over;
                    return;
                }
                //if on last tile, goes to next row and sets tile back to 0
                if(currentRow<5){
                    currentRow++;
                    currentTile=0;
                    return;
                }
    
            }
          }
        

        }).catch(error => console.log(error))

      

    }
}
// creates p element inside message class and displays message
const showMessage = (message)=>{
   const messageElement= document.createElement('p');
   messageElement.textContent= message;
   messDisplay.append(messageElement);
   setTimeout(()=> messDisplay.removeChild(messageElement),2000);

}
const addKeyColor =(keyLetter, color) =>{
    const usedKey = document.getElementById(keyLetter);
    usedKey.classList.add(color);
}
const flip =()=>{
    const finalTiles=document.querySelector('#row-'+currentRow).childNodes;
    let checkWord = word;
    const guess = [];

    finalTiles.forEach(tile =>{
        guess.push({letter: tile.getAttribute('data'), color: 'null-guess'})
    })

    guess.forEach((guess,index)=>{
        if (guess.letter == word[index]){
            guess.color = 'correct-guess';
            checkWord = checkWord.replace(guess.letter, '');
        }
    })
    guess.forEach( guess =>{
        if(checkWord.includes(guess.letter)){
            guess.color = 'close-guess';
            checkWord = checkWord.replace(guess.letter, '');
        }
    })

    finalTiles.forEach((tile, index) =>{
        setTimeout(() => {
            tile.classList.add('flip');
            tile.classList.add(guess[index].color);
            addKeyColor(guess[index].letter, guess[index].color);
            
        }, 500 *index)
    })
}
// the code below was the original solution to the method above , its issue was that the same letters would be marked 
// yellow even if it had already been used in the correct spot.
  /*  finalTiles.forEach ((tile, index)=>{
        const submittedTile = tile.getAttribute('data');

       setTimeout (()=>{
           tile.classList.add('flip')
        if(submittedTile==word[index]){
            tile.classList.add('correct-guess');
            addKeyColor(submittedTile, 'correct-guess');
        } else if (word.includes(submittedTile)){
            tile.classList.add('close-guess');
            addKeyColor(submittedTile, 'close-guess');
        }else {
            tile.classList.add('null-guess');
            addKeyColor(submittedTile, 'null-guess');
        }
       },500 *index)
    })*/

