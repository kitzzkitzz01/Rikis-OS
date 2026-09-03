// 🧸 Riki's OS — Daily Checklist

const checklist = document.querySelectorAll(
    '.checklist input[type="checkbox"]'
);

const STORAGE_KEY = "rikiDailyChecklist";
const DATE_KEY = "rikiChecklistDate";


// Check whether it's a new day
function checkNewDay() {

    const today = new Date().toDateString();
    const savedDate = localStorage.getItem(DATE_KEY);

    if (savedDate !== today) {

        localStorage.removeItem(STORAGE_KEY);
        localStorage.setItem(DATE_KEY, today);

    }
}


// Load saved checklist
function loadChecklist() {

    const saved = JSON.parse(
        localStorage.getItem(STORAGE_KEY) || "[]"
    );

    checklist.forEach((box, index) => {
        box.checked = saved[index] || false;
    });

    updateProgress();
}


// Save checklist
function saveChecklist() {

    const checked = Array.from(checklist).map(
        box => box.checked
    );

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(checked)
    );

    updateProgress();
}


// Update progress
function updateProgress() {

    const completed = Array.from(checklist)
        .filter(box => box.checked).length;

    const total = checklist.length;

    const counter = document.getElementById("essential-count");

    if (counter) {
        counter.textContent = `${completed}/${total}`;
    }

    if (completed === total && total > 0) {
        console.log("🎉 Perfect! Riki is ready! 🧸❤️");
    }
}


// Listen for checkbox changes
checklist.forEach(box => {

    box.addEventListener(
        "change",
        saveChecklist
    );

});


// Start
checkNewDay();
loadChecklist();
