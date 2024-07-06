function GetStudents(){
    $.ajax({
        url: env + `/students`,
        method: "GET",
        contentType: "application/json",
        success: function (response) {
           LoadPeople(response);
        },
        error: function (error) {
            console.log(error);
        }
    })
}

function GetTeachers(){
    $.ajax({
        url: env + `/teachers`,
        method: "GET",
        contentType: "application/json",
        success: function (response) {
           LoadPeople(response);
        },
        error: function (error) {
            console.log(error);
        }
    })
}

function GetEntriesByPerson(name){
    $.ajax({
        url: env + `/vehicleEntries/entriesByPerson?name=${name}`,
        method: "GET",
        contentType: "application/json",
        success: function (response) {
           LoadTable(response);
        },
        error: function (error) {
            console.log(error);
        }
    })
}

function LoadPeople(response){
    let list = document.querySelector('.personal-list');
    list.innerHTML = "";

    response.forEach(person => {
        let li = personalModel.cloneNode(true);
        let className = person.name.split(" ").join("-");
        li.querySelector('.person-name').innerText = person.name;
        li.querySelector('.person-id').innerText = person.studentId ? person.studentId : "NA";
        li.querySelector('.person-rfid').innerText = person.rfidId;
        li.querySelector('.show-entries').classList.add(className);
        li.querySelector('.entries-info').classList.add("person-" + className);
        li.querySelector('.' + className).addEventListener("click", function(e){
            var elementInfo = li.querySelector(".person-" + className);
            elementInfo.style.display = elementInfo.style.display == "none" ? "block" : "none";
            GetEntriesByPerson(person.name);
        })
        list.appendChild(li);
    })
}

function LoadTable(response){
    let list = document.querySelector('.table-entries');
    list.innerHTML = "";

    response.forEach(entry => {
        let li = tableModel.cloneNode(true);
        li.querySelector('.entry-id').innerText = entry._id;
        li.querySelector('.entry-date').innerText = entry.date;
        li.querySelector('.entry-hour').innerText = entry.time;
        li.querySelector('.entry-car').innerText = entry.person.vehicle.model;
        li.querySelector('.entry-plate').innerText = entry.person.vehicle.plate;
        list.appendChild(li);
    })
}