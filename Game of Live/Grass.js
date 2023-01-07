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