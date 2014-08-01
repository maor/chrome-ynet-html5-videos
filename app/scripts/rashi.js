(function() {
  var main;

  main = (function() {
    var $videoBlocks;
    $videoBlocks = $('.art_video > div');
    $videoBlocks.each(function(i) {
      var $vidBlock, clipURL, configuration, configurationRawJSON, finalURL, _ref;
      $vidBlock = $(this);
      configurationRawJSON = $($vidBlock.find('.sf_embed_code').val()).find('param[name=flashvars]').val().replace('config=', '');
      configuration = (_ref = JSON.parse(configurationRawJSON)) != null ? _ref : {};
      console.log('YNET JSON found', configurationRawJSON, configuration);
      if (configuration.clip.url != null) {
        clipURL = configuration.clip.url;
        finalURL = clipURL.replace('/z/', '/').replace('/manifest.f4m', '');
        $vidBlock.append($('<video>', {
          controls: '',
          height: $vidBlock.height(),
          width: $vidBlock.width()
        }).append($("<source>", {
          src: finalURL,
          type: 'video/flv;codecs=h263,mp3a'
        })));
        return console.log("Found clip URL: " + finalURL);
      }
    });
    return console.log('ynet HTML5 initialized', $, jQuery);
  })();

}).call(this);
