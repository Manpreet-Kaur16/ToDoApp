//console.log("hello world!!!");
let addbtnElement = document.getElementById("addbtn");
let inputFieldElement = document.getElementById("inputField");
let checkboxFieldElement = document.getElementById("checkboxField");
let errormessageElement = document.getElementById("errorMessage");
let todoContainerElement = document.getElementById("toDoContainer");
let toDos = [];
addbtnElement.addEventListener("click", () => {
  let toDoshtml = "";
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
  toDos.push(userInputobj);
  inputFieldElement.style.border = "1px solid ";
  errormessageElement.style.display = "none";

  console.log(toDos);
  inputFieldElement.value = "";
  
  toDos.forEach((toDo, index) => {
    toDoshtml += `<div
        class="flex items-center justify-between bg-gray-100 w-[600px] mt-4 px-4 py-2 mx-auto"
      >
        <div>
          <input id="checkboxField" type="checkbox" />
                 
          <span class= "${
            toDo.isCompleted ? "checked bg-green-200 text-green-700" : ""
          }">
           ${toDo.title}</span>

        </div>
        <div>
          <button id="editbtn" class="bg-purple-800 text-white rounded px-4 py-1">
            Edit
          </button>
          <button
            id="deletebtn"
            class="bg-red-800 text-white rounded px-4 py-1"
          >
            Delete
          </button>
        </div>

        
      </div>`;
  });
  console.log(toDoshtml);
  todoContainerElement.innerHTML = toDoshtml;
});
