export function Gallery() {

  this.visuals = [];
  this.selectedVisual = null;

  // Add a new visual to the navigation bar.
  this.addVisual = function(vis) {

    // Check that the object vis has a name.
    if (!vis.hasOwnProperty('id')
        && !vis.hasOwnProperty('name')) {
      // TODO: Check name is unique.
      alert('Make sure your visual has an id and name!');
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

  this.selectVisual = function(visId){
    console.log('selectVisual:', visId);

    // Search through the visuals looking for one with the id matching
    // visId.
    for (var i = 0; i < this.visuals.length; i++) {
      if (this.visuals[i].id == visId) {
        // If the visual has a deselect method run it.
        if (this.selectedVisual != null
           && this.selectedVisual.hasOwnProperty('destroy')) {
          this.selectedVisual.destroy();
        }
        // Select the visual in the gallery.
        this.selectedVisual = this.visuals[i];

        // Initialise visualisation if necessary.
        if (this.selectedVisual.hasOwnProperty('setup')) {
          this.selectedVisual.setup();
        }
      }
    }
  };
}
