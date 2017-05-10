choosen = document.querySelectorAll('body')

$ = (selector)->

	if typeof selector is "string"

		newSelector = selector.trim()

		result = newSelector.match(/(#|\.|\s)(.*?)(#|\.|\s)/igm);

		if result
			choosenElements = document.querySelectorAll(newSelector)
		else
			if newSelector.substr(0, 1) is '.'
				newSelector = newSelector.substring(1)
				choosenElements = document.getElementsByClassName(newSelector)

			else if newSelector.substr(0, 1) is '#'
				newSelector = newSelector.substring(1)
				choosenElements = document.getElementById(newSelector)

			else
				choosenElements = document.getElementsByTagName(newSelector)

	else
		choosenElements = selector

	console.log choosenElements

	if !choosenElements
		return []

	if choosenElements.length and choosenElements.length > 0
		console.log [].slice.call(choosenElements)
		return [].slice.call(choosenElements)
	else
		console.log [choosenElements]
		return [choosenElements]


$(choosen)

