const tiles = document.querySelector(".tiles");
const keyboard = document.querySelector(".keyboard");

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
const handleClick = () =>{
    console.log('clicked');
}
keys.forEach((key) => {
  const button = document.createElement("button");
  button.textContent = key;
  button.setAttribute("id", key);
  button.addEventListener("click", handleClick);
  keyboard.append(button);
});

const rows=[
    ['','','','',''],
    ['','','','',''],
    ['','','','',''],
    ['','','','',''],
    ['','','','',''],
    ['','','','','']
]
rows.forEach((tile, rowIndex) =>{
    const rowElement =document.createElement('div');
    rowElement.setAttribute('id','row-'+ rowIndex);
    tile.forEach((guess,guessIndex)=>{
        const tileElement = document.createElement('div');
        tileElement.setAttribute('id','row-'+ rowIndex +'-tile-'+guessIndex);
        rowElement.append(tileElement);
    })


    tiles.append(rowElement)
})
