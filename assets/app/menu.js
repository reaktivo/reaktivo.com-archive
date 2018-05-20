//(=) require ../vendor/ns
//(=) require ../vendor/jquery.swipe
ns({
  App: {
    Menu: class {
      constructor() {
        this.index = this.index.bind(this);
        this.open = this.open.bind(this);
        this.close = this.close.bind(this);
        this.move = this.move.bind(this);
        this.animate = this.animate.bind(this);
        this.navigate = this.navigate.bind(this);
        /* Touch Handlers */
        this.touchstart = this.touchstart.bind(this);
        this.touchmove = this.touchmove.bind(this);
        this.touchend = this.touchend.bind(this);
        this.touch = {};
        // setup selectors
        this.list = $('body > nav ul');
        this.items = $('a', this.list);
        this.document = $(document);
        this.body = $('#body');
        this.content = $('#content');
        // setup events

        // WebFontConfig.ready @animate
        this.animate();
        this.items.click(this.navigate);
        this.list.on({
          mouseenter: this.open,
          mouseleave: this.close
        });
        this.document.on({
          touchstart: this.touchstart,
          touchmove: this.touchmove,
          touchend: this.touchend
        });
        this.document.on({
          click: this.index
        }, '.index');
        // open menu if device is touch capable
        if (document.location.pathname === "/" && !Modernizr.touch) {
          this.open();
        } else {
          this.close();
        }
      }

      index(e) {
        if (e != null) {
          e.preventDefault();
        }
        return page('/');
      }

      open(e) {
        var a, width;
        if (e != null) {
          e.preventDefault();
        }
        width = Modernizr.mq('screen and (max-width:320px)') ? 320 : Math.max.apply(null, (function() {
          var j, len, ref, results;
          ref = this.items;
          results = [];
          for (j = 0, len = ref.length; j < len; j++) {
            a = ref[j];
            results.push($(a).outerWidth(true));
          }
          return results;
        }).call(this));
        return this.move(0, width);
      }

      close(e) {
        if (e) {
          e.preventDefault();
        }
        return this.move(-40, 0);
      }

      move(list, content) {
        this.list.stop().animate({
          left: list
        });
        return this.content.stop().animate({
          left: content
        });
      }

      animate() {
        return this.items.each(function(i) {
          return $(this).delay(80 * i).transition({
            opacity: 1
          });
        });
      }

      navigate(e) {
        e.preventDefault();
        if (Modernizr.touch) {
          this.close();
        }
        return page($(e.currentTarget).attr('href'));
      }

      touchstart(e) {
        return this.touch.start = {
          x: e.originalEvent.pageX,
          y: e.originalEvent.pageY
        };
      }

      touchmove(e) {
        this.touch.end = {
          x: e.originalEvent.pageX,
          y: e.originalEvent.pageY
        };
        this.touch.delta = {
          x: this.touch.end.x - this.touch.start.x,
          y: this.touch.end.y - this.touch.start.y
        };
        if (Math.abs(this.touch.delta.x) > Math.abs(this.touch.delta.y) && this.touch.delta.x > 0) {
          e.preventDefault();
          return this.content.css({
            left: this.touch.delta.x
          });
        }
      }

      touchend(e) {
        if (this.touch.delta) {
          return (this.touch.delta.x > 60 ? this.open : this.close)();
        }
      }

    }
  }
});