const Grass = require("./Grass");
const Mouse = require("./Mouse");
const Mushroom = require("./Mushroom");
const Carnivore = require("./Carnivore");
const Grazer = require("./Grazer");

// Objekterstellung - Source Programmablauf
matrix = [
    [0, 0, 1, 0, 0],
    [1, 0, 2, 0, 0],
    [0, 1, 0, 2, 0],
    [2, 3, 1, 0, 0],
    [1, 1, 2, 0, 0],
    [1, 1, 0, 2, 0],
    [1, 1, 0, 0, 4]
];


// Array für Lebewesen
grassArr = [];
grazerArr = [];
carnivoreArr = [];
mushroomArr = [];
mouseArr = [];

mausPos = [[20,45], [30,20], [49,1]];
grazerPos = [[12,25], [20, 42], [35, 40], [29, 47]];


// zufällige Matrix erstellen
function getRandomMatrix(cols, rows){
    let matrix = [];
    //erstelle matrix mit zufälligen werten
    for(let y = 0; y < rows; y++){
        let rowArray = [];
        matrix[y] = rowArray;
        for(let x = 0; x < cols; x++){
            let g = Math.floor(Math.random()* 6);
            matrix[y][x] = g;
        }
    }

    // Fleischfresser -- max 60
    for (let i = 0; i <= 30; i++){
        let y = i+6;
        let x = 0
        if(y >= 25){ 
            y = 22;
            x = i-3;
        }
        
        if(x >= 25){ 
            x = 10
        }

        matrix[y][x] = 3;
    }

    // Grasfresser - max 80
    for (let i = 0; i <= 40; i++){
        let y = i*2;
        let x = 0
        if(y >= 25){
           y = 22;
            let x = i +8; 
        } 
        if(x >= 25){
            x = 10
        } 

        matrix[y][x] = 2;
    }

    //Pilz 60
    for(let i = 0; i <= 30; i++){
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
    for(let i = 0; i <= 24; i++){
        let y = i*2;
        let x = i*2;
        matrix[y][x] = 5;
    }
    return matrix;
}

function initGame(){

    matrix = getRandomMatrix(50, 50);

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
}



function updateGame (){
    // Lebewesen
    // welche leeres Nachbarfelder hat jedes Grassobjekt
    console.log(matrix)
    
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
}

initGame();
setInterval(()=>{
    updateGame()
}, 1000);
