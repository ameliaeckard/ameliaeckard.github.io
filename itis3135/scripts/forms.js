document.addEventListener("DOMContentLoaded", function() {
    const form = document.querySelector("form");

    function validateForm() {
        let isValid = true;
        
        const name = document.getElementById("name");
        const phone = document.getElementById("phone");
        const email = document.getElementById("email");
        const contactMethod = document.querySelector("input[name='contact-method']:checked");
        const service = document.getElementById("service");

        if (name.value.trim() === "") {
            alert("Please enter your name.");
            isValid = false;
        }

        const phonePattern = /^\d{3}-\d{3}-\d{4}$/;
        if (!phonePattern.test(phone.value)) {
            alert("Please enter a valid phone number (XXX-XXX-XXXX).");
            isValid = false;
        }

        if (!email.validity.valid) {
            alert("Please enter a valid email address.");
            isValid = false;
        }

        if (!contactMethod) {
            alert("Please select a preferred contact method.");
            isValid = false;
        }

        if (service.value === "") {
            alert("Please select a service.");
            isValid = false;
        }
        
        return isValid;
    }

    form.addEventListener("submit", function(event) {
        event.preventDefault();
        
        if (validateForm()) {
            alert("Form submitted successfully!");
            form.reset();
        }
    });
});