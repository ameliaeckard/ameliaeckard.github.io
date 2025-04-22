document.addEventListener("DOMContentLoaded", function () {
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

        const courses = Array.from(document.querySelectorAll(".course-entry input"))
            .map((input) => input.value.trim())
            .filter((value) => value !== "")
            .join(", ");

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
            <p><strong>Personal Background:</strong> ${personalBg}</p>
            <p><strong>Professional Background:</strong> ${profBg}</p>
            <p><strong>Academic Background:</strong> ${acadBg}</p>
            <p><strong>Background in Web Development:</strong> ${webBg}</p>
            <p><strong>Primary Computer Platform:</strong> ${platform}</p>
            <p><strong>Courses Currently Taking:</strong> ${courses || "None"}</p>
            <p><strong>Funny Fact?</strong> ${funny}</p>
            <p><strong>Anything else?</strong> ${extra}</p>
            <button onclick="location.reload()">Reset</button>
        `;
    }

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        if (!form.checkValidity()) {
            alert("Please fill out all required fields.");
            return;
        }

        displayFormData();
    });

    form.addEventListener("reset", function () {
        setTimeout(() => {
            document.querySelector(".form-container").innerHTML = "";
        }, 0);
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