//(=) require ../vendor/page
//(=) require ../vendor/ns
//(=) require ./menu

// http://www.artzstudio.com/files/jquery-boston-2010/jquery.sonar/jquery.sonar.js
// http://luis-almeida.github.io/unveil/
// http://www.appelsiini.net/projects/lazyload
ns({
  App: {
    Main: class {
      constructor() {
        this.root = this.root.bind(this);
        this.load = this.load.bind(this);
        this.script = this.script.bind(this);
        this.menu = new App.Menu($('#list'));
        this.body = $('body');
        this.content = $("#content");
        page('/:page.html', this.load);
        page('/', this.root);
        page.start({
          dispatch: false
        });
        this.script(this.body.attr('id'));
      }

      root() {
        console.log('open');
        this.menu.open();
        return setTimeout((() => {
          return window.Pace.stop();
        }), 100);
      }

      load(ctx) {
        var id;
        console.log('load');
        id = ctx.path.substr(1).split('.')[0];
        if (id === this.body.attr('id')) {
          return;
        }
        return $.get(ctx.path).done((data) => {
          var html;
          html = $("<div>").append($.parseHTML(data));
          this.content.html(html.find("#content").html());
          document.title = html.find('title').text();
          this.body.attr({id});
          this.script(id);
          window.scrollTo(0, 0);
          return window.Pace.stop();
        });
      }

      script(page) {
        if (App.Pages[page]) {
          return this.current = new App.Pages[page];
        }
      }

    }
  }
});

$(document).ready(function() {
  return window.app = new App.Main;
});