class Mouse extends LivingCreature{
    constructor(x,y){
        super(x,y)
        // Vermehrungscounter
        this.counter = 0;
        // energie
        this.energy = 20;
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