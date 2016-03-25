# pcr-plate-react

Web-based PCR Plate application built with React, React DnD, Touch backend, and Flux. [Feel free to play with the example by searching for 'run_1'](http://john-ziegler.github.io/pcr-plate-react/). It's worth noting that the example utilizes localStorage, instead of actual api calls, and only one example run is loaded (creatively named 'run_1').

To begin:

`npm install`

To start the server:

`npm start`


**Background** - 8x12 PCR Plates are used in genonmic testing in labs everywhere and lab technologists spend hours recording test setup. This project was meant to demonstate automated creation of the pcr plates, and allowing the user to modify the setup (add/delete/move) as needed. 

**Acknowledgements** - This little project was inspired by the [React DnD tutorial](http://gaearon.github.io/react-dnd/docs-tutorial.html) and the base of this repo was cloned from [react-hot-boilerplate](https://github.com/gaearon/react-hot-boilerplate)  




*Disclaimer* - this is still a work in progress, stay tuned for more improvements, functionality, and clean-up. 

**Current Todos**:
* Add export functionality to generate file/pdf of the current view
* Drag Preview for the touch backend
* Ability to select and drag groups of cells
* Refactoring 

Also, the application references an API which will need to be changed for subsequent uses. 
