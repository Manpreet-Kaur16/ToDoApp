//console.log("hello world!!!");
let addbtnElement = document.getElementById("addbtn");
let clearbtnElement = document.getElementById("clearbtn");
let inputFieldElement = document.getElementById("inputField");
let checkboxFieldElement = document.getElementById("checkboxField");
let errormessageElement = document.getElementById("errorMessage");
let todoContainerElement = document.getElementById("toDoContainer");
let inputfromlocalStroage = localStorage.getItem("toDosArray");
let inputfromlocalStroageButParsed = JSON.parse(inputfromlocalStroage);
let toDos = inputfromlocalStroageButParsed || [];

function displaytoDos(toDos) {
  let toDoshtml = "";
  toDos?.forEach((toDo, index) => {
    toDoshtml += `<div
        class="flex items-center justify-between bg-gray-100 w-[600px] mt-4 px-4 py-2 mx-auto"
      >
        <div>
          <input class= "checkboxField" type="checkbox" />
                 
          <span class= "${
            toDo.isCompleted ? "checked bg-green-200 text-green-700" : ""
          }">
           ${toDo.title}</span>

        </div>
        <div>
          <button class="editbtn bg-purple-800 text-white rounded px-4 py-1">
            Edit
          </button>
          <button
            class="deletebtn bg-red-800 text-white rounded px-4 py-1"
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
      console.log("checkbox is clicked");
    });
  });

  let editButtons = document.querySelectorAll(".editbtn");
  console.log(editButtons);
  editButtons.forEach((editbutton) => {
    editbutton.addEventListener("click", () => {
      console.log("click edit button");
    });
  });

  let deleteButtons = document.querySelectorAll(".deletebtn");
  deleteButtons.forEach((deleteButton) => {
    deleteButton.addEventListener("click", () => {
      console.log("you hit Delete button");
    });
  });
}

console.log(inputfromlocalStroage, inputfromlocalStroageButParsed);
displaytoDos(inputfromlocalStroageButParsed);
addbtnElement.addEventListener("click", () => {
  console.log(inputFieldElement.value);
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

  clearbtnElement.addEventListener("click", () => {
    localStorage.clear();
    window.location.reload();
  });
  toDos.push(userInputobj);
  inputFieldElement.style.border = "1px solid ";
  errormessageElement.style.display = "none";
  let userString = JSON.stringify(toDos);
  localStorage.setItem("toDosArray", userString);
  console.log(toDos);
  inputFieldElement.value = "";
  displaytoDos(toDos);
});
