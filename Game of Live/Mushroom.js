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