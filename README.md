teletypeplayer.js
=================

A small library for replaying ttyrec recordings in a web browser. It requires
a term.js "compatible" terminal object be passed to the constructor. Basically,
the only requirement is that the terminal object support a `write()` method
which ttyrec data can be sent to. You will also need a JSON data dump of the 
ttyrec file you want to play. I have another small project that does this
called [tty2json](https://github.com/dkcampbell/tty2json).

# Example

This example uses both [term.js](https://github.com/chjj/term.js) and
[jQuery](https://jquery.com/).

``` javascript
var term = new Terminal({
    cols: 80, 
    rows: 24, 
    useStyle: true, 
    screenKeys: false, 
    cursorBlink: 
false});    
term.open(document.body);                                     

$.getJSON('out.json', function(json) {                        
    var player = new TeletypePlayer(term, json, true);          
    player.play();                                              
});                                                           
```

# Notes
I intially wanted to do something like this without writing it myself. I found
a few projects on Github that does something similar. They either didn't have
an open source license or were too complicated for a non JS pro to figure out.
I'd say the major advantage of this library (at least for me) is the simplicity.

