(function() {
    "use strict";
    
    //clock

    document.addEventListener("DOMContentLoaded", function() {
        
        var c = document.getElementById("clock");
       
        //setTimeout(updateClock, 2000);
        setInterval(updateClock, 1000);
        
        function updateClock() {
            
            var date = new Date();
            var h = date.getHours();
            var m = date.getMinutes();
            var s = date.getSeconds();
            
            if (s < 10) {
                s = "0" + s
            } if (m < 10) {
                m = "0" + m
            }
            
            if (h > 12) {
                h -= 12
                c.innerHTML = h + ":" + m + ":" + s + " PL";
            } else {
                c.innerHTML = h + ":" + m + ":" + s + " EL";
            }
        };
        
    });
    
    // forms
    
    document.getElementById("form").addEventListener("submit", estimateDelivery);
    
    var e = document.getElementById("delivery");
    e.innerHTML = "0,00 &euro;";
    
    function estimateDelivery(event) {
        event.preventDefault();
        
        let fname = document.getElementById("fname");
        let lname = document.getElementById("lname");
        
        let auto = document.getElementById("v3");
        let van = document.getElementById("v4");
        
        let linn = document.getElementById("linn");
        
        let numbers = /\d/;
        
        if (fname.value === "" || numbers.test(fname.value)) {
            alert("Eesnime vorm vale!");
        }
        if (lname.value === "" || numbers.test(lname.value)) {
            alert("Perenime vorm vale!");
        }
        if (!auto.checked && !van.checked) {
            alert("Vali kättetoimetamise viis.");
        }
        if (linn.value === "") {
            alert("Palun valige linn nimekirjast");
            linn.focus();
            return;
        } else {
            if (linn.value === "tln") {
                e.innerHTML = "0.00 &euro;";
            } else if (linn.value === "trt" || linn.value === "nrv"){
                e.innerHTML = "2.50 &euro;";
            } else if (linn.value === "prn") {
                e.innerHTML = "3.00 &euro;";
            }    
        }
        
        console.log("Tarne hind on arvutatud");
    }
    
})();

// map

var mapAPIKey = "AqLLRE37SJGqIxXEYxezPUa6fF2oCzl3cvG4n05FtFIVBrotBYxchpMYYpwuxBak";

var map;

function GetMap() {
    
    "use strict";

    var tartu = new Microsoft.Maps.Location(
            58.38104, 
            26.71992
        );
    
    var tallinn = new Microsoft.Maps.Location(
            59.395948, 
            24.671035
        );

    map = new Microsoft.Maps.Map("#map", {
        credentials: mapAPIKey,
        center: new Microsoft.Maps.Location(58.88104, 25.671035),
        zoom: 7,
        mapTypeId: Microsoft.Maps.MapTypeId.road,
        disablePanning: true
    });
    
    var pushpinTartu = new Microsoft.Maps.Pushpin(tartu, {
            title: 'Tartu Ülikool',
        });
    
    var pushpinTallinn = new Microsoft.Maps.Pushpin(tallinn, {
        title: 'TTÜ',
    });
    
    var infobox = new Microsoft.Maps.Infobox(tartu, {
        visible: false
    });
    
    pushpinTartu.metadata = {
        title: 'Tartu Ülikool',
        description: 'Eesti vanim ülikool',
        infobox: infobox
    };
    
    pushpinTallinn.metadata = {
        title: 'TTÜ',
        description: 'Lihtsalt ülikool',
        infobox: infobox
    };
    
    Microsoft.Maps.Events.addHandler(pushpinTartu, 'click', pushpinClicked);
    Microsoft.Maps.Events.addHandler(pushpinTallinn, 'click', pushpinClicked);

    map.entities.push(pushpinTartu);
    map.entities.push(pushpinTallinn);
    
    infobox.setMap(map);
}

function pushpinClicked(e) {
    if (e.target.metadata) {
        e.target.metadata.infobox.setOptions({
            location: e.target.getLocation(),
            title: e.target.metadata.title,
            description: e.target.metadata.description,
            visible: true
        });
    }
}

// https://dev.virtualearth.net/REST/v1/Locations?q=1000 Vin Scully Ave, Los Angeles,CA&key=YOUR_KEY_HERE

