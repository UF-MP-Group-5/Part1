var workingDirectory = "/Apps";

function addThing(ID, name, owner, vendor, model, release, type, OS, description, comments)
{
    var div = document.createElement('div');
    div.setAttribute('id', ID);
    div.innerHTML = document.getElementById('thingTemplate').innerHTML;
    document.getElementById('Things').appendChild(div);
    var theThing = document.getElementById(ID);
    for (var i = 0; i < theThing.childNodes.length; i++) {
        if (theThing.childNodes[i].className == "thingContainer")
        {
            for (var j = 0; j < theThing.childNodes[i].childNodes.length; j++) {
                if (theThing.childNodes[i].childNodes[j].className == "id")
                    theThing.childNodes[i].childNodes[j].innerHTML = ID;
                if (theThing.childNodes[i].childNodes[j].className == "name")
                    theThing.childNodes[i].childNodes[j].innerHTML = name;
                if (theThing.childNodes[i].childNodes[j].className == "owner")
                    theThing.childNodes[i].childNodes[j].innerHTML = owner;
                if (theThing.childNodes[i].childNodes[j].className == "vendor")
                    theThing.childNodes[i].childNodes[j].innerHTML = vendor;
                if (theThing.childNodes[i].childNodes[j].className == "model")
                    theThing.childNodes[i].childNodes[j].innerHTML = model;
                if (theThing.childNodes[i].childNodes[j].className == "release")
                    theThing.childNodes[i].childNodes[j].innerHTML = release;
                if (theThing.childNodes[i].childNodes[j].className == "type")
                    theThing.childNodes[i].childNodes[j].innerHTML = type;
                if (theThing.childNodes[i].childNodes[j].className == "OS")
                    theThing.childNodes[i].childNodes[j].innerHTML = OS;
                if (theThing.childNodes[i].childNodes[j].className == "description")
                    theThing.childNodes[i].childNodes[j].innerHTML = description;
                if (theThing.childNodes[i].childNodes[j].className == "comments")
                    theThing.childNodes[i].childNodes[j].innerHTML = comments;
            }
        }
    }
}

function addService(name, category, type, keywords, description, owner)
{
    var div = document.createElement('div');
    div.setAttribute('id', name.concat(owner));
    div.setAttribute('data', owner);
    div.setAttribute('class', "thingOuterContainer");
    div.setAttribute('draggable', "true")
    div.setAttribute('ondragstart', "drag(event)" )
    div.innerHTML = document.getElementById('serviceTemplate').innerHTML;
    document.getElementById('Services').appendChild(div);
    var theService = document.getElementById(name.concat(owner));
    for (var i = 0; i < theService.childNodes.length; i++) {
        if (theService.childNodes[i].className == "thingContainer")
        {
            for (var j = 0; j < theService.childNodes[i].childNodes.length; j++) {
                if (theService.childNodes[i].childNodes[j].className == "name")
                {
                    theService.childNodes[i].childNodes[j].innerHTML = name;
                    theService.childNodes[i].childNodes[j].setAttribute('name', name);
                }
                if (theService.childNodes[i].childNodes[j].className == "owner")
                    theService.childNodes[i].childNodes[j].innerHTML = owner;
                if (theService.childNodes[i].childNodes[j].className == "category")
                    theService.childNodes[i].childNodes[j].innerHTML = category;
                if (theService.childNodes[i].childNodes[j].className == "type")
                    theService.childNodes[i].childNodes[j].innerHTML = type;
                if (theService.childNodes[i].childNodes[j].className == "keywords")
                    theService.childNodes[i].childNodes[j].innerHTML = keywords;
                if (theService.childNodes[i].childNodes[j].className == "description")
                    theService.childNodes[i].childNodes[j].innerHTML = description;
            }
        }
    }
}

