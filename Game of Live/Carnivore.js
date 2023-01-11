//Fleischfresser
class Carnivore extends LivingCreature{
    
    constructor(x,y){
        super()
        // Vermehrungscounter
        this.counter = 0;
    }

    chooseCell(character){
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
