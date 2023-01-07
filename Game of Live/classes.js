// Klassen

//Gras
class Grass{
    // erzeuge Objekte
    constructor(x, y){
        // eigenschaften
        // farbe 
        // position
        this.x = x;
        this.y = y;
        // rundenzähler
        this.multiply = 0;
        // sicht auf die nachbarfelder
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

    // Verhalten - Methoden
    chooseField(character){
        let found = [];
        // Liste mit allen leeren Nachbarfelder
        for(let i in this.directions){
            // hole die Position
            let pos = this.directions[i];
            let x = pos[0];
            let y = pos[1];
            // Überprüfe die spielfeldgrenzen
            if(x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length){
                // schau in spielfeld matrix nach ob dort eine 0 gespeichert
                if(matrix[y][x] == character){
                    // leeres nachbarfeld gefunden
                    found.push(pos);
                }
            }
        }

        return found;
    }

    mul(){
        this.multiply++;
        // Logik Vermehrung
        if(this.multiply > 5){
            // jetzt darf sich vermehrt werden
            // gibt es leere nachbarfelder - chooseField(0)
            let emptyFields = this.chooseField(0);
            // console.log(emptyFields)
            // wenn das Arry nicht leer ist
            if(emptyFields.length > 0){
                // dann zufällige Position eines NB-Field aus der Liste 
                let theChoosenField = random(emptyFields);
                //[x,y]
                let newX = theChoosenField[0];
                let newY = theChoosenField[1];
                // dann gras-Objekt erstellen
                let grassObj = new Grass(newX, newY);
                // Grass-Objekt der Liste mit vorhandene grasObjekten hinzufügen
                grassArr.push(grassObj);
                // Spielfeld aktualisieren
                matrix[newY][newX] = 1;
            }
            // reset rundenzähler
            this.multiply = 0;
        }
    }
}




//Grasfresser
class Grazer{