function addRelationship(name, establisher, description)
{
    var div = document.createElement('div');
    div.setAttribute('id', name.concat(establisher));
    div.setAttribute('class', "relContainer");
    div.setAttribute('data', establisher);
    div.setAttribute('draggable', "true")
    div.setAttribute('ondragstart', "drag(event)" )
    div.innerHTML = document.getElementById('relationshipTemplate').innerHTML;
    document.getElementById('Relationships').appendChild(div);
    var theService = document.getElementById(name.concat(establisher));
    for (var i = 0; i < theService.childNodes.length; i++) {
        if (theService.childNodes[i].className == "thingContainer")
        {
            for (var j = 0; j < theService.childNodes[i].childNodes.length; j++) {
                if (theService.childNodes[i].childNodes[j].className == "name")
                {
                    theService.childNodes[i].childNodes[j].setAttribute('name', name);
                    theService.childNodes[i].childNodes[j].innerHTML = name;
                }

                if (theService.childNodes[i].childNodes[j].className == "establisher")
                    theService.childNodes[i].childNodes[j].innerHTML = establisher;
                if (theService.childNodes[i].childNodes[j].className == "description")
                    theService.childNodes[i].childNodes[j].innerHTML = description;
            }
        }
    }
}

function addAvailApp(name, data)
{
    var div = document.createElement("div");
    div.setAttribute('id', name);
    div.innerHTML = "<button class = 'status-pannel-button' data = '" + data + "' onclick= 'handleClick(this)' ondblclick = 'handleDoubleClick(this)'>" + name + "</button>"
    document.getElementById('appMenu').appendChild(div);
}

function addStatusApp(name, data)
{
    var div = document.createElement("div");
    div.setAttribute('id', name);
    div.setAttribute('history', '{"history":[]}');
    var d = new Date();
    div.innerHTML = "<button class = 'status-pannel-button' data = '" + data + "' onclick= 'handleClick(this)' ondblclick = 'handleDoubleClick(this)'>" + name + "- Active "+ d.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) +"</button>"
    document.getElementById('statusMenu').appendChild(div);
}

function activateApp()
{
    window.console.log("Activate:");
    window.console.log(document.getElementById("modalHeader").getAttribute('data'));
    window.console.log(document.getElementById('statusMenu').children);

    //var appName = JSON.parse(document.getElementById("modalHeader").getAttribute('data')).appname

    var childCount = document.getElementById('statusMenu').children.length;
    var isDupe = false;
    var d = new Date();
    for(var i = 0; i<childCount; i++)
    {
        if(document.getElementById('statusMenu').children[i].id == JSON.parse(document.getElementById("modalHeader").getAttribute('data')).appname)
        {
            isDupe = true;
            if(document.getElementById('statusMenu').children[i].innerHTML.includes("Inactive"))
            {
                var tempJson = JSON.parse(document.getElementById('statusMenu').children[i].getAttribute("history"))
                tempJson.history.push("Activated "+ d.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}))
                document.getElementById('statusMenu').children[i].setAttribute('history', JSON.stringify(tempJson));
                document.getElementById('statusMenu').children[i].innerHTML = "<button class = 'status-pannel-button' data = '" + document.getElementById("modalHeader").getAttribute('data') + "' onclick= 'handleClick(this)' ondblclick = 'handleDoubleClick(this)'>" + JSON.parse(document.getElementById("modalHeader").getAttribute('data')).appname + "- Active "+ d.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) +"</button>";//parentNode.removeChild(document.getElementById('statusMenu').children[i])
                updateHistory(JSON.stringify(tempJson));
            }
        }
    }
    if(isDupe == false)
    {
        addStatusApp(JSON.parse(document.getElementById("modalHeader").getAttribute('data')).appname, document.getElementById("modalHeader").getAttribute('data'));
        var tempJson = JSON.parse(document.getElementById('statusMenu').children[i].getAttribute("history"))
        tempJson.history.push("Activated "+ d.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}))
        document.getElementById('statusMenu').children[i].setAttribute('history', JSON.stringify(tempJson));
        updateHistory(JSON.stringify(tempJson));
    }
    var httpRequest = new XMLHttpRequest();
    httpRequest.open('POST', 'http://localhost:8080/activateApp', true);
    httpRequest.setRequestHeader("Content-type","application/json");
    var appJson = JSON.parse(document.getElementById("modalHeader").getAttribute('data'))
    httpRequest.send(JSON.stringify(appJson));
    httpRequest.onreadystatechange = function () {
        if (httpRequest.readyState == 4 && httpRequest.status == 200) {
            var json = httpRequest.responseText;
            var arr = JSON.parse(json);
            for (var i = 0; i < arr.length; i++) {
                alert("Result of unit" + (i + 1) + " is " + arr[i]);
                console.log(arr[i]);
            }
            stopAppFromBackend(appJson.appname);
        }
    };
}

