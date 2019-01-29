export function MyoOriTrace(s, ds) {

  // Name for the visualisation to appear in the menu bar.
  this.name = 'myo orientation trace';

  // Each visualisation must have a unique ID with no special
  // characters.
  this.id = 'myo-ori-trace';

  this.draw = function() {

    var n = 250; // ds.data.length;

    s.background(0);

    if (ds.data.length > 0) {

      s.stroke(255, 255, 255, 255);
      s.strokeWeight(1);

      for (let d of ds.data.slice(s.max(0, ds.data.length - n))) {
        s.line(
          s.map(d['ori_w'], ds.min('ori_w'), ds.max('ori_w'), 0, s.width),
          s.map(d['ori_x'], ds.min('ori_x'), ds.max('ori_x'), 0, s.height),
          s.map(d['ori_y'], ds.min('ori_y'), ds.max('ori_y'), 0, s.width),
          s.map(d['ori_z'], ds.min('ori_z'), ds.max('ori_z'), 0, s.height)
        );
      }
    }
  };
}
