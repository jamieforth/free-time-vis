export function Gallery() {

  this.visuals = [];
  this.selectedVisual = null;

  // Add a new visual to the navigation bar.
  this.addVisual = function(vis) {

    // Check that the vis object has an id and name.
    if (!vis.hasOwnProperty('id')
        && !vis.hasOwnProperty('name')) {
      alert('Make sure your visual has an id and name!');
    }

    // Check that the vis object has a unique id.
    if (this.findVisIndex(vis.id) != null) {
      alert(`Vis '${vis.name}' has a duplicate id: '${vis.id}'`);
    }

    this.visuals.push(vis);

    // If selectedVisual is null set the new visual as the current
    // visualiation.
    if(this.selectedVisual == null){
      this.selectVisual(vis.id);
    }

    // Preload data if necessary.
    if (vis.hasOwnProperty('preload')) {
      vis.preload();
    }
  };

  this.findVisIndex = function(visId) {
    // Search through the visualisations looking for one with the id
    // matching visId.
    for (var i = 0; i < this.visuals.length; i++) {
      if (this.visuals[i].id == visId) {
        return i;
      }
    }

    // Visualisation not found.
    return null;
  };

  this.selectVisual = function(visId){
    var visIndex = this.findVisIndex(visId);

    if (visIndex != null) {
      // If the current visualisation has a deselect method run it.
      if (this.selectedVisual != null
          && this.selectedVisual.hasOwnProperty('destroy')) {
        this.selectedVisual.destroy();
      }
      // Select the visualisation in the gallery.
      this.selectedVisual = this.visuals[visIndex];

      // Initialise visualisation if necessary.
      if (this.selectedVisual.hasOwnProperty('setup')) {
        this.selectedVisual.setup();
      }
    }
  };

}
