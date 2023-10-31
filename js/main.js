const form = document.querySelector(".form");
const dialog = document.querySelector(".dialog");
const inputElements = document.querySelectorAll("input");
const errorElements = document.querySelectorAll(".error");
const inputFields = Array.from(inputElements);

const errorObjects = {};

function showAlert() {
  dialog.style.display = "block";
}

function closeAlert() {
  dialog.style.display = "none";
}

function showError() {
  /**
   * convert NodeList to Array
   */
  const errors = Array.from(errorElements);

  errors.forEach((error) => {
    const errorClassName = error.className.replace("error ", "");

    /**
     * check error property is exist or not
     */
    if (errorObjects.hasOwnProperty(errorClassName)) {
      error.innerHTML = errorObjects[errorClassName];
    } else {
      error.innerHTML = "";
    }
  });
}

form.addEventListener("submit", function (e) {
  /**
   * disable browser's default behavior
   */
  e.preventDefault();

  inputFields.forEach((element) => {
    /**
     * check input field is blank than create error object
     */
    if (element.value == "") {
      errorObjects[element.name] = element.name + " fields is required.";
    }
  });

  /**
   * check two type password
   */
  if (inputFields[2].value !== inputFields[3].value) {
    errorObjects[inputFields[3].name] = "Password is not match.";
  }

  /**
   * check error object is empty
   */
  const errorLength = Object.values(errorObjects).filter((el) => el != "");
  /**
   * if there are no error then will show success alert
   */
  if (errorLength.length == 0) {
    showAlert();
    e.target.reset();
  }
  /**
   * error ui update
   */
  showError();
});

inputFields.forEach((inputField) => {
  inputField.addEventListener("change", function (e) {
    /**
     * input value change time error object is empty
     */
    errorObjects[e.target.name] = "";
    /**
     * error ui update
     */
    showError();
  });
});