function stopApp()
{
    window.console.log("Stop:");
    window.console.log(document.getElementById("modalHeader").getAttribute('data'));
    var d = new Date();
    var childCount = document.getElementById('statusMenu').children.length;
    for(var i = 0; i<childCount; i++)
    {
        window.console.log(document.getElementById('statusMenu').children[i].id + "_____and_____" + JSON.parse(document.getElementById("modalHeader").getAttribute('data')).appname)
        if(document.getElementById('statusMenu').children[i].id == JSON.parse(document.getElementById("modalHeader").getAttribute('data')).appname)
        {
            if(document.getElementById('statusMenu').children[i].innerHTML.includes("Inactive"))
            {}
            else{
                document.getElementById('statusMenu').children[i].innerHTML = "<button class = 'status-pannel-button' data = '" + document.getElementById("modalHeader").getAttribute('data') + "' onclick= 'handleClick(this)' ondblclick = 'handleDoubleClick(this)'>" + JSON.parse(document.getElementById("modalHeader").getAttribute('data')).appname + "- Inactive "+ d.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) +"</button>";//parentNode.removeChild(document.getElementById('statusMenu').children[i]);
                var tempJson = JSON.parse(document.getElementById('statusMenu').children[i].getAttribute("history"))
                tempJson.history.push("Deactivated "+ d.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}))
                document.getElementById('statusMenu').children[i].setAttribute('history', JSON.stringify(tempJson));
                updateHistory(JSON.stringify(tempJson));
            }
        }
    }
}

function stopAppFromBackend(appname)
{
    var d = new Date();
    var childCount = document.getElementById('statusMenu').children.length;
    for(var i = 0; i<childCount; i++)
    {
        if(document.getElementById('statusMenu').children[i].id == appname)
        {
            if(document.getElementById('statusMenu').children[i].innerHTML.includes("Inactive"))
            {}
            else{
                document.getElementById('statusMenu').children[i].innerHTML = "<button class = 'status-pannel-button' data = '" + document.getElementById("modalHeader").getAttribute('data') + "' onclick= 'handleClick(this)' ondblclick = 'handleDoubleClick(this)'>" + JSON.parse(document.getElementById("modalHeader").getAttribute('data')).appname + "- Inactive "+ d.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) +"</button>";//parentNode.removeChild(document.getElementById('statusMenu').children[i]);
                var tempJson = JSON.parse(document.getElementById('statusMenu').children[i].getAttribute("history"))
                tempJson.history.push("Deactivated "+ d.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}))
                document.getElementById('statusMenu').children[i].setAttribute('history', JSON.stringify(tempJson));
                updateHistory(JSON.stringify(tempJson));
            }
        }
    }
}

function updateHistory(historyJson)
{
    window.console.log(historyJson)
    var history = JSON.parse(historyJson).history
    tracker = document.getElementById('appHistoryTracker');
    tracker.innerHTML = ""
    for(var i = 0; i < history.length; i++)
    {
        tracker.innerHTML = tracker.innerHTML + '<p style = "font-size: 100%">' + history[i] + '</p>'
    }

}

