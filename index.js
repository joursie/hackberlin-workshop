'use strict'

const yo = require('yo-yo')
const document = require('global/document')
const randomColor = require('random-color')
const loop = require('./loop')

// -------------------------------

const render = function (width, height, selectState) {

	const renderedState = states.map(renderState)
	return yo `
		<svg width="${width}" height="${height}">
			${renderedState}
		</svg
	`
}

const renderState = function (state, i) {
	const onClick = function () {
		selectState(i)
	}
	let color = "#98284a"
	if (i===selectedState) color = "#4c0112"
	return yo `
		<rect
			width="${50}" height="${50}"
			x="${(i+1)*50}" y="${(i+1)*50}"
			fill="${color}"
			onclick=${onClick}
		/>
	`
}

// -------------------------------

// state
const width = 400
const height = 400
const states = [
	{name: 'Mitte', alter: 35},
	{name: 'Pankow', alter: 38.2},
	{name: 'Tempelhof', alter: 30.1},
	{name: 'Weissensee', alter: 33.4}
]
let selectedState = 0

const selectState = function (i) {
	selectedState = i
	console.log("State angeklickt:", states[i].name)
}



// -------------------------------

const el = render(width, height, selectState)
document.body.appendChild(el)

const rerender = function () {
	yo.update(el, render(width, height, selectState))
}
loop(rerender)
