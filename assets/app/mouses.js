//(=) require ../vendor/kinetic-v4.5.4
var Animation, Layer, Polygon, Stage;

({Stage, Layer, Animation, Polygon} = Kinetic);

Math.HALF_PI = Math.PI / 2;

ns({
  App: {
    Mouses: (function() {
      var _Class;

      _Class = class {
        constructor(el, movements) {
          var ref;
          this.update_worms = this.update_worms.bind(this);
          this.setup_stage = this.setup_stage.bind(this);
          this.get_shape = this.get_shape.bind(this);
          this.setup_worms = this.setup_worms.bind(this);
          this.create_worm = this.create_worm.bind(this);
          this.start_record = this.start_record.bind(this);
          this.stop_record = this.stop_record.bind(this);
          this.el = el;
          this.movements = movements;
          if (!Modernizr.touch) {
            this.start_record();
          }
          if (((ref = this.movements) != null ? ref.length : void 0) > 0) {
            this.setup_stage();
            this.setup_worms();
            this.animation = new Animation(this.update_worms, this.worms);
            this.animation.start();
          }
        }

        update_worms() {
          var index, j, len, path, points, ref, results, rindex, worm;
          ref = this.worms.children;
          results = [];
          for (j = 0, len = ref.length; j < len; j++) {
            worm = ref[j];
            ({path, index} = worm.attrs);
            index += 1;
            if (index >= path.length) {
              index = 1 - this.worm_length;
            }
            rindex = index < 0 ? 0 : index;
            points = this.get_shape(path.slice(rindex, index + this.worm_length));
            results.push(worm.setAttrs({index, points}));
          }
          return results;
        }

        setup_stage() {
          return this.stage = new Stage({
            container: this.el[0],
            width: this.el.width(),
            height: this.el.height()
          });
        }

        get_shape(path) {
          var angle1, angle2, delta, distance, i, j, len, point, prev_point, side1, side2;
          side1 = [];
          side2 = [];
          for (i = j = 0, len = path.length; j < len; i = ++j) {
            point = path[i];
            if (i === 0 || i === path.length - 1) {
              side1.push(point);
            } else {
              prev_point = path[i - 1];
              delta = {
                x: point.x - prev_point.x,
                y: point.y - prev_point.y
              };
              distance = Math.sqrt(Math.pow(delta.x, 2) + Math.pow(delta.y, 2));
              distance *= 0.2;
              angle1 = Math.atan2(delta.y, delta.x) - Math.HALF_PI;
              angle2 = angle1 + Math.PI;
              side1.push({
                x: point.x + (distance * Math.cos(angle1)),
                y: point.y + (distance * Math.sin(angle1))
              });
              side2.unshift({
                x: point.x + (distance * Math.cos(angle2)),
                y: point.y + (distance * Math.sin(angle2))
              });
            }
          }
          return side1.concat(side2);
        }

        setup_worms() {
          var i, j, len, path, ref, results;
          this.worms = new Layer;
          this.stage.add(this.worms);
          ref = this.movements;
          results = [];
          for (i = j = 0, len = ref.length; j < len; i = ++j) {
            path = ref[i];
            results.push(this.create_worm(path));
          }
          return results;
        }

        create_worm(path) {
          return this.worms.add(new Polygon({
            x: 0,
            y: 0,
            fill: "#00e",
            opacity: Math.random() * 0.8 + 0.2,
            path: path,
            index: 0,
            points: this.get_shape(path)
          }));
        }

        start_record() {
          this.recording = [];
          // No longer updating mouse moves
          // $('.index').click(this.stop_record);
          return $(document).mousemove((e) => {
            return this.recording.push({
              x: e.pageX,
              y: e.pageY
            });
          });
        }

        stop_record() {
          $(document).off('mousemove');
          return $.ajax({
            url: '/mouses.json',
            type: 'post',
            data: JSON.stringify({recording: this.recording}),
            contentType: "application/json",
            success: (path) => {
              return this.create_worm(path);
            }
          });
        }

      };

      _Class.prototype.worm_length = 20;

      return _Class;

    }).call(this)
  }
});