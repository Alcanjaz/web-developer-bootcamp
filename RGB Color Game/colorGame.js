let colors = generateRandomColors(6);
let pickedColor = pickColor();


const squares = document.querySelectorAll(".square");
const colorDisplay = document.getElementById("colorDisplay");
const messageDislay = document.querySelector("#message");
const h1 = document.querySelector("h1");
const resetButton = document.querySelector("#reset");

resetButton.addEventListener('click', ()=> {
    //generate all new colors
    colors = generateRandomColors(6);

    //pick a new color from the array
    pickedColor = pickColor();

    //change colorDisplay to match picked Color
    colorDisplay.textContent = pickedColor;

    //change color of squares
    squares.forEach((square, iterator) => square.style.backgroundColor = colors[iterator]);

   //Reset Properties
   resetButton.textContent = "New colors";
   h1.style.backgroundColor = "#232323"

});

colorDisplay.textContent = pickedColor.toUpperCase();

squares.forEach((square, iterator) => {
    //Add initial colors to squares
    square.style.backgroundColor = colors[iterator];

    //Add click listeners to squares
    square.addEventListener('click', ()=> {
        //grab color of clicked square
        const clickedColor = square.style.backgroundColor;
        if(clickedColor === pickedColor){
            messageDislay.textContent = "Correct!";
            resetButton.textContent = "Try Again?"
            changeColors(clickedColor);
            h1.style.backgroundColor = clickedColor;
        } else {
            square.style.backgroundColor = "#232323";
            messageDislay.textContent = "Try Again";
        }
    });
});

function changeColors(color) {
    //Loop through all squares and change each color to match given color
    squares.forEach((el, i) => squares[i].style.backgroundColor = color);
}

function pickColor(){
    const random = Math.floor(Math.random() * colors.length);
    return colors[random];
}

function generateRandomColors(num){
    //make the colors array
    const colorArr = [];
    //repeat num times
    for(let i = 0; i < num; i++){
        //generate the color and push it to array
        colorArr.push(randomColor());
    }    

    return colorArr;
}

function randomColor(){
    const r = Math.floor(Math.random() * 256); //red
    const g = Math.floor(Math.random() * 256); //green
    const b = Math.floor(Math.random() * 256); //blue
    return `rgb(${r}, ${g}, ${b})`;
}