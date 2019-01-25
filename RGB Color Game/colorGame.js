const colors = [
    "rgb(255, 0, 0)",
    "rgb(255, 255, 0)",
    "rgb(0, 255, 0)",
    "rgb(0, 255, 255)",
    "rgb(0, 0, 255)",
    "rgb(255, 0, 255)",
];

const squares = document.querySelectorAll(".square");
const pickedColor = pickColor();
const colorDisplay = document.getElementById("colorDisplay");
const messageDislay = document.querySelector("#message");

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
            changeColors(clickedColor);
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