// Superklasse
class LivingCreature{

    // erzeuge Objekte
    constructor(x, y){
        // eigenschaften
        // farbe 
        // position
        this.x = x;
        this.y = y;
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

    chooseCell(character){
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
    
}

