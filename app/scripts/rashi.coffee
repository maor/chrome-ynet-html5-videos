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
			clipURL = configuration.clip.url
			finalURL = clipURL.replace('/z/', '/').replace('/manifest.f4m', '')

			$vidBlock.append($('<video>', 
				# src: finalURL, 
				# preload: 'auto',
				controls: '',
				height: $vidBlock.height(), 
				width: $vidBlock.width()
			).append(
				$("<source>", src: finalURL, type: 'video/flv;codecs=h263,mp3a')
			))

			console.log "Found clip URL: #{finalURL}"





	console.log('ynet HTML5 initialized', $, jQuery)