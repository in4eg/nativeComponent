
methods = {}

methods.eq = (index)->
	$(@[index])

methods.first = ->
	$(@[0])

methods.last = ->
	$(@[$(@).length-1])



