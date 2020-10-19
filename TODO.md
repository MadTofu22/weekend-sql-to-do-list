# BASE TODO

## Features:

[ ] Allow the user to create a task.
- [ ] Update the DOM when a task is created.
- [ ] Store the task in a database for longer storage.
[ ] Allow the user to mark a task as completed.
- [ ] Completed tasks should be visually different from incomplete tasks.
[ ] Allow the user to delete a task.
- [ ] Deleting a task should remove it from the database.

## Front End:

### Index.html

[X] Input fields:
- [X] Task Name
- [X] Task Description
- [X] Task State (New | In-progress | Complete | Overdue)
- [X] Due Date
[X] Add Task button
[ ] Task View section
- [X] Display task name
- [X] Display task state
- [X] Display task description
- [X] Display task due date
- [ ] Button to mark completed (if not completed)
- [ ] Button to delete task (if completed)

### Styles.css

[X] Background color
[ ] Font size changes
[ ] Font family changes
[ ] Task background and font color different for completed tasks

## Back End:

### Server/Router

[X] Add route from server to router
[X] GET route to get all store tasks from DB
[X] POST route to add new task DB
[ ] PUT route to update a task in DB
[ ] DELETE route to remove a task from the DB

### Database

[ ] Create the table
