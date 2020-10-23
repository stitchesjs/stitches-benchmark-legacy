/* global sand:readonly */

import BenchmarkUI from '../utils/BenchmarkUI'
import * as React from 'react'

export default function CssInJsPage() {
	const { appendChild, removeChild } = sand.Node.prototype
	const { createElement, head } = sand.document
	const create = createElement.bind(sand.document)

	return (
		<React.Fragment>
			<BenchmarkUI
				caption="Adding CSS without teardown"
				description="This test represents rendering CSS, reusing the same style element each time."
				benchmarks={{
					'DOM textContent': {
						test(b) {
							if (b.iteration % 2) {
								b.styleElement.textContent += 'html{background-color:#008000;color:#fffeff}'
							} else {
								b.styleElement.textContent += 'html{background-color:#007f00;color:#ffffff}'
							}
						},
						beforeAll(b) {
							b.styleElement = appendChild.call(head, create('style'))
						},
						afterAll(b) {
							removeChild.call(head, b.styleElement)
							delete b.styleElement
						},
					},
					'DOM appendChild': {
						test(b) {
							if (b.iteration % 2) {
								appendChild.call(
									b.styleElement,
									document.createTextNode('html{background-color:#008000;color:#fffeff}')
								)
							} else {
								b.styleElement.appendChild(
									document.createTextNode('html{background-color:#007f00;color:#ffffff}')
								)
							}
						},
						beforeAll(b) {
							b.styleElement = appendChild.call(head, create('style'))
						},
						afterAll(b) {
							removeChild.call(head, b.styleElement)
							delete b.styleElement
						},
					},
					'CSSOM addRule': {
						test(b) {
							if (b.iteration % 2) {
								b.sheet.addRule('html', 'background-color:#008000;color:#fffeff')
							} else {
								b.sheet.addRule('html', 'background-color:#007f00;color:#ffffff')
							}
						},
						beforeAll(b) {
							b.styleElement = appendChild.call(head, create('style'))
							b.sheet = b.styleElement.sheet
						},
						afterAll(b) {
							removeChild.call(head, b.styleElement)
							delete b.sheet
							delete b.styleElement
						},
					},
					'CSSOM insertRule': {
						test(b) {
							if (b.iteration % 2) {
								b.sheet.insertRule('html{background-color:#008000;color:#fffeff}')
							} else {
								b.sheet.insertRule('html{background-color:#007f00;color:#ffffff}')
							}
						},
						beforeAll(b) {
							b.styleElement = appendChild.call(head, create('style'))
							b.sheet = b.styleElement.sheet
						},
						afterAll(b) {
							removeChild.call(head, b.styleElement)
							delete b.sheet
							delete b.styleElement
						},
					},
				}}
			/>
			<BenchmarkUI
				caption="Adding CSS with teardown"
				description="This test represents rendering CSS, recreating a new style element each time."
				benchmarks={{
					'DOM textContent': {
						test(b) {
							if (b.iteration % 2) {
								b.styleElement.textContent += 'html{background-color:#008000;color:#fffeff}'
							} else {
								b.styleElement.textContent += 'html{background-color:#007f00;color:#ffffff}'
							}
						},
						beforeEach(b) {
							b.styleElement = appendChild.call(head, create('style'))
						},
						afterEach(b) {
							removeChild.call(head, b.styleElement)
							delete b.sheet
							delete b.styleElement
						},
					},
					'DOM appendChild': {
						test(b) {
							if (b.iteration % 2) {
								b.styleElement.appendChild(
									document.createTextNode('html{background-color:#008000;color:#fffeff}')
								)
							} else {
								b.styleElement.appendChild(
									document.createTextNode('htmlhtml{background-color:#007f00;color:#ffffff}')
								)
							}
						},
						beforeEach(b) {
							b.styleElement = appendChild.call(head, create('style'))
						},
						afterEach(b) {
							removeChild.call(head, b.styleElement)
							delete b.sheet
							delete b.styleElement
						},
					},
					'CSSOM addRule': {
						test(b) {
							if (b.iteration % 2) {
								b.sheet.addRule('html', 'background-color:#008000;color:#fffeff')
							} else {
								b.sheet.addRule('testing-space', 'background-color:#007f00;color:#ffffff')
							}
						},
						beforeEach(b) {
							b.styleElement = appendChild.call(head, create('style'))
							b.sheet = b.styleElement.sheet
						},
						afterEach(b) {
							removeChild.call(head, b.styleElement)
							delete b.sheet
							delete b.styleElement
						},
					},
					'CSSOM insertRule': {
						test(b) {
							if (b.iteration % 2) {
								b.sheet.insertRule('testing-space{background-color:#008000;color:#fffeff}')
							} else {
								b.sheet.insertRule('testing-space{background-color:#007f00;color:#ffffff}')
							}
						},
						beforeEach(b) {
							b.styleElement = appendChild.call(head, create('style'))
							b.sheet = b.styleElement.sheet
						},
						afterEach(b) {
							removeChild.call(head, b.styleElement)
							delete b.sheet
							delete b.styleElement
						},
					},
				}}
			/>
		</React.Fragment>
	)
}