function saveApp()
{
    var appName = JSON.parse(document.getElementById("modalHeader").getAttribute('data')).appname;
    var appJson = JSON.parse(document.getElementById("modalHeader").getAttribute('data'));
    //nothing needs to be done on the front end, so do whatever you need to do here
    var httpRequest = new XMLHttpRequest();
    httpRequest.open('POST', 'http://localhost:8080/saveApp', true);
    httpRequest.setRequestHeader("Content-type","application/json");
    httpRequest.send(JSON.stringify(appJson));
    httpRequest.onreadystatechange = function () {
        if (httpRequest.readyState == 4 && httpRequest.status == 200) {
            var json = httpRequest.responseText;
            console.log(json);
        }
    };
}

function deleteApp()
{
    var appName = JSON.parse(document.getElementById("modalHeader").getAttribute('data')).appname
    var appJson = JSON.parse(document.getElementById("modalHeader").getAttribute('data'));
    for(var i = 0; i < document.getElementById('appMenu').children.length; i++)
    {
        if(document.getElementById('appMenu').children[i].getAttribute("id") == appName)
        {
            document.getElementById('appMenu').children[i].parentNode.removeChild(document.getElementById('appMenu').children[i])
        }
    }
    for(var i = 0; i < document.getElementById('statusMenu').children.length; i++)
    {
        if(document.getElementById('statusMenu').children[i].getAttribute("id") == appName)
        {
            document.getElementById('statusMenu').children[i].parentNode.removeChild(document.getElementById('statusMenu').children[i])
        }
    }
    var modal = document.getElementById("myModal");
    modal.style.display = "none";
    var httpRequest = new XMLHttpRequest();
    httpRequest.open('POST', 'http://localhost:8080/deleteApp', true);
    httpRequest.setRequestHeader("Content-type","application/json");
    httpRequest.send(appName);
    httpRequest.onreadystatechange = function () {
        if (httpRequest.readyState == 4 && httpRequest.status == 200) {
            var json = httpRequest.responseText;
            console.log(json);
        }
    };
}

function filterRel()
{
    var relationshipTab = document.getElementById("Relationships")
    for(var i = 0; i < relationshipTab.children.length; i++)
    {
        if(relationshipTab.children[i].getAttribute("class") == "relContainer")
        {
            relationshipTab.children[i].setAttribute("hidden", "true")
            window.console.log(relationshipTab.children[i].getAttribute("data"))

            if( relationshipTab.children[i].getAttribute("data") == "Ziwei04" && document.getElementById("Ziwei04Rel").checked == true)
            {
                relationshipTab.children[i].removeAttribute("hidden")
            }
            if( relationshipTab.children[i].getAttribute("data") == "Haocheng01" && document.getElementById("Haocheng01Rel").checked == true)
            {
                relationshipTab.children[i].removeAttribute("hidden")
            }
            if( relationshipTab.children[i].getAttribute("data") == "Andrew02" && document.getElementById("Andrew02Rel").checked == true)
            {
                relationshipTab.children[i].removeAttribute("hidden")
            }
            if( relationshipTab.children[i].getAttribute("data") == "Qihao03" && document.getElementById("Qihao03Rel").checked == true)
            {
                relationshipTab.children[i].removeAttribute("hidden")
            }
        }
    }
}

function filterServ()
{
    var ServiceTab = document.getElementById("Services")
    for(var i = 0; i < ServiceTab.children.length; i++)
    {
        if(ServiceTab.children[i].getAttribute("class") == "thingOuterContainer")
        {
            ServiceTab.children[i].setAttribute("hidden", "true")
            window.console.log(ServiceTab.children[i].getAttribute("data"))

            if( ServiceTab.children[i].getAttribute("data") == "Ziwei04" && document.getElementById("Ziwei04Serv").checked == true)
            {
                ServiceTab.children[i].removeAttribute("hidden")
            }
            if( ServiceTab.children[i].getAttribute("data") == "Haocheng01" && document.getElementById("Haocheng01Serv").checked == true)
            {
                ServiceTab.children[i].removeAttribute("hidden")
            }
            if( ServiceTab.children[i].getAttribute("data") == "Andrew02" && document.getElementById("Andrew02Serv").checked == true)
            {
                ServiceTab.children[i].removeAttribute("hidden")
            }
            if( ServiceTab.children[i].getAttribute("data") == "Qihao03" && document.getElementById("Qihao03Serv").checked == true)
            {
                ServiceTab.children[i].removeAttribute("hidden")
            }
        }
    }
}

