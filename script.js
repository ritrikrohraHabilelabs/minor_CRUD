let arrForm = [];
let serialNum;
refresh();

console.log(localStorage.key("arrForm"))

function refresh() {
    if (localStorage.key("arrForm")) {
        if (document.querySelector("#clearButton").classList.contains("hidden")) {
            document.querySelector("#clearButton").classList.remove("hidden");
            document.querySelector("#emptyText").classList.add("hidden");
        }
        arrForm = JSON.parse(localStorage.getItem("arrForm"));
        if (arrForm.length >= 1) {
            dataDisplay(0, arrForm.length);
        }
    }
    else {
        if (document.querySelector("#emptyText").classList.contains("hidden")) {
            document.querySelector("#emptyText").classList.remove("hidden");
            document.querySelector("#clearButton").classList.add("hidden");
        }
    }
}

function inputCheck(e) {

    let fullNameValidation = "1234567890-_=+*-.,;'\"!@#$%^&()[]{}|<>?:`~";
    let numberValidation = "qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM-_=+*-.,;'!@#$%^&()[]{}|<>?:`~";

    if (e.name == "fullName" || e.name == "relation") {
        if (fullNameValidation.includes(e.value[e.value.length - 1])) {
            e.value = e.value.substring(0, e.value.length - 1)

        }
    }
    else if (e.name == "contactNum") {
        if (numberValidation.includes(e.value[e.value.length - 1])) {
            e.value = e.value.substring(0, e.value.length - 1);
        }
    }
}

function formSubmit(e) {
    e.preventDefault();
    let objForm = {};
    if (e.target.fullName.value == "" || e.target.contactNum.value == "" || e.target.relation.value == "") {
        alert("NO INPUT FIELDS CAN BE EMPTY");
    }
    else {
        for (let i = 0; i < e.target.elements.length; i++) {
            if (!(e.target.elements[i].type == "reset" || e.target.elements[i].type == "submit" || e.target.elements[i].type == "button")) {
                objForm = {
                    ...objForm,
                    [e.target.elements[i].name]: e.target.elements[i].value
                }
                e.target.elements[i].value = "";
            }
        }
        arrForm.push(objForm)
        localStorage.setItem("arrForm", JSON.stringify(arrForm));
        dataDisplay(arrForm.length - 1, arrForm.length);
        if (document.querySelector("#clearButton").classList.contains("hidden")) {
            document.querySelector("#clearButton").classList.remove("hidden");
            document.querySelector("#emptyText").classList.add("hidden");
        }
    }
}

function dataDisplay(start, end) {
    const tbody = document.querySelector("tbody");
    for (let i = start; i < end; i++) {
        const tr = document.createElement("tr");
        tbody.appendChild(tr);
        const td = document.createElement("td");
        td.appendChild(document.createTextNode(i + 1));
        tr.appendChild(td);
        for (let j = 0; j < Object.keys(arrForm[i]).length; j++) {
            if (Object.keys(arrForm[i])[j] != "relation") {
                const td = document.createElement("td");
                const data = document.createTextNode(Object.values(arrForm[i])[j]);
                td.appendChild(data);
                tr.appendChild(td);
            }
        }
        const actionTd = document.createElement("td");
        tr.appendChild(actionTd);

        const spanEdit = document.createElement("span");
        spanEdit.classList.add("fa-solid", "fa-pencil");
        spanEdit.setAttribute("onclick", `editFunction(${i})`);

        const spanDel = document.createElement("span");
        spanDel.classList.add("fa-solid", "fa-trash");
        spanDel.setAttribute("onclick", `delFunction(${i})`);

        actionTd.appendChild(spanEdit);
        actionTd.appendChild(spanDel);
    }
}

function editFunction(sno) {
    arrForm.filter((val, idx) => {
        return idx == sno
    }).map((val, idx) => {
        Object.keys(val).map((value, index) => {
            document.querySelector(`#${value}`).value = Object.values(val)[index]
        })
    })

    {
        if (document.querySelector("#update").classList.contains("hidden")) {
            document.querySelector("#submit").classList.toggle("hidden");
            document.querySelector("#update").classList.toggle("hidden");
        }
    }

    {
        if (document.querySelector("#update").hasAttribute("onclick")) {
            document.querySelector("#update").removeAttribute("onclick"),
                document.querySelector("#update").setAttribute("onclick", `updateFunction(${sno})`)
        }
        else {
            document.querySelector("#update").setAttribute("onclick", `updateFunction(${sno})`)
        }
    }
}

function updateFunction(sno) {
    if (document.querySelector("#fullName").value == "" || document.querySelector("#contactNum").value == "" || document.querySelector("#relation").value == "") {
        alert("NO INPUT FIELDS CAN BE EMPTY");
    }
    else {
        // console.log(document.querySelector("#fullName").value);
        let secondObj = {};
        Object.keys(arrForm[sno]).forEach((val, idx) => {
            secondObj = {
                ...secondObj,
                [val]: document.querySelector(`#${val} `).value
            }
        });
        console.log(secondObj);
        arrForm[sno] = secondObj
        localStorage.setItem("arrForm", JSON.stringify(arrForm));
        location.reload();
    }
}

function delFunction(sno) {
    if (confirm(`ARE YOU SURE YOU WANT TO DELETE SNO: ${sno + 1} `) == true) {
        if (arrForm.length == 1) {
            arrForm.splice(sno, 1);
            localStorage.removeItem("arrForm");
        }
        else {
            arrForm.splice(sno, 1);
            localStorage.setItem("arrForm", JSON.stringify(arrForm));
        }
        location.reload();
    }
}
function deleteAll() {
    if (confirm("ARE YOU SURE YOU WANT TO DELETE ALL RECORDS ? ") == true) {
        localStorage.removeItem("arrForm");
        location.reload();
    }
}