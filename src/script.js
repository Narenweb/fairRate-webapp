import './sass/main.scss';
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import './fetch';
document.addEventListener('DOMContentLoaded', () => {
    //layout shifiting functionality and form validation
    const firstName = document.getElementById('firstName');
    const secondName = document.getElementById('SecondName');
    const btn = document.getElementById('submit-btn');
    const heroSection = document.querySelector(".hero-section");
    const formSection = document.querySelector(".form-section");
    const resultSection = document.querySelector(".result-section");
    const filterResultSection = document.querySelector(".filter-result-section");
    const documentSection = document.querySelector(".document-section");
    const processSection = document.querySelector(".process-section");
    const dashboardSection = document.querySelector(".dashboard-section");
    const homeButton = document.querySelector(".home-route");
    const app = document.querySelector(".app");

    //Second section validation
    const address = document.getElementById("address");
    const email = document.getElementById("email");
    const formBtn = document.getElementById('submit-form-btn');
    const datePicker = document.getElementById('date-picker');
    const dropDownInput = document.getElementById('dropdownInput');

    homeButton.addEventListener('click', () => {
        heroSection.classList.remove("hide-section");
        homeButton.style.color = "#000";
        app.style.color = "#919eab";
        formSection.classList.add("hide-section");
        documentSection.classList.add("hide-section");
        resultSection.classList.add("hide-section");
        filterResultSection.classList.add("hide-section");
        processSection.classList.add("hide-section");
        dashboardSection.classList.add("hide-section");

        localStorage.removeItem("userWasOnCurrentSection");
    });

    //hero to form section
    btn.addEventListener('click', (e) => {
        e.preventDefault();

        if (inputValidate()) {
            heroSection.classList.add("hide-section");
            documentSection.classList.add("hide-section");
            formSection.classList.remove("hide-section");
            localStorage.setItem("userWasOnCurrentSection", "form");
        }
    });

     //form to document btn
     formBtn.addEventListener('click', (e) => {
        e.preventDefault();
        validateRadioButtons();

        if (inputFormValidate()) {
            formSection.classList.add("hide-section");
            documentSection.classList.remove("hide-section");
            localStorage.removeItem("userWasOnCurrentSection");
            localStorage.setItem("userWasOnCurrentSection", "document");
        }
            // Get form data
            const formData = {
                date: document.getElementById('date-picker').value,
                address: document.getElementById('address').value,
                email: document.getElementById('email').value,
                timePeriod:document.getElementById('dropdownInput').value,
            };
            localStorage.setItem('formData', JSON.stringify(formData));

    });
    // const storedFormData = localStorage.getItem("formData");
    // if (storedFormData) {
    //     const formData = JSON.parse(storedFormData);
    //     document.getElementById("date-picker").value = formData.datePicker;
    //     document.getElementById("address").value = formData.address;
    //     document.getElementById("email").value = formData.email;
    //     document.getElementById("dropdownInput").value = formData.timePeriod;
    //     // Populate other form fields here
    // }

    //form to home back btn
    const backBtnHome = document.querySelector('#back-btn-home');
    backBtnHome.addEventListener("click", () => {
        formSection.classList.add("hide-section");
        heroSection.classList.remove("hide-section");
        console.log("clicked");
        localStorage.setItem("userWasOnCurrentSection", "hero");
    })

    //document to form back btn
    const backBtn = document.querySelector('#back');
    backBtn.addEventListener("click", () => {
        documentSection.classList.add("hide-section");
        formSection.classList.remove("hide-section");
        console.log("clicked");
        localStorage.setItem("userWasOnCurrentSection", "form");
    })

    //document to result next btn
    const formDocBtn = document.getElementById('submit-doc-btn');
    formDocBtn.addEventListener("click", (e) => {
        e.preventDefault();
        documentSection.classList.add('hide-section');
        resultSection.classList.remove('hide-section');
        localStorage.setItem("userWasOnCurrentSection", "result");
    })

    //result to filter result next btn
    const dataContainer = document.getElementById('data-container');
    dataContainer.addEventListener('click', (event) => {
        if (event.target.classList.contains('next-btn')) {
            event.preventDefault();
            resultSection.classList.add('hide-section');
            heroSection.classList.add('hide-section');
            filterResultSection.classList.remove('hide-section');
            localStorage.setItem('userWasOnCurrentSection', 'filter-result');
        }
    });

    //Filter to process section
    const moveToProcess = document.getElementById('moveToProcess');
    moveToProcess.addEventListener('click', (e) => {
        e.preventDefault();
        filterResultSection.classList.add('hide-section');
        processSection.classList.remove('hide-section');
        localStorage.setItem("userWasOnCurrentSection", "process");
    })

    //process to dashboard section
    const nextDashboard = document.getElementById('next-dashboard');
    nextDashboard.addEventListener('click', (e) => {
        e.preventDefault();
        processSection.classList.add('hide-section');
        dashboardSection.classList.remove('hide-section');
        localStorage.setItem("userWasOnCurrentSection", "dashboard");
    });

    //dashboard to home section
    const mainBtn = document.getElementById('main-btn');
    mainBtn.addEventListener('click', (e) => {
        e.preventDefault();
        dashboardSection.classList.add('hide-section');
        heroSection.classList.remove('hide-section');
        localStorage.setItem("userWasOnCurrentSection", "hero");
    })



    //check box error
    const customRadioButtons = document.querySelectorAll('.customCheckbox');
    const errorRadio = document.querySelector('.error-radio');

    customRadioButtons.forEach((radioButton) => {
        radioButton.addEventListener('change', () => {
            validateRadioButtons();
        });
    });
    function validateRadioButtons() {
        let isAnyRadioButtonChecked = false;

        customRadioButtons.forEach((radio) => {
            if (radio.checked) {
                isAnyRadioButtonChecked = true;
            }
        });

        if (!isAnyRadioButtonChecked) {
            errorRadio.innerHTML = "Need to select at least one option";
        } else {
            errorRadio.textContent = "";
        }
    }
   
    function inputFormValidate() {
        const addressVal = address.value.trim();
        const emailVal = email.value.trim();
        const datePickerVal = datePicker.value.trim();
        const dropDownInputVal = dropDownInput.value.trim();
        if (addressVal === "") {
            setError(address, "Address is required");
        } else {
            setSuccess(address);
        }

        if (emailVal === "") {
            setError(email, "Email is required");
        } else if (!isValidEmail(emailVal)) {
            setError(email, "Email is invalid");
        } else {
            setSuccess(email);
        }

        if (datePickerVal === "") {
            setError(datePicker, "Please select a date");
        } else {
            setSuccess(datePicker);
        }

        if (dropDownInputVal === "") {
            setError(dropDownInput, "Please select one option");
        } else {
            setSuccess(dropDownInput);
        }
        return emailVal !== "" && addressVal !== "" && datePickerVal !== "" && dropDownInputVal !== "";
    }

    //local storage loading handling
    const userWasOnCurrentSection = localStorage.getItem("userWasOnCurrentSection");

    if (userWasOnCurrentSection === "form") {
        heroSection.classList.add("hide-section");
        filterResultSection.classList.add("hide-section");
        processSection.classList.add("hide-section")
        formSection.classList.remove("hide-section");
        dashboardSection.classList.add("hide-section");
    } else if (userWasOnCurrentSection === "document") {
        heroSection.classList.add("hide-section");
        filterResultSection.classList.add("hide-section");
        processSection.classList.add("hide-section")
        documentSection.classList.remove("hide-section");
        dashboardSection.classList.add("hide-section");
    }
    else if (userWasOnCurrentSection === "result") {
        heroSection.classList.add("hide-section");
        formSection.classList.add("hide-section");
        filterResultSection.classList.add("hide-section");
        processSection.classList.add("hide-section")
        resultSection.classList.remove("hide-section");
        dashboardSection.classList.add("hide-section");
    }
    else if (userWasOnCurrentSection === "filter-result") {
        formSection.classList.add("hide-section");
        resultSection.classList.add("hide-section");
        processSection.classList.add("hide-section")
        filterResultSection.classList.remove("hide-section");
        heroSection.classList.add("hide-section");
        dashboardSection.classList.add("hide-section");

    }
    else if (userWasOnCurrentSection === "process") {
        formSection.classList.add("hide-section");
        resultSection.classList.add("hide-section");
        filterResultSection.classList.add("hide-section");
        heroSection.classList.add("hide-section");
        processSection.classList.remove("hide-section");
        dashboardSection.classList.add("hide-section");

    }
    else if (userWasOnCurrentSection === "dashboard") {
        formSection.classList.add("hide-section");
        resultSection.classList.add("hide-section");
        filterResultSection.classList.add("hide-section");
        heroSection.classList.add("hide-section");
        processSection.classList.add("hide-section");
        dashboardSection.classList.remove("hide-section");

    }
    else if (userWasOnCurrentSection === "hero") {
        formSection.classList.add("hide-section");
        resultSection.classList.add("hide-section");
        filterResultSection.classList.add("hide-section");
        processSection.classList.add("hide-section");
        dashboardSection.classList.add("hide-section");
        heroSection.classList.remove("hide-section");

    }
    else {
        heroSection.classList.remove("hide-section");
        dashboardSection.classList.add("hide-section");
    }


    app.addEventListener('click', () => {
        homeButton.style.color = "#919eab";
        app.style.color = "#000";

    })

    function inputValidate() {
        const firstNameVal = firstName.value.trim();
        const secondNameVal = secondName.value.trim();
        if (firstNameVal === "") {
            setError(firstName, "First name is required");
        }
        else {
            setSuccess(firstName);
        }
        if (secondNameVal === "") {
            setError(secondName, "Second name is required");
        }
        else {
            setSuccess(secondName);
        }
        return firstNameVal !== "" && secondNameVal !== "";
    }

    function setError(element, message) {
        const groupElement = element.parentElement;
        const groupError = groupElement.querySelector('.error');
        groupError.innerHTML = message;
        groupElement.classList.add('error');
        groupElement.classList.remove('success');

    }

    function setSuccess(element) {
        const groupElement = element.parentElement;
        const groupError = groupElement.querySelector('.error');
        groupError.innerHTML = ' ';
        groupElement.classList.add('success');
        groupElement.classList.remove('error');

    }

    function isValidEmail(email) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email);
    }

    //To pick the date
    flatpickr("input[type=datetime-local]", {
        dateFormat: "d-m-Y",
    });

    //Customized check box
    const customCheckboxes = document.querySelectorAll(".customCheckbox");
    const inputBoxes = document.querySelectorAll(".inputBox");

    customCheckboxes.forEach((checkbox, index) => {
        checkbox.addEventListener("change", function () {
            if (this.checked) {
                inputBoxes[index].classList.add("blue-outline");
            } else {
                inputBoxes[index].classList.remove("blue-outline");
            }
        });

    });

    //another checkbox
    const parentCheckboxFixed = document.querySelector('#parent-checkbox-fixed');
    const parentCheckboxAdjustable = document.querySelector('#parent-checkbox-adjustable');

    const smallCheckboxesFixed = document.querySelectorAll('.small-checkboxes.fixedSmall input');
    const smallCheckboxesAdjustable = document.querySelectorAll('.small-checkboxes.adjustable input');

    parentCheckboxFixed.addEventListener('change', () => {
        smallCheckboxesFixed.forEach(checkbox => {
            checkbox.checked = parentCheckboxFixed.checked;
        });
    });

    parentCheckboxAdjustable.addEventListener('change', () => {
        smallCheckboxesAdjustable.forEach(checkbox => {
            checkbox.checked = parentCheckboxAdjustable.checked;
        });
    });

    smallCheckboxesFixed.forEach(checkbox => {
        checkbox.addEventListener('change', () => {
            const allSmallChecked = Array.from(smallCheckboxesFixed).every(checkbox => checkbox.checked);
            parentCheckboxFixed.checked = allSmallChecked;
        });
    });

    smallCheckboxesAdjustable.forEach(checkbox => {
        checkbox.addEventListener('change', () => {
            const allSmallChecked = Array.from(smallCheckboxesAdjustable).every(checkbox => checkbox.checked);
            parentCheckboxAdjustable.checked = allSmallChecked;
        });
    });


    //form box-check box
    const checkboxs = document.querySelectorAll('.checkbox');
    const formBoxes = document.querySelectorAll('.form-box');

    checkboxs.forEach((checkbox, index) => {
        checkbox.addEventListener('change', function () {
            if (this.checked) {
                formBoxes[index].classList.add('checked');
            } else {
                formBoxes[index].classList.remove('checked');
            }
        });
    });


    //Customized dropdown
    const dropdown = document.querySelector(".dropdown");
    const dropdownInput = document.getElementById("dropdownInput");
    const dropdownOptions = document.querySelector(".dropdown-options");

    dropdownInput.addEventListener("click", function () {
        dropdown.classList.toggle("active");

    });

    dropdownOptions.addEventListener("click", function (event) {
        if (event.target.tagName === "LI") {
            dropdownInput.value = event.target.textContent;
            dropdown.classList.remove("active");
        }
    });

    document.addEventListener("click", function (event) {
        if (!dropdown.contains(event.target)) {
            dropdown.classList.remove("active");
        }
    });


    //document-management
    const inputElement = document.querySelector('input[type="file"]');
    const typeShowContainer = document.querySelector('.type-show-container');

    inputElement.addEventListener('change', handleFileUpload);

    function formatSizeUnits(bytes) {
        if (bytes >= 1024 * 1024) {
            return (bytes / (1024 * 1024)).toFixed(2) + ' MBs';
        } else if (bytes >= 1024) {
            return (bytes / 1024).toFixed(2) + ' KBs';
        } else {
            return bytes + ' Bytes';
        }
    }

    // Add click event listeners to the trash icons in the default items
    const trashIcons = typeShowContainer.querySelectorAll('.type-wrapper .trash');
    trashIcons.forEach(trashIcon => {
        trashIcon.addEventListener('click', () => {
            const typeWrapper = trashIcon.closest('.type-wrapper');

            // Remove the type-wrapper element from the container
            typeShowContainer.removeChild(typeWrapper);

            // Remove the file data from local storage
            const existingFileData = JSON.parse(localStorage.getItem('fileData')) || [];
            const fileName = typeWrapper.querySelector('.file-name').textContent;
            const updatedFileData = existingFileData.filter(fileData => fileData.name !== fileName);
            localStorage.setItem('fileData', JSON.stringify(updatedFileData));
        });
    });

    const iconMapping = {
        pdf: 'https://i.postimg.cc/Y9JcNL75/pdf.png',
        doc: 'https://i.postimg.cc/15WdDYQk/word.png',
        docx: "https://i.postimg.cc/15WdDYQk/word.png",
        webp: 'https://i.postimg.cc/BZyMB5tB/     Google-Chrome-icon-February-2022-svg.png', // 
        svg: "https://i.postimg.cc/Xqr9mP17/svg.jpg",
        jpg: "https://i.postimg.cc/fRy5Db0s/136524.png",
        png: "https://i.postimg.cc/TYSDJbrS/png-1.png"

    };

    function handleFileUpload(event) {
        const files = event.target.files;
        const uploadWrapper = document.querySelector('.upload-wrapper');

        // Remove any existing error message
        const existingErrorMessage = uploadWrapper.nextElementSibling;
        if (existingErrorMessage && existingErrorMessage.classList.contains('error-message')) {
            existingErrorMessage.remove();
        }

        if (files.length > 0) {
            const selectedFile = files[0];
            const fileSize = selectedFile.size; // File size in bytes

            if (fileSize > 5 * 1024 * 1024) { // Check if file size is more than 5 MB
                const errorMessage = document.createElement('p');
                errorMessage.classList.add('text-red-500', 'pt-2', 'error-message');
                errorMessage.textContent = 'File size exceeds the maximum limit of 5 MB.';
                uploadWrapper.insertAdjacentElement('afterend', errorMessage);
                return;
            }

            const fileName = selectedFile.name;
            const fileExtension = fileName.split('.').pop().toLowerCase(); // Convert to lowercase
            const formattedFileSize = formatSizeUnits(fileSize);

            const fileType = iconMapping[fileExtension] ? fileExtension : 'default';
            const iconURL = iconMapping[fileType] || 'DEFAULT_ICON_URL';

            const newTypeWrapper = document.createElement('div');
            newTypeWrapper.classList.add('type-wrapper', 'flex', 'px-4', 'py-5', 'justify-between', 'items-center', 'text-gray-500');
            newTypeWrapper.innerHTML = `
                <div class=" flex items-center">
                    <img src="${iconURL}" alt="doc-icon" class="w-7 mr-2 h-7">
                    <p class="file-names">${fileName}</p>
                </div>
                <p class="doc-format">${fileExtension.toUpperCase()}</p>
                <p class="doc-size">${formattedFileSize}</p>
                <p class="doc-status">UPLOADED</p>
                <img src="https://i.postimg.cc/J4C8s8rm/trash.png" alt="trash" class="trash">
            `;

            // Add a click event listener to the trash icon
            const trashIcon = newTypeWrapper.querySelector('.trash');
            trashIcon.addEventListener('click', () => {
                // Remove the type-wrapper element from the container
                typeShowContainer.removeChild(newTypeWrapper);

                // Remove the file data from local storage
                const existingFileData = JSON.parse(localStorage.getItem('fileData')) || [];
                const updatedFileData = existingFileData.filter(fileData => fileData.name !== fileName);
                localStorage.setItem('fileData', JSON.stringify(updatedFileData));
            });

            const fileData = {
                name: fileName,
                size: fileSize,
                type: fileExtension.toUpperCase(),
                status: 'UPLOADED',
            };

            const existingFileData = JSON.parse(localStorage.getItem('fileData')) || [];
            existingFileData.push(fileData);
            localStorage.setItem('fileData', JSON.stringify(existingFileData));
            typeShowContainer.appendChild(newTypeWrapper);
        }
    }



    function displayUploadedFiles() {
        const existingFileData = JSON.parse(localStorage.getItem('fileData')) || [];

        existingFileData.forEach((fileData, index) => {
            const newTypeWrapper = document.createElement('div');
            newTypeWrapper.classList.add('type-wrapper', 'flex', 'px-4', 'py-5', 'justify-between', 'items-center', 'text-gray-500');

            const fileType = fileData.type.toLowerCase(); // Get the file type from fileData
            const iconURL = iconMapping[fileType] || 'DEFAULT_ICON_URL';

            newTypeWrapper.innerHTML = `
                <div class="flex items-center">
                    <img src="${iconURL}" alt="doc-icon" class="w-7 mr-2 h-7">
                    <p class="file-names w-20">${fileData.name}</p>
                </div>
                <p class="doc-format">${fileType.toUpperCase()}</p>
                <p class="doc-size">${formatSizeUnits(fileData.size)}</p>
                <p class="doc-status">${fileData.status}</p>
                <img src="https://i.postimg.cc/J4C8s8rm/trash.png" alt="trash" class="trash cursor-pointer">
            `;

            // Add a click event listener to the trash icon
            const trashIcon = newTypeWrapper.querySelector('.trash');
            trashIcon.addEventListener('click', () => {
                // Remove the type-wrapper element from the container
                typeShowContainer.removeChild(newTypeWrapper);

                // Remove the file data from local storage
                existingFileData.splice(index, 1);
                localStorage.setItem('fileData', JSON.stringify(existingFileData));
            });

            typeShowContainer.appendChild(newTypeWrapper);
        });
    }

    //controller filter range
    const rangeInput1 = document.getElementById('rangeInput1');
    const rangeValue1 = document.getElementById('rangeValue1');
    rangeInput1.addEventListener('input', () => {
        rangeValue1.value = '$' + rangeInput1.value;
    });

    const rangeInput2 = document.getElementById('rangeInput2');
    const rangeValue2 = document.getElementById('rangeValue2');
    rangeInput2.addEventListener('input', () => {
        rangeValue2.value = '$' + rangeInput2.value;
    });
    // Set initial value
    rangeValue1.value = '$' + rangeInput1.value;
    // Set initial value
    rangeValue2.value = '$' + rangeInput2.value;

    window.addEventListener('load', () => {
        displayUploadedFiles();
    });
    // localStorage.clear();
    //fetch that in username
    const firstNameInput = document.getElementById('firstName');
    const secondNameInput = document.getElementById('SecondName');
    const userName = document.querySelector('.user-name');
    const mainName = document.querySelector('.main-name');
    const nextBtn = document.getElementById('submit-btn');

    // Load the saved full name from local storage (if available)
    const savedFullName = localStorage.getItem('fullName');
    if (savedFullName) {
        userName.textContent = savedFullName;
        mainName.textContent = savedFullName;
    }

    nextBtn.addEventListener('click', function () {
        const firstName = firstNameInput.value.trim();
        const secondName = secondNameInput.value.trim();
        const fullName = firstName + ' ' + secondName;

        userName.textContent = fullName;
        mainName.textContent = fullName;

        // Save the full name in local storage
        localStorage.setItem('fullName', fullName);
        const greeting = "Good morning ";
        mainName.previousSibling.textContent = greeting;
    });
})

