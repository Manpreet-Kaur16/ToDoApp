//console.log("hello world!!!");
let addbtnElement = document.getElementById("addbtn");
let clearbtnElement = document.getElementById("clearbtn");
let inputFieldElement = document.getElementById("inputField");
let checkboxFieldElement = document.getElementById("checkboxField");
let errorMessageElement = document.getElementById("errorMessage");
let todoContainerElement = document.getElementById("toDoContainer");
let selectElement = document.getElementsByClassName(".status");
let selectedField = document.getElementsByName("status");
let sortedElement = document.getElementById("sortBy");
let newInputField = document.getElementById("userInput");
let clearSearchButton = document.getElementById("clearSearch");
let inputfromlocalStroage = localStorage.getItem("toDosArray");
let inputfromlocalStroageButParsed = JSON.parse(inputfromlocalStroage);
let toDos = inputfromlocalStroageButParsed || [];



let urlString = window.location.search;
console.log("urlString", urlString);
let urlParams = new URLSearchParams(urlString);
let searched = urlParams.get("searchValue")
selectElement.value = searched;

console.log("urlParams after set", urlParams);
console.log("urlParams after set", urlParams.toString());
//console.log(sortedElement);
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
    toDoshtml += `<div class="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-200 flex items-center justify-between">
        <div class="flex items-center flex-1">
          <input class="checkboxField w-5 h-5 text-blue-600 rounded focus:ring-blue-500" type="checkbox" data-id="${toDo.id
      }" ${toDo.isCompleted ? "checked" : ""} />
          <span class="ml-3 text-lg ${toDo.isCompleted ? "line-through text-gray-500" : "text-gray-900"
      } transition-colors duration-200">${toDo.title}</span>
        </div>
        <div class="flex gap-2">
          <button class="editbtn bg-purple-600 hover:bg-purple-700 text-white px-3 py-1 rounded-md transition-colors duration-200 font-medium" data-id="${toDo.id
      }">
            Edit
          </button>
          <button class="deletebtn bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-md transition-colors duration-200 font-medium" data-id="${toDo.id
      }">
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

      updateQueryParam("status", "complete");
      // console.log(filteredData);
    }
    if (selectedElements.value == "incomplete") {
      filteredData = toDos.filter((toDo) => toDo.isCompleted == false);
      updateQueryParam("status", "incomplete")
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
        updateQueryParam("status", "complete")
      }
      if (radiobutton.value == "incomplete") {
        filteredData = toDos.filter((toDo) => toDo.isCompleted == false);
        updateQueryParam("status", "incomplete")
      }
      displaytoDos(filteredData);
    });
  });

  // sorted data//
  sortedElement.addEventListener("change", () => {
    if (sortedElement.value == "sortA-Z") {
      toDos.sort((a, b) => a.title.localeCompare(b.title));

      updateQueryParam("sortBy", "sortA-Z")
      console.log("\n\n\n................sort by title...........", toDos);
    }

    if (sortedElement.value == "sortID") {
      toDos.sort((a, b) => a.id - b.id);
      updateQueryParam("sortBy", "sortID")
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
        updateQueryParam("search", newInputField.value)
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

const createToDo = () => {
  let userInput = inputFieldElement.value;
  let userInputobj = {
    // id: window.crypto.randomUUID(), //
    id: toDos.length,
    title: userInput,
    isCompleted: false,
  };

  if (userInput == "") {
    inputFieldElement.style.border = "2px solid red";
    errorMessageElement.style.display = "block";

    // alert("please enter value");
    return false;
  }

  toDos.push(userInputobj);
  inputFieldElement.style.border = "1px solid ";
  errorMessageElement.style.display = "none";
  let userString = JSON.stringify(toDos);
  localStorage.setItem("toDosArray", userString);
  inputFieldElement.value = "";
  displaytoDos(toDos);
};
addbtnElement.addEventListener("click", createToDo);
inputFieldElement.addEventListener("keypress", (event) => {
  if (event.key == "Enter") {
    createToDo();
  }
});
clearbtnElement.addEventListener("click", () => {
  localStorage.clear();
  window.location.reload();
});

/**
    * Updates a specific query parameter in the current URL without reloading the page.
    * @param {string} key The parameter key.
    * @param {string} value The parameter value.
    */
function updateQueryParam(key, value) {
  const url = new URL(window.location.href);

  // Set the new parameter
  url.searchParams.set(key, value);

  // Use the History API to update the URL in the address bar
  // pushState(state object, title, URL)
  window.history.pushState({ path: url.href }, '', url.href);

  // Optional: if you don't want a new history entry, use replaceState instead:
  // window.history.replaceState({ path: url.href }, '', url.href);
}

// Example usage:
// This will change the URL from (e.g.) www.example.com?page=1 to www.example.com?page=2
// without refreshing the page.

if (searchParams.has("searchValue")) {
  // searched = searchParams.get("searchValue");
  getToDos(searched);
}

function displayErrors(errors) {
  let html = errors.map(error => {
    return `<p class="text-red-600 text-sm mt-1">${error.message}</p>`
  }).join("");

  errorMessageElement.innerHTML = html;

}
