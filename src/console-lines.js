export function ConsoleLines(s, ds) {

  // Name for the visualisation to appear in the menu bar.
  this.name = 'console-lines';

  // Each visualisation must have a unique ID with no special
  // characters.
  this.id = 'console-lines';

  this.setup = function() {
    s.textFont('DejaVu Sans Mono');
  };

  this.draw = function() {

    s.background(0);

    if (ds.data.length > 0) {
      this.consoleText();
      this.lines();
    }
  };

  this.consoleText = function() {
    var nRows = 20;
    var yPad = 5;
    var xPos = 30;
    var yPos = 0;
    var textHeight = 0.6;
    var lineHeight = (s.height - (yPad * nRows)) / nRows;

    s.textSize(lineHeight * textHeight);
    s.textAlign(s.LEFT, s.TOP);
    s.fill(255, 255, 255, 255);
    s.stroke(0);

    // Print raw data.
    for (let d of ds.data.slice(s.max(0, ds.data.length - nRows))) {
      yPos += yPad;
      s.text('[' + JSON.stringify(d) + ']', xPos, yPos);
      yPos += lineHeight;
    }
  };

  this.lines = function() {
    var segmentLength = s.width / ds.histLength;
    var ndim = ds.ndim();
    var lineHeight = s.height / ds.ndim();
    var scale = 0.3;

    // Draw a line for each dimension.
    s.stroke(255, 255, 255, 255);
    for (let i = 0; i < ds.data.length - 1; i++) {
      Object.keys(ds.data[i]).forEach((key, j) => {
        s.line(
          i * segmentLength,
          (ds.data[i][key] * scale) + (lineHeight * (j + 1)),
          (i + 1) * segmentLength,
          (ds.data[i + 1][key] * scale) + (lineHeight * (j + 1))
        );
      });
    }
  };
}
