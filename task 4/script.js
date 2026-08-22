/* =========================================================
   TASKFLOW — TO-DO APPLICATION
========================================================= */


/* =========================================================
   VARIABLES
========================================================= */

let tasks =
    JSON.parse(
        localStorage.getItem("taskflowTasks")
    ) || [];

let currentCategory = "All";

let currentFilter = "all";

let editingTaskId = null;

let selectedCalendarDate = new Date();

let calendarDate = new Date();


/* =========================================================
   DOM ELEMENTS
========================================================= */

const taskForm =
    document.getElementById("taskForm");

const taskTitle =
    document.getElementById("taskTitle");

const taskDescription =
    document.getElementById("taskDescription");

const taskCategory =
    document.getElementById("taskCategory");

const taskDeadline =
    document.getElementById("taskDeadline");

const taskReminder =
    document.getElementById("taskReminder");

const taskList =
    document.getElementById("taskList");

const emptyState =
    document.getElementById("emptyState");

const submitBtn =
    document.getElementById("submitBtn");

const cancelEdit =
    document.getElementById("cancelEdit");

const formTitle =
    document.getElementById("formTitle");

const celebration =
    document.getElementById("celebration");

const closeCelebration =
    document.getElementById("closeCelebration");

const toast =
    document.getElementById("toast");

const calendarDays =
    document.getElementById("calendarDays");

const calendarMonth =
    document.getElementById("calendarMonth");

const calendarYear =
    document.getElementById("calendarYear");

const calendarTasks =
    document.getElementById("calendarTasks");

const selectedDateText =
    document.getElementById("selectedDateText");


/* =========================================================
   SAVE DATA
========================================================= */

function saveTasks() {

    localStorage.setItem(
        "taskflowTasks",
        JSON.stringify(tasks)
    );

}


/* =========================================================
   GENERATE ID
========================================================= */

function generateId() {

    return Date.now().toString()
        + Math.random()
            .toString(36)
            .substring(2);

}


/* =========================================================
   DATE HELPERS
========================================================= */

function formatDate(date) {

    return new Intl.DateTimeFormat(
        "en-IN",
        {
            day: "numeric",
            month: "short",
            year: "numeric"
        }
    ).format(date);

}


function formatTime(date) {

    return new Intl.DateTimeFormat(
        "en-IN",
        {
            hour: "numeric",
            minute: "2-digit"
        }
    ).format(date);

}


function dateKey(date) {

    const year =
        date.getFullYear();

    const month =
        String(
            date.getMonth() + 1
        ).padStart(2, "0");

    const day =
        String(
            date.getDate()
        ).padStart(2, "0");

    return `${year}-${month}-${day}`;

}


/* =========================================================
   CURRENT DATE / TIME
========================================================= */

function updateCurrentDate() {

    const now = new Date();

    document.getElementById(
        "currentDay"
    ).textContent =
        now.toLocaleDateString(
            "en-US",
            {
                weekday: "long"
            }
        ).toUpperCase();

    document.getElementById(
        "currentDate"
    ).textContent =
        now.getDate();

    document.getElementById(
        "currentMonth"
    ).textContent =
        now.toLocaleDateString(
            "en-US",
            {
                month: "long",
                year: "numeric"
            }
        ).toUpperCase();

    document.getElementById(
        "currentTime"
    ).textContent =
        formatTime(now);

}


setInterval(
    updateCurrentDate,
    1000
);

updateCurrentDate();


/* =========================================================
   ADD / EDIT TASK
========================================================= */

