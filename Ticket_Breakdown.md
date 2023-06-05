# Ticket Breakdown
We are a staffing company whose primary purpose is to book Agents at Shifts posted by Facilities on our platform. We're working on a new feature which will generate reports for our client Facilities containing info on how many hours each Agent worked in a given quarter by summing up every Shift they worked. Currently, this is how the process works:

- Data is saved in the database in the Facilities, Agents, and Shifts tables
- A function `getShiftsByFacility` is called with the Facility's id, returning all Shifts worked that quarter, including some metadata about the Agent assigned to each
- A function `generateReport` is then called with the list of Shifts. It converts them into a PDF which can be submitted by the Facility for compliance.

## You've been asked to work on a ticket. It reads:

**Currently, the id of each Agent on the reports we generate is their internal database id. We'd like to add the ability for Facilities to save their own custom ids for each Agent they work with and use that id when generating reports for them.**


Based on the information given, break this ticket down into 2-5 individual tickets to perform. Provide as much detail for each ticket as you can, including acceptance criteria, time/effort estimates, and implementation details. Feel free to make informed guesses about any unknown details - you can't guess "wrong".


You will be graded on the level of detail in each ticket, the clarity of the execution plan within and between tickets, and the intelligibility of your language. You don't need to be a native English speaker, but please proof-read your work.

## Your Breakdown Here

### Ticket 1: Update Agents table to add CustomId column

#### Description

- Update Agents table to add customId column. This column will keep information about the custom ids that facilities will add to each of the agents they work with, this new property will then be used to generate reports instead of the current ids.

#### Acceptance Criteria

- The Agents table must be updated to include the CustomId column;
- The CustomId column must be of type compatible with alphanumeric values and have a specified maximun length;
- The CustomId column must be indexed;
- The CustomId column must be unique;
- All of the current existing Agents in the database must be update to include the CustomId property.

#### Implementation Details

- Decide the new column's datatype and maximun length in compliance with current schema and acceptance criteria;
- Update the Agents table to include de CustomId column via migration;
- Update current existing Agents via migration to include a CustomId value for each one of them in case the values had been provided;
- Alter the queries that interact with the Agents table and use the current existing id parameter to use the CustomId instead;
- Alter the code that interacts with the Agent table.

#### Time Estimate

1-2 Hours

### Ticket 2: Implement queries that support the usage of CustomId field

#### Description

- Implement and/or modify the necessary queries to support the usage of CustomId field instead of the current id property

#### Acceptance Criteria

- When generating reports the Aents table must be queried using CustomId property instead of the current id property to generate the reports;
- All necessary queries for carrying the CRUD operations on the database must be implemented for the operations nedeed to keep all current existing implementations functional;

#### Implementation Details

- Modify the queries responsible for current queries to get Agent by CustomId instead of id when generating reports;
- Implement queries for remainder CRUD operations (if necessary);
- Queries must be thoroughly tested to guarantee that the reports will be generated correctly.

### Time Estimate

2-4 Hours

### Ticket 3: Modify implementation of generateReport function to use CustomId

#### Description

- Modify the current implementation of the generateReport function to use CustomId property instead of current database id.

#### Acceptance Criteria

- The generateReport function must use the CustomId property to generate the reports;
- All tests must pass in compliance with the pipeline's tests step;
- Please note that the CustomId tribute must be returned and shown in the reports;
- An X-ray report should be generated in order to document which tests were rewritten with evidence that they passed.

#### Implementation Details

- Modify the function generateReport to use CustomId when querying the Agents table;
- The function's as well as all correlated unit and integration tests must be rewritten to reflect the changes in the code;
- Write the X-ray tests report with the help of the squad's QA.

### Time Estimate

4-8 Hours