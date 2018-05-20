ns({
  App: {
    Pages: {
      lnh: class {
        constructor() {
          this.mobile = this.mobile.bind(this);
          this.desktop = this.desktop.bind(this);
          $('body').on('click', '.mobile, .desktop', (e) => {
            var method;
            method = $(e.currentTarget).attr('class');
            return this[method]();
          });
        }

        mobile() {
          console.log('mobile');
          return $('.responsive-demo').animate({
            width: 320,
            height: 480
          });
        }

        desktop() {
          console.log('desktop');
          return $('.responsive-demo').animate({
            width: 800,
            height: 640
          });
        }

        destroy() {}

      }
    }
  }
});