(function(jQuery, window) {
  var $;
  $ = jQuery;
  $.fn.iphone = function(options) {
    var container, images, next, position, screen, width;
    if (this.data('iphone')) {
      this.data('iphone', 'active');
      return this;
    }
    options = $.extend({
      time: 3000
    }, options);
    screen = $('.screen', this);
    container = $('.images', screen);
    images = $('img', container);
    width = screen.width();
    position = -1;
    $('img', screen).each(function(i) {
      return $(this).css({
        left: width * i
      });
    });
    (next = function() {
      position += 1;
      container.animate({
        left: -width * position
      });
      if (position >= images.length - 1) {
        position = -1;
      }
      return setTimeout(next, options.time);
    })();
    return this;
  };
  return $(document).ready(function() {
    return $('.iphone').iphone();
  });
})(jQuery, window);