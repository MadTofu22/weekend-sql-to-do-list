CREATE TABLE "tasks" (
    "id" SERIAL PRIMARY KEY,
    "name" varchar(50) NOT NULL,
    "description" varchar(500),
    "status" varchar(20) NOT NULL,
    "due" date
);

INSERT INTO "tasks" ("name", "description", "status", "due") VALUES
('Finish Assignment', 'Finish the weekend challenge including all of the strethc goals.', 'In-progress', '10/19/2020'),
('Sell Cars', 'Sell cars in GTA V online', 'New', '10/19/2020'),
('Watch Good Place', 'Watch the good place all the way through the new season on netflix.', 'In-progress', '10/19/2020');

INSERT INTO "tasks" ("name", "description", "status") VALUES
('Task 1', 'Do the thing for task 1', 'New'),
('Task 2', 'Do the thing for task 2', 'In-progress'),
('Task 3', 'Do the thing for task 3', 'Completed'),
('Task 4', 'Do the thing for task 4', 'Over Due');

INSERT INTO "tasks" ("name", "status")
VALUES ('Task 5', 'New'),
('Task 6', 'New');