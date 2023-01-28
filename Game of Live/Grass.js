//Gras
const LivingCreature = require("./LivingCreature");
module.exports = class Grass extends LivingCreature{
    // erzeuge Objekte
    constructor(x, y){
        super(x,y)
        // rundenzähler
        this.multiply = 0;
    }

    // Verhalten - Methoden

    mul(){
        this.multiply++;
        // Logik Vermehrung
        if(this.multiply > 4){
            // jetzt darf sich vermehrt werden
            
            // gibt es leere nachbarfelder - chooseField(0)
            let emptyFields = this.chooseCell(0);
            // console.log(emptyFields)
            // wenn das Arry nicht leer ist
            if(emptyFields.length > 0){
                // dann zufällige Position eines NB-Field aus der Liste 
                let theChoosenField = emptyFields[Math.floor(Math.random() * emptyFields.length)];
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