var listOfData = []; 

var input = document.getElementById("input"); 
var todo = document.getElementById("todo"); 

document.getElementById("button").onclick = click; 


function click() {
    if (input.value.trim() !== "") {

        listOfData.push(input.value);
        console.log(listOfData);
        input.value = ""; 
        showList(); 
    } else {
        alert("Please enter a valid item.");
    }
}


function showList() {
    todo.innerHTML = ""; 

    listOfData.forEach(function (n, i) {
        
        var li = document.createElement("li");

        
        li.textContent = n;

        
        var editLink = document.createElement("a");
        editLink.textContent = " Edit ";
        editLink.href = "#";
        editLink.onclick = function () {
            edit(i);
        };

        
        var deleteLink = document.createElement("a");
        deleteLink.textContent = " Delete";
        deleteLink.href = "#";
        deleteLink.onclick = function () {
            del(i);
        };

        
        li.appendChild(editLink);
        li.appendChild(deleteLink);

        
        todo.appendChild(li);
    });
}


function edit(i) {
    var newVal = prompt("Please insert new value:", listOfData[i]);
    if (newVal !== null) {
        listOfData[i] = newVal; 
        showList(); 
    }
}


function del(i) {
    listOfData.splice(i, 1);
    showList(); 
}
