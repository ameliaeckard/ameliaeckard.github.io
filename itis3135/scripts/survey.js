document.addEventListener("DOMContentLoaded", function () {
    let formSubmitted = false;
    const form = document.getElementById("introForm");
    const coursesDiv = document.getElementById("courses");
    const addCourseButton = document.querySelector("button[type='button']");

    function displayFormData() {
        const name = document.getElementById("name").value;
        const mascot = document.getElementById("mascot").value;
        const imageInput = document.getElementById("image");
        const caption = document.getElementById("caption").value;
        const personalBg = document.getElementById("personalBg").value;
        const profBg = document.getElementById("profBg").value;
        const acadBg = document.getElementById("acadBg").value;
        const webBg = document.getElementById("webBg").value;
        const platform = document.getElementById("platform").value;
        const funny = document.getElementById("funny").value;
        const extra = document.getElementById("extra").value;

        const coursesArray = Array.from(document.querySelectorAll(".course-entry input"))
            .map((input) => input.value.trim())
            .filter((value) => value !== "");

        const courseListHTML = coursesArray.length > 0
            ? `<ul>${coursesArray.map((course) => `<li><strong>${course}</strong></li>`).join("")}</ul>`
            : "<p>None</p>";

        const imageFile = imageInput.files[0];
        let imageURL = "";

        if (imageFile) {
            imageURL = URL.createObjectURL(imageFile);
        }

        document.querySelector(".form-container").innerHTML = `
            <h2>Your Introduction</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Mascot:</strong> ${mascot}</p>
            <p><strong>Image:</strong></p>
            ${imageURL ? `<img src="${imageURL}" alt="Uploaded Image" style="max-width: 300px; display: block; margin: 10px 0;">` : "<p>No image uploaded</p>"}
            <p><strong>Image Caption:</strong> ${caption}</p>
            <p><strong>Personal Background:</strong></p>
            <p>${personalBg}</p>
            <p><strong>Professional Background:</strong></p>
            <p>${profBg}</p>
            <p><strong>Academic Background:</strong></p>
            <p>${acadBg}</p>
            <p><strong>Background in Web Development:</strong></p>
            <p>${webBg}</p>
            <p><strong>Primary Computer Platform:</strong></p>
            <p>${platform}</p>
            <p><strong>Courses Currently Taking:</strong></p>
            ${courseListHTML}
            <p><strong>Funny Fact?</strong></p>
            <p>${funny}</p>
            <p><strong>Anything else?</strong></p>
            <p>${extra}</p>
            <button onclick="location.reload()">Reset</button>
        `;
    }

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        if (!form.checkValidity()) {
            alert("Please fill out all required fields.");
            return;
        }
        formSubmitted = true;
        displayFormData();
    });

    form.addEventListener("reset", function () {
        if (formSubmitted) {
            // Only clear the form container if the form was submitted
            setTimeout(() => {
                location.reload(); // Refreshes the page to bring back the original form
            }, 0);
        }
    });
    

    function addCourseField() {
        const div = document.createElement("div");
        div.classList.add("course-entry");

        const input = document.createElement("input");
        input.type = "text";
        input.placeholder = "Course Name";
        input.required = true;
        input.style.marginRight = "10px";

        const button = document.createElement("button");
        button.textContent = "Delete";
        button.type = "button";
        button.onclick = function () {
            div.remove();
        };

        div.appendChild(input);
        div.appendChild(button);
        coursesDiv.appendChild(div);
    }

    addCourseButton.addEventListener("click", addCourseField);
});
