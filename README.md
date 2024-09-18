# Occuspace data for library screens 
This web page is displayed on monitor screens around the library. It pulls data from Waitz.io/Occuspace.

There is a [live demo](https://fullertonlibcode.github.io/occuspace/) for the web page.

## File structure
```
occuspace
├── LICENSE
├── assets 
│   ├── user-high-occupancy.svg
│   ├── user-low-occupancy.svg
│   ├── user-medium-occupancy.svg
│   └── user-unavailable-occupancy.svg
├── index.html
├── script.js
├── styles.css
└── visual.html
```
- assets: contains the busyness indicator icons
- *index.html: the file to be displayed on monitors*
- script.js: a script to get and display data from Waitz.io
- styles.css: a style sheet to format the page
- visual.html: a deprecated page