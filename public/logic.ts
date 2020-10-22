// function declarations
    function randomIntFromInterval(min, max) { // min and max included 
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    function getRandomHexChar(){
        let randNum = randomIntFromInterval(0,15)
        if (randNum < 0){
            randNum = 0xFFFFFFFF + randNum + 1;
        }
        return randNum.toString(16).toUpperCase();
    }

    function getRandomHexUid(){
        let uidString = ""
        let i = 0
        for(i = 0; i < 32; i++){
            uidString = uidString + getRandomHexChar()
        }
        return uidString
    }

    function createNewComponent(type, contractAddress = "none"){
        const validTypes = [
            "dataSource",
            "oracle",
            "smartContract"
        ]

        // ensure valid function input
            if (validTypes.indexOf(type) == -1){
                throw("invalid type given to createNewComponent()")
            }
        
        let componentID = getRandomHexUid()

        if (type == "dataSource"){
            graph[componentID] =  {
                "type": type,
                "x": 0,
                "z": 0,
                "dataScope": "none",
                "dataType": "none",
                "data": null
            }
        }else if (type == "smartContract"){
            graph[componentID] = {
                "type": type,
                "contractAddress": contractAddress,
                "x": 0,
                "z": 0,
                "usedOracles": {},
                "importedContracts": {}
            }
        }else if (type == "oracle"){
            graph[componentID] = {
                "type": type,
                "contractAddress": contractAddress,
                "x": 0,
                "z": 0,
                "ports": {}
            }
        }
        return componentID
    }

    function assignScopeToDataSource(scope, dataSource){
        // assert inputs are valid
            if (graph[dataSource].type != "dataSource"){
                throw("Can only assign data scope to \"dataSource\" components")
            }

            if (scope != "local" && scope != "global"){
                throw("dataSource scope must either be \"local\" or \"global\"")
            }

        graph[dataSource].dataScope = scope
    }


    function assignDatatypeToDataSource(dataType, dataSource){
        graph[dataSource].dataType = dataType
    }

    function contractGetsDatasourceFromOracle(contract, dataSource, oracle){
        // assertions
            //contract exists
            if (!(contract in graph)){
                throw("invalid contract UID")
            }
            //dataSource exists
            if (!(dataSource in graph)){
                throw("invalid data source UID")
            }
            //oracle exists
            if (!(oracle in graph)){
                throw("invalid oracle UID")
            }

        // connect smart contract to oracle if it's not already connected
        graph[contract].usedOracles[oracle] = true
        // ensure oracle has port for connected contract
        if (!(contract in graph[oracle].ports)){
            graph[oracle].ports[contract] = {}
        }

        // connect data source to contract's oracle port
        graph[oracle].ports[contract][dataSource] = true
    }



    // Prototype Grading System
        function gradeGraphComponents(graph)
        {
            let gradeTable = {}
            for(var i = 0; i < smartContracts.length; i++)
            {
                let contract = smartContracts[i]
                // Establish Data Sources
                        // Lists the ID of all data sources the contract uses
                        let allContractDataSources = []
                        for (const oracle in graph[contract].oracles){
                            for (const dataSource in graph[oracle].ports[contract]){
                                allContractDataSources.push(dataSource)
                            }
                        }

                        // Makes table of the different data types the smart contract uses
                        // and counts how many time each type is used
                        let dataTypeCount = {}
                        for (const dataSource in allContractDataSources){
                            if (graph[dataSource].dataType in dataTypeCount){
                                dataTypeCount[graph[dataSource].dataType]++
                            }else{
                                dataTypeCount[graph[dataSource].dataType] = 1
                            }
                        }
                // Grade Data Reliability
                    
                // Compare with Known Vulnerabilities
                    for(let importedContract in graph[contract].importedContracts){
                        if(graph[importedContract].contactAddress in vulnerableContractAddresses){
                            // flag contract as vulnerable
                            gradeTable[contract].vulnerableImports.push(importedContract)
                            console.log("Vulnerable Imports:",gradeTable[contract].vulnerableImports)
                        }else{

                        }
                    }
                // Append grades
                    let quorumRating = 0
                    let reliabilityGrade = 0
                    let vulerableLibraries = {}
                    gradeTable[contract[quorumRating = 0]]
                    
                    return gradeTable;
            }


        // Rate Data Reliability
        // Compare Known Vulnerabilities
            
        }

    function contractImportsContract(contract, importedContract){
        // assert contracts exist
            //contract exists and is type contract
                if (!(contract in graph)){
                    throw("invalid contract UID")
                }
                if (graph[contract].type != "smartContract"){
                    throw("contractImportsContract() must recieve components of type \"smartContract\"")
                }
            //importedContract exists and is type contract
                if (!(importedContract in graph)){
                    throw("invalid contract UID")
                }
                if (graph[importedContract].type != "smartContract"){
                    throw("contractImportsContract() must recieve components of type \"smartContract\"")
                }
        graph[contract].importedContracts[importedContract] = true
    }

    function assignAddressOfComponent(address, component){
        // assertions
            // component is smartContract or oracle
            if (graph[component].type != "smartContract" && graph[component].type != "oracle"){
                throw("assignAddressOfComponent() can only be done to \"smartContracts\" and \"oracles\"")
            }

        graph[component].contractAddress = address

    }

    function giveValuesToDataSources(dataSources){
        for(var i = 0; i < dataSources.length; i++){
            var dataSource = dataSources[i];
            if(graph[dataSource].dataType == "temperature"){
                graph[dataSource].data = randomIntFromInterval(19, 27) 
            }
            if(graph[dataSource].dataType == "price"){
                graph[dataSource].data = randomIntFromInterval(1378, 1388) 
            }
        }
            
    }

// Main program

    // Make tables for grading & comparison
        // Vulnerable address for vulnerabilility test
            const vulnerableContractAddresses = {
                "0x10101": true,
                // getRandomHexUid()
            }
        // Make Comparison Data for Data Reliability Test
            let comparisonData = {
                // Represents current temperature from different sensors in an area 
                // or price of an asset from different exchanges
                    temperature: [21,22,22,23,24,25,25],
                    price: [1381, 1381, 1382, 1383, 1385]
            }

    let graph = {
        
    }




    // create example components
        const oracle1 = createNewComponent("oracle", "0x01")
        const dataSource1 = createNewComponent("dataSource")
        const dataSource2 = createNewComponent("dataSource")
        const dataSource3 = createNewComponent("dataSource")
        const contract1 = createNewComponent("smartContract", "0x02")
        const contract2 = createNewComponent("smartContract")
        const contract3 = createNewComponent("smartContract")

    // assign component properties
        // data
            // assign data source scopes
                assignScopeToDataSource("global", dataSource1)
            // assign data Types to data Sources
                assignDatatypeToDataSource("temperature", dataSource1)
        // contract/oracle addresses
            assignAddressOfComponent("0x10101", contract3)
    // connect example components
        // import contracts into other contracts as libraries
            contractImportsContract(contract1, contract3)
        // connect contracts to data they recieve from oracles
            // contract 1
                contractGetsDatasourceFromOracle(contract1, dataSource1, oracle1)
                contractGetsDatasourceFromOracle(contract1, dataSource2, oracle1)
                contractGetsDatasourceFromOracle(contract1, dataSource3, oracle1)
            // contract 2
                contractGetsDatasourceFromOracle(contract2, dataSource3, oracle1)
    // Assign components into lists

        let dataSources = [];
        let smartContracts = [];
        let oracles = [];
        for (var uid in graph) {
            if(graph[uid].type == "dataSource"){
                dataSources.push(uid)
            }
            if(graph[uid].type == "smartContract"){
                smartContracts.push(uid)
            }
            if(graph[uid].type == "oracle"){
                oracles.push(uid)
            }
        }

        giveValuesToDataSources(dataSources)



console.log(graph)
gradeGraphComponents(graph)