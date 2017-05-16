# choosen = document.querySelectorAll('section')
# console.log choosen


$ = (selector, context)->

	if typeof context isnt "undefined"
		return [].slice.call(context.querySelectorAll(selector))
	else
		context = document

	if typeof selector is "string"

		selector = selector.trim()
		result = selector.match(/(#|\.|\s|\>)(.*?)(#|\.|\s|\>)/igm);

		if result
			choosenElements = context.querySelectorAll(selector)
		else
			if selector.substr(0, 1) is '.'
				selector = selector.substring(1)
				choosenElements = context.getElementsByClassName(selector)

			else if selector.substr(0, 1) is '#'
				selector = selector.substring(1)
				choosenElements = context.getElementById(selector)

			else
				choosenElements = context.getElementsByTagName(selector)
	else
		choosenElements = selector

	if !choosenElements
		return []

	if choosenElements.length and choosenElements.length > 0
		res = [].slice.call(choosenElements)
	else
		res = [choosenElements]

	for method of methods
		res[method] = methods[method].bind(res)
		
	return res


$.utils =
	traverse: (selection, callback)->
		for node, i in selection
			callback node, i
		selection

# console.dir $
# console.dir methods

elem = document.getElementById('btn')
handler = ->
	console.log 'click'
	return
elem.addEventListener "click", handler



