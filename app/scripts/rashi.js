(function() {
  var main;

  main = (function() {
    var $videoBlocks;
    $videoBlocks = $('.art_video > div');
    $videoBlocks.each(function(i) {
      var $el, $vidBlock, configuration, configurationRawJSON, finalVideoURL, posterURL, _ref;
      $vidBlock = $(this);
      configurationRawJSON = $($vidBlock.find('.sf_embed_code').val()).find('param[name=flashvars]').val().replace('config=', '');
      configuration = (_ref = JSON.parse(configurationRawJSON)) != null ? _ref : {};
      if (configuration.clip.url != null) {
        finalVideoURL = configuration.clip.url.replace('/z/', '/').replace('/manifest.f4m', '');
        posterURL = $vidBlock.find('img[src*=PicServer]').attr('src');
        $el = $('<video>', {
          controls: '',
          poster: posterURL
        }).append($("<source>", {
          src: finalVideoURL,
          type: 'video/flash'
        }));
        $vidBlock.find('div[id^=fpContainer]').remove();
        $vidBlock.prepend($('<div class=ynetaltplayer>').append($el));
        console.info("YNET/VIDEO: Found clip URL: " + finalVideoURL);
      }
    });
    $(".ynetaltplayer").flowplayer();
  })();

}).call(this);
