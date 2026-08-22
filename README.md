# Web-Development-Task4 for my SkillCraft Technology Internship
Develop a task management web application that allows users to add, organize, edit, and complete tasks while assigning dates and time limits. The application provides deadline notifications, completion celebrations, and calendar-based task organization to help users manage their activities efficiently.

# Task 04 — Smart To-Do & Task Management Web Application

## 📌 Project Overview

Task 04 is a **smart and interactive To-Do web application** designed to help users create, organize, schedule, and track their daily activities. The application is developed using **HTML, CSS, and JavaScript**, with a strong focus on productivity and ease of use. Users can add tasks along with a title, description, date, start time, and time limit for completion. Each task is recorded and displayed in an organized task list, allowing users to easily monitor their pending and completed activities.

The application goes beyond a basic To-Do list by incorporating **task scheduling, deadline tracking, reminders, calendar integration, and completion feedback**. Users can edit existing tasks, mark them as completed, and organize tasks according to their respective dates. A calendar interface allows scheduled tasks to be viewed on the appropriate day, making it easier to plan activities and manage deadlines. The application follows a distinctive **red-and-white background theme with black text**, providing a clean and consistent visual identity.

---

## ✨ Key Features

* ➕ **Add Tasks** — Users can create new tasks with relevant details.
* 📝 **Task Description** — Each task can contain additional information.
* 📅 **Set Task Date** — Users can assign a specific date to each task.
* ⏰ **Set Task Time** — Users can specify when a task should be completed.
* ⏳ **Set Time Limit** — A deadline can be assigned to each task.
* ✏️ **Edit Tasks** — Existing task information can be modified.
* ✅ **Complete Tasks** — Users can mark tasks as completed.
* 🗑️ **Delete Tasks** — Unnecessary tasks can be removed.
* 📋 **Organized Lists** — Tasks can be categorized or organized for easier management.
* 📆 **Calendar Integration** — Tasks appear on their respective scheduled dates.
* 🔔 **Deadline Reminders** — Users receive warnings when a deadline is approaching.
* 📱 **Notification Support** — Browser notifications can alert users about upcoming deadlines.
* 🎉 **Completion Celebration** — A small celebration appears when a task is completed within its time limit.
* 💾 **Task Persistence** — Tasks can be stored locally so they remain available after refreshing the webpage.
* 🎨 **Red & White Theme** — The interface uses red and white with black text.
* 📱 **Responsive Design** — The application can adapt to different screen sizes.

---

## 🛠️ Technologies Used

| Technology        | Purpose                                                              |
| ----------------- | -------------------------------------------------------------------- |
| **HTML5**         | Creates the structure of the task-management interface               |
| **CSS3**          | Handles styling, layouts, colors, animations, and responsiveness     |
| **JavaScript**    | Controls tasks, deadlines, notifications, calendar, and interactions |
| **Local Storage** | Stores task information in the browser                               |

---

## ➕ Task Creation

The primary functionality of the application is allowing users to create new tasks.

When adding a task, the user can provide information such as:

```text
Task Title
Task Description
Task Date
Start Time
Deadline / Time Limit
Category
```

After submitting the form, the task is added to the task list and becomes available for tracking.

This allows users to create both simple tasks and detailed scheduled activities.

---

## ✏️ Edit & Manage Tasks

Users can modify tasks after they have been created. The **Edit** functionality allows information such as the title, description, date, time, or deadline to be changed.

Tasks can also be deleted when they are no longer required.

This provides basic **CRUD functionality**:

```text
Create
   ↓
Read
   ↓
Update
   ↓
Delete
```

The user can therefore manage the complete lifecycle of a task through the application.

---

## ✅ Task Completion

Each task contains a completion control that allows the user to mark it as **completed**.

When a task is completed, its visual appearance can change to clearly distinguish it from pending tasks. For example, the task can be displayed with a completed indicator or modified text styling.

An additional feature is the **completion celebration**.

If the user completes a task before its assigned deadline, a small celebration animation can appear on the screen, providing positive feedback and encouraging productivity.

---

## ⏰ Deadline & Time Management

Every scheduled task can have a specific **date and time limit**.

The application continuously checks the current time against the task deadline. When the deadline approaches, the user can receive a reminder.

