const express = require('express');
const taskRouter = express.Router();
const pool = require('./pool');

// Route to allow the client to retrieve the tasks stored in the DB
taskRouter.get('/', (req, res) => {
    console.log('hello from /tasks GET');

    let queryText = `SELECT * FROM "tasks" ORDER BY "id";`;

    pool.query(queryText).then(result => {
        console.log('result from /tasks GET', result.rows);
        res.send(result.rows);
    }).catch(error => {
        console.log('error in /tasks GET', error);
        res.sendStatus(500);
    });
});

// Route to allow the client to add a new task to the DB
// Name and Status cannot be null
taskRouter.post('/', (req, res) => {
    console.log('hello from /tasks POST');
    
    // Get the user input from the client request
    let name = req.body.name;
    let description = req.body.description;
    let status = req.body.status;
    let due = req.body.due;
    let queryText = ``;
    let queryParams = [];

    // Check which inputs were left blank to set the query text and parameters 
    if (due == '' && description == '') { // This means there is no due date and no description
        queryText += `INSERT INTO "tasks" ("name", "status") VALUES ($1, $2);`;
        queryParams = [name, status];
    } else if (due == '') { // This means there is no due date set
        queryText += `INSERT INTO "tasks" ("name", "description", "status") VALUES ($1, $2, $3);`;
        queryParams = [name, description, status];
    } else if (description == '') { // This means there is no description set
        queryText += `INSERT INTO "tasks" ("name", "status", "due") VALUES ($1, $2, $3);`;
        queryParams = [name, status, due];
    } else { // This means all info is present
        queryText += `INSERT INTO "tasks" ("name", "description", "status", "due") VALUES ($1, $2, $3, $4);`;
        queryParams = [name, description, status, due];
    }
    console.log('queryText:', queryText, '; queryParamas:', queryParams);

    // Send request to the DB
    pool.query(queryText, queryParams).then(result => {
        console.log('result from /tasks POST', result);
        res.sendStatus(200);
    }).catch(error => {
        console.log('error in /tasks POST', error);
        res.sendStatus(500);
    });
});

// Route to allow the client to update the status of a task in the DB
taskRouter.put('/status/:id', (req, res) => {
    console.log('hello from /tasks PUT');

    let id = req.params.id;
    let info = req.body.newInfo;
    let queryText = `UPDATE "tasks" SET "status" = $1 WHERE "id" = $2;`;

    pool.query(queryText, [info, id]).then(result => {
        console.log('result from /tasks PUT', result);
        res.sendStatus(200);
    }).catch(error => {
        console.log('error in /tasks PUT', error);
        res.sendStatus(500);
    });
});

// Route to allow the client to update the due date of a task in the DB
taskRouter.put('/due/:id', (req, res) => {
    console.log('hello from /tasks PUT');

    let id = req.params.id;
    let info = req.body.newInfo;
    let queryText = `UPDATE "tasks" SET "due" = $1 WHERE "id" = $2;`;

    pool.query(queryText, [info, id]).then(result => {
        console.log('result from /tasks PUT', result);
        res.sendStatus(200);
    }).catch(error => {
        console.log('error in /tasks PUT', error);
        res.sendStatus(500);
    });
});

// Route to allow the client to delete a task from the DB
taskRouter.delete('/:id', (req, res) => {
    console.log('hello from /tasks DELETE');

    let id = req.params.id;
    let queryText = `DELETE FROM "tasks" WHERE "id" = $1;`;

    pool.query(queryText, [id]).then(result => {
        console.log('result from /tasks DELETE', result);
        res.sendStatus(200);
    }).catch(error => {
        console.log('error in /tasks DELETE', error);
        res.sendStatus(500);
    });
});

module.exports = taskRouter;