document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("photo").addEventListener("change", function () {
        const fileName = this.files[0] ? this.files[0].name : "";
        document.getElementById("photo-file-name").textContent = fileName;
    });

    document.getElementById("resume_path").addEventListener("change", function () {
        const fileName = this.files[0] ? this.files[0].name : "";
        document.getElementById("resume-file-name").textContent = fileName;
    });

    document.querySelector(".create-account-btn").addEventListener("click", function (event) {
        event.preventDefault();

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

        if (!firstName || !lastName || !email || !phone || !password || !confirmPassword || !date_of_birth || !address || !photo || !resume_path) {
            alert("Please fill in all required fields.");
            return;
        }

        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

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
            console.error('Error:', error);
            alert(`An error occurred: ${error.message}`);
        });
    });
});
