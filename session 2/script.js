let obj = {
    //first_name, last_name ...
    first_name: "Bruno",
    last_name: "Grüter",
    sayHello() {
        console.log(this.first_name + " " + this.last_name);
    }
}

console.log(obj);
console.log(obj.first_name);
obj.sayHello();