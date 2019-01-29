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
    let segmentLength = s.width / ds.histLength;
    let ndim = ds.ndim();
    let lineHeight = s.height / ndim;
    let toMin = lineHeight / 2;
    let toMax = -lineHeight / 2;

    // Draw a line for each dimension.
    s.stroke(255, 255, 255, 255);
    for (let i = 0; i < ds.data.length - 1; i++) {
      Object.keys(ds.data[i]).forEach((key, j) => {
        let fromMin = ds.min(key);
        let fromMax = ds.max(key);
        s.line(
          i * segmentLength,
          s.map(ds.data[i][key], fromMin, fromMax, toMin, toMax)
            + (lineHeight * j)
            + (lineHeight / 2),
          (i + 1) * segmentLength,
          s.map(ds.data[i + 1][key], fromMin, fromMax, toMin, toMax)
            + (lineHeight * j)
            + (lineHeight / 2)
        );
      });
    }
  };
}
