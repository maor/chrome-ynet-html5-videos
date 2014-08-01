main = do -> #$ ->

	$videoBlocks = $ '.art_video > div'

	$videoBlocks.each (i) ->
		$vidBlock = $ @
		configurationRawJSON = $( $vidBlock.find('.sf_embed_code').val() )
			.find('param[name=flashvars]')
			.val()
			.replace('config=', '')

		configuration = JSON.parse(configurationRawJSON) ?  {}

		if configuration.clip.url?
			finalVideoURL = configuration.clip.url.replace('/z/', '/').replace('/manifest.f4m', '')
			posterURL = $vidBlock.find('img[src*=PicServer]').attr('src')

			$el = $('<video>', 
				# src: finalVideoURL, 
				# preload: 'auto',
				controls: '',
				poster: posterURL
			).append(
				$("<source>", src: finalVideoURL, type: 'video/flash')
			)

			$vidBlock.find('div[id^=fpContainer]').remove()
			$vidBlock.prepend $('<div class=ynetaltplayer>').append $el

			console.info "YNET/VIDEO: Found clip URL: #{finalVideoURL}"
		return

	$(".ynetaltplayer").flowplayer();
	return