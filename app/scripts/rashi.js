(function() {
  var main;

  main = (function() {
    var $videoBlocks;
    $videoBlocks = $('.art_video > div');
    $videoBlocks.each(function(i) {
      var $vidBlock, configuration, configurationRawJSON, finalVideoURL, posterURL, _ref;
      $vidBlock = $(this);
      configurationRawJSON = $($vidBlock.find('.sf_embed_code').val()).find('param[name=flashvars]').val().replace('config=', '');
      configuration = (_ref = JSON.parse(configurationRawJSON)) != null ? _ref : {};
      console.log('YNET JSON found', configurationRawJSON, configuration);
      if (configuration.clip.url != null) {
        finalVideoURL = configuration.clip.url.replace('/z/', '/').replace('/manifest.f4m', '');
        posterURL = $vidBlock.find('img[src*=PicServer]').attr('src');
        $vidBlock.append($('<video>', {
          controls: '',
          poster: posterURL,
          height: $vidBlock.height(),
          width: $vidBlock.width()
        }).append($("<source>", {
          src: finalVideoURL,
          type: 'video/flv;codecs=h263,mp3a'
        })));
        return console.log("Found clip URL: " + finalVideoURL);
      }
    });
    return console.log('ynet HTML5 initialized', $, jQuery);
  })();

}).call(this);
