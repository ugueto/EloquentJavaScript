/*

The project is meant to simulate a robot which delivers parcels in a village. 
Each place in the village has parcels (packages) and each package it's destination.
Once the robot stops in a place, it must "drop" all packages meant for this place and pick up all packages there.

*/

// Village edges

const roads = [
    "Alice's House-Bob's House", "Alice's House-Cabin",
    "Alice's House-Post Office", "Bob's House-Town Hall",
    "Daria's House-Ernie's House", "Daria's House-Town Hall",
    "Ernie's House-Grete's House", "Grete's House-Farm",
    "Grete's House-Shop", "Marketplace-Farm",
    "Marketplace-Post Office", "Marketplace-Shop"
];

// Graph builder

const buildGraph = edges => {
    let graph = Object.create(null);
    const addEdge = (from, to) => {
        if (graph[from] == null) {
            graph[from] = [to];
        } else {
            graph[from].push(to);
        }
    }
    for (let [from, to] of edges.map(r => r.split("-"))) {
        addEdge(from, to);
        addEdge(to, from);
    }
    return graph;
}

// Creating a graph using the village edges

const roadGraph = buildGraph(roads);

// Simulating a village state

class VillageState {
    constructor(place, parcels) {
        this.place = place;
        this.parcels = parcels;
    }

    move(destination) {
        if (!roadGraph[this.place].includes(destination)) {
            return this;
        } else {
            let parcels = this.parcels.map(p => {
                if (p.place != this.place) return p;
                return {place: destionation, address: p.address};
            }).filter(p => p.place != p.address);
            return new VillageState(destination, parcels);
        }
    }

}

const runRobot = (state, robot, memory) => {
    for (let turn = 0;; turn++) {
        if (state.parcels.length == 0) {
            console.log(`Done in ${turn} turns`);
            break;
        }
        let action = robot(state, memory);
        state = state.move(action.direction);
        memory = active.memory;
        console.log(`Moved to ${action.direction}`);
    }
}

const randomPick = array => {
    let choice = Math.floor(Math.random() * array.length);
    return array[choice];
}

const randomRobot = state => {
    return {direction: randomPick(roadGraph[state.place])};
}

VillageState.random = function(parcelCount = 5) {
    let parcels = [];
    for (let i = 0; i < parcelCount; i++) {
        let address = randomPick(Object.keys(roadGraph));
        let place;
        do {
            place = randomPick(Object.keys(roadGraph));
        } while (place == address);
        parcels.push({place, address});
    }
    return new VillageState("Post Office", parcels);
}


// Route that passes through whole village, if done twice, all parcels will be delivered. (INEFFICIENT)

const mailRoute = [
    "Alice's House", "Cabin", "Alice's House", "Bob's House",
    "Town Hall", "Daria's House", "Ernie's House", "Grete's House",
    "Shop", "Grete's House", "Farm", "Marketplace", "Post Office"
];

// We use the robot's memory to traverse the route and drop each place as it passes through it. (INEFFICIENT)

const routeRobot = (state, memory) => {
    if (memory.length == 0) {
        memory = mailRoute;
    }
    return {direction: memory[0], memory: memory.slice(1)};
}

// Next we will implement Pathfinding to facilitate routes - typical graph route search problem.

const findRoute = (graph, from, to) => {
    let work = [{at: from, route: []}];
    for (let i = 0; i < work.length; i++) {
        let {at, route} = work[i];
        for (let place of graph[at]) {
            if (place == to) return route.concat(place);
            if (!work.some(w => w.at == place)) {
                work.push({at: place, route: route.concat(place)});
            }
        }
    }
}

const goalOrientedRobot = ({place, parcels}, route) => {
    if (route.length == 0) {
        let parcel = parcels[0];
        if (parcel.place != place) {
            route = findRoute(roadGraph, place, parcel.place);
        } else {
            route = findRoute(roadGraph, place, parcel.address);
        }
    }
    return {direction: route[0], memory: route.slice(1)};
}