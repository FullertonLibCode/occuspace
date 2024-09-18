//------------------------------------------------------------------------------
// OCCUSPACE (AKA WAITZ): Seating availability
//------------------------------------------------------------------------------

const SEATING_DATA = 'https://waitz.io/live/calstatefullerton';
const SEATING_DATA_REFRESH_RATE = 30000; // 30 seconds

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
            '<h2 class="display-2" id="pln">North Building</h2><h2 class="display-2" id="pls">South Building</h2>'
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
                    if (i < 4) { // North building
                        let thisLocationCard = makeCard("north", i + 1, thisLocation.subLocs[i].name, thisLocation.subLocs[i].busyness);
                        floors.push(thisLocationCard);
                    } else { // South building
                        let thisLocationCard = makeCard("south", i, thisLocation.subLocs[i].name, thisLocation.subLocs[i].busyness);
                        floors.push(thisLocationCard);
                    }
                }
                break;
            }
        }

        // Append HTML to #building
        $('#building').append(floors);
        $('#building').append('<div id="s" class="floor"></div>') // Placeholder for South building
    }).fail(function(errorobj, textstatus, error){ // Failed request
        // Error handling
        obj = JSON.stringify({
            firstparam: {
                value: errorobj,
                type: typeof (errorobj)
            },
            secondparam: {
                value: textstatus,
                type: typeof (textstatus)
            },
            thirdparam: {
                value: error,
                type: typeof (error)
            }
        }, undefined, 1);

        // Generate HTML placeholder
        let locationNames = ["PLN 1st Floor", "PLN 2nd Floor", "PLN 3rd Floor", "PLN 4th Floor", "PLS 4th Floor", "PLS 5th Floor"];
        let floors = [];
        for (let i = 0; i < 6; i++) {
            if (i < 4) {
                let thisLocationCard = makeCard("north", i + 1, locationNames[i], -1);
                floors.push(thisLocationCard);
            } else {
                let thisLocationCard = makeCard("south", i, locationNames[i], -1);
                floors.push(thisLocationCard);
            }
        }

        // Append HTML to #building
        $('#building').append(floors);
        $('#building').append('<div id="s" class="floor"></div>') // Placeholder for South building
    });
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
    let html;
    
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
    if (building === "north") {
        html = `
            <div id="n${floor}" class="floor">
                <h1>${name}</h1>
                <span role="img" aria-label="${summary}" title="${busyness}% full" class="${level} busyness-indicator"></span>
            </div>
        `
    } else { // "south"
        html = `
            <div id="s${floor}" class="floor">
                <h1>${name}</h1>
                <span role="img" aria-label="${summary}" title="${busyness}% full" class="${level} busyness-indicator"></span>
            </div>
        `
    }
    
    return $(html)
}