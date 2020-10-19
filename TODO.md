# BASE TODO

## Features:

[X] Allow the user to create a task.
- [X] Update the DOM when a task is created.
- [X] Store the task in a database for longer storage.
[X] Allow the user to mark a task as completed.
- [X] Completed tasks should be visually different from incomplete tasks.
[X] Allow the user to delete a task.
- [X] Deleting a task should remove it from the database.

## Front End:

### Index.html

[X] Input fields:
- [X] Task Name
- [X] Task Description
- [X] Task State (New | In-progress | Complete | Overdue)
- [X] Due Date
[X] Add Task button
[X] Task View section
- [X] Display task name
- [X] Display task state
- [X] Display task description
- [X] Display task due date
- [X] Button to mark completed (if not completed)
- [X] Button to delete task (if completed)

### Styles.css

[X] Background color
[X] Font size changes
[X] Font family changes
[X] Task background and font color different for completed tasks

## Back End:

### Server/Router

[X] Add route from server to router
[X] GET route to get all store tasks from DB
[X] POST route to add new task DB
[X] PUT route to update a task in DB
[X] DELETE route to remove a task from the DB

### Database

[X] Create the table
