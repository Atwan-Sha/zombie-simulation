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
            sexes: ["Male", "Female"],
            colors: ["White", "Red", "Green", "Blue", "Cyan", "Magenta", "Yellow"],
            male_names: [" Bob ", " Jon ", " Sid ", " Sal ", " Ike ", " Abe ", " Ben ", " Dan ", " Eli ", " Fox ", " Gus ", " Hal ", " Ian ", " Jay ", " Kim ", " Leo ", " Max ", " Ned ", " Oli ", " Pax ", " Ray ", " Sam ", " Ted ", " Uwe ", " Van ", " Wes ", " Zak "],
            female_names: ["alice", "jessy", "stasy", "becky", "susie", "emily", "sarah", "avery", "grace", "elsie", "hazel", "fiona", "holly", "erica", "karen", "maria", "nancy", "laura", "amber", "sadie", "julia", "paige", "riley", "casey"],
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

    constructor(cfg, grid, x, y) {
        this.sex = rand_choice(cfg.sexes);
        this.color = rand_choice(cfg.colors);
        this.age = 0;
        this.repr_age = cfg.reproductive_age;
        this.name = rand_choice(this.sex=="Male" ? cfg.male_names : cfg.female_names);
        this.is_radioactive = Math.random() < cfg.mutation_chance;
        this.x = x;
        this.y = y;
        grid[y][x] = this;
    }

    toString() {
        let color = ascii_clr();
        if (this.sex == "Male")   color = this.age<this.repr_age ? ascii_clr(244,87) : ascii_clr(232,75);
        if (this.sex == "Female") color = this.age<this.repr_age ? ascii_clr(244,225) : ascii_clr(232,218);
        if (this.is_radioactive)  color = ascii_clr(234,112);
        return color + `${this.age}${this.sex[0]}${this.color[0].toLowerCase()}${this.is_radioactive?"X":"-"}[${this.x},${this.y}]${this.name}` + COLOR_RESET;
    }
}




