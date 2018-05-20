//(=) require ../mouses
//(=) require ../bubbles
ns({
  App: {
    Pages: {
      about: class {
        constructor() {
          $.get('/mouses', (movements) => {
            return this.mouses = new App.Mouses($('#mouses'), movements);
          });
        }

      }
    }
  }
});

// @bubbles = new App.Bubbles $('#mouses'), movements
;