taskForm.addEventListener(
    "submit",
    function(event) {

        event.preventDefault();

        const title =
            taskTitle.value.trim();

        const description =
            taskDescription.value.trim();

        const category =
            taskCategory.value;

        const deadline =
            taskDeadline.value;

        const reminder =
            Number(
                taskReminder.value
            );

        if (!title || !deadline) {

            showToast(
                "Please enter a task and deadline."
            );

            return;
        }


        if (editingTaskId) {

            const task =
                tasks.find(
                    t =>
                        t.id ===
                        editingTaskId
                );

            if (task) {

                task.title =
                    title;

                task.description =
                    description;

                task.category =
                    category;

                task.deadline =
                    deadline;

                task.reminder =
                    reminder;

                task.reminderSent =
                    false;

            }

            showToast(
                "Task updated successfully."
            );

        } else {

            const newTask = {

                id:
                    generateId(),

                title,

                description,

                category,

                deadline,

                reminder,

                createdAt:
                    new Date()
                        .toISOString(),

                completed: false,

                completedAt: null,

                reminderSent: false

            };

            tasks.push(
                newTask
            );

            showToast(
                "Task added successfully."
            );

        }


        saveTasks();

        resetForm();

        renderAll();

    }
);


/* =========================================================
   RESET FORM
========================================================= */

function resetForm() {

    taskForm.reset();

    editingTaskId = null;

    formTitle.textContent =
        "Add New Task";

    submitBtn.textContent =
        "+ ADD TASK";

    cancelEdit.classList.add(
        "hidden"
    );

}


/* =========================================================
   EDIT TASK
========================================================= */

function editTask(id) {

    const task =
        tasks.find(
            t => t.id === id
        );

    if (!task) return;

    editingTaskId = id;

    taskTitle.value =
        task.title;

    taskDescription.value =
        task.description;

    taskCategory.value =
        task.category;

    taskDeadline.value =
        task.deadline;

    taskReminder.value =
        task.reminder;

    formTitle.textContent =
        "Edit Task";

    submitBtn.textContent =
        "SAVE CHANGES";

    cancelEdit.classList.remove(
        "hidden"
    );

    document
        .querySelector(".sidebar")
        .scrollIntoView({
            behavior: "smooth"
        });

}


/* =========================================================
   CANCEL EDIT
========================================================= */

cancelEdit.addEventListener(
    "click",
    resetForm
);


/* =========================================================
   DELETE TASK
========================================================= */

function deleteTask(id) {

    const confirmed =
        confirm(
            "Are you sure you want to delete this task?"
        );

    if (!confirmed) return;

    tasks =
        tasks.filter(
            t => t.id !== id
        );

    saveTasks();

    renderAll();

    showToast(
        "Task deleted."
    );

}


/* =========================================================
   COMPLETE TASK
========================================================= */

function completeTask(id) {

    const task =
        tasks.find(
            t => t.id === id
        );

    if (!task) return;

    if (task.completed) {

        task.completed = false;

        task.completedAt = null;

        saveTasks();

        renderAll();

        return;
    }


    const now = new Date();

    const deadline =
        new Date(
            task.deadline
        );


    task.completed = true;

    task.completedAt =
        now.toISOString();


    saveTasks();

    renderAll();


    /* -----------------------------------------
       Celebration if completed before deadline
    ----------------------------------------- */

    if (now <= deadline) {

        showCelebration();

    } else {

        showToast(
            "Task completed, but after the deadline."
        );

    }

}


/* =========================================================
   CELEBRATION
========================================================= */

function showCelebration() {

    celebration.classList.remove(
        "hidden"
    );

}


closeCelebration.addEventListener(
    "click",
    () => {

        celebration.classList.add(
            "hidden"
        );

    }
);


/* =========================================================
   RENDER TASKS
========================================================= */

