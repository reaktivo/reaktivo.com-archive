//(=) require ../../vendor/jquery.iphone
ns({
  App: {
    Pages: {
      knotbad: class {
        constructor() {
          this.iphone = $('.iphone').iphone();
          this.iphone.css({
            left: -400,
            opacity: 0,
            rotate: -20
          });
          this.iphone.transition({
            left: 0,
            opacity: 1,
            rotate: 0
          }, 3000, () => {
            return this.description.transition({
              left: 0,
              opacity: 1
            });
          });
          this.description = $('.description');
          this.description.css({
            left: -300,
            opacity: 0
          });
        }

        destroy() {}

      }
    }
  }
});