let checkIns = {};
let trips = {};

function checkIn(id, stationName, t) {
    if (id < 1 || (stationName.length < 1 || stationName.length > 10) || t > 106) return;
    checkIns[id] = {
        t: t,
        stationName: stationName
    };
}

//create unique routeId from the station
function createRouteId(startStation, endStation) {
    return startStation + ' -> ' + endStation;
}

function checkOut(id, stationName, t) {
    if (id < 1 || (stationName.length < 1 || stationName.length > 10) || t > 106) return;

    const routeId = createRouteId(checkIns[id].stationName, stationName);
    if (!(routeId in trips)) {
        trips[routeId] = [];
    }
    //store required time
    trips[routeId].push(t - checkIns[id].t);
}

function getAverageTime(startStation, endStation) {
    const routeId = createRouteId(startStation, endStation);
    if (trips[routeId]) {
        const sum = trips[routeId].reduce((partialSum, ele) => partialSum + ele, 0);
        console.log((sum / trips[routeId].length));
    } else {
        console.log("Route not found: ", routeId);
    }

}

function testCase1() {
    checkIn(45, "Leyton", 3);
    checkIn(32, "Paradise", 8);
    checkIn(27, "Leyton", 10);
    checkOut(45, "Waterloo", 15);
    checkOut(27, "Waterloo", 20);
    checkOut(32, "Cambridge", 22);
    getAverageTime("Paradise", "Cambridge");
    getAverageTime("Leyton", "Waterloo");
    checkIn(10, "Leyton", 24);
    getAverageTime("Leyton", "Waterloo");
    checkOut(10, "Waterloo", 38);
    getAverageTime("Leyton", "Waterloo");
}

function testCase2() {
    checkIn(10, "Leyton", 3);
    checkOut(10, "Paradise", 8);
    getAverageTime("Leyton", "Paradise");
    checkIn(5, "Leyton", 10);
    checkOut(5, "Paradise", 16);
    getAverageTime("Leyton", "Paradise");
    checkIn(2, "Leyton", 21);
    checkOut(2, "Paradise", 30);
    getAverageTime("Leyton", "Paradise");
}

function resetTrips() {
    checkIns = {};
    trips = {};
}

function test() {
    console.log("\n******* TEST CASE 1 ********");
    testCase1();
    console.log("******* END TEST CASE 1 ********\n\n");

    resetTrips();
    console.log("******* TEST CASE 2 ********");
    testCase2();
    console.log("******* END TEST CASE 2 ********\n");
}

test();