// Перший вариант
const mathObj = {
    "+": (x, y) => x + y,
    "-": (x, y) => x - y,
    "/": (x, y) => x / y,
    "*": (x, y) => x * y,
    "%": (x, y) => x % y,
};
const obj = { X: 12, Y: 3, znak: "/" };

function SuperMath() {
    const availableZnak = Object.keys(mathObj),
        checkZnak = (z) => availableZnak.includes(z);

    this.check = function (obj) {
        if (!checkZnak(obj.znak)) {
            const newZnak = prompt(
                `Невірний знак. Спробуйте ще (${availableZnak.join(",")})`
            );
            if (!obj.znak) {
                return NaN;
            }
            obj.znak = newZnak;
            return this.check(obj);
        }
        const confirmed = confirm(
            `Ви хочете зробити операцію ${obj.X} ${obj.znak} ${obj.Y}?`
        );
        if (!confirmed) {
            const newObject = this.input();
            return this.check(newObject);
        }
        return this[obj.znak](obj.X, obj.Y);
    };
    this.input = () => {
        const X = parseInt(prompt("Введіть X:")),
            Y = parseInt(prompt("Введіть Y:")),
            znak = prompt(`Введіть дійсний знак (${availableZnak.join(",")}):`);
        return { X, Y, znak };
    };
}
Object.assign(SuperMath.prototype, mathObj);

p = new SuperMath();
const result = p.check(obj);
console.log(result);

// Другий вариант

function SuperMathTwo() {
    const availableZnak = Object.keys(mathObj),
        checkZnak = (z) => availableZnak.includes(z);
    this.check = function (obj) {
        const confirmed = confirm(
            `Ви хочете зробити операцію ${obj.X} ${obj.znak} ${obj.Y}?`
        );
        if (!confirmed) {
            obj = this.input();
        }
        return this[obj.znak](obj.X, obj.Y);
    };
    this.input = () => {
        const X = parseInt(prompt("Введіть X:")),
            Y = parseInt(prompt("Введіть Y:")),
            znak = prompt(`Введіть дійсний знак (${availableZnak.join(",")}):`);
        if (!checkZnak(znak)) {
            alert(`Невірний знак. Спробуйте ще (${availableZnak.join(",")})`);
            return this.input();
        }
        return { X, Y, znak };
    };
}
Object.assign(SuperMathTwo.prototype, mathObj);

p = new SuperMathTwo();
const result2 = p.check(obj);
console.log(result);
