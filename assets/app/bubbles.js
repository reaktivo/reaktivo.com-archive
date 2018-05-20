//(=) require ../vendor/two
ns({
  App: {
    Bubbles: (function() {
      var _Class;

      _Class = class {
        constructor(el, movements1) {
          var params, ref;
          this.update = this.update.bind(this);
          this.attributize = this.attributize.bind(this);
          this.el = el;
          this.movements = movements1;
          if (((ref = this.movements) != null ? ref.length : void 0) > 0) {
            this.movements = this.attributize(this.movements);
            params = {
              width: this.el.width(),
              height: this.el.height()
            };
            this.scene = new Two(params).appendTo(this.el[0]);
            this.scene.bind('update', this.update);
            this.scene.play();
          }
        }

        update() {
          var circle, j, k, len, len1, path, ref, removes;
          // for path in @movements
          path = this.movements[2];
          (() => {
            var circle, point;
            point = path[path.pos];
            if (point.radius > 0) {
              circle = this.scene.makeCircle(point.x, point.y, point.radius);
              circle.fill = '#00e';
              circle.noStroke();
              circle.force = {
                x: this.rand(50),
                y: this.rand(50)
              };
              this.circles.push(circle);
            }
            path.pos += 1;
            if (path.pos >= path.length) {
              return path.pos = 0;
            }
          })();
          removes = [];
          ref = this.circles;
          for (j = 0, len = ref.length; j < len; j++) {
            circle = ref[j];
            circle.translation.x += circle.force.x;
            circle.translation.y += circle.force.y + 10;
            if (circle.translation.y > this.scene.height) {
              removes.push(circle);
            }
            circle.force.x *= 0.86;
            circle.force.y *= 0.04;
          }
          for (k = 0, len1 = removes.length; k < len1; k++) {
            circle = removes[k];
            circle.parent.remove(circle);
            this.circles.splice(this.circles.indexOf(circle), 1);
          }
          return this;
        }

        attributize(movements) {
          var delta, force, i, j, k, len, len1, path, point, prev_point;
          for (j = 0, len = movements.length; j < len; j++) {
            path = movements[j];
            path.pos = 0;
            for (i = k = 0, len1 = path.length; k < len1; i = ++k) {
              point = path[i];
              if (i === 0) {
                point.radius = 0;
              } else {
                prev_point = path[i - 1];
                delta = {
                  x: point.x - prev_point.x,
                  y: point.y - prev_point.y
                };
                force = Math.sqrt(Math.pow(delta.x, 2) + Math.pow(delta.y, 2));
                point.radius = Math.max(0, this.max_size - force * this.force_multiplier);
              }
            }
          }
          return movements;
        }

        rand(a) {
          return Math.random() * a * 2 - a;
        }

      };

      _Class.prototype.circles = [];

      _Class.prototype.max_size = 45;

      _Class.prototype.force_multiplier = 0.9;

      return _Class;

    }).call(this)
  }
});