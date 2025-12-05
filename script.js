//console.log("hello world!!!");
let addbtnElement = document.getElementById("addbtn");
let clearbtnElement = document.getElementById("clearbtn");
let inputFieldElement = document.getElementById("inputField");
let checkboxFieldElement = document.getElementById("checkboxField");
let errormessageElement = document.getElementById("errorMessage");
let todoContainerElement = document.getElementById("toDoContainer");
let selectElement = document.getElementsByClassName(".status");
let selectedField = document.getElementsByName("status");
let sortedElement = document.getElementById("sortBy");
let newInputField = document.getElementById("userInput");
let clearSearchButton = document.getElementById("clearSearch");
let inputfromlocalStroage = localStorage.getItem("toDosArray");
let inputfromlocalStroageButParsed = JSON.parse(inputfromlocalStroage);
let toDos = inputfromlocalStroageButParsed || [];
console.log(sortedElement);
function toggleCompleteCheckbox(toDoid, checked) {
  let updatedtoDos = toDos.map((toDo) => {
    if (toDo.id == toDoid) {
      return {
        ...toDo,
        isCompleted: checked,
      };
    }

    return toDo;
  });
  toDos = updatedtoDos;
  let updatedtoDosString = JSON.stringify(updatedtoDos);
  localStorage.setItem("toDosArray", updatedtoDosString);
  displaytoDos(updatedtoDos);
}

function editToDo(toDoid) {
  let toDosAfterEdit = toDos.find((toDo) => {
    if (toDo.id == toDoid) {
      return toDo;
    }
  });
  console.log(toDosAfterEdit);
  const updatedTitleValue = prompt("Edit todo:", toDosAfterEdit.title);

  if (updatedTitleValue) {
    const updatedtoDos = toDos.map((toDo) => {
      if (toDo.id == toDoid) {
        return {
          ...toDo,
          title: updatedTitleValue,
        };
      }
      return toDo;
    });
    toDos = updatedtoDos;
    let updatedtoDosString = JSON.stringify(updatedtoDos);
    localStorage.setItem("toDosArray", updatedtoDosString);
    displaytoDos(updatedtoDos);
  }
}

function deleteToDo(id) {
  let toDosAfterDelete = toDos.filter((toDo) => {
    if (toDo.id != id) {
      return toDo;
    }
  });
  toDos = toDosAfterDelete;
  let userString = JSON.stringify(toDosAfterDelete);
  localStorage.setItem("toDosArray", userString);
  //console.log(toDosAfterDelete);
  displaytoDos(toDosAfterDelete);
}

function displaytoDos(toDosData) {
  //console.log(toDosData);
  let toDoshtml = "";
  toDosData?.forEach((toDo, index) => {
    toDoshtml += `<div
        class="flex items-center justify-between bg-gray-100 w-[600px] mt-4 px-4 py-2 mx-auto"
      >
        <div>
          <input class= "checkboxField" type="checkbox" data-id = "${
            toDo.id
          }" ${toDo.isCompleted ? "checked" : ""} />
                 
          <span class 
          
          
          = "${toDo.isCompleted ? "line-through" : ""}">${toDo.title}</span>

        </div>
        <div>
          <button class="editbtn bg-purple-800 text-white rounded px-4 py-1" data-id ="${
            toDo.id
          }">
            Edit
          </button>
          <button
            class="deletebtn bg-red-800 text-white rounded px-4 py-1" 
            data-id="${toDo.id}"
          >
            Delete
          </button>
        </div> 
      </div>`;
  });
  todoContainerElement.innerHTML = toDoshtml;

  let checkboxFields = document.querySelectorAll(".checkboxField");
  checkboxFields.forEach((checkboxField) => {
    checkboxField.addEventListener("change", () => {
      let toDoid = checkboxField.getAttribute("data-id");
      console.log("checkbox", toDoid);
      toggleCompleteCheckbox(toDoid, checkboxField.checked);
    });
  });

  let selectedElements = document.querySelector(".status");
  selectedElements.addEventListener("change", () => {
    //console.log("selectedElements", selectedElements.value);
    let filteredData = toDos;
    if (selectedElements.value == "complete") {
      filteredData = toDos.filter((toDo) => toDo.isCompleted == true);
      // console.log(filteredData);
    }
    if (selectedElements.value == "incomplete") {
      filteredData = toDos.filter((toDo) => toDo.isCompleted == false);
      //console.log(filteredData);
    }
    displaytoDos(filteredData);
  });

  let selectedField = document.querySelectorAll("input[name=status]");
  selectedField.forEach((radiobutton) => {
    radiobutton.addEventListener("click", () => {
      let filteredData = toDos;
      if (radiobutton.value == "complete") {
        filteredData = toDos.filter((toDo) => toDo.isCompleted == true);
      }
      if (radiobutton.value == "incomplete") {
        filteredData = toDos.filter((toDo) => toDo.isCompleted == false);
      }
      displaytoDos(filteredData);
    });
  });

  // sorted data//
  sortedElement.addEventListener("change", () => {
    if (sortedElement.value == "sortA-Z") {
      toDos.sort((a, b) => a.title.localeCompare(b.title));

      console.log("\n\n\n................sort by title...........", toDos);
    }

    if (sortedElement.value == "sortID") {
      toDos.sort((a, b) => a.id - b.id);
    }
    displaytoDos(toDos);
  });

  // search //

  newInputField.addEventListener("blur", () => {
    console.log(newInputField.value);
    let filteredData = toDos.filter((toDo) => {
      if (
        toDo.title.toLowerCase().includes(newInputField.value.toLowerCase())
      ) {
        return toDo;
      }
    });
    console.log(filteredData);
    displaytoDos(filteredData);
  });
  // clear search text//

  clearSearchButton.addEventListener("click", () => {
    newInputField.value = "";
    displaytoDos(toDos);
  });

  let editButtons = document.querySelectorAll(".editbtn");

  editButtons.forEach((editButton) => {
    editButton.addEventListener("click", () => {
      let toDoid = editButton.getAttribute("data-id");
      console.log("click edit button", toDoid);
      editToDo(toDoid);
    });
  });

  let deleteButtons = document.querySelectorAll(".deletebtn");
  deleteButtons.forEach((deleteButton) => {
    deleteButton.addEventListener("click", () => {
      let toDoid = deleteButton.getAttribute("data-id");
      deleteToDo(toDoid);
    });
  });
}

displaytoDos(inputfromlocalStroageButParsed);

addbtnElement.addEventListener("click", () => {
  let userInput = inputFieldElement.value;
  let userInputobj = {
    // id: window.crypto.randomUUID(), //
    id: toDos.length,
    title: userInput,
    isCompleted: false,
  };

  if (userInput == "") {
    inputFieldElement.style.border = "2px solid red";
    errormessageElement.style.display = "block";

    // alert("please enter value");
    return false;
  }

  toDos.push(userInputobj);
  inputFieldElement.style.border = "1px solid ";
  errormessageElement.style.display = "none";
  let userString = JSON.stringify(toDos);
  localStorage.setItem("toDosArray", userString);
  inputFieldElement.value = "";
  displaytoDos(toDos);
});

clearbtnElement.addEventListener("click", () => {
  localStorage.clear();
  window.location.reload();
});
