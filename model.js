class GameModel {
    constructor(cfg) {
        const default_cfg = {
            grid_size: 10,
            reproductive_age: 2,
            initial_population: 5,
        }
        for (let k of Object.keys(cfg)) {
            if (!(k in default_cfg))
                console.warn("unknown cfg option: ", k);
        }
        this.impl = new GameModelImpl(Object.assign({}, default_cfg, cfg));
    }
    get_grid(timestep) {
        return this.impl.get_grid(timestep);
    }
}






class GameModelImpl {
    constructor(cfg) {
        console.log("initializing with cfg", cfg);
        this.curr_timestep = 0;
        this.cfg = cfg;
        this.population = Array.from(Array(cfg.initial_population), () => Creature.create_rand(cfg.grid_size));
        this.refresh_grid();
    }

    get_grid(timestep) {
        if (timestep < this.curr_timestep) {
            throw new Error("cannot go backwards in time yet, create new GameModel");
        }
        while (this.curr_timestep < timestep) {
            this.turn();
            ++this.curr_timestep;
        }
        return this.grid;
    }

    turn() {
        for (let c of this.population)
            c.age++;

        for (let dad of this.reproductives("Male")) {
            for (let mom of this.reproductives("Female")) {
                let child = Creature.from_mom(mom);
                this.population.push(child);
            }
        }

        this.refresh_grid();
    }
    reproductives(sex) {
        return this.population.filter(c => c.sex==sex && c.age>=this.cfg.reproductive_age);
    }

    refresh_grid() {
        this.grid = Array.from(Array(this.cfg.grid_size), () => Array(this.cfg.grid_size));
        for (let c of this.population) {
            this.grid[c.y][c.x] = c;
        }
    }
}

class Creature {
    sex;
    color;
    age;
    name;
    is_radioactive;
    x; y;

    constructor() {
        this.sex = rand_choice(sexes);
        this.age = 0;
        this.name = rand_choice(possible_names);
        this.is_radioactive = false;
    }

    static from_mom(mom) {
        let c = new Creature();
        c.color = mom.color;
        c.x = mom.x + 1;
        c.y = mom.y + 1;
        return c;
    }

    static create_rand(grid_size) {
        let c = new Creature();
        c.color = rand_choice(colors);
        c.x = randint(grid_size - 1);
        c.y = randint(grid_size - 1);
        return c;
    }

    toString() {
        return `${this.age}`// ${this.sex} ${this.color} ${this.name} ${this.is_radioactive} ${this.x} ${this.y}`
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







let model = new GameModel({
    initial_population: 5,
    reproductive_age: 2,
    grid_size: 10,
})
let grid = model.get_grid(2);
for (let row of grid) {
    console.log(String(row));
}
