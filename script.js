// 🧸 Riki's OS — Daily Checklist

const checklist = document.querySelectorAll(
    '.checklist input[type="checkbox"]'
);

const STORAGE_KEY = "rikiDailyChecklist";
const DATE_KEY = "rikiChecklistDate";

function checkNewDay() {
    const today = new Date().toDateString();
    const savedDate = localStorage.getItem(DATE_KEY);

    if (savedDate !== today) {
        localStorage.removeItem(STORAGE_KEY);
        localStorage.setItem(DATE_KEY, today);
    }
}

function loadChecklist() {
    const saved = JSON.parse(
        localStorage.getItem(STORAGE_KEY) || "[]"
    );

    checklist.forEach((box, index) => {
        box.checked = saved[index] || false;
    });

    updateProgress();
}

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

function updateProgress() {
    const completed = Array.from(checklist)
        .filter(box => box.checked).length;

    const total = checklist.length;

    const counter = document.getElementById("essential-count");

    if (counter) {
        counter.textContent = `${completed}/${total}`;
    }
}

checklist.forEach(box => {
    box.addEventListener("change", saveChecklist);
});

checkNewDay();
loadChecklist();


// 🧸 Riki's Care Center

const careCheckboxes = document.querySelectorAll(
    ".care-checkbox"
);

const CARE_STORAGE_KEY = "rikiCareChecklist";
const CARE_DATE_KEY = "rikiCareDate";

function checkCareNewDay() {
    const today = new Date().toDateString();
    const savedDate = localStorage.getItem(CARE_DATE_KEY);

    if (savedDate !== today) {
        localStorage.removeItem(CARE_STORAGE_KEY);
        localStorage.setItem(CARE_DATE_KEY, today);
    }
}

function loadCareChecklist() {
    const saved = JSON.parse(
        localStorage.getItem(CARE_STORAGE_KEY) || "[]"
    );

    careCheckboxes.forEach((box, index) => {
        box.checked = saved[index] || false;
    });
}

function saveCareChecklist() {
    const checked = Array.from(careCheckboxes).map(
        box => box.checked
    );

    localStorage.setItem(
        CARE_STORAGE_KEY,
        JSON.stringify(checked)
    );
}

careCheckboxes.forEach(box => {
    box.addEventListener("change", saveCareChecklist);
});

checkCareNewDay();
loadCareChecklist();
if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
        navigator.serviceWorker.register("./sw.js");
    });
}
