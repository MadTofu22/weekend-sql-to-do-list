console.log('client.js has loaded');
$(onReady);

function onReady() {
    console.log('jquery.js has loaded');

    // Initial task display from DB
    getTasks();

    $('#addTask').on('click', addTask);
}

// This function handles the click event for adding a task to the DB
function addTask () {
    console.log('hello from addTask()');

    // Get input from the user
    let name = $('#nameInput');
    let description = $('#descriptionInput');
    let status = $('#stateInput');
    let due = $('#dueInput');

    // Validate the input before proceeding
    if (validateInput([name, description, status, due])) {
        console.log('passed validation');
        // Pass the data to the server for DB storage
        $.ajax({
            method: `POST`,
            url: `/tasks`,
            data: {
                name: name.val(),
                description: description.val(),
                status: status.val(),
                due: due.val()
            }
        }).then(response => {
            console.log('response from addTask() POST');
            $('.inputFields').val('');
        }).catch(error => {
            alert(error);
        });
    } else {
        alert('Please enter all required inputs.')
    }

}

// This function ensures there is a value in the required fields and makes sure there are no invalid entries.
function validateInput (inputArray) {
    console.log('hello from validateInput()');

    // const invalidChars = ['/', ';', '_', '@', '%', '^', '+', '*', '<', '>', '\\', '`', '~'];
    //  && !Array.from(value).some(char => invalidChars.includes(char))
    let numOfPasses = 0;

    // Iterate through the array and check each input
    for (let input of inputArray) {
        let value = input.val();
        console.log('in validateInput, value:', value);
        // Check if the input is a required field, if not pass it right away
        if (input.prop('required')) {
            // Check to make sure there are no invalid characters and the string is not empty to pass as valid
            if (value) { 
                numOfPasses++;
            }
            else {
                alert ('Please enter a valid string.');
                return false;
            }
        }
        else {
            numOfPasses++;
        }
    }
    // Ensure the number of passes is the number of inputs
    if (numOfPasses === inputArray.length) {
        return true;
    }
}

// This function gets the tasks stored on the DB then passes them to displayTasks.
function getTasks () {
    console.log('hello from getTasks()');

    $.ajax({
        method: 'GET',
        url: '/tasks'
    }).then(response => {
        console.log('response from /tasks GET:', response);
        displayTasks(response);
    }).catch(error => {
        alert(error);
    });
}

// This function formats the tasks from the DB and displays them to DOM
function displayTasks (taskArray) {
    console.log('hello from displayTasks(), taskArray:', taskArray);

    // Iterate through the array and form each html string then add it to the DOM
    for (let task of taskArray) {
        let nameString = `<h3>${task.name}</h3>`;
        let descriptionString = `<div class="descriptionContainer"><p>${task.description}</p></div>`;
        let statusString = makeStatusString(task.status, task.id);
        let dueString = makeDueString(task.status, task.due, task.id);
        let htmlString = `
            <section class="taskContainer" id="task_${task.id}" data-id="${task.id}"> 
                ${nameString}
                ${dueString}
                ${statusString}
                ${descriptionString}
            </section>`;
        $('#tasks').append(htmlString);
    }
}

// This function creates and returns the HTML string for the task status.
function makeStatusString (status, id) {
    console.log('hello from makeStatusString(), status:', status);
    let htmlString = ``;

    // Check if the status is complete or not to determine what gets displayed
    if (status == 'Completed') {
        htmlString = `
            <div class="statusContainer">
                <p>!!!${status}!!!</p><br>
                <button class="deleteButton" data-id="${id}">Delete</button>
            </div>`;
    } else {
        let options = makeOptionsString(status);
        htmlString = `
        <div class="statusContainer">
            <p>Current Status: ${status}</p><br>
            <label for="statusUpdate"></label>
            <select name="statusUpdate" class="inputField" id="statusUpdate_${id}">
                ${options}
            </select>
            <button class="statusUpdateButton" data-id="${id}">Update</button>
        </div>`;
    }
    return htmlString;
}

// This function creates and returns the html string for the options in the status update drop down
function makeOptionsString (status) {
    console.log('hello from makeOptionsString(), status:', status);
    let htmlString = ``;

    switch(status){
        case 'New':
            htmlString = `
                <option value="In-progress">In-progress</option>
                <option value="Complete">Complete</option>
                `;
            break;

        case 'In-progress':
            htmlString = `
                <option value="New">New</option>
                <option value="Complete">Complete</option>
                `;
            break;
        
        default:
            htmlString = `
                <option value="New">New</option>
                <option value="In-progress">In-progress</option>
                <option value="Complete">Complete</option>
                `;
                break;
    }
    return htmlString;
}

// This function creates and returns the html string for a due date
function makeDueString (status, date, id) {
    console.log('hello from makeDueString(), status:', status, '; date:', date);

    let htmlString = ``;
    if (date) {
        if (status == 'Completed') {
            htmlString = `
            <div class="dueContainer">
                <p>Completed before or on: ${date.slice(0, 10)}</p>
            </div>`;
        } else {
            htmlString = `
            <div class="dueContainer">
            <p>Due on: <br> ${date.slice(0, 10)}</p>
            </div>`;
        }
    } else {
        htmlString = `
            <div class="dueContainer">
                <p>Due Date Not Set</p>
                <label for="dueUpdate_${id}">Update:</label>
                <input type="date" name="dueUpdate" id="dueUpdate_${id}" class="inputField">
                <button class="dueUpdateButton" data-id="${id}">Update</button>
            </div>`;
    }
    return htmlString;
}