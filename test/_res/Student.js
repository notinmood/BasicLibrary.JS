class Student {
    name = "";
    age = 0;
    getName = function () {
        return this.name;
    };
    setName = function (name) {
        this.name = name;
    };
}

// Student.prototype.getName=function (){
//     return this.name;
// };

module.exports = {Student};