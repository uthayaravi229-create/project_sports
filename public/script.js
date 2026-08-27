const form = document.getElementById("registrationForm");
const message = document.getElementById("message");
const studentTable = document.getElementById("studentTable");


// =====================================
// REGISTER STUDENT
// =====================================

form.addEventListener("submit", async function (e) {

    e.preventDefault();

    const studentData = {

        name: document.getElementById("name").value,

        registerNumber:
            document.getElementById("registerNumber").value,

        department:
            document.getElementById("department").value,

        year:
            document.getElementById("year").value,

        gender:
            document.getElementById("gender").value,

        email:
            document.getElementById("email").value,

        phone:
            document.getElementById("phone").value,

        sport:
            document.getElementById("sport").value,

        event:
            document.getElementById("event").value
    };


    try {

        const response = await fetch("/api/students", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(studentData)

        });


        const data = await response.json();


        if (response.ok) {

            message.textContent = data.message;
            message.style.color = "green";

            form.reset();

            loadStudents();

        } else {

            message.textContent = data.message;
            message.style.color = "red";

        }

    } catch (error) {

        console.error(error);

        message.textContent =
            "Server error. Please try again.";

        message.style.color = "red";
    }

});


// =====================================
// LOAD STUDENTS
// =====================================

async function loadStudents() {

    try {

        const response =
            await fetch("/api/students");

        const students =
            await response.json();


        studentTable.innerHTML = "";


        students.forEach(student => {

            const row = document.createElement("tr");


            row.innerHTML = `

                <td>${student.name}</td>

                <td>${student.registerNumber}</td>

                <td>${student.department}</td>

                <td>${student.year}</td>

                <td>${student.sport}</td>

                <td>${student.event}</td>

                <td>
                    <button
                        class="delete-btn"
                        onclick="deleteStudent('${student._id}')"
                    >
                        Delete
                    </button>
                </td>

            `;


            studentTable.appendChild(row);

        });

    } catch (error) {

        console.error(error);

    }

}


// =====================================
// DELETE STUDENT
// =====================================

async function deleteStudent(id) {

    const confirmation =
        confirm("Are you sure you want to delete this registration?");


    if (!confirmation) {
        return;
    }


    try {

        const response =
            await fetch(`/api/students/${id}`, {

                method: "DELETE"

            });


        const data =
            await response.json();


        alert(data.message);


        loadStudents();

    } catch (error) {

        console.error(error);

        alert("Unable to delete registration.");

    }

}


// Load students when page opens

loadStudents();