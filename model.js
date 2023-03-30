class GameModel {
    constructor(cfg) {
        const default_cfg = {
            grid_size: 80,
            reproductive_age: 2,
            normal_death_age: 10,
            mutant_death_age: 50,
            initial_population: 5,
            mutation_chance: 0.02,
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

class Creature {
    sex;
    color;
    age;
    name;
    is_radioactive;
    x; y;

    constructor(cfg) {
        this.sex = rand_choice(cfg_sexes);
        this.age = 0;
        this.name = rand_choice(this.sex=="Male" ? cfg_male_names : cfg_female_names);
        this.is_radioactive = Math.random() < cfg.mutation_chance;
    }

    static create_rand(cfg) {
        let c = new Creature(cfg);
        c.color = rand_choice(cfg_colors);
        c.x = randint(cfg.grid_size - 1);
        c.y = randint(cfg.grid_size - 1);
        return c;
    }

    toString() {
        return `${this.age}${this.sex[0]}${this.color[0].toLowerCase()}${this.is_radioactive?"X":"-"}[${this.x},${this.y}]${this.name}`;
    }
}

const cfg_sexes = ["Male", "Female"];
const cfg_colors = ["White", "Red", "Green", "Yellow", "Purple"];
const cfg_male_names = [" Bob ", " Jon ", " Sid ", " Sal ", " Ike "];
const cfg_female_names = ["alice", "jessy", "stasy", "becky", "susie"];




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
function disp_neighb(neighb_array) {
    let s = "[";
    for (let [c, x, y] of neighb_array) {
        s += (c ? String(c) : `____[${x},${y}]`) + ", ";
    }
    s += "]";
    return s;
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
            console.log(`\n\n\n====================================== TURN ${this.curr_timestep+1} ======================================`)
            this.turn();
            ++this.curr_timestep;
        }
        return this.grid;
    }

    turn() {
        this.do_aging();
        this.do_breeding();
        this.do_mutations();
        if (this.population.length > this.cfg.food_shortage_limit)
            this.kill_half_population();
        this.refresh_grid();
    }

    do_aging() {
        for (let c of this.population)
            c.age++;
        this.population = this.population.filter(c => c.age < (c.is_radioactive ? this.cfg.mutant_death_age : this.cfg.normal_death_age));
    }

    do_breeding() {
        let repr_males = this.reproductives("Male").length;
        console.log("Breeing for", repr_males, "males");
        for (let mom of this.reproductives("Female")) {
            let empty_neighbors = this.neighbors_pred(mom.x, mom.y, c => !c);
            rand_shuffle(empty_neighbors);
            console.log("  ", String(mom), "   empty_neighbors:", disp_neighb(empty_neighbors));
            empty_neighbors = empty_neighbors.slice(0, repr_males);
            console.assert(Array.isArray(empty_neighbors));
            for (let [_, child_x, child_y] of empty_neighbors) {
                let child = new Creature(this.cfg);
                child.color = mom.color;
                child.x = child_x;
                child.y = child_y;
                console.log("    child:", String(child));
                this.population.push(child);
            }
        }
        console.log("------\n");
    }

    reproductives(sex) {
        return this.population.filter(c => !c.is_radioactive && c.sex==sex && c.age>=this.cfg.reproductive_age);
    }

    neighbors_pred(x, y, pred) {
        let res = [];
        for (let i = 0; i < 9; ++i) {
            let neighbor_x = x - 1 + i % 3;
            let neighbor_y = y - 1 + Math.floor(i / 3);
            if (i == 4
                || neighbor_x < 0 || neighbor_x >= this.cfg.grid_size
                || neighbor_y < 0 || neighbor_y >= this.cfg.grid_size)
                continue;

            let neighbor = this.grid[neighbor_y][neighbor_x];
            if (pred(neighbor)) {
                res.push([neighbor, neighbor_x, neighbor_y]);
            }
        }
        return res;
    }

    do_mutations() {
        console.log("Mutations:");
        for (let mutant of this.population.filter(c => c.is_radioactive)) {
            let alive_non_mutant_neighbors = this.neighbors_pred(mutant.x, mutant.y, c => c && !c.is_radioactive);
            console.log("  mutation", String(mutant), "  alive_non_mutants:", disp_neighb(alive_non_mutant_neighbors));
            console.assert(Array.isArray(alive_non_mutant_neighbors));
            if (alive_non_mutant_neighbors.length) {
                let [victim, _x, _y] = rand_choice(alive_non_mutant_neighbors);
                victim.is_radioactive = true;
                console.log("      victim:", String(victim));
            }
        }
        console.log("------\n");
    }

    kill_half_population() {
        rand_shuffle(this.population);
        this.population = this.population.slice(0, Math.floor(this.population.length / 2));
    }

    refresh_grid() {
        this.grid = Array.from(Array(this.cfg.grid_size), () => Array(this.cfg.grid_size));
        for (let c of this.population) {
            this.grid[c.y][c.x] = c;
        }
        this.display_grid();
    }

    display_grid() {
        for (let row of this.grid) {
            const WIDTH = 9;
            let s = "-".repeat((WIDTH+3) * row.length) + "\n";
            for (let el of row) { s += "| " + (el ? String(el).split("]")[0]+"]" : " ".repeat(WIDTH)) + " "; }; s+="|\n";
            for (let el of row) { s += "| " + (el ? "  "+String(el).split("]")[1]+"  " : " ".repeat(WIDTH)) + " "; }; s+="|";
            console.log(s);
        }
    }
}





if (typeof require !== 'undefined' && require.main === module) {
    let model = new GameModel({
        initial_population: 10,
        grid_size: 10,
        mutation_chance: 0.1,
    })
    model.get_grid(7);
}