    constructor(x,y){
        // Position
        this.x = x;
        this.y = y;
        // Vermehrungszähler
        this.counter = 0;
        // energie
        this.energy = 5;
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

    chooseCell(character){
        // aktualiesiere meine Nachbarfelder
        this.newDirections();
        let found = [];
        // Liste mit allen leeren Nachbarfelder
        for(let i in this.directions){
            // hole die Position
            let pos = this.directions[i];
            let x = pos[0];
            let y = pos[1];
            // Überprüfe die spielfeldgrenzen
            if(x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length){
                // schau in spielfeld matrix nach ob dort eine 0 gespeichert
                if(matrix[y][x] == character){
                    // leeres nachbarfeld gefunden
                    found.push(pos);
                }
            }
        }
        return found;
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
            let theChoosenField = random(grassFields);
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
            let theChoosenField = random(emptyFields);
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
            let theChoosenField = random(emptyFields);
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






//Fleischfresser
class Carnivore{
    
    constructor(x,y){
        // Position
        this.x = x;
        this.y = y;
        // Vermehrungscounter
        this.counter = 0;
        // energie
        this.energy = 40;
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

    chooseCell(character){
        // aktualiesiere meine Nachbarfelder
        this.newDirections();
        let found = [];
        // Liste mit allen leeren Nachbarfelder
        for(let i in this.directions){
            // hole die Position
            let pos = this.directions[i];
            let x = pos[0];
            let y = pos[1];
            // Überprüfe die spielfeldgrenzen
            if(x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length){
                // schau in spielfeld matrix nach ob dort eine 0 gespeichert
                if(matrix[y][x] == character){
                    // leeres nachbarfeld gefunden
                    found.push(pos);
                }
            }
        }
        return found;
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
        
        let grazerFields = this.chooseCell(2);
        if(grazerFields.length > 0){
            let theChoosenField = random(grazerFields);
            let newX = theChoosenField[0];
            let newY = theChoosenField[1];

            matrix[newY][newX] = 3;

            matrix[this.y][this.x] = 0;

            this.x = newX;
            this.y = newY;
            // spielfeld aktualisieren mit der neuen Position
            

            // Entferne aus dem Gras-Array entfernen
            for(let i in grazerArr){
                let grazerObj = grazerArr[i];
                if(grazerObj.x == newX && grazerObj.y == newY){
                    // lösche grassObj
                    grazerArr.splice(i, 1);
                    break;
                }
            }
            this.counter++;
            this.energy = 40;   
        }else{
            this.energy--;
            this.move();
            this.counter = 0;
        }
        if(this.counter >= 2){
            this.mul();
            this.counter = 0;
        }

    }

    move(){
        let emptyFields = this.chooseCell(0);
        if(emptyFields.length > 0){
            let theChoosenField = random(emptyFields);
            let newX = theChoosenField[0];
            let newY = theChoosenField[1];
            // spielfeld aktualisieren mit der neuen Position
            matrix[newY][newX] = 3;  
            // alte Position
            matrix[this.y][this.x] = 0;
            // die Neue Position
            this.x = newX;
            this.y = newY;
            
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
        for(let i in carnivoreArr){
            let carnivore = carnivoreArr[i];
            if(carnivore.x == this.x && carnivore.y == this.y){
            // gefunden - nun löschen
            carnivoreArr.splice(i, 1);
            break;
            }
        }
    }

    mul(){
        let emptyField = this.chooseCell(0);
        if(emptyField.length > 0){
            let ChoosenField = random(emptyField);
            let newX = ChoosenField[0];
            let newY = ChoosenField[1];
            // die Neue Position
            let carnivoreObj = new Carnivore(newX,newY);
            carnivoreArr.push(carnivoreObj);
            // spielfeld aktualisieren mit der neuen Position
            matrix[newY][newX] = 3;  
                 
        }
    }
}







// Pilze
class Mushroom{
    constructor(x,y){
        // Position
        this.x = x;
        this.y = y;
        // Vermehrungscounter
        this.counter = 0;
        this.directions = [];
    }

    newDirections(){
        for(let y = 0; y < matrix.length; y++){
            for(let x = 0; x < matrix[y].length; x++){
                if(matrix[y][x] == 0){
                    let pos = [x, y];
                    this.directions.push(pos);
                }
            }
        }
    }

    round(){
        this.counter++;
        if(this.counter >= 5){
            this.mul();
            this.counter = 0;
        }
    }

    mul(){
        this.newDirections();
        if(this.directions.length > 0){
            let chooseField = random(this.directions);
            let newX = chooseField[0];
            let newY = chooseField[1];
            // die Neue Position
            let mushroomObj = new Mushroom(newX,newY);
            mushroomArr.push(mushroomObj);
            // spielfeld aktualisieren mit der neuen Position
            matrix[newY][newX] = 4;  
        }
    }

}










class Mouse{
    constructor(x,y){
        // Position
        this.x = x;
        this.y = y;
        // Vermehrungscounter
        this.counter = 0;
        // energie
        this.energy = 20;
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

    chooseCell(character){
        // aktualiesiere meine Nachbarfelder
        this.newDirections();
        let found = [];
        // Liste mit allen leeren Nachbarfelder
        for(let i in this.directions){
            // hole die Position
            let pos = this.directions[i];
            let x = pos[0];
            let y = pos[1];
            // Überprüfe die spielfeldgrenzen
            if(x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length){
                // schau in spielfeld matrix nach ob dort eine 0 gespeichert
                if(matrix[y][x] == character){
                    // leeres nachbarfeld gefunden
                    found.push(pos);
                }
            }
        }
        return found;
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
        
        let mushroomFields = this.chooseCell(4);
        if(mushroomFields.length > 0){
            let theChoosenField = random(mushroomFields);
            let newX = theChoosenField[0];
            let newY = theChoosenField[1];

            matrix[newY][newX] = 5;

            matrix[this.y][this.x] = 0;

            this.x = newX;
            this.y = newY;
            // spielfeld aktualisieren mit der neuen Position
            

            // Entferne aus dem Mushroom-Array entfernen
            for(let i in mushroomArr){
                let mushroomObj = mushroomArr[i];
                if(mushroomObj.x == newX && mushroomObj.y == newY){
                    // lösche grassObj
                    grazerArr.splice(i, 1);
                    break;
                }
            }
            this.counter++;
            this.energy = 20;   
        }else{
            this.energy--;
            this.move();
            this.counter = 0;
        }
        if(this.counter >= 4){
            this.mul();
            this.counter = 0;
        }

    }

    move(){
        let emptyFields = this.chooseCell(0);
        if(emptyFields.length > 0){
            let theChoosenField = random(emptyFields);
            let newX = theChoosenField[0];
            let newY = theChoosenField[1];
            // spielfeld aktualisieren mit der neuen Position
            matrix[newY][newX] = 5;  
            // alte Position
            matrix[this.y][this.x] = 0;
            // die Neue Position
            this.x = newX;
            this.y = newY;
            
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
        for(let i in mushroomArr){
            let mushroom = mushroomArr[i];
            if(mushroom.x == this.x && mushroom.y == this.y){
            // gefunden - nun löschen
            mushroomArr.splice(i, 1);
            break;
            }
        }
    }

    mul(){
        let emptyField = this.chooseCell(0);
        if(emptyField.length > 0){
            let ChoosenField = random(emptyField);
            let newX = ChoosenField[0];
            let newY = ChoosenField[1];
            // die Neue Position
            let mouseObj = new Mouse(newX,newY);
            mouseArr.push(mouseObj);
            // spielfeld aktualisieren mit der neuen Position
            matrix[newY][newX] = 5;  
                 
        }
    }

}