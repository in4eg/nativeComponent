# choosen = document.querySelectorAll('section')
# console.log choosen

$ = (selector, context)->

	if typeof context isnt "undefined"
		# console.log [].slice.call(context.querySelectorAll(selector))
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
		# console.log [].slice.call(choosenElements)
		return [].slice.call(choosenElements)
	else
		# console.log [choosenElements]
		return [choosenElements]


$('div', $('#dropdown')[0])


