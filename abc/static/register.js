document.addEventListener("DOMContentLoaded", function () {
    // Update file name when photo is selected
    document.getElementById("photo").addEventListener("change", function () {
        const fileName = this.files[0] ? this.files[0].name : "";
        document.getElementById("photo-file-name").textContent = fileName;
    });

    // Update file name when resume is selected
    document.getElementById("resume_path").addEventListener("change", function () {
        const fileName = this.files[0] ? this.files[0].name : "";
        document.getElementById("resume-file-name").textContent = fileName;
    });

    // Handle form submission
    document.querySelector(".create-account-btn").addEventListener("click", function (event) {
        event.preventDefault();

        // Collect input values
        const firstName = document.getElementById("first-name").value.trim();
        const lastName = document.getElementById("last-name").value.trim();
        const email = document.getElementById("email").value.trim();
        const phone = document.getElementById("phone").value.trim();
        const password = document.getElementById("password").value.trim();
        const confirmPassword = document.getElementById("confirm-password").value.trim();
        const date_of_birth = document.getElementById("date_of_birth").value.trim();
        const address = document.getElementById("address").value.trim();
        const photo = document.getElementById("photo").files[0];
        const resume_path = document.getElementById("resume_path").files[0];

        // Validate required fields
        if (!firstName || !lastName || !email || !phone || !password || !confirmPassword || !date_of_birth || !address || !photo || !resume_path) {
            alert("Please fill in all required fields.");
            return;
        }

        // Check if passwords match
        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        // Validate file types
        const allowedExtensions = ["jpg", "jpeg", "png", "pdf", "doc", "docx"];
        const photoExtension = photo.name.split('.').pop().toLowerCase();
        const resumeExtension = resume_path.name.split('.').pop().toLowerCase();

        if (!allowedExtensions.includes(photoExtension)) {
            alert("Invalid photo format. Please upload a JPG, JPEG, or PNG file.");
            return;
        }

        if (!allowedExtensions.includes(resumeExtension)) {
            alert("Invalid resume format. Please upload a PDF, DOC, or DOCX file.");
            return;
        }

        // Validate file sizes (e.g., 5MB max for each)
        const maxSize = 5 * 1024 * 1024; // 5 MB
        if (photo.size > maxSize) {
            alert("Photo size exceeds 5MB. Please upload a smaller file.");
            return;
        }

        if (resume_path.size > maxSize) {
            alert("Resume size exceeds 5MB. Please upload a smaller file.");
            return;
        }

        // Create form data
        const formData = new FormData();
        formData.append("first_name", firstName);
        formData.append("last_name", lastName);
        formData.append("email", email);
        formData.append("phone", phone);
        formData.append("password", password);
        formData.append("confirm_password", confirmPassword);
        formData.append("date_of_birth", date_of_birth);
        formData.append("address", address);
        formData.append("photo", photo);
        formData.append("resume_path", resume_path);

        // Send form data to server
        fetch('https://wqwqw.onrender.com/register', {
            method: 'POST',
            body: formData,
        })
        .then(response => {
            if (!response.ok) {
                return response.json().then(data => {
                    throw new Error(data.message || 'Internal Server Error');
                });
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
            if (data.success) {
                alert(`Message: ${data.message}`);
                window.location.href = '/signin';
            } else {
                alert(`Error: ${data.message}`);
            }
        })
        .catch(error => {
            console.error("Error:", error);
            alert(`An error occurred: ${error.message || "Unexpected error occurred. Please try again later."}`);
        });
    });
});