function onLoadFunc()
{
    filterServ();
    filterRel()
}

function setSmartSpaceInfo(ssID, ssName, ssLoc, ssDescrip)
{
    document.getElementById("ssInfo").innerHTML = "VSS Dashboard<p style = 'font-size: 30%'>Smart Space ID: " + ssID + "</p><p style = 'font-size: 30%'>Smart Space Name: " + ssName + "</p><p style = 'font-size: 30%'>Smart Space Location " + ssLoc + "</p><p style = 'font-size: 30%'>Smart Space Description: " + ssDescrip + "</p> "
}

function newWDSubmit()
{
    //sometimes doesnt show up because of browser-side race conditions, but does execute whenever the path is submitted
    var newPath = document.getElementById('newWD').value;
    var httpRequest = new XMLHttpRequest();
    httpRequest.open('POST', 'http://localhost:8080/changeDirectory', true);
    httpRequest.setRequestHeader("Content-type","application/json");
    httpRequest.send(newPath);
    httpRequest.onreadystatechange = function () {
        if (httpRequest.readyState == 4 && httpRequest.status == 200) {
            var json = httpRequest.responseText;
            console.log(json);
        }
    };
}

function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    //ev.target.appendChild(document.getElementById(data));

    var div = document.createElement("div");
    div.setAttribute('id', name);
    div.setAttribute('class', "simpleService");
    div.innerHTML = "<text id = '" + data + "'style = 'font-size: 18'>" + data + "(</text><input style = 'width: 20;' type='text' id='" + data +"param'><text style = 'font-size: 18'>)</text>"
    window.console.log(ev.target.id);
    if(ev.target.id == "ifInput")
    {
        div.innerHTML = "<text id = '" + data + "'style = 'font-size: 18'>" + data + "(</text><input style = 'width: 20;' type='text' id='" + data +"param'><text style = 'font-size: 18'>) = </text><input style = 'width: 40;' type='text' id='" + data +"param'>"
    }
    ev.target.appendChild(div);

}

function drop2(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    var serviceName = document.getElementById(data).childNodes[5].childNodes[3].innerText
    var newButton = document.createElement("button")
    window.console.log(document.getElementById("serviceMenu"))
    document.getElementById("serviceMenu").insertAdjacentHTML('beforeend', "<button id = '"+ serviceName +"' class = 'status-pannel-button' draggable='true' ondragstart='drag(event)'>"+ serviceName +"</button>");
}

function addConditional()
{
    window.console.log("It is running the function")
    var div3 = document.createElement("div");
    div3.setAttribute('id', "conditional");
    div3.setAttribute('class', 'simpleConditional');
    div3.innerHTML = "<text style = 'font-size: 18'>IF</text><div id = 'ifInput' style = 'height: 30; width: 350; border: 1px solid #222222;'></div><p></p> <div style='height: 18; min-width: 30;'> <text style = 'font-size: 18;'>THEN</text> </div><div style = 'height: 30; width: 350; border: 1px solid #aaaaaa;' ></div>"
    document.getElementById('dragNDropper').appendChild(div3);
}

function clearRecipe()
{
    document.getElementById('dragNDropper').innerHTML = "";
}

