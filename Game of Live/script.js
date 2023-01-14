const LivingCreature = require("./LivingCreature");
const Grass = require("./Grass");
const Mouse = require("./Mouse");
const Mushroom = require("./Mushroom");
const Carnivore = require("./Carnivore");
const Grazer = require("./Grazer")

// Objekterstellung - Source Programmablauf
let matrix = [
    [0, 0, 1, 0, 0],
    [1, 0, 2, 0, 0],
    [0, 1, 0, 2, 0],
    [2, 3, 1, 0, 0],
    [1, 1, 2, 0, 0],
    [1, 1, 0, 2, 0],
    [1, 1, 0, 0, 4]
];

let side = 10;
let fr = 5;

// Array für Lebewesen
let grassArr = [];
let grazerArr = [];
let carnivoreArr = [];
let mushroomArr = [];
let mouseArr = [];

let mausPos = [[20,45], [30,20], [49,1]];
let grazerPos = [[13,50], [20, 42], [70, 80], [29, 47]];

// zufällige Matrix erstellen
function getRandomMatrix(cols, rows){
    let matrix = [];
    //erstelle matrix mit zufälligen werten
    for(let y = 0; y < rows; y++){
        let rowArray = [];
        matrix[y] = rowArray;
        for(let x = 0; x < cols; x++){
            let g = random(0,1);
            g = Math.round(g);
            matrix[y][x] = g;
        }
    }

    // Fleischfresser -- max 60
    for (let i = 0; i <= 60; i++){
        let y = i+13;
        if(y >= 50) y = 43;
        let x = i-3;
        if(x >= 50) x = 20

        matrix[y][x] = 3;
    }

    // Grasfresser - max 80
    for (let i = 0; i <= 80; i++){
        let y = i*2;
        if(y >= 50) y = 43;
        let x = i +16;
        if(x >= 50) x = 20

        matrix[y][x] = 2;
    }

    //Pilz 60
    for(let i = 0; i <= 60; i++){
        let y = i;
        let x = i;
        matrix[y][x] = 4;
    }

    // Grasfresser
    for(let i in grazerPos){
        let pos = grazerPos[i];
        let x = pos[0];
        let y = pos[1];
        matrix[y][x] = 2;
    }
    // Maus
    for(let i in mausPos){
        let pos = mausPos[i];
        let x = pos[0];
        let y = pos[1];
        matrix[y][x] = 5;
    }

    // Maus - max 48
    for(let i = 0; i <= 48; i++){
        let y = i*2;
        let x = i*2;
        matrix[y][x] = 5;
    }
    return matrix;
}


function setup(){

    frameRate(fr);

    matrix = getRandomMatrix(100, 100);

    // initialisierung Spielfeldes
    createCanvas(matrix[0].length * side +1, matrix.length * side +1);
    background('#acacac');

    
    // Test - ein Grassobjekt erzeugen
    // let grassObj1 = new Grass(0, 1);
    // let emptyFields = grassObj1.chooseField(0);
    // console.log(emptyFields);

    // Test - ein Grassfresser (Grazer) erzeugen
    // let grazerObj = new Grazer(2,1);
    // let grassFields = grazerObj.chooseCell(1);
    // console.log(grassFields)

    // matrix - für ein Grassobjekt

    for(let y = 0; y < matrix.length; y++){
        for(let x = 0; x < matrix[y].length; x++){
        if(matrix[y][x] == 1){
            let grassObj = new Grass(x,y);
            grassArr.push(grassObj);
        }else if(matrix[y][x] == 2){
            let grazerObj = new Grazer(x,y);
            grazerArr.push(grazerObj);
        }else if(matrix[y][x] == 3){
            let carnivoreObj = new Carnivore(x,y);
            carnivoreArr.push(carnivoreObj);
        }else if(matrix[y][x] == 4){
            let mushroomObj = new Mushroom(x,y);
            mushroomArr.push(mushroomObj);
        }else if(matrix[y][x] == 5){
            let mouseObj = new Mouse(x,y);
            mouseArr.push(mouseObj);
        }
        }
    }

    // console.log(grassArr.length);
}

function draw(){

    // Lebewesen
    // welche leeres Nachbarfelder hat jedes Grassobjekt
    for(let i in grassArr){
        let grassObj = grassArr[i];
        grassObj.mul();
    }

    for(let i in grazerArr){
        let grazerObj = grazerArr[i];
        grazerObj.eat();
    }

    for(let i in carnivoreArr){
        let carnivoreObj = carnivoreArr[i];
        carnivoreObj.eat();
    }

    for(let i in mushroomArr){
        let mushroomObj = mushroomArr[i];
        mushroomObj.round();
    }

    for(let i in mouseArr){
        let mouseObj = mouseArr[i];
        mouseObj.eat();
    }

    // Zeichen des Spielfeldes
    for(let y = 0; y < matrix.length; y++){
        for(let x = 0; x < matrix[y].length; x++ ){
            // farbe festlegen
            if(matrix[y][x] == 0){
                fill("white");
            }else if(matrix[y][x] == 1){
                fill("green");
            }else if(matrix[y][x] == 2){
                fill(247, 255, 28);
            }else if(matrix[y][x] == 3){
                fill("red");
            }else if(matrix[y][x] == 4){
                fill("grey");
            }else if(matrix[y][x] == 5){
                fill(19,36,161);
            }
            //zeichne rect
            rect(x * side, y * side, side, side)
        }
    }
}