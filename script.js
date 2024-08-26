    const A = 9, S = 10, B = 8, C = 7, D = 6, E = 5, F = 0;
    const numCourses = 8;
    const validGrades = ['A', 'B', 'C', 'D', 'E', 'S', 'F'];

    window.onload = function() {
        const courseInputs = document.getElementById('courseInputs');
        for (let i = 0; i < numCourses; ++i) {
            courseInputs.innerHTML += `
                <div class="form-group">
                    <label for="grade${i}">Grade for course ${i + 1} (A, B, C, D, E, S, F):</label>
                    <input type="text" id="grade${i}" maxlength="1" oninput="validateGrade(${i})" onkeydown="moveToNext(event, ${i}, 'grade')" required>
                </div>
                <div class="form-group">
                    <label for="credit${i}">Credit for course ${i + 1}:</label>
                    <input type="number" id="credit${i}" min="0" step="1" oninput="validateCredit(${i})" onkeydown="moveToNext(event, ${i}, 'credit')" required>
                </div>
            `;
        }
    };

    function validateGrade(index) {
        let input = document.getElementById(`grade${index}`);
        let value = input.value.toUpperCase();
        if (!validGrades.includes(value.toUpperCase())) {
            input.value = '';
        }
    }

    function validateCredit(index) {
        let input = document.getElementById(`credit${index}`);
        let value = input.value;
        if (isNaN(value) || value < 0) {
            input.value = '';
        }
    }

    function calculateCGPA() {
        let totalCreditPoints = 0;
        let totalCredits = 0;
        let cgpa = 0;
        let hasFailGrade = false;

        for (let i = 0; i < numCourses; ++i) {
            let grade = document.getElementById(`grade${i}`).value.toUpperCase();
            let credit = parseInt(document.getElementById(`credit${i}`).value);

            let gradeValue;
            switch (grade) {
                case 'A': gradeValue = A; break;
                case 'S': gradeValue = S; break;
                case 'B': gradeValue = B; break;
                case 'C': gradeValue = C; break;
                case 'D': gradeValue = D; break;
                case 'E': gradeValue = E; break;
                case 'F': 
                    gradeValue = F;
                    hasFailGrade = true;  // If any F is entered, flag it
                    break;
                default: return;
            }

            totalCreditPoints += gradeValue * credit;
            totalCredits += credit;
        }

        cgpa = totalCreditPoints / totalCredits;
        document.getElementById('cgpaResult').innerText = cgpa.toFixed(2);

        if (hasFailGrade) {
            document.getElementById('modalTitle').innerText = "Oops!";
            document.getElementById('modalMessage').innerHTML = `Unfortunately, you have a fail grade.<br>Your CGPA is: <span id="cgpaResult">${cgpa.toFixed(2)}</span>`;
        } else {
            document.getElementById('modalTitle').innerText = "Congratulations!";
            document.getElementById('modalMessage').innerHTML = `Your CGPA is: <span id="cgpaResult">${cgpa.toFixed(2)}</span>`;
        }

        openModal('successModal');
    }

    // Event to move to the next input field when "Enter" is pressed
    function moveToNext(event, index, type) {
        if (event.key === "Enter") {
            event.preventDefault();
            let nextInputId;
            if (type === "grade") {
                nextInputId = `credit${index}`;
            } else if (index < numCourses - 1) {
                nextInputId = `grade${index + 1}`;
            }

            if (nextInputId) {
                document.getElementById(nextInputId).focus();
            }
        }
    }
    
    function openModal(modalId) {
        document.getElementById(modalId).style.display = "flex";
    }

    function closeModal(modalId) {
        document.getElementById(modalId).style.display = "none";
    }
