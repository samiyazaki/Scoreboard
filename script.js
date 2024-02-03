document.addEventListener('DOMContentLoaded', loadFromLocalStorage);

document.getElementById('addStudent').addEventListener('click', function() {
    var studentNames = document.getElementById('studentName').value;
    if (studentNames) {
        studentNames.split(',').forEach(name => {
            name = name.trim();
            if (name) {
                addStudentToChart(name);
            }
        });
        document.getElementById('studentName').value = ''; // Clear the input field
        saveToLocalStorage();
    }
});

function addStudentToChart(name) {
    var table = document.getElementById('scoreChart');
    var row = table.insertRow(-1);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);

    cell1.innerHTML = name;
    cell2.innerHTML = localStorage.getItem(name) || 0; // Load score from local storage or set to 0
    cell3.innerHTML = '<button onclick="changeScore(this, 1)">+</button><button onclick="changeScore(this, -1)">-</button>';
}

function changeScore(button, change) {
    var row = button.parentNode.parentNode;
    var studentName = row.cells[0].innerHTML;
    var scoreCell = row.cells[1];
    var currentScore = parseInt(scoreCell.innerHTML);
    var newScore = currentScore + change;
    scoreCell.innerHTML = newScore;
    localStorage.setItem(studentName, newScore); // Save new score to local storage
}

function saveToLocalStorage() {
    var table = document.getElementById('scoreChart');
    for (var i = 1; i < table.rows.length; i++) {
        var row = table.rows[i];
        var studentName = row.cells[0].innerHTML;
        var score = row.cells[1].innerHTML;
        localStorage.setItem(studentName, score);
    }
}

function loadFromLocalStorage() {
    for (var i = 0; i < localStorage.length; i++) {
        var studentName = localStorage.key(i);
        var score = localStorage.getItem(studentName);
        if (studentName && score !== null) {
            addStudentToChart(studentName);
        }
    }
}