function saveRecipe()
{
    var dropper = document.getElementById("dragNDropper");
    var appJson = {"appname":"No name provided", "units":[]}
    appJson.appname = document.getElementById("appNameInput").value;
    for(var i = 0; i < dropper.childElementCount; i++)
    {
        var tempJson = {"pre":"", "prepara":"", "value":"","post":"", "postpara":""}
        if(dropper.children[i].getAttribute("class") == "simpleService")
        {
            tempJson.post = dropper.children[i].children[0].id
            tempJson.postpara = dropper.children[i].children[1].value
            appJson.units.push(tempJson);
        }
        if(dropper.children[i].getAttribute("class") == "simpleConditional")
        {
            tempJson.pre = dropper.children[i].children[1].children[0].children[0].id
            tempJson.prepara = dropper.children[i].children[1].children[0].children[1].value
            tempJson.value = dropper.children[i].children[1].children[0].children[3].value
            tempJson.post = dropper.children[i].children[4].children[0].children[0].id
            tempJson.postpara = dropper.children[i].children[4].children[0].children[1].value

            appJson.units.push(tempJson);
        }
    }
    window.console.log(JSON.stringify(appJson));

    for(var i = 0; i < document.getElementById('appMenu').children.length; i++)
    {
        if(document.getElementById('appMenu').children[i].getAttribute("id") == appJson.appname)
        {
            document.getElementById('appMenu').children[i].parentNode.removeChild(document.getElementById('appMenu').children[i])
        }
    }

    addAvailApp(appJson.appname, JSON.stringify(appJson))
    var httpRequest = new XMLHttpRequest();
    httpRequest.open('POST', 'http://localhost:8080/getRecipe', true);
    httpRequest.setRequestHeader("Content-type","application/json");
    httpRequest.send(JSON.stringify(appJson));
    httpRequest.onreadystatechange = function () {
        if (httpRequest.readyState == 4 && httpRequest.status == 200) {
            var json = httpRequest.responseText;
            console.log(json);
        }
    };
    document.getElementById('dragNDropper').innerHTML = "";
    document.getElementById('appNameInput').value = "";
}

// Get the modal
var modal = document.getElementById("myModal");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

function makeModal(caller)
{
    modal.style.display = "block";
    document.getElementById("modalHeader").innerText = "Application Manager- " + caller.parentNode.getAttribute("id");
    document.getElementById("modalHeader").setAttribute('data', caller.getAttribute("data"));
    window.console.log(caller.parentNode.getAttribute("history"))
    if(JSON.parse(caller.parentNode.getAttribute("history")) != null)
        updateHistory(caller.parentNode.getAttribute("history"))
}


// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
    document.getElementById('appHistoryTracker').innerHTML = "";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
        document.getElementById('appHistoryTracker').innerHTML = "";
    }
}

document.getElementById('ctrl') .addEventListener('change', function() {
    //document.getElementById('appMenu').innerHTML = "<h1>Avalable Apps</h1><p>&nbsp;</p> <p></p>";
    var tempThis = this;
    var fr=new FileReader();
    function readNextFile(index)
    {
        if( index >= tempThis.files.length) return;
        fr.onload=function(){
            var tempJson = JSON.parse(fr.result);
            addAvailApp(tempJson.appname, fr.result);
            readNextFile(index + 1)
        }
        fr.readAsText(tempThis.files[index]);
    }
    readNextFile(0);
})

function removeOldApps()
{
    var d = new Date();
    d.setMinutes( d.getMinutes() - 5 );

    var childCount = document.getElementById('statusMenu').children.length;
    for(var i = 0; i<childCount; i++)
    {
        if(document.getElementById('statusMenu').children[i].innerHTML.includes("Inactive"))
        {
            if(document.getElementById('statusMenu').children[i].innerHTML.includes(d.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})))
            {
                document.getElementById('statusMenu').children[i].parentNode.removeChild(document.getElementById('statusMenu').children[i])
            }
        }
    }

}

function oneSecondCycle()
{
    removeOldApps()
}

