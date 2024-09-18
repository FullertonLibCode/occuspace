# Occuspace data for library screens 
This web page is displayed on monitor screens around the library. It pulls data from Waitz.io/Occuspace.

There is a [live demo](https://fullertonlibcode.github.io/occuspace/) for the web page.

## File structure
```
occuspace
├── LICENSE
├── README.md
├── assets
│   ├── icons
│   │   ├── user-high-occupancy.svg
│   │   ├── user-low-occupancy.svg
│   │   ├── user-medium-occupancy.svg
│   │   └── user-unavailable-occupancy.svg
│   ├── script.js
│   └── styles.css
└── index.html
```
- assets/icons: contains the busyness indicator icons
- assets/script.js: a script to get and display data from Waitz.io
- assets/styles.css: a style sheet to format the page
- *index.html: the file to be displayed on monitors*
