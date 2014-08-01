main = do ->
	$videoBlocks = $ '.art_video > div'

	$videoBlocks.each (i) ->
		$vidBlock = $ @
		configurationRawJSON = $( $vidBlock.find('.sf_embed_code').val() )
			.find('param[name=flashvars]')
			.val()
			.replace('config=', '')

		configuration = JSON.parse(configurationRawJSON) ?  {}

		console.log 'YNET JSON found', configurationRawJSON, configuration

		if configuration.clip.url?
			finalVideoURL = configuration.clip.url.replace('/z/', '/').replace('/manifest.f4m', '')
			posterURL = $vidBlock.find('img[src*=PicServer]').attr('src')

			$vidBlock.append($('<video>', 
				# src: finalVideoURL, 
				# preload: 'auto',
				controls: '',
				poster: posterURL,
				height: $vidBlock.height(), 
				width: $vidBlock.width()
			).append(
				$("<source>", src: finalVideoURL, type: 'video/flv;codecs=h263,mp3a')
			))

			console.log "Found clip URL: #{finalVideoURL}"





	console.log('ynet HTML5 initialized', $, jQuery)