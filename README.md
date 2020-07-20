# Aequilibrium Demo by Daniel Leontiev

Install dependencies `npm install`

## Running the Demo
Run `npm run start` for a dev server. Navigate to `http://localhost:4200/`.

Both assignments are web application, developed in Angular 9.

On the home page you will see two buttons `Castle` and `Transformation`

Click on eather one to see the appropriate demo, with interactive input and graphical display.

## Running unit tests for Castle demo

Run `npm run test` to execute the unit tests via [Karma]

Unit tests for Castle demo located here `src/app/home/castle/view/castle-view.spec.ts`

The test runs agains utility functions defined in `src/app/home/castle/view/castle-view.config.ts`

## Note on Transformation Demo
The acceptance criteria, Output of a battle missing 3 scenarios:

Scenario 1: 
  Lets say there are 5 transformers, 2 Autobots and 3 Decepticons
  
  If 2 Autobots and 2 Decepticons have mutual destruction, in the event of a Tie
  
  this leavs 1 Decepticon, a survivor but not on a loosing team.
  
  This event is show by the demo as (Undetermined! Survivor via skipped battle)
  
Scenario 2:
  Lets say there are 4 transformers, 2 Autobots and 2 Decepticons
  
  If all have mutual destruction, in the event of a Tie (for example)
  
  There are not winning or loosing team.
  
  This event is shown by the demo as (All competitors destroyed No Survivors)
  
Additonal Scenarios:
  No survivors for the loosing team, is a possibility.
  
  More than one Bot on the winning team.
