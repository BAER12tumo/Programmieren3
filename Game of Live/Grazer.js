//Grasfresser
const LivingCreature = require("./LivingCreature");
module.exports = class Grazer extends LivingCreature{

    constructor(x,y){
        super(x,y)
        // Vermehrungszähler
        this.counter = 0;
        // energie
        this.energy = 5;
    }

    chooseCell(character){
        // aktualiesiere meine Nachbarfelder
        this.newDirections();
        return super.chooseCell(character);
    }

    newDirections(){
        this.directions = [
            [this.x - 1 , this.y - 1],
            [this.x     , this.y - 1],
            [this.x + 1 , this.y - 1],
            [this.x - 1 , this.y    ],
            [this.x + 1 , this.y    ],
            [this.x - 1 , this.y + 1],
            [this.x     , this.y + 1],
            [this.x + 1 , this.y + 1]
        ];
    }
    eat(){
        
        let grassFields = this.chooseCell(1);
        if(grassFields.length > 0){
            let theChoosenField = grassFields[Math.floor(Math.random() * grassFields.length)];
            let newX = theChoosenField[0];
            let newY = theChoosenField[1];
            // alte Position
            matrix[this.y][this.x] = 0;
            // die Neue Position
            this.x = newX;
            this.y = newY;
            // spielfeld aktualisieren mit der neuen Position
            matrix[newY][newX] = 2;

            // Entferne aus dem Gras-Array entfernen
            for(let i in grassArr){
                let grassObj = grassArr[i];
                if(grassObj.x == newX && grassObj.y == newY){
                    // lösche grassObj
                    grassArr.splice(i, 1);
                    break;
                }
            }
            this.energy = 5;   
            this.counter++;
        }else{
            this.energy--;
            this.counter = 0;
            this.move();
        }
        if(this.counter >= 5){
            this.mul();
            this.counter = 0;
        }
    }
    move(){
        let emptyFields = this.chooseCell(0);
        if(emptyFields.length > 0){
            let theChoosenField = emptyFields[Math.floor(Math.random() * emptyFields.length)];
            let newX = theChoosenField[0];
            let newY = theChoosenField[1];
            // alte Position
            matrix[this.y][this.x] = 0;
            // die Neue Position
            this.x = newX;
            this.y = newY;
            // spielfeld aktualisieren mit der neuen Position
            matrix[newY][newX] = 2;  
                 
        }
        // wenn keine Energie vorhanden - stirbt
        if(this.energy <= 0){
            this.die();
        }
    }

    

    die(){
        // Spielfeld aktualisieren - Wert 0
        matrix[this.y][this.x] = 0;
        // Grassfresser Liste aktualisieren - gelöscht
        // wir suchen in der Grassfresser List e in Objekt mit gleich x
        for(let i in grazerArr){
            let grazer = grazerArr[i];
            if(grazer.x == this.x && grazer.y == this.y){
            // gefunden - nun löschen
            grazerArr.splice(i, 1);
            break;
            }
        }
    }

    mul(){
        let emptyFields = this.chooseCell(0);
        if(emptyFields.length > 0){
            let theChoosenField = emptyFields[Math.floor(Math.random() * emptyFields.length)];
            let newX = theChoosenField[0];
            let newY = theChoosenField[1];
            // die Neue Position
            let grazerObj = new Grazer(newX,newY);
            grazerArr.push(grazerObj);
            // spielfeld aktualisieren mit der neuen Position
            matrix[newY][newX] = 2;  
                 
        }
    }

    
}