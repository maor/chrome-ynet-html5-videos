main = do -> #$ ->

	# add stylesheet
	# stylesheetPath = chrome.extension.getURL 'bower_components/flowplayer/dist/minimalist.css'
	stylesheetPath = 'http://releases.flowplayer.org/5.4.6/skin/minimalist.css'
	$("<link rel=stylesheet type=text/css href=#{stylesheetPath}>").appendTo('head');

	console.log 'ynet fp ver ' + flowplayer.version

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
				# preload: 'auto',
				# autoplay: '',
				controls: '',
				poster: posterURL
			).append(
				$("<source>", src: finalVideoURL, type: 'video/flash')
			)

			$vidBlock.find('div[id^=fpContainer]').remove()
			$vidBlock.prepend $('<div class=ynetaltplayer>') #.append $el

			$fpEl = $vidBlock.find('.ynetaltplayer')
			konst = $fpEl.flowplayer(
				rtmp: 'http://mediadownload.ynet.co.il/flowplayerlive/flowplayer.rtmp-3.2.3.swf'
				playlist: [
					[flash: finalVideoURL]
				]
			).bind 'ready', (ev, api) -> 
				console.info 'YNET/FP THING IS ON'
				api.resume()
				return

			console.log('YNET', konst)


			console.info "YNET/VIDEO: Found clip URL: #{finalVideoURL}"
		return

	# $(".ynetaltplayer").flowplayer	
	# 	debug: true, 
	# 	swf: 'http://releases.flowplayer.org/5.4.6/flowplayer.swf'
	# 	# swf: chrome.extension.getURL 'scripts/libs/fp/flowplayer.swf'

	return