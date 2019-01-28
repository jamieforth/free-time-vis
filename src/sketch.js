import p5 from 'p5';

import {Gallery} from './gallery';
import {DataSource} from './ws-data-source.js';

import {ConsoleLines} from './console-lines.js';
import {MyoOriTrace} from './myo-ori-trace.js';

let sketch = (s) => {

  // Gallery object: a container for all the visualisations.
  var gallery;

  // DataSource object: abstract sensor I/O.
  var dataSource;

  s.setup = () => {
    // Create a canvas to fill the content div from index.html.
    s.createCanvas(innerWidth - 20, innerHeight - 20);

    gallery = new Gallery();
    dataSource = new DataSource(50);

    // Add the visualisation objects here.
    gallery.addVisual(new ConsoleLines(s, dataSource));
    gallery.addVisual(new MyoOriTrace(s, dataSource));
  };

  s.draw = () => {
    if (gallery.selectedVisual != null) {
      gallery.selectedVisual.draw();
    }
  };

  s.keyPressed = () => {
    if(s.keyCode > 48 && s.keyCode < 58){
      var visNumber = s.keyCode - 49;
      if (visNumber < gallery.visuals.length) {
        gallery.selectVisual(gallery.visuals[visNumber].id);
      } else {
        console.log('Visual ', visNumber, ' does not exist.');
      }
    }
  };
};

const P5 = new p5(sketch, '#app');
