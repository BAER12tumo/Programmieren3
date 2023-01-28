let matrixSize = 50;
let side = 10;

let socket = io();

function main() {

    socket.on("send matrix", drawMatrix);

    socket.on("isRaining", rainHandler);

    let myKillButton = document.getElementById("killButton");
    myKillButton.addEventListener("click", killHandler);
}

function rainHandler(data){
    console.log("Regnet es: ", data);
    isRaining = data;
}

function killHandler(){
    console.log("Kill Button geklickt...");
    // send webSocket Nachricht an Server
    socket.emit("kill", 10)
}

function setup() {

    // initialisierung Spielfeldes
    createCanvas(matrixSize * side + 1, matrixSize * side + 1);
    background('#acacac');

}

function drawMatrix(matrix) {
    // Zeichen des Spielfeldes
    for (let y = 0; y < matrix.length; y++) {
        for (let x = 0; x < matrix[y].length; x++) {
            // farbe festlegen
            if (matrix[y][x] == 0) {
                fill("white");
            } else if (matrix[y][x] == 1) {
                fill("green");
            } else if (matrix[y][x] == 2) {
                fill(247, 255, 28);
            } else if (matrix[y][x] == 3) {
                fill("red");
            } else if (matrix[y][x] == 4) {
                fill("grey");
            } else if (matrix[y][x] == 5) {
                fill(19, 36, 161);
            }
            //zeichne rect
            rect(x * side, y * side, side, side)
        }
    }
}

window.onload = main;

let buttonClick = document.getElementById("addGrazer")