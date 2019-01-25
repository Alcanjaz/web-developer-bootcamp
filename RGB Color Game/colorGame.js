const colors = [
    "rgb(255, 0, 0)",
    "rgb(255, 255, 0)",
    "rgb(0, 255, 0)",
    "rgb(0, 255, 255)",
    "rgb(0, 0, 255)",
    "rgb(255, 0, 255)",
];

const squares = document.querySelectorAll(".square");
const pickedColor = colors[3];
const colorDisplay = document.getElementById("colorDisplay");

colorDisplay.textContent = pickedColor.toUpperCase();

squares.forEach((square, iterator) => {
    //Add initial colors to squares
    square.style.backgroundColor = colors[iterator];

    //Add click listeners to squares
    square.addEventListener('click', ()=> {
        //grab color of clicked square
        const clickedColor = square.style.backgroundColor;
        if(clickedColor === pickedColor){
            alert('CORRECT!');
        } else {
            alert('try again');
        }
    });
});