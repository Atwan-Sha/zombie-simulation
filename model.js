class GameModel {
    constructor(cfg) {
        const default_cfg = {
            grid_size: 10,
            reproductive_age: 2,
            normal_death_age: 10,
            mutant_death_age: 50,
            initial_population: 5,
            mutation_chance: 0.2,
            food_shortage_limit: 1000,
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
        this.population = Array.from(Array(cfg.initial_population), () => Creature.create_rand(cfg));
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
        this.population = this.population.filter(c => c.age < (c.is_radioactive?this.cfg.mutant_death_age:this.cfg.normal_death_age));

        for (let dad of this.reproductives("Male")) {
            for (let mom of this.reproductives("Female")) {
                let child = Creature.from_mom(this.cfg, mom);
                if (child)
                    this.population.push(child);
            }
        }

        for (let mutant of this.population.filter(c => c.is_radioactive)) {
            for (let i = 0; i < 9; ++i) {
                let neighbor_x = mutant.x - 1 + i%3;
                let neighbor_y = mutant.y - 1 + Math.floor(i/3);
                if (i == 4
                    || neighbor_x < 0 || neighbor_x >= this.cfg.grid_size
                    || neighbor_y < 0 || neighbor_y >= this.cfg.grid_size
                )
                    continue;

                let victim = this.grid[neighbor_y][neighbor_x];
                if (victim && !victim.is_radioactive) {
                    victim.is_radioactive = true; //TODO: test if this changes the outer loop
                    break;
                }
            }
        }

        if (this.population.length > this.cfg.food_shortage_limit) {
            rand_shuffle(this.population);
            this.population = this.population.slice(0, Math.floor(this.population.length/2));
        }

        this.refresh_grid();
    }

    reproductives(sex) {
        return this.population.filter(c => !c.is_radioactive && c.sex==sex && c.age>=this.cfg.reproductive_age);
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

    constructor(cfg) {
        this.sex = rand_choice(sexes);
        this.age = 0;
        this.name = rand_choice(possible_names);
        this.is_radioactive = Math.random() < cfg.mutation_chance;
    }

    static from_mom(cfg, mom) {
        let c = new Creature(cfg);
        c.color = mom.color;
        let empty_neighbors = [];
        for (let i = 0; i < 9; ++i) {
            let neighbor_x = mom.x - 1 + i%3;
            let neighbor_y = mom.y - 1 + Math.floor(i/3);
            if (i == 4
                || neighbor_x < 0 || neighbor_x >= this.cfg.grid_size
                || neighbor_y < 0 || neighbor_y >= this.cfg.grid_size
            )
                continue;

            if (!this.grid[neighbor_y][neighbor_x])
                empty_neighbors.push([neighbor_x, neighbor_y]);
        }
        if (!empty_neighbors.length)
            return null;
        [c.x, c.y] = rand_choice(empty_neighbors);
        return c;
    }

    static create_rand(cfg) {
        let c = new Creature(cfg);
        c.color = rand_choice(colors);
        c.x = randint(cfg.grid_size - 1);
        c.y = randint(cfg.grid_size - 1);
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
function rand_shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

const sexes = ["Male", "Female"];
const colors = ["White", "Red", "Green"]
const possible_names = ["Alice", "Bob"];







let model = new GameModel({
    initial_population: 5,
    reproductive_age: 2,
    grid_size: 10,
})
let grid = model.get_grid(7);
for (let row of grid) {
    console.log(String(row));
}
