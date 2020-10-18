const express = require('express');
const taskRouter = express.Router();
const pool = require('../modules/pool');

// Route to allow the client to retrieve the tasks stored in the DB
taskRouter.get('/', (req, res) => {
    console.log('hello from /tasks GET');

    let queryText = `SELECT * FROM "tasks";`;

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
    
    let name = req.body.name;
    let description = req.body.description;
    let status = req.body.status;
    let due = req.body.due;
    let queryText = ``;
    let queryParams = [];

    if (!due && !description) { // This means there is no due date and no description
        queryText += `INSERT INTO "tasks" ("name", "status") VALUES ($1, $2);`;
        queryParams = [name, status];
    } else if (!due) { // This means there is no due date set
        queryText += `INSERT INTO "tasks" ("name", "description", "status") VALUES ($1, $2, $3);`;
        queryParams = [name, description, status];
    } else if (!description) { // This means there is no description set
        queryText += `INSERT INTO "tasks" ("name", "status", "due") VALUES ($1, $2, $3);`;
        queryParams = [name, status, due];
    } else { // This means all info is present
        queryText += `INSERT INTO "tasks" ("name", "description", "status", "due") VALUES ($1, $2, $3, $4);`;
        queryParams = [name, description, status, due];
    }

    pool.query(queryText, queryParams).then(result => {
        console.log('result from /tasks POST', result);
        res.sendStatus(200);
    }).catch(error => {
        console.log('error in /tasks POST', error);
        res.sendStatus(500);
    });
});

// Route to allow the client to update the status of a task in the DB
taskRouter.put('/:id', (req, res) => {
    console.log('hello from /tasks PUT');


});

// Route to allow the client to delete a task from the DB
taskRouter.delete('/:id', (req, res) => {
    console.log('hello from /tasks DELETE');


});

module.exports = taskRouter;