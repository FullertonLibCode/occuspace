//------------------------------------------------------------------------------
// OCCUSPACE (AKA WAITZ): Seating availability
//------------------------------------------------------------------------------

const SEATING_DATA = 'https://waitz.io/live/calstatefullerton';
// const SEATING_DATA_REFRESH_RATE = 30000; // 30 seconds
const SEATING_DATA_REFRESH_RATE = 300000000; // 30+ seconds

$(document).ready(function(){
    $.support.cors = true;
    getSeatingData();
    setInterval(function(){getSeatingData();}, SEATING_DATA_REFRESH_RATE);
});

function getSeatingData()
{
    $.support.cors = true;

    // Calling API
    $.ajax({

        type: 'GET',
        url: SEATING_DATA

    }).done(function(response){ // Successful request

        $('#building').html(
            '<img src="./assets/icons/pl-north-building.svg" id="pln"><img src="./assets/icons/pl-south-building.svg" id="pls">'
        ); // Clear container for refresh

        // Generate HTML
        let floors = [];

        for(let i = 0; i < response.data.length; i++)
        {
            let thisLocation = response.data[i];
            if (thisLocation.name === "Pollak Library")
            {
                for(let i = 0; i < 6; i++)
                {
                    const building = i < 4 ? "north" : "south";
                    const floor = i < 4 ? i + 1 : i;
                    let thisLocationCard = makeCard(building, floor, thisLocation.subLocs[i].name, thisLocation.subLocs[i].busyness);
                    floors.push(thisLocationCard);
                }
                break;
            }
        }

        // Append HTML to #building
        $('#building').append(floors);
        $('#building').append(makeLegend()); 
    }).fail(function() { // Failed request
        // Generate HTML placeholder
        let locationNames = ["PLN 1st Floor", "PLN 2nd Floor", "PLN 3rd Floor", "PLN 4th Floor", "PLS 4th Floor", "PLS 5th Floor"];
        let floors = [];
        for (let i = 0; i < 6; i++) {
            const building = i < 4 ? "north" : "south";
            const floor = i < 4 ? i + 1 : i;
            let thisLocationCard = makeCard(building, floor, locationNames[i], -1);
            floors.push(thisLocationCard);
        }

        // Append HTML to #building
        $('#building').append(floors);
        $('#building').append('<div id="s" class="floor"></div>') // Placeholder for South building
    });
}

//---
// Function to generate an HTML legend for busyness icons
//---
const makeLegend = () => {
    let legend = `
        <div id="s" class="floor">
            <h2>Legend</h2>
            <div id="legend">
    `;

    const imgs = ["low", "medium", "high", "unavailable"]
    const text = ["Not Busy", "Busy", "Very Busy", "Data Unavailable"]
    for (i = 0; i < 4; i++) {
        legend += `
            <div id="${i + 1} class="icon">
                <img src="./assets/icons/user-${imgs[i]}-occupancy.svg">
                <p>${text[i]}</p>
            </div>`;
    }
    legend += "</div></div>"

    return legend;
}

//---
// Function to generate an HTML card for each location
// @param {String} building - The specific building in the library (E.g., "North," "South")
// @param {Number} floor - The associated floor number of the location
// @param {String} name - The name of the location (E.g., "PLN First Floor")
// @param {Number} busyness - Percentage amount of the location that is busy
//---
const makeCard = (building, floor, name, busyness) => {
    
    let summary;
    let level;
    
    // Categorizing busyness
    if (busyness < 0)
    {
        summary = 'Data unavailable'
        level = 'unavailable'
    }
    else if (busyness < 45)
    {
        summary = 'Not Busy'
        level = 'low';
    }
    else if (busyness < 72)
    {
        summary = 'Busy'
        level = 'medium';
    }
    else
    {
        summary = 'Very Busy'
        level = 'high';
    }

    // Generating HTML
    const floorID = (building === "north" ? "n" : "s") + floor;
    const quietFloor =
        floorID === "n3" || floorID === "s4" ?
        `<img alt="Quiet Floor" src="./assets/icons/quiet-floor-transparent.svg">` :
        `<div></div>`;

    const html = `
        <div id="${floorID}" class="${building} floor">
            <h2>${name}</h2>
            ${quietFloor}
            <span role="img" aria-label="${summary}" title="${busyness}% full" class="${level} busyness-indicator"></span>
            <h3>${busyness}%</h3>
        </div>`;

    console.log(html);
    return $(html)
}