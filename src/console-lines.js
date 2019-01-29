export function ConsoleLines(s, ds) {

  // Name for the visualisation to appear in the menu bar.
  this.name = 'console-lines';

  // Each visualisation must have a unique ID with no special
  // characters.
  this.id = 'console-lines';

  var xLinePad = s.width / ds.histLength;
  var yLinePad = 20;
  var scale = 0.3;

  this.setup = function() {
    s.textFont('DejaVu Sans Mono');
  };

  this.draw = function() {

    var nRows = 20;
    var yPad = 5;
    var xPos = 30;
    var yPos = 0;
    var textHeight = 0.6;
    var lineSpace = (s.height - (yPad * nRows)) / nRows;

    s.background(0);

    if (ds.data.length > 0) {
      s.textSize(lineSpace * textHeight);
      s.textAlign(s.LEFT, s.TOP);
      s.fill(255, 255, 255, 255);
      s.stroke(0);

      // Print raw data.
      for (let d of ds.data.slice(s.max(0, ds.data.length - nRows))) {
        yPos += yPad;
        s.text('[' + JSON.stringify(d) + ']', xPos, yPos);
        yPos += lineSpace;
      }

      var yLineSpace = s.height / ds.ndim();

      // Draw a line for each dimension.
      s.stroke(255, 255, 255, 255);
      for (let i = 0; i < ds.data.length - 1; i++) {
        Object.keys(ds.data[i]).forEach((key, j) => {
          s.line(
            i * xLinePad,
            (ds.data[i][key] * scale) + (yLineSpace * j) + yLinePad,
            (i + 1) * xLinePad,
            (ds.data[i + 1][key] * scale) + (yLineSpace * j) + yLinePad
          );
        });
      }
    }
  };
}
