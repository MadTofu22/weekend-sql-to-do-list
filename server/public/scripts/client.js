console.log('client.js has loaded');
$(onReady);

function onReady() {
    console.log('jquery.js has loaded');

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
