document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("employeeForm");
    const employeeList = document.getElementById("employeeList");

    form.addEventListener("submit", async (event) => {
        event.preventDefault();
        const formData = new FormData(form);
        const employeeData = {};
        formData.forEach((value, key) => {
            employeeData[key] = value;
        });
        
        try {
            const response = await fetch("http://localhost:3000/employees", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(employeeData)
            });

            if (!response.ok) {
                throw new Error("Failed to add employee");
            }

            const newEmployee = await response.json();
            addEmployeeToTable(newEmployee);
        } catch (error) {
            console.error("Error:", error);
        }
    });

    function addEmployeeToTable(employee) {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${employee.firstName}</td>
            <td>${employee.familyName}</td>
            <td>${employee.title}</td>
            <td>${employee.payPerHour}</td>
        `;
        employeeList.appendChild(row);
    }

    // Fetch existing employees from db.json
    fetch("http://localhost:3000/employees")
        .then(response => response.json())
        .then(employees => {
            employees.forEach(employee => {
                addEmployeeToTable(employee);
            });
        })
        .catch(error => console.error("Error fetching employees:", error));
});