function renderTasks() {

    let filtered =
        [...tasks];


    /* Category */

    if (
        currentCategory !==
        "All"
    ) {

        filtered =
            filtered.filter(
                task =>
                    task.category ===
                    currentCategory
            );

    }


    /* Status */

    if (
        currentFilter ===
        "pending"
    ) {

        filtered =
            filtered.filter(
                task =>
                    !task.completed
            );

    }


    if (
        currentFilter ===
        "completed"
    ) {

        filtered =
            filtered.filter(
                task =>
                    task.completed
            );

    }


    /* Sort */

    filtered.sort(
        (a, b) =>
            new Date(a.deadline) -
            new Date(b.deadline)
    );


    taskList.innerHTML = "";


    if (
        filtered.length === 0
    ) {

        emptyState.classList.remove(
            "hidden"
        );

        return;

    }


    emptyState.classList.add(
        "hidden"
    );


    filtered.forEach(
        task => {

            taskList.appendChild(
                createTaskCard(task)
            );

        }
    );

}


/* =========================================================
   CREATE TASK CARD
========================================================= */

function createTaskCard(task) {

    const card =
        document.createElement(
            "article"
        );

    card.className =
        "task-card";


    if (task.completed) {

        card.classList.add(
            "completed"
        );

    }


    const deadline =
        new Date(
            task.deadline
        );

    const now =
        new Date();


    let deadlineClass = "";

    let deadlineText =
        `Due ${formatDate(deadline)}
        at ${formatTime(deadline)}`;


    if (
        !task.completed &&
        deadline < now
    ) {

        deadlineClass =
            "overdue";

        deadlineText =
            `OVERDUE • ${formatDate(deadline)}
            at ${formatTime(deadline)}`;

    } else if (
        !task.completed &&
        deadline - now <
        60 * 60 * 1000
    ) {

        deadlineClass =
            "warning";

        deadlineText =
            `⚠ COMING SOON • ${formatDate(deadline)}
            at ${formatTime(deadline)}`;

    }


    card.innerHTML = `

        <button
            class="task-check
            ${task.completed ? "checked" : ""}"
            title="Mark complete"
        >
            ${task.completed ? "✓" : ""}
        </button>


        <div>

            <div class="task-title">
                ${escapeHTML(task.title)}
            </div>

            ${
                task.description
                    ? `
                        <div class="task-description">
                            ${escapeHTML(
                                task.description
                            )}
                        </div>
                    `
                    : ""
            }


            <div class="task-meta">

                <span class="badge red">
                    ${escapeHTML(task.category)}
                </span>

                <span class="badge">
                    Added:
                    ${formatDate(
                        new Date(
                            task.createdAt
                        )
                    )}
                </span>

            </div>


            <div
                class="deadline ${deadlineClass}"
            >
                ⏰ ${deadlineText}
            </div>

        </div>


        <div class="task-actions">

            <button
                class="edit-btn"
                title="Edit task"
            >
                ✏
            </button>

            <button
                class="delete-btn"
                title="Delete task"
            >
                🗑
            </button>

        </div>

    `;


    card
        .querySelector(".task-check")
        .addEventListener(
            "click",
            () => completeTask(task.id)
        );


    card
        .querySelector(".edit-btn")
        .addEventListener(
            "click",
            () => editTask(task.id)
        );


    card
        .querySelector(".delete-btn")
        .addEventListener(
            "click",
            () => deleteTask(task.id)
        );


    return card;

}


/* =========================================================
   ESCAPE HTML
========================================================= */

function escapeHTML(value) {

    return String(value)
        .replace(
            /&/g,
            "&amp;"
        )
        .replace(
            /</g,
            "&lt;"
        )
        .replace(
            />/g,
            "&gt;"
        )
        .replace(
            /"/g,
            "&quot;"
        )
        .replace(
            /'/g,
            "&#039;"
        );

}


/* =========================================================
   FILTER BUTTONS
========================================================= */

document
    .querySelectorAll(".filter")
    .forEach(
        button => {

            button.addEventListener(
                "click",
                () => {

                    document
                        .querySelectorAll(
                            ".filter"
                        )
                        .forEach(
                            b =>
                                b.classList
                                    .remove(
                                        "active"
                                    )
                        );

                    button.classList.add(
                        "active"
                    );

                    currentFilter =
                        button.dataset.filter;

                    renderTasks();

                }
            );

        }
    );