For example:

```text
Task: Complete Project Report

Date: 25 August 2026
Deadline: 6:00 PM

Reminder:
"Your task deadline is approaching!"
```

This feature helps users prioritize important activities and avoid missing deadlines.

---

## 🔔 Notification System

The application can use the browser's **Notification API** to provide reminders when a task is approaching its deadline.

Users can grant notification permission to the website, after which the application can display reminders.

For example:

> ⚠️ Your "Project Report" deadline is approaching.

For reliable notifications when the website is closed or when notifications must reach a phone, additional technologies such as a **Progressive Web App, push-notification service, or backend server** may be required.

---

## 📆 Calendar Integration

One of the major features of the application is the ability to connect tasks with a **calendar-style interface**.

When a task is assigned a specific date, it appears on that date within the application's calendar.

For example:

```text
        August 2026

Mon   Tue   Wed   Thu   Fri
              19    20    21
22    23    24    25    26
            ↓
      Project Submission
```

This provides users with a visual overview of their scheduled activities and upcoming deadlines.

---

## 🎨 User Interface Design

The application follows a distinctive **red-and-white color scheme with black text**, as specified for the project.

The design focuses on:

* Clear task cards
* Readable typography
* Proper spacing
* Easily identifiable buttons
* Visual completion indicators
* Responsive layouts
* Simple navigation
* Calendar-based organization

Animations are used selectively to improve interaction without making the interface distracting.

---

## 📂 Project Structure

```text
Task-04/
│
├── index.html
├── style.css
└── script.js
```

### `index.html`

Contains the main structure of the application, including:

* Task creation form
* Task list
* Task cards
* Calendar
* Buttons
* Notification elements
* Completion indicators

### `style.css`

Controls:

* Red-and-white theme
* Black text
* Task-card design
* Calendar layout
* Buttons
* Responsive layouts
* Hover effects
* Completion animations
* Celebration effects

### `script.js`

Contains the main application logic, including:

* Adding tasks
* Displaying tasks
* Editing tasks
* Deleting tasks
* Completing tasks
* Deadline calculations
* Reminder checking
* Browser notifications
* Calendar task rendering
* Local Storage management
* Completion celebration

---

## 🚀 How to Run

1. Download or clone the Task 04 repository.
2. Open the project folder in **VS Code**.
3. Make sure the following files are available:

```text
index.html
style.css
script.js
```

4. Open the project using **Live Server**.
5. Allow notification permissions if prompted.
6. Start adding and scheduling tasks.

---

## 🎯 Project Objective

The primary objective of Task 04 is to develop a practical **productivity and task-management web application** that goes beyond a traditional To-Do list. The project demonstrates how users can create, modify, organize, schedule, and monitor tasks through an interactive web interface.

It also provides practical experience with **CRUD operations, JavaScript date and time handling, browser notifications, local storage, DOM manipulation, calendar interfaces, event handling, and CSS animations**.

---

## 📚 Learning Outcomes

Through this project, the following concepts are practiced:

* HTML form development
* CSS responsive design
* JavaScript DOM manipulation
* CRUD operations
* Event handling
* Local Storage
* Date and time manipulation
* Deadline calculations
* Browser Notification API
* Dynamic calendar generation
* Task filtering and organization
* Conditional logic
* CSS animations
* User-interface development
* Application state management

---

## 🔮 Future Enhancements

Possible future improvements include:

* 📱 Dedicated mobile application.
* ☁️ Cloud-based task synchronization.
* 🔐 User accounts and authentication.
* 🔔 Reliable push notifications.
* 📊 Productivity statistics.
* 📈 Weekly and monthly productivity reports.
* 🏷️ Advanced task categories and tags.
* 🔎 Task search and filtering.
* 🔄 Recurring tasks.
* 🤖 AI-powered task prioritization.
* 🌐 Multi-device synchronization.
* 🎯 Productivity goals and achievements.

---

## 👨‍💻 Project Status

**Status:** ✅ Completed

**Task:** Task 04 — Smart To-Do & Task Management Web Application
**Technologies:** HTML5, CSS3, JavaScript
**Type:** Front-End Web Development Project
**Theme:** Red, White & Black
**Core Features:** Task Management, Deadlines, Notifications & Calendar Integration
