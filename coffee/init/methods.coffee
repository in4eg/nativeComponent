
methods = {}

methods.eq = (index)->
	$(@[index])

methods.first = ->
	$(@[0])

methods.last = ->
	$(@[$(@).length-1])

methods.attr = (attrName, value)->

	if typeof attrName isnt "string"
		console.warn 'attribute selector is not a string'

	else if typeof value is "undefined"
			if @[0].getAttribute(attrName) is null
				return false
			else
				return @[0].getAttribute(attrName)

	else if typeof value isnt "string"
		console.warn 'attribute value is not a string'
	
	else
		$.utils.traverse @, (node)-> node.setAttribute(attrName, value)

	@

methods.removeAttr = (attrName)->
	$.utils.traverse @, (node)-> node.removeAttribute(attrName)
	@


methods.appendTo = (block)->

	$.utils.traverse @, (node)->
		if typeof block is "object"
			div = (block)[0]
		else if typeof block is "string"
			div = document.querySelectorAll(block)[0]
			
		div.appendChild(node)
	@

methods.prepend = (elem)->

	if typeof elem is "object"
		div = (elem)[0]
	else if typeof elem is "string"
		div = document.querySelectorAll(elem)[0]

	@[0].prepend(div)

	@

methods.insertAfter = (elem)->
	newElement	= @[0]

	if typeof elem is "object"
		parentElement = (elem)[0]
	else if typeof elem is "string"
		parentElement = document.querySelectorAll(elem)[0]

	theFirstChild = parentElement.firstChild

	parentElement.insertBefore(newElement, theFirstChild);

	@

methods.insertBefore = (elem)->
	newElement	= @[0]

	if typeof elem is "object"
		elementBefore = (elem)[0]
	else if typeof elem is "string"
		elementBefore = document.querySelectorAll(elem)[0]

	parentElement = elementBefore.parentNode
	parentElement.insertBefore(newElement, elementBefore);
	@

methods.addClass = (className)->
	$.utils.traverse @, (node)->
		node.classList.add(className)
	@

methods.removeClass = (className)->
	$.utils.traverse @, (node)->
		node.classList.remove(className)
	@

methods.toggleClass = (className)->
	$.utils.traverse @, (node)->
		node.classList.toggle(className)
	@

methods.hasClass = (className)->
	if @[0].classList.contains(className)
		return on
	else
		return off

methods.parent = ->
	$(@[0].parentElement)

methods.next = ->
	$(@[0].nextElementSibling)

methods.html = (text) ->
	$.utils.traverse @, (node)->
		node.innerHTML = text
	@

methods.on = (event, handler, useCapture) ->
	# https://www.w3schools.com/jsref/dom_obj_event.asp
	$.utils.traverse @, (node)->
		node.addEventListener event, handler

	if typeof useCapture is "boolean" and useCapture is on
		useCapture = on
	else useCapture = off
	@

methods.off = (event, handler, useCapture) ->
	$.utils.traverse @, (node)->
		node.removeEventListener event, handler

	if typeof useCapture is "boolean" and useCapture is on
		useCapture = on
	else useCapture = off

	@
methods.height = ->
	@[0].clientHeight

methods.closest = (elem)->

	if elem is "undefined"
		return @
	else
		return $(@[0].closest(elem))

methods.css = (property, value)->

	if typeof property is "undefined" and typeof value is "undefined"
		return window.getComputedStyle(@[0], null)
	
	if property and value
		$.utils.traverse @, (node)->
			node.style.setProperty(property, value)

	if typeof property is "string" and typeof value is "undefined"

		modifyProperty = property.split('-')

		finalProperty = modifyProperty.reduce(((phrase, word, index) ->
			if index == 0
			then phrase + word
			else phrase + '' + word[0].toUpperCase() + word.slice(1)
		), '')
		
		return window.getComputedStyle(@[0], null)[finalProperty]

	if typeof property is "object"

		for key of property
			cssProperty = key.split(key.match(/[A-Z]/g)).map((el) ->
				el
			).join('-' + key.match(/[A-Z]/g)).toLowerCase()

			$.utils.traverse @, (node)->
				node.style.setProperty(cssProperty, property[key])

	@


