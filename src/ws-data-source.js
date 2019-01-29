export function DataSource(histLength=500) {

  this.ws = new WebSocket('ws://127.0.0.1:8081/');

  this.data = [];
  this.histLength = histLength;

  this.ws.onmessage = (event) => {
    let d = JSON.parse(event.data);
    //console.log(d);

    this.data.push(d);
    if (this.data.length > histLength) {
      this.data = this.data.slice(this.data.length - this.histLength);
    }
  };

  var minCallback = ( min, cur ) => Math.min( min, cur );
  var maxCallback = ( max, cur ) => Math.max( max, cur );

  this.min = (key) => {
    return this.data.map(el => el[key])
      .reduce(minCallback, Infinity);
  };

  this.max = (key) => {
    return this.data.map(el => el[key])
      .reduce(maxCallback, -Infinity);
  };

  this.range = (key) => {
    return this.max(key) - this.min(key);
  };

  this.ndim = () => {
    if (this.data.length > 0) {
      return Object.keys(this.data[0]).length;
    } else {
      return 1;
    }
  };
}