var cycleTimer = {
    interval: null,
    seconds: 1,


    start: function () {
        var self = this;
        this.interval = setInterval(function () {
            self.seconds--;
            if (self.seconds == 0)
                oneSecondCycle();
            self.seconds = 1;
            //window.location.reload();
        }, 1000);
    },
}

cycleTimer.start();


let timer = 0;
let delay = 200;
let prevent = false;

function doClickAction(tempThis){
    makeModal(tempThis);
}
function doDoubleClickAction(tempThis){
    //var tempJson = JSON.parse(document.getElementById("modalHeader").getAttribute('data'))
    window.console.log(tempThis.getAttribute("data"))
    var tempJson = JSON.parse(tempThis.getAttribute("data"))
    document.getElementById('dragNDropper').innerHTML = "";
    document.getElementById('appNameInput').value = tempJson.appname;

    for (var i =0; i < tempJson.units.length; i++)
    {
        var smallJson = tempJson.units[i];
        if(smallJson.pre == "")
        {
            var div = document.createElement("div");
            var post = smallJson.post
            div.setAttribute('id', name);
            div.setAttribute('class', "simpleService");
            div.innerHTML = "<text id = '" + post + "'style = 'font-size: 18'>" + post + "(</text><input style = 'width: 20;' type='text' id='" + post +"param'><text style = 'font-size: 18'>)</text>"
            document.getElementById('dragNDropper').appendChild(div);
            document.getElementById(post + "param").value = smallJson.postpara;
        }
        else
        {
            var pre = smallJson.pre;
            var post = smallJson.post;
            var div3 = document.createElement("div");
            div3.setAttribute('id', "conditional");
            div3.setAttribute('class', 'simpleConditional');
            div3.innerHTML = "<text style = 'font-size: 18'>IF</text><div><div id = 'ifInput' style = 'height: 30; width: 350; border: 1px solid #222222;'><text id = '" + pre + "'style = 'font-size: 18'>" + pre + "(</text><input style = 'width: 20;' type='text' id='" + pre +"param' value = " + smallJson.prepara + "><text style = 'font-size: 18'>) = </text><input style = 'width: 40;' type='text' id='" + pre +"param' value = " + smallJson.value + "></div></div><p></p> <div style='height: 18; min-width: 30;'> <text style = 'font-size: 18;'>THEN</text> </div><div><div style = 'height: 30; width: 350; border: 1px solid #aaaaaa;' ><text id = '" + post + "'style = 'font-size: 18'>" + post + "(</text><input style = 'width: 20;' type='text' id='" + post +"param' value = " + smallJson.postpara + "><text style = 'font-size: 18'>)</text></div></div>"
            document.getElementById('dragNDropper').appendChild(div3);
        }
    }
    openTab(tempThis, 'Recipe')
}


function handleClick(tempThis){
    let me = this;
    timer = setTimeout(function() {
        if (!prevent) {
            me.doClickAction(tempThis);
        }
        prevent = false;
    }, delay);
}
function handleDoubleClick(tempThis){
    clearTimeout(timer);
    prevent = true;
    this.doDoubleClickAction(tempThis);
}

function openTab(evt, tabName) {
// Declare all variables
    var i, tabcontent, tablinks;

// Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

// Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

// Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(tabName).style.display = "block";
//evt.currentTarget.className += " active";
}

document.getElementById("defaultOpen").click();
//Get all information about things
var httpRequest0 = new XMLHttpRequest();
httpRequest0.open('GET', 'http://localhost:8080/getThing', true);
httpRequest0.send();
httpRequest0.onreadystatechange = function () {
    if (httpRequest0.readyState == 4 && httpRequest0.status == 200) {
        var json = httpRequest0.responseText;
        var arr = JSON.parse(json);
        for(var i = 0; i < arr.length; i++)
        {
            console.log(arr[i]);
            addThing(arr[i].thing_id, arr[i].name, arr[i].owner, arr[i].vendor, arr[i].model, arr[i].release, arr[i].type, arr[i].os, arr[i].description, arr[i].comments);
        }
    }
};

