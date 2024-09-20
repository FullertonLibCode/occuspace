# Occuspace data for library screens 
This live-time crowd level [page](https://www.library.fullerton.edu/study-make/how-busy/monitor-format.html) is displayed on monitor screens around the library.

It pulls data from Waitz.io/Occuspace.

There is a [live demo](https://fullertonlibcode.github.io/occuspace/) for the web page.

## File structure
```
occuspace
├── LICENSE
├── README.md
├── assets
│   ├── icons
│   │   └── *.svg
│   ├── script.js
│   └── styles.css
└── index.html
```
- assets/icons: contains all icons
- assets/script.js: a script to get and display data from Waitz.io
- assets/styles.css: a style sheet to format the page
- *index.html: the file to be displayed on monitors*

## Screen dimensions
The monitors around the library have a resolution of 1418 pixels wide and 820 pixels tall (1418 x 820px).