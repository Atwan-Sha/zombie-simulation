const GRID_SIZE = 10;
const REPRODUCTIVE_AGE = 2;
const INITIAL_POPULATION = 5;
class Creature {
    sex;
    color;
    age;
    name;
    is_radioactive;
    x; y;

    letter() {
        if (this.is_radioactive)
            return "X";
        var lett = this.sex[0];
        if (this.age < REPRODUCTIVE_AGE)
            lett = lett.toLowerCase()
        return lett
    }

    toString() {
        return `${this.age} ${this.sex} ${this.color} ${this.name} ${this.is_radioactive} ${this.x} ${this.y} ${this.letter()}`
    }
}

function randint(max) {
    return Math.floor(Math.random() * max);
}
function rand_choice(array) {
    return array[randint(array.length)];
}
function place_map(x, y, letter) {
    crmap[y] = crmap[y].substring(0, x) + letter + crmap[y].substring(x+1);
}

const sexes = ["Male", "Female"];
const colors = ["White", "Red", "Green"]
const possible_names = ["Alice", "Bob"];
var crmap = Array.from(Array(GRID_SIZE), () => ".".repeat(GRID_SIZE));
var population = Array.from(Array(INITIAL_POPULATION), () => rand_creature());

function rand_creature(mom) {
    var c = new Creature();
    c.sex = rand_choice(sexes);
    c.age = 0;
    c.name = rand_choice(possible_names);
    c.is_radioactive = false;
    if (mom === undefined) {
        c.color = rand_choice(colors);
        c.x = randint(GRID_SIZE-1);
        c.y = randint(GRID_SIZE-1);
    } else {
        c.color = mom.color;
        c.x = mom.x + 1;
        c.y = mom.y + 1;
    }
    place_map(c.x, c.y, c.letter());
    return c;
}

function turn() {
    for (c of population) c.age++;

    function reproductives(sex) { return population.filter(creature => creature.sex==sex && creature.age>=REPRODUCTIVE_AGE)}
    for (dad of reproductives("Male")) {
        for (mom of reproductives("Female")) {
            child = rand_creature(mom);
            population.push(child);
        }
    }

    crmap = Array.from(Array(GRID_SIZE), () => ".".repeat(GRID_SIZE));
    for (c of population) place_map(c.x, c.y, c.letter());


}

function display() {
    console.log("population: ", population.length);
    for (c of population) console.log(String(c));
    console.log(crmap.join("\n"));
}

for (var t = 0; t < 5; t++) {
    display();
    turn();
}