const COLOR_RESET = "\x1B[0;0m";
function ascii_clr(fg, bg) {
    return fg||bg ? `\x1B[38;5;${fg}m\x1B[48;5;${bg}m` : COLOR_RESET;
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
function disp_neighb(neighb_array) {
    let s = "[";
    for (let [c, x, y] of neighb_array) {
        s += (c ? String(c) : `__[${x},${y}]`) + ", ";
    }
    s += "]";
    return s;
}
function sleep(ms) {
    const stop = new Date().getTime() + ms;
    while (new Date().getTime() < stop);
}








class GameModelImpl {
    constructor(cfg) {
        console.log("initializing with cfg", cfg);
        this.curr_timestep = 0;
        this.cfg = cfg;
        const initial_coords = new Set();
        while (initial_coords.size < cfg.initial_population) {
            initial_coords.add(randint(cfg.grid_size**2-1));
        }
        this.grid = Array.from(Array(cfg.grid_size), () => Array(cfg.grid_size));
        this.population = Array.from(initial_coords, crd => new Creature(cfg, this.grid, crd%cfg.grid_size, Math.floor(crd/cfg.grid_size)));
        this.display_grid();
    }

    get_grid(timestep) {
        if (timestep < this.curr_timestep) {
            throw new Error("cannot go backwards in time yet, create new GameModel");
        }
        while (this.curr_timestep < timestep) {
            console.log(`\n\n\n====================================== TURN ${this.curr_timestep+1} ======================================`);
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
        this.do_movement();
        this.check_grid();
        this.display_grid();
    }

    do_aging() {
        for (let c of this.population)
            c.age++;
        const is_young = c => c.age < (c.is_radioactive ? this.cfg.mutant_death_age : this.cfg.normal_death_age);
        for (let i = 0; i < this.cfg.grid_size; ++i) {
            for (let j = 0; j < this.cfg.grid_size; ++j) {
                if (this.grid[i][j] && !is_young(this.grid[i][j]))
                    this.grid[i][j] = null;
            }
        }
        this.population = this.population.filter(is_young);
    }

    do_breeding() {
        let repr_males = this.reproductives("Male").length;
        console.log("Breeding for", repr_males, "males");
        for (let mom of this.reproductives("Female")) {
            let empty_neighbors = this.neighbors_pred(mom.x, mom.y, c => !c);
            rand_shuffle(empty_neighbors);
            // console.log("  ", String(mom), "   empty_neighbors:", disp_neighb(empty_neighbors));
            empty_neighbors = empty_neighbors.slice(0, repr_males);
            console.assert(Array.isArray(empty_neighbors));
            for (let [_, child_x, child_y] of empty_neighbors) {
                let child = new Creature(this.cfg, this.grid, child_x, child_y);
                child.color = mom.color;
                // console.log("    child:", String(child));
                this.population.push(child);
            }
        }
        // console.log("------\n");
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
            // console.log("  mutation", String(mutant), "  alive_non_mutants:", disp_neighb(alive_non_mutant_neighbors));
            console.assert(Array.isArray(alive_non_mutant_neighbors));
            if (alive_non_mutant_neighbors.length) {
                let [victim, _x, _y] = rand_choice(alive_non_mutant_neighbors);
                victim.is_radioactive = true;
                // console.log("      victim:", String(victim));
            }
        }
        // console.log("------\n");
    }

    kill_half_population() {
        console.log("Food shortage:");
        console.log("  too many creatures:", this.population.length);
        rand_shuffle(this.population);
        let survivors = Math.floor(this.population.length / 2);
        for (let c of this.population.slice(survivors)) {
            this.grid[c.y][c.x] = null;
        }
        this.population = this.population.slice(0, survivors);
        console.log("  after famine only", this.population.length, "left");
        // console.log("------\n");
    }

    do_movement() {
        console.log("Movements:");
        for (let c of this.population) {
            let empty_neighbors = this.neighbors_pred(c.x, c.y, c => !c);
            if (!empty_neighbors.length)
                continue;
            let [_, dest_x, dest_y] = rand_choice(empty_neighbors);
            // console.log("    movement", String(c), `  --> [${dest_x},${dest_y}]`);
            this.grid[c.y][c.x] = null;
            c.x = dest_x;
            c.y = dest_y;
            this.grid[dest_y][dest_x] = c;
        }
        // console.log("------\n");
    }

    check_grid() {
        for (let i = 0; i < this.population.length; ++i) {
            let c1 = this.population[i];
            if (this.grid[c1.y][c1.x] != c1)
                throw new Error("wrong population-grid correspondence" + String(c1) + String(this.grid[c1.y][c1.x]));
            for (let j = i+1; j < this.population.length; ++j) {
                let c2 = this.population[j];
                if (c1.x == c2.x && c1.y == c2.y)
                    throw new Error("same coordinates " + String(c1) + "  " + String(c2));
            }
        }
        for (let row of this.grid) {
            for (let c of row) {
                if (c && !this.population.includes(c))
                    throw new Error("grid contains dead body" + String(c));
            }
        }
    }

    display_grid() {
        for (let row of this.grid) {
            const WIDTH = 9;
            let s = "-".repeat((WIDTH+3) * row.length) + "\n";
            for (let el of row) { s += "| " + (el ? String(el).split("]")[0]+"]"+COLOR_RESET : " ".repeat(WIDTH)) + " "; }; s+="|\n";
            for (let el of row) { s += "| " + (el ? "  "+String(el).split("]")[1]+"  " : " ".repeat(WIDTH)) + " "; }; s+="|";
            console.log(s);
        }
    }
}

// if (typeof require !== 'undefined' && require.main === module) {
//     let model = new GameModel({
//         initial_population: 10,
//         grid_size: 10,
//         mutation_chance: 0.02,
//         food_shortage_limit: 55,
//     });
//     for (let i = 0; i < 35; ++i) {
//         model.get_grid(i);
//         sleep(600);
//     }
// }

// * receive initial params from controller
// * receive on/off state from controller
// * send grid to controller

export function grid_reducer(grid, action) {
    console.log("==== REDUCER CALL ====");
    if (action.type == "setup") {
        model = new GameModel(action.cfg);
        grid = model.get_grid(0);
    } else if (action.type == "update" && action.turn > 0) {
        grid = model.get_grid(action.turn);
    } else if (action.type == "reset") {  //! same as setup
        model = new GameModel(action.cfg);
        grid = model.get_grid(0);
    }
    return grid;
}

let model;