//Get all information about services
var httpRequest1 = new XMLHttpRequest();
httpRequest1.open('GET', 'http://localhost:8080/getService', true);
httpRequest1.send();
httpRequest1.onreadystatechange = function () {
    if (httpRequest1.readyState == 4 && httpRequest1.status == 200) {
        var json = httpRequest1.responseText;
        var arr = JSON.parse(json);
        for(var i = 0; i < arr.length; i++)
        {
            console.log(arr[i]);
            addService(arr[i].name, arr[i].appcategory, arr[i].type, arr[i].keywords, arr[i].description, arr[i].thing_id);
        }
    }
};
//Get all information about relationships
var httpRequest2 = new XMLHttpRequest();
httpRequest2.open('GET', 'http://localhost:8080/getRelationship', true);
httpRequest2.send();
httpRequest2.onreadystatechange = function () {
    if (httpRequest2.readyState == 4 && httpRequest2.status == 200) {
        var json = httpRequest2.responseText;
        var arr = JSON.parse(json);
        for(var i = 0; i < arr.length; i++)
        {
            console.log(arr[i]);
            addRelationship(arr[i].name, arr[i].establisher, arr[i].description);
        }
    }
};
//Get all apps
var httpRequest3 = new XMLHttpRequest();
httpRequest3.open('GET', 'http://localhost:8080/getApps', true);
httpRequest3.send();
httpRequest3.onreadystatechange = function () {
    if (httpRequest3.readyState == 4 && httpRequest3.status == 200) {
        var json = httpRequest3.responseText;
        var arr = JSON.parse(json);
        for(var i = 0; i < arr.length; i++)
        {
            console.log(arr[i]);
            addAvailApp(arr[i].appName, arr[i].originJson);
        }
    }
};

setSmartSpaceInfo("SmartSpaceGroup5", "Group5", "", "This is smart space of group5");
// addThing("123456", "Hey look this is the name", "I am the owner", "I made this thing", "I used to be a model", "release me!!", "I'm not your type", "This is a hard class", "I really don't want to describe this thing", "No comment");
// addThing("1234567", "Hey look this is the name", "I am the owner", "I made this thing", "I used to be a model", "release me!!", "I'm not your type", "This is a hard class", "I really don't want to describe this thing", "No comment");
// addThing("12345678", "Hey look this is the name", "I am the owner", "I made this thing", "I used to be a model", "release me!!", "I'm not your type", "This is a hard class", "I really don't want to describe this thing", "No comment");
// addThing("123456789", "Hey look this is the name", "I am the owner", "I made this thing", "I used to be a model", "release me!!", "I'm not your type", "This is a hard class", "I really don't want to describe this thing", "No comment");
// addService("Service name here1", "just a category", "Definitely not my type", "hey look a keyword", "Here is a real quick description", "Ziwei00");
// addService("Service name here2", "just a category", "Definitely not my type", "hey look a keyword", "Here is a real quick description", "Qihao03");
// addService("Service name here3", "just a category", "Definitely not my type", "hey look a keyword", "Here is a real quick description", "Haocheng01");
// addService("Service name here4", "just a category", "Definitely not my type", "hey look a keyword", "Here is a real quick description", "Andrew02");
// addRelationship("Andrew02", "Haocheng01", "This is a short description of the child");
// addRelationship("Ziwei00", "TestChild", "This is a short description of the child");
// addRelationship("Qihao03", "TestChild", "This is a short description of the child");
// addRelationship("Haocheng01", "TestChild", "This is a short description of the child");
// addRelationship("AndrewsRelationship", "Andrew", "This is a short description of the child");
// addRelationship("ZiweiRelationship", "Ziwei", "This is a short description of the child");
// addRelationship("QihaoRelationship", "Qihao", "This is a short description of the child");
// addRelationship("HaochengRelationship", "Haocheng", "This is a short description of the child");
// setSmartSpaceInfo("A test SS id", "A test SS name", "A test SS location", "a test SS description");