methods.fadeOut = (time, func1, func2, func3)->

	if func1 and func2
		func1()

	if typeof time is "undefined"
		time = 250

	frameTime = 1000 / 60
	framesCount = time / frameTime
	i = 1

	step = =>
		i++
		percent = i / framesCount

		$.utils.traverse @, (node)->
			# clamp
			node.style.opacity = 1 -  Math.max(0, Math.min(percent, 1))

			# console.log node.style.opacity

		if func1 and func2 and func3
			func2 percent

		if percent <= 1
			requestAnimationFrame step

		if percent >= 1

			if func1 and typeof func2 is "undefined"
				func1 percent

			if func1 and func2 and typeof func3 is "undefined"
				func2 percent

			if func1 and func2 and func3
				func3 percent
		
		return

	step()

	@

methods.fadeIn = (time, func1, func2, func3)->

	if func1 and func2
		func1()
	
	if typeof time is "undefined"
		time = 250

	frameTime = 1000 / 60
	framesCount = time / frameTime
	i = 0

	step = =>
		i++
		percent = i / framesCount

		$.utils.traverse @, (node)->
			# clamp
			node.style.opacity = Math.max(0, Math.min(percent, 1))

			# console.log node.style.opacity
		if func1 and func2 and func3
			func2 percent

		if percent <= 1
			requestAnimationFrame step

		if percent >= 1

			if func1 and typeof func2 is "undefined"
				func1 percent

			if func1 and func2 and typeof func3 is "undefined"
				func2 percent

			if func1 and func2 and func3
				func3 percent
		
		return

	step()

	@

methods.slideUp = (time, func1, func2, func3)->

	# with requestAnimationFrame
	if func1 and func2
		func1()

	if typeof time is "undefined"
		time = 500

	frameTime = 1000 / 60
	framesCount = time / frameTime
	i = 1

	step = =>
		i++
		percent = i / framesCount

		$.utils.traverse @, (node)->
			node.style.maxHeight = node.offsetHeight - node.offsetHeight * Math.max(0, Math.min(percent, 1)) + "px"
			node.style.opacity = 1 -  Math.max(0, Math.min(percent, 1))

		if func1 and func2 and func3
			func2 percent

		if percent <= 1
			requestAnimationFrame step

		if percent >= 1

			if func1 and typeof func2 is "undefined"
				func1 percent

			if func1 and func2 and typeof func3 is "undefined"
				func2 percent

			if func1 and func2 and func3
				func3 percent

			$.utils.traverse @, (node)->
				node.style.display = "none"
		
		return

	step()

	@

methods.slideDown = (time, func1, func2, func3)->
	
	$.utils.traverse @, (node)->
		node.style.display = "block"

	if func1 and func2
		func1()

	if typeof time is "undefined"
		time = 500

	frameTime = 1000 / 60
	framesCount = time / frameTime
	i = 1

	step = =>
		i++
		percent = i / framesCount

		$.utils.traverse @, (node)->
			node.style.maxHeight = Math.max(0, Math.min(percent * 100, 100)) + "%"
			node.style.opacity = Math.max(0, Math.min(percent, 1))

		if func1 and func2 and func3
			func2 percent

		if percent <= 1
			requestAnimationFrame step

		if percent >= 1

			if func1 and typeof func2 is "undefined"
				func1 percent

			if func1 and func2 and typeof func3 is "undefined"
				func2 percent

			if func1 and func2 and func3
				func3 percent

		return

	step()

	@

methods.slideToggle = (time, func1, func2, func3)->

	console.log "slideToggle"
	@

methods._animate = (options, time, onEnd)->

	# console.log options

	startOptions = []

	$.utils.traverse @, (node, i)->
		obj = {}
		styles = getComputedStyle node
		# console.log styles
		startOptions[i] = obj
		return

	# console.log startOptions

	frameTime = 1000 / 60
	framesCount = time / frameTime

	step = (percent) =>
		$.utils.traverse @, (node)->
			for prop of options
				node.style[prop] = 1-percent
			return
		return

	i = 0
	interval = setInterval ->
		percent = i * frameTime / time
		if i < framesCount
			i++
			step(percent)
		else
			clearInterval(interval)
			percent = 1
			step(percent)
			if onEnd
				onEnd()
			return
	@

lerp = (value1, value2, amount) ->
	value1 + (value2 - value1) * amount


window.requestAminFrame = do ->
	window.requestAminFrame or window.webkitRequestAnimFrame or window.mozRequestAnimFrame or window.msRequestAnimFrame or window.oRequestAnimFrame or (func) ->
		setTimeout func, 1 / 60


