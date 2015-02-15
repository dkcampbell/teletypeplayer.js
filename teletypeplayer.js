/*
 * Copyright (c) 2015, Dan Campbell <dan@compiledworks.com>
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

/* 
 * This is a very simple library for taking json dumps of ttyrec files and
 * playing them in the browser. It requires a term.js "compatible" terminal
 * passed as the term object and a tty2json compatible json dump file.
 *
 * NOTE: I'm not an experiecned javascript developer. This could very easily
 * be awful code.
 */


function TeletypePlayer(term, json, pause) {
    "use strict";
    this.term = term;
    this.json = json;
    this.pPause = pause;
}

TeletypePlayer.prototype.start = function() {
    "use strict";
    var start_sec  = this.json[0][0];
    var start_usec = this.json[0][1];
    var start = new Date(this.json[0][0]);
    start.setMilliseconds(this.json[0][1]/1000);

    var term = this.term;
    var json = this.json;
    var i = 0;
    var len = json.length;
    var prev = (new Date()).valueOf();

    function render() {
        requestAnimationFrame(render);
        if ((time - prev) > 16.6667) { return; }
        for (var j = i; j < len; j++) {
            var seconds  = json[j][0] - start_sec;
            var useconds = json[j][1] - start_usec;
            var mseconds = seconds*1000 + useconds/1000;
            var data     = json[j][2];
            var diff     = time - prev;

            var time = (new Date()).valueOf();
            if (diff > mseconds) { 
                prev = time;
                i++;
                if (i == len) { i = 0; }
                term.write(data);
            } 
        }
    };
    render();

}

TeletypePlayer.prototype.pause = function(bool) {
    this.pPause = bool;
}
