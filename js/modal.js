const form = document.getElementById("modal-form");
const nameInput = document.getElementById("full-name");
const emailInput = document.getElementById("email");
const nameError = document.getElementById("name-error");
const emailError = document.getElementById("email-error");

function getNameError(value) {
    const name = value.trim();

    if (name === "") {
        return "Please enter your full name";
    }

    const words = name.split(/\s+/);


    const lettersOnly = words.every(function (word) {
        return /^\p{L}[\p{L}'’-]*$/u.test(word);
    });
    if (!lettersOnly) {
        return "Name can only contain letters";
    }

    if (words.length < 2) {
        return "Name must contain 2 words";
    }

    return "";
}


function getEmailError(value) {
    const email = value.trim();

    if (email === "") {
        return "Please enter your email";
    }
    if (!email.includes("@")) {
        return "Email must contain @";
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
        return "Enter a valid email, like name@example.com";
    }

    return "";
}

function showError(input, errorElement, message) {
    errorElement.textContent = message;
    input.classList.toggle("invalid", message !== "");
    input.setAttribute("aria-invalid", message !== "" ? "true" : "false");
}

function validateField(input, errorElement, getError) {
    const message = getError(input.value);
    showError(input, errorElement, message);
    return message === "";
}

const validateName = function () {
    return validateField(nameInput, nameError, getNameError);
};
const validateEmail = function () {
    return validateField(emailInput, emailError, getEmailError);
};

nameInput.addEventListener("blur", validateName);
emailInput.addEventListener("blur", validateEmail);

nameInput.addEventListener("input", function () {
    if (nameInput.classList.contains("invalid")) validateName();
});
emailInput.addEventListener("input", function () {
    if (emailInput.classList.contains("invalid")) validateEmail();
});

form.addEventListener("submit", function (event) {
    event.preventDefault();

    const nameOk = validateName();
    const emailOk = validateEmail();

    if (!nameOk) {
        nameInput.focus();
        return;
    }
    if (!emailOk) {
        emailInput.focus();
        return;
    }

    form.reset();
    showError(nameInput, nameError, "");
    showError(emailInput, emailError, "");
    showPopup();
});


const popup = document.getElementById("popup");
const popupOk = document.getElementById("popup-ok");

function showPopup() {
    popup.classList.add("show");
    popup.setAttribute("aria-hidden", "false");
    popupOk.focus();
}

function hidePopup() {
    popup.classList.remove("show");
    popup.setAttribute("aria-hidden", "true");
    nameInput.focus();
}

popupOk.addEventListener("click", hidePopup);

popup.addEventListener("click", function (event) {
    if (event.target === popup) hidePopup();
});

document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && popup.classList.contains("show")) hidePopup();
});
