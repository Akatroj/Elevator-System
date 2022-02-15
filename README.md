# Elevator System

## About

Simple application that controls the movement of elevators in a builing.

You can view the deployed page at [this link](https://akatroj.github.io/Elevator-System/)

Features: 
* Send an elevator to a target floor - the elevator will organise it's stops in the most efficient manner.
* Request a pickup from your location - the elevator closest to your floor will come to you.

You can find more details about the algorithms used by the system in [src/models/](src/models/) directory.

The application also comes with a front-end made with React and styled-components, to visualize it's behaviour in an eye-friendly way.

The application comes with a demo enabled by default - random pickup and dropoff requests will be made every second. You can admire the efficiency of the elevators, or you can disable the demo from the menu - doing so will teleport all elevators to the ground and make them abandon their previous requests.

The frontend isn't finished yet - there are some known issues.

Each floor has it's own endpoint, however persistence isn't implemented yet, so navigating to different floors through your browser's URL bar will reset the system. You can however use buttons in the menu to view other floors.
There was supposed to be a full-screen animation of doors closing and opening on you when moving floors, however it isn't here yet.

Every second a new step of this simulation is played - all elevators move one floor closer to their targets. You can pause the interval from the menu.

When an elevator arrives at your floor, it will show a door opening animation revealing the buttons inside - you can use them so send the elevator to different floors.
These buttons are scrollable.
You can use the debug mode button from the menu to force these buttons to stay on top, even when the elevator is closed.

Currently, the animation will play everytime an elevator comes to your floor - even if it isn't stopping on your floor and just passing by.

By default there are 10 floors, you can however change this number from the menu. 
Changing this number causes all elevators to abandon their duties and teleport back to the ground floor - this is by design, because changing the number of floors while the elevators are moving causes a lot of mental dillema - what should happend with an elevator that was previously on a now deleted floor - should it be destroyed, teleported back to ground, or forced to crawl back to existing floors one by one?

You can use the triangular buttons (currently hideously located at the top left corner - sorry!) to request a pickup.

After hovering on an elevator you can remove it. You can also add up to 16 elevators using the green plus icon.

Communication between data model and the front-end is done mostly by the [ElevatorSystemContext](src/contexts/ElevatorSystem.tsx) using lots of react hooks to trick React - a framework all about immutable states, to handle mutable states 😎. I don't regret my choices.

It's kinda bloated, coming in at around 220 LOC. I probably shouldn't be keeping so much state in this single context - from proxy methods that mutate the data model and force react to update the view, through bonus funcionality like amount of floors, to something that probably really shouldn't be there like advancing the simulation on interval and demo feature functionality.



## Development:
Install the necesarry dependencies first: 

`npm install`

Start the dev server:

`npm start`

* Open http://localhost:3000 to view it in the browser.

* The page will reload if you make edits. You will also see any lint errors in the console.


Build for production:

`npm run build`
