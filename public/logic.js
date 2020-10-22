// function declaration
function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
function getRandomHexChar() {
    var randNum = randomIntFromInterval(0, 15);
    if (randNum < 0) {
        randNum = 0xFFFFFFFF + randNum + 1;
    }
    return randNum.toString(16).toUpperCase();
}
function getRandomHexUid() {
    var uidString = "";
    var i = 0;
    for (i = 0; i < 32; i++) {
        uidString = uidString + getRandomHexChar();
    }
    return uidString;
}
function createNewComponent(type, contractAddress) {
    if (contractAddress === void 0) { contractAddress = "none"; }
    var validTypes = [
        "dataSource",
        "oracle",
        "smartContract"
    ];
    // ensure valid function input
    if (validTypes.indexOf(type) == -1) {
        throw ("invalid type given to createNewComponent()");
    }
    var componentID = getRandomHexUid();
    if (type == "dataSource") {
        graph[componentID] = {
            "type": type,
            "x": 0,
            "z": 0,
            "dataScope": "none",
            "dataType": "none"
        };
    }
    else if (type == "smartContract") {
        graph[componentID] = {
            "type": type,
            "contractAddress": contractAddress,
            "x": 0,
            "z": 0,
            "usedOracles": {},
            "importedContracts": {}
        };
    }
    else if (type == "oracle") {
        graph[componentID] = {
            "type": type,
            "contractAddress": contractAddress,
            "x": 0,
            "z": 0,
            "ports": {}
        };
    }
    return componentID;
}
function assignScopeToDataSource(scope, dataSource) {
    // assert inputs are valid
    if (graph[dataSource].type != "dataSource") {
        throw ("Can only assign data scope to \"dataSource\" components");
    }
    if (scope != "local" && scope != "global") {
        throw ("dataSource scope must either be \"local\" or \"global\"");
    }
    graph[dataSource].dataScope = scope;
}

// used to assess whether 
function assignDatatypeToDataSource(dataType, dataSource) {
    graph[dataSource].dataType = dataType;
}

function contractGetsDatasourceFromOracle(contract, dataSource, oracle) {
    // assertions
    //contract exists
    if (!(contract in graph)) {
        throw ("invalid contract UID");
    }
    //dataSource exists
    if (!(dataSource in graph)) {
        throw ("invalid data source UID");
    }
    //oracle exists
    if (!(oracle in graph)) {
        throw ("invalid oracle UID");
    }
    // connect smart contract to oracle if it's not already connected
    graph[contract].usedOracles[oracle] = true;
    // ensure oracle has port for connected contract
    if (!(contract in graph[oracle].ports)) {
        graph[oracle].ports[contract] = {};
    }
    // connect data source to contract's oracle port
    graph[oracle].ports[contract][dataSource] = true;
}
// initialization
var graph = {};
var compromisedContracts = [];
// create example components
var oracle1 = createNewComponent("oracle", "0x01");
var dataSource1 = createNewComponent("dataSource");
var dataSource2 = createNewComponent("dataSource");
var dataSource3 = createNewComponent("dataSource");
var contract1 = createNewComponent("smartContract", "0x02");
var contract2 = createNewComponent("smartContract");
// assign data properties
// assign data souce scopes (manually done by users)
assignScopeToDataSource("global", dataSource1);
// assign data Types to data Sources
assignDatatypeToDataSource("weather", dataSource1);
// connect example components
// contract 1
contractGetsDatasourceFromOracle(contract1, dataSource1, oracle1);
contractGetsDatasourceFromOracle(contract1, dataSource2, oracle1);
contractGetsDatasourceFromOracle(contract1, dataSource3, oracle1);
// contract 2
contractGetsDatasourceFromOracle(contract2, dataSource3, oracle1);
// Main program
console.log(graph);
