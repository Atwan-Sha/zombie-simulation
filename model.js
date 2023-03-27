const GRID_SIZE = 80;
const REPRODUCTIVE_AGE = 2;
const INITIAL_POPULATION = 5;
class Creature {
    sex = "Male";
    color = "White";
    age = 0;
    name = "Bob";
    is_radioactive = false;
    x; y;

    letter() {
        if (this.is_radioactive)
            return "X";
        lett = this.sex[0];
        if (this.age < REPRODUCTIVE_AGE)
            lett = lett.toLowerCase()
        return lett
    }
}

function randint(max) {
    return Math.floor(Math.random() * max);
}
function rand_choice(array) {
    return array[randint(array.length)];
}

const sexes = ["Male", "Female"];
const colors = ["White", "Red", "Green"]
const possible_names = ["Alice", "Bob"];
var population = [];
var map = Array.from(Array(GRID_SIZE), () => " ".repeat(GRID_SIZE));

function rand_creature(mom) {
    c = new Creature();
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
    return c;
}

function turn() {
    function reproductives(sex) { return population.filter(creature => creature.sex==sex && creature.age>=REPRODUCTIVE_AGE)}
    for (dad in reproductives("Male")) {
        for (mom in reproductives("Female")) {
            child = rand_creature(mom);
            population.push(child);
            map[child.x][child.y] = child.letter();
        }
    }


}

population = Array.from(Array(INITIAL_POPULATION), () => rand_creature());
for (var t = 0; t < 2; t++) {
    console.log(population, map.join("\n"));
    turn();
}
