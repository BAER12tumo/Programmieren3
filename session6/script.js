let clickCounter = 0;
function clickHandler(event) {
    // console.log(event)
    clickCounter++
    let str = "thanks for clicking: " + clickCounter;
    this.innerText = str;
}


let p = document.getElementById("pElement");

p.addEventListener("click", clickHandler);

function bodyClick(event) {
    console.log("clicked at: ", event.pageX, event.pageY)
}

window.onclick = bodyClick;

function pageLoaded(event){
    console.log("Leden fertig... bitte Spiel starten...")
}

window.onload = pageLoaded;

function keyup(event){
    console.log("keyboard presse: ", event.key);
}

window.onkeyup = keyup;

function keyPressed(){
    console.log(key)
}