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

    $.ajax({

        type: 'GET',
        url: SEATING_DATA

    }).done(function(response){

        $('#building').html('<h2 id="pln">North Building</h2><h2 id="pls">South Building</h2>'); // Clear container for refresh

        let floors = [];

        for(let i = 0; i < response.data.length; i++)
        {
            let thisLocation = response.data[i];
            if (thisLocation.name === "Pollak Library")
            {
                for(let i = 0; i < 6; i++)
                {
                    if (i < 4) {
                        let thisLocationCard = makeCard("north", i + 1, thisLocation.subLocs[i].name, thisLocation.subLocs[i].busyness);
                        floors.push(thisLocationCard);
                    } else {
                        let thisLocationCard = makeCard("south", i, thisLocation.subLocs[i].name, thisLocation.subLocs[i].busyness);
                        floors.push(thisLocationCard);
                    }
                }
                break;
            }
        }

        $('#building').append(floors); // Append floors to building container
        $('#building').append('<div id="s" class="floor"></div>') // Append placeholder block
    });
}


//---
// Function to generate an HTML card for each location
// @param {String} name - The name of the location (E.g., "First Floor")
// @param {Number} busyness - Percentage amount of the location that is busy
//---
const makeCard = (building, floor, name, busyness) => {
    
    let summary;
    let level;
    let html;
    
    if (busyness < 45)
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

    if (building === "north") {
        html = `
            <div id="n${floor}" class="floor">
                <h3>${name}</h3>
                <span role="img" aria-label="${summary}" title="${summary}" class="${level} busyness-indicator"></span>
            </div>
        `
    } else {
        html = `
            <div id="s${floor}" class="floor">
                <h3>${name}</h3>
                <span role="img" aria-label="${summary}" title="${summary}" class="${level} busyness-indicator"></span>
            </div>
        `
    }
    
    return $(html)
}