// Write your helper functions here!
require('isomorphic-fetch');

function addDestinationInfo(document, name, diameter, star, distance, moons, imageUrl) {
    const missionTarget = document.getElementById("missionTarget");
    missionTarget.innerHTML = `
        <h2>Mission Destination</h2>
        <ol>
            <li>Name: ${name}</li>
            <li>Diameter: ${diameter}</li>
            <li>Star: ${star}</li>
            <li>Distance from Earth: ${distance}</li>
            <li>Number of Moons: ${moons}</li>
        </ol>
        <img src="${imageUrl}">
    `
}

function validateInput(testInput) {
   if(testInput === "") {
    return "Empty";
   }else if (isNaN(testInput)){
    return "Not a Number";
   }else if(!isNaN(testInput)) {
    return "Is a Number";
   };
};

function formSubmission(document, list, pilot, copilot, fuelLevel, cargoLevel) {
    //if statement for each value(pilotName, fuelLevel
//each if statement is going to validate all of HTML using .innerHTML based on validations
    if(validateInput(pilot)==="Empty" || validateInput(copilot)=== "Empty" || validateInput(fuelLevel)=== "Empty" || validateInput(cargoLevel)==="Empty") {
        alert("Fill in the blank");
    }else if(validateInput(pilot)==="Is a Number" || validateInput(copilot)==="Is a Number" || validateInput(fuelLevel)==="Not a Number" || validateInput(cargoLevel)==="Not a Number") {
        alert("validate info");
    } else {
        list.style.visibility="visible";
        document.getElementById("pilotStatus").innerHTML = `Pilot ${pilot} is ready for launch`;//${pilotStatus} or ${pilotName}?
        document.getElementById("copilotStatus").innerHTML = `CoPilot ${copilot} is ready for launch`;//${copilotStatus}?
        document.getElementById("fuelStatus").innerHTML = `fuel amount of ${fuelLevel} is enough to launch`;
        document.getElementById("cargoStatus").innerHTML = `$Cargo amount of ${cargoLevel} is low enough for launch`;
        if(fuelLevel < 10000){
            document.getElementById("launchStatus").style.color = "red";
            document.getElementById("launchStatus").innerHTML = "Shuttle not ready for launch";
            document.getElementById("fuelStatus").innerHTML = `Fuel level too low for launch`;
        }else {
            document.getElementById("fuelStatus").innerHTML = `Fuel Status good to go`;
        }
        if(cargoLevel > 10000) {
            document.getElementById("launchStatus").style.color = "red";
            document.getElementById("launchStatus").innerHTML = "Shuttle not ready for launch";
            document.getElementById("cargoStatus").innerHTML = `Cargo mass too heavy for launch`;
        } else {
            document.getElementById("cargoStatus").innerHTML = `cargo level good to go`;
        }
        if(fuelLevel>10000 && cargoLevel < 10000) {
            document.getElementById("launchStatus").style.color = "green";
            document.getElementById("launchStatus").innerHTML = "Shuttle ready for takeoff";
        }
    }
};

async function myFetch() {
    let planetsReturned;
    planetsReturned = await fetch("https://handlers.education.launchcode.org/static/planets.json").then( function(response) {
        return response.json();
    });
    return planetsReturned;
}

function pickPlanet(planets) {
    let randomPlanets = Math.floor(Math.random() * 6);
    return planets[randomPlanets];
}

module.exports.addDestinationInfo = addDestinationInfo;
module.exports.validateInput = validateInput;
module.exports.formSubmission = formSubmission;
module.exports.pickPlanet = pickPlanet; 
module.exports.myFetch = myFetch;