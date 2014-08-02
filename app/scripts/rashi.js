(function() {
  var main;

  main = (function() {
    var $videoBlocks, stylesheetPath;
    stylesheetPath = 'http://releases.flowplayer.org/5.4.6/skin/minimalist.css';
    $("<link rel=stylesheet type=text/css href=" + stylesheetPath + ">").appendTo('head');
    $videoBlocks = $('.art_video > div');
    $videoBlocks.each(function(i) {
      var $el, $fpEl, $vidBlock, configuration, configurationRawJSON, finalVideoURL, posterURL, _ref;
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
        $vidBlock.prepend($('<div class=ynetaltplayer>'));
        $fpEl = $vidBlock.find('.ynetaltplayer');
        $fpEl.flowplayer({
          rtmp: 'http://mediadownload.ynet.co.il/flowplayerlive/flowplayer.rtmp-3.2.3.swf',
          playlist: [
            [
              {
                flash: finalVideoURL
              }
            ]
          ]
        }).one('ready', function(ev, api) {
          console.info('YNET/FP THING IS ON');
          api.resume();
        });
        console.info("YNET/VIDEO: Found clip URL: " + finalVideoURL);
      }
    });
  })();

}).call(this);
