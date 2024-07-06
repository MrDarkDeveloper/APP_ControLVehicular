function getEntries(type) {
    $.ajax({
        url: env + `/vehicleEntries?type=${type}`,
        method: "GET",
        contentType: "application/json",
        success: function (response) {
            loadData(response);
        },
        error: function (error) {
            console.log(error);
        }
    })
}

function getStudentEntries() {
    $.ajax({
        url: env + "/vehicleEntries/studentEntries",
        method: "GET",
        contentType: "application/json",
        success: function (response) {
            loadData(response);
        },
        error: function (error) {
            console.log(error);
        }
    })
}

function getTeacherEntries() {
    $.ajax({
        url: env + "/vehicleEntries/teacherEntries",
        method: "GET",
        contentType: "application/json",
        success: function (response) {
            loadData(response);
        },
        error: function (error) {
            console.log(error);
        }
    })
}

function getVisitEntries() {
    $.ajax({
        url: env + "/vehicleEntries/visitEntries",
        method: "GET",
        contentType: "application/json",
        success: function (response) {
            loadData(response);
        },
        error: function (error) {
            console.log(error);
        }
    })
}

function getEntriesByName(value, type) {
    $.ajax({
        url: env + `/vehicleEntries/filter?word=${value}&type=${type}`,
        method: "GET",
        contentType: "application/json",
        success: function (response) {
            console.error(response);
            loadData(response);
            console.log(actualView);
        },
        error: function (error) {
            console.log(error);
        }
    })
}

function getEntriesByHour(start, end, type) {
    $.ajax({
        url: env + `/vehicleEntries/filterByHour?start=${start}&end=${end}&type=${type}`,
        method: "GET",
        contentType: "application/json",
        success: function (response) {
            loadData(response);
        },
        error: function (error) {
            console.log(error);
        }

    })
}

function getEntriesByDate(date, type){
    $.ajax({
        url: env + `/vehicleEntries/filterByDate?date=${date}&type=${type}`,
        method: "GET",
        contentType: "application/json",
        success: function (response) {
            loadData(response);
        },
        error: function (error) {
            console.log(error);
        }
    })
}

function getEntriesByDateTime(start, end, type, date) {
    $.ajax({
        url: env + `/vehicleEntries/filterByDateTime?start=${start}&end=${end}&type=${type}&date=${date}`,
        method: "GET",
        contentType: "application/json",
        success: function (response) {
            loadData(response);
        },
        error: function (error) {
            console.log(error);
        }

    })
}


function loadData(data) {
    let ul = document.querySelector('.entries-list');
    ul.innerHTML = "";

    data.forEach(entry => {
        let li = entryModel.cloneNode(true);
        var classAdd = entry.person.name.split(" ").join("-");
        li.querySelector('.nombre').innerText = entry.person.name;
        li.querySelector('.tipo').innerText = entry.type;
        li.querySelector('.hora').innerText = entry.time;
        if (entry.type == "Visit") {
            li.querySelector('.student-teacher').style.display = "none";
            li.querySelector('.visit').style.display = "flex";
            li.querySelector('.visit-name').innerText = entry.person.name;
            li.querySelector('.visit-model').innerText = entry.person.carModel;
            li.querySelector('.visit-reason').innerText = entry.person.reason;
        }
        else{
            li.querySelector('.visit').style.display = "none";
            li.querySelector('.student-teacher').style.display = "flex";
            var matricula = li.querySelector('.matricula-p');
            entry.type == "Student" ? matricula.style.display = "block" : "none";
            li.querySelector('.matricula').innerText = entry.person.studentId;
            li.querySelector('.carrera').innerText = entry.person.career;
            li.querySelector('.area').innerText = entry.person.area;
            li.querySelector('.modelo').innerText = entry.person.vehicle.model;
            li.querySelector('.placa').innerText = entry.person.vehicle.plate;
            li.querySelector('.color').innerText = entry.person.vehicle.color;

        }
        li.querySelector('.show-info').classList.add(classAdd);
        li.querySelector('.element-info').classList.add("element-" + classAdd);
        li.querySelector("." + classAdd).addEventListener('click', function (e) {
            var elementInfo = li.querySelector(".element-" + classAdd);
            elementInfo.style.display = elementInfo.style.display == "none" ? "block" : "none";
            e.target.innerText = e.target.innerText == "Ver info" ? "Ocultar" : "Ver info";
        });
        ul.appendChild(li);
    });
}