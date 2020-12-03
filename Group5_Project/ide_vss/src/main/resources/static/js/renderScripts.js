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
    div.innerHTML = document.getElementById('serviceTemplate').innerHTML;
    document.getElementById('Services').appendChild(div);
    var theService = document.getElementById(name.concat(owner));
    for (var i = 0; i < theService.childNodes.length; i++) {
        if (theService.childNodes[i].className == "thingContainer")
        {
            for (var j = 0; j < theService.childNodes[i].childNodes.length; j++) {
                if (theService.childNodes[i].childNodes[j].className == "name")
                    theService.childNodes[i].childNodes[j].innerHTML = name;
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

function addRelationship(parent, child, description)
{
    var div = document.createElement('div');
    div.setAttribute('id', parent.concat(child));
    div.innerHTML = document.getElementById('relationshipTemplate').innerHTML;
    document.getElementById('Relationships').appendChild(div);
    var theService = document.getElementById(parent.concat(child));
    for (var i = 0; i < theService.childNodes.length; i++) {
        if (theService.childNodes[i].className == "thingContainer")
        {
            for (var j = 0; j < theService.childNodes[i].childNodes.length; j++) {
                if (theService.childNodes[i].childNodes[j].className == "parent")
                    theService.childNodes[i].childNodes[j].innerHTML = parent;
                if (theService.childNodes[i].childNodes[j].className == "child")
                    theService.childNodes[i].childNodes[j].innerHTML = child;
                if (theService.childNodes[i].childNodes[j].className == "description")
                    theService.childNodes[i].childNodes[j].innerHTML = description;
            }
        }
    }
}



// Get the modal
var modal = document.getElementById("myModal");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

function makeModal(caller)
{
    modal.style.display = "block";
    window.console.log(caller.innerHTML);
    document.getElementById("modalHeader").innerText = caller.innerHTML;
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

function testParse()
{
    var testArray = [{"id":"12136717","name":"just a name","owner":"just a owner","vendor":"just a vendor1","model":"just a model","release":"just a release","type":"just a type","description":"just a des","comments":"just a comment","os":"just a OS"},{"id":"1213671237","name":"just a name","owner":"just a owner","vendor":"just a vendor2","model":"just a model","release":"just a release","type":"just a type","description":"just a des","comments":"just a comment","os":"just a OS"},{"id":"423255","name":"just a name","owner":"just a owner","vendor":"just a vendor3","model":"just a model","release":"just a release","type":"just a type","description":"just a des","comments":"just a comment","os":"just a OS"}];
    for(var i = 0; i < testArray.length; i++)
    {
        window.console.log(testArray[i].vendor);
    }
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
evt.currentTarget.className += " active";
}
document.getElementById("defaultOpen").click();

//Get all information about things
var httpRequest = new XMLHttpRequest();
httpRequest.open('GET', 'http://localhost:8080/getThing', true);
httpRequest.send();
httpRequest.onreadystatechange = function () {
    if (httpRequest.readyState == 4 && httpRequest.status == 200) {
        var json = httpRequest.responseText;
        var arr = JSON.parse(json);
        for(var i = 0; i < arr.length; i++)
        {
            console.log(arr[i]);
            addThing(arr[i].id, arr[i].name, arr[i].owner, arr[i].vendor, arr[i].model, arr[i].release, arr[i].type, arr[i].os, arr[i].description, arr[i].comments);
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
            addService(arr[i].name, arr[i].category, arr[i].type, arr[i].keywords, arr[i].description, arr[i].owner);
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
            addRelationship(arr[i].parent, arr[i].child, arr[i].description);
        }
    }
};
// addThing("123456", "Hey look this is the name", "I am the owner", "I made this thing", "I used to be a model", "release me!!", "I'm not your type", "This is a hard class", "I really don't want to describe this thing", "No comment");
// addThing("1234567", "Hey look this is the name", "I am the owner", "I made this thing", "I used to be a model", "release me!!", "I'm not your type", "This is a hard class", "I really don't want to describe this thing", "No comment");
// addThing("12345678", "Hey look this is the name", "I am the owner", "I made this thing", "I used to be a model", "release me!!", "I'm not your type", "This is a hard class", "I really don't want to describe this thing", "No comment");
// addThing("123456789", "Hey look this is the name", "I am the owner", "I made this thing", "I used to be a model", "release me!!", "I'm not your type", "This is a hard class", "I really don't want to describe this thing", "No comment");
// addService("Service name here", "just a category", "Definitely not my type", "hey look a keyword", "Here is a real quick description", "Thing 123456");
// addService("Service name here", "just a category", "Definitely not my type", "hey look a keyword", "Here is a real quick description", "Thing 1234567");
// addService("Service name here", "just a category", "Definitely not my type", "hey look a keyword", "Here is a real quick description", "Thing 12345678");
// addService("Service name here", "just a category", "Definitely not my type", "hey look a keyword", "Here is a real quick description", "Thing 123456789");
// addRelationship("TestParent", "TestChild", "This is a short description of the child");
// addRelationship("TestParent2", "TestChild", "This is a short description of the child");
// addRelationship("TestParent3", "TestChild", "This is a short description of the child");
// testParse();