/* =========================================================
   CATEGORY BUTTONS
========================================================= */

document
    .querySelectorAll(".category")
    .forEach(
        button => {

            button.addEventListener(
                "click",
                () => {

                    document
                        .querySelectorAll(
                            ".category"
                        )
                        .forEach(
                            b =>
                                b.classList
                                    .remove(
                                        "active"
                                    )
                        );

                    button.classList.add(
                        "active"
                    );

                    currentCategory =
                        button.dataset.category;

                    document.getElementById(
                        "listTitle"
                    ).textContent =
                        currentCategory ===
                        "All"
                            ? "All Tasks"
                            : currentCategory;

                    renderTasks();

                }
            );

        }
    );


/* =========================================================
   STATISTICS
========================================================= */

function updateStatistics() {

    const now =
        new Date();


    const completed =
        tasks.filter(
            t => t.completed
        ).length;


    const overdue =
        tasks.filter(
            t =>
                !t.completed &&
                new Date(
                    t.deadline
                ) < now
        ).length;


    document.getElementById(
        "totalTasks"
    ).textContent =
        tasks.length;


    document.getElementById(
        "completedTasks"
    ).textContent =
        completed;


    document.getElementById(
        "pendingTasks"
    ).textContent =
        tasks.length -
        completed;


    document.getElementById(
        "overdueTasks"
    ).textContent =
        overdue;


    updateCategoryCounts();

}


/* =========================================================
   CATEGORY COUNTS
========================================================= */

function updateCategoryCounts() {

    const categories = [
        "Personal",
        "Work",
        "Study",
        "Shopping",
        "Important"
    ];


    document.getElementById(
        "allCount"
    ).textContent =
        tasks.length;


    categories.forEach(
        category => {

            const element =
                document.getElementById(
                    category
                        .toLowerCase()
                        + "Count"
                );

            if (element) {

                element.textContent =
                    tasks.filter(
                        t =>
                            t.category ===
                            category
                    ).length;

            }

        }
    );

}


/* =========================================================
   CALENDAR
========================================================= */

function renderCalendar() {

    const year =
        calendarDate.getFullYear();

    const month =
        calendarDate.getMonth();


    calendarMonth.textContent =
        calendarDate.toLocaleDateString(
            "en-US",
            {
                month: "long"
            }
        );


    calendarYear.textContent =
        year;


    calendarDays.innerHTML = "";


    /*
        Convert Sunday-first JavaScript
        index into Monday-first calendar.
    */

    let firstDay =
        new Date(
            year,
            month,
            1
        ).getDay();


    firstDay =
        firstDay === 0
            ? 6
            : firstDay - 1;


    const daysInMonth =
        new Date(
            year,
            month + 1,
            0
        ).getDate();


    /* Empty cells */

    for (
        let i = 0;
        i < firstDay;
        i++
    ) {

        const empty =
            document.createElement(
                "div"
            );

        calendarDays.appendChild(
            empty
        );

    }


    /* Days */

    for (
        let day = 1;
        day <= daysInMonth;
        day++
    ) {

        const button =
            document.createElement(
                "button"
            );

        button.className =
            "calendar-day";


        const date =
            new Date(
                year,
                month,
                day
            );


        const key =
            dateKey(date);


        if (
            key ===
            dateKey(new Date())
        ) {

            button.classList.add(
                "today"
            );

        }


        if (
            key ===
            dateKey(
                selectedCalendarDate
            )
        ) {

            button.classList.add(
                "selected"
            );

        }


        if (
            tasks.some(
                task =>
                    dateKey(
                        new Date(
                            task.deadline
                        )
                    ) === key
            )
        ) {

            button.classList.add(
                "has-task"
            );

        }


        button.textContent =
            day;


        button.addEventListener(
            "click",
            () => {

                selectedCalendarDate =
                    date;

                renderCalendar();

                renderCalendarTasks();

            }
        );


        calendarDays.appendChild(
            button
        );

    }


    renderCalendarTasks();

}


/* =========================================================
   CALENDAR TASKS
========================================================= */

function renderCalendarTasks() {

    const key =
        dateKey(
            selectedCalendarDate
        );


    const selectedTasks =
        tasks.filter(
            task =>
                dateKey(
                    new Date(
                        task.deadline
                    )
                ) === key
        );


    selectedDateText.textContent =
        selectedCalendarDate.toLocaleDateString(
            "en-US",
            {
                weekday: "long",
                day: "numeric",
                month: "long",
                year: "numeric"
            }
        );


    calendarTasks.innerHTML = "";


    if (
        selectedTasks.length === 0
    ) {

        calendarTasks.innerHTML = `
            <p
                style="
                    font-size:10px;
                    color:#777;
                "
            >
                No tasks scheduled.
            </p>
        `;

        return;

    }


    selectedTasks.forEach(
        task => {

            const item =
                document.createElement(
                    "div"
                );

            item.className =
                "calendar-task";


            item.innerHTML = `

                <strong>
                    ${escapeHTML(task.title)}
                </strong>

                <span>
                    ${formatTime(
                        new Date(
                            task.deadline
                        )
                    )}
                    •
                    ${escapeHTML(
                        task.category
                    )}
                </span>

            `;


            calendarTasks.appendChild(
                item
            );

        }
    );

}


/* =========================================================
   PREVIOUS MONTH
========================================================= */

document
    .getElementById(
        "prevMonth"
    )
    .addEventListener(
        "click",
        () => {

            calendarDate.setMonth(
                calendarDate.getMonth() - 1
            );

            renderCalendar();

        }
    );


/* =========================================================
   NEXT MONTH
========================================================= */

document
    .getElementById(
        "nextMonth"
    )
    .addEventListener(
        "click",
        () => {

            calendarDate.setMonth(
                calendarDate.getMonth() + 1
            );

            renderCalendar();

        }
    );


/* =========================================================
   TODAY BUTTON
========================================================= */

document
    .getElementById(
        "todayBtn"
    )
    .addEventListener(
        "click",
        () => {

            const today =
                new Date();

            calendarDate =
                new Date(today);

            selectedCalendarDate =
                new Date(today);

            renderCalendar();

        }
    );


/* =========================================================
   CALENDAR EXPORT
========================================================= */

document
    .getElementById(
        "exportCalendar"
    )
    .addEventListener(
        "click",
        exportCalendar
    );


function exportCalendar() {

    const key =
        dateKey(
            selectedCalendarDate
        );


    const selectedTasks =
        tasks.filter(
            task =>
                dateKey(
                    new Date(
                        task.deadline
                    )
                ) === key
        );


    if (
        selectedTasks.length === 0
    ) {

        showToast(
            "No tasks on this date."
        );

        return;

    }


    let calendar =
        "BEGIN:VCALENDAR\r\n";

    calendar +=
        "VERSION:2.0\r\n";

    calendar +=
        "PRODID:-//TaskFlow//EN\r\n";


    selectedTasks.forEach(
        task => {

            const start =
                new Date(
                    task.deadline
                );


            const end =
                new Date(
                    start.getTime()
                    +
                    30 *
                    60 *
                    1000
                );


            calendar +=
                "BEGIN:VEVENT\r\n";

            calendar +=
                `UID:${task.id}@taskflow\r\n`;

            calendar +=
                `DTSTAMP:${icsDate(
                    new Date()
                )}\r\n`;

            calendar +=
                `DTSTART:${icsDate(
                    start
                )}\r\n`;

            calendar +=
                `DTEND:${icsDate(
                    end
                )}\r\n`;

            calendar +=
                `SUMMARY:${escapeICS(
                    task.title
                )}\r\n`;

            calendar +=
                `DESCRIPTION:${escapeICS(
                    task.description
                )}\r\n`;

            calendar +=
                "END:VEVENT\r\n";

        }
    );


    calendar +=
        "END:VCALENDAR\r\n";


    const blob =
        new Blob(
            [calendar],
            {
                type:
                    "text/calendar"
            }
        );


    const url =
        URL.createObjectURL(
            blob
        );


    const link =
        document.createElement(
            "a"
        );

    link.href = url;

    link.download =
        "taskflow-calendar.ics";

    link.click();


    URL.revokeObjectURL(
        url
    );


    showToast(
        "Calendar file created."
    );

}


/* =========================================================
   ICS DATE
========================================================= */

function icsDate(date) {

    return date
        .toISOString()
        .replace(
            /[-:]/g,
            ""
        )
        .replace(
            /\.\d{3}/,
            ""
        );

}


function escapeICS(value) {

    return String(
        value || ""
    )
        .replace(
            /\\/g,
            "\\\\"
        )
        .replace(
            /;/g,
            "\\;"
        )
        .replace(
            /,/g,
            "\\,"
        )
        .replace(
            /\n/g,
            "\\n"
        );

}


/* =========================================================
   BROWSER NOTIFICATIONS
========================================================= */

document
    .getElementById(
        "notificationBtn"
    )
    .addEventListener(
        "click",
        requestNotifications
    );


async function requestNotifications() {

    if (
        !("Notification" in window)
    ) {

        showToast(
            "Your browser does not support notifications."
        );

        return;

    }


    const permission =
        await Notification.requestPermission();


    if (
        permission ===
        "granted"
    ) {

        new Notification(
            "TaskFlow Notifications Enabled",
            {
                body:
                    "You will receive task deadline reminders."
            }
        );

        showToast(
            "Notifications enabled."
        );

    } else {

        showToast(
            "Notification permission was not granted."
        );

    }

}


/* =========================================================
   CHECK DEADLINES
========================================================= */

function checkDeadlines() {

    const now =
        new Date();


    tasks.forEach(
        task => {

            if (
                task.completed ||
                task.reminderSent
            ) {
                return;
            }


            const deadline =
                new Date(
                    task.deadline
                );


            const reminderTime =
                deadline.getTime()
                -
                task.reminder
                *
                60
                *
                1000;


            if (
                now.getTime()
                >=
                reminderTime &&
                now.getTime()
                <
                deadline.getTime()
            ) {

                sendDeadlineNotification(
                    task
                );

                task.reminderSent =
                    true;

            }

        }
    );


    saveTasks();

    renderAll();

}


/* =========================================================
   SEND NOTIFICATION
========================================================= */

function sendDeadlineNotification(
    task
) {

    const message =
        `"${task.title}" is due soon.`;


    if (
        "Notification" in window &&
        Notification.permission ===
        "granted"
    ) {

        new Notification(
            "⏰ Task Deadline Approaching",
            {
                body: message,

                icon: ""
            }
        );

    }


    showToast(
        `⏰ ${message}`
    );

}


/* =========================================================
   OVERDUE CHECK
========================================================= */

setInterval(
    checkDeadlines,
    30000
);


/* =========================================================
   TOAST
========================================================= */

let toastTimer;


function showToast(message) {

    toast.textContent =
        message;

    toast.classList.add(
        "show"
    );


    clearTimeout(
        toastTimer
    );


    toastTimer =
        setTimeout(
            () => {

                toast.classList.remove(
                    "show"
                );

            },
            3000
        );

}


/* =========================================================
   CELEBRATION CLOSE
========================================================= */

celebration.addEventListener(
    "click",
    event => {

        if (
            event.target ===
            celebration
        ) {

            celebration.classList.add(
                "hidden"
            );

        }

    }
);


/* =========================================================
   RENDER EVERYTHING
========================================================= */

function renderAll() {

    renderTasks();

    updateStatistics();

    renderCalendar();

}


/* =========================================================
   INITIALIZE
========================================================= */

renderAll();

checkDeadlines();