import BenchmarkUI from '../utils/BenchmarkUI'
import * as React from 'react'

export default function CssInJsPage() {
	return (
		<React.Fragment>
			<BenchmarkUI
				caption="Adding CSS without teardown"
				description="This test represents rendering CSS, reusing the same style element each time."
				benchmarks={{
					'DOM textContent': {
						test(b) {
							if (b.iteration % 2) {
								b.styleElement.textContent += 'testing-space{background-color:#008000;color:#fffeff}'
							} else {
								b.styleElement.textContent += 'testing-space{background-color:#007f00;color:#ffffff}'
							}
						},
						beforeAll(b) {
							b.styleElement = document.head.appendChild(document.createElement('style'))
						},
						afterAll(b) {
							document.head.removeChild(b.styleElement)
							delete b.styleElement
						},
					},
					'DOM appendChild': {
						test(b) {
							if (b.iteration % 2) {
								b.styleElement.appendChild(
									document.createTextNode('testing-space{background-color:#008000;color:#fffeff}')
								)
							} else {
								b.styleElement.appendChild(
									document.createTextNode('testing-space{background-color:#007f00;color:#ffffff}')
								)
							}
						},
						beforeAll(b) {
							b.styleElement = document.head.appendChild(document.createElement('style'))
						},
						afterAll(b) {
							document.head.removeChild(b.styleElement)
							delete b.styleElement
						},
					},
					'CSSOM addRule': {
						test(b) {
							if (b.iteration % 2) {
								b.sheet.addRule('testing-space', 'background-color:#008000;color:#fffeff')
							} else {
								b.sheet.addRule('testing-space', 'background-color:#007f00;color:#ffffff')
							}
						},
						beforeAll(b) {
							b.styleElement = document.head.appendChild(document.createElement('style'))
							b.sheet = b.styleElement.sheet
						},
						afterAll(b) {
							document.head.removeChild(b.styleElement)
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
						beforeAll(b) {
							b.styleElement = document.head.appendChild(document.createElement('style'))
							b.sheet = b.styleElement.sheet
						},
						afterAll(b) {
							document.head.removeChild(b.styleElement)
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
								b.styleElement.textContent += 'testing-space{background-color:#008000;color:#fffeff}'
							} else {
								b.styleElement.textContent += 'testing-space{background-color:#007f00;color:#ffffff}'
							}
						},
						beforeEach(b) {
							b.styleElement = document.head.appendChild(document.createElement('style'))
						},
						afterEach(b) {
							document.head.removeChild(b.styleElement)
							delete b.styleElement
						},
					},
					'DOM appendChild': {
						test(b) {
							if (b.iteration % 2) {
								b.styleElement.appendChild(
									document.createTextNode('testing-space{background-color:#008000;color:#fffeff}')
								)
							} else {
								b.styleElement.appendChild(
									document.createTextNode('testing-space{background-color:#007f00;color:#ffffff}')
								)
							}
						},
						beforeEach(b) {
							b.styleElement = document.head.appendChild(document.createElement('style'))
						},
						afterEach(b) {
							document.head.removeChild(b.styleElement)
							delete b.styleElement
						},
					},
					'CSSOM addRule': {
						test(b) {
							if (b.iteration % 2) {
								b.sheet.addRule('testing-space', 'background-color:#008000;color:#fffeff')
							} else {
								b.sheet.addRule('testing-space', 'background-color:#007f00;color:#ffffff')
							}
						},
						beforeEach(b) {
							b.styleElement = document.head.appendChild(document.createElement('style'))
							b.sheet = b.styleElement.sheet
						},
						afterEach(b) {
							document.head.removeChild(b.styleElement)
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
							b.styleElement = document.head.appendChild(document.createElement('style'))
							b.sheet = b.styleElement.sheet
						},
						afterEach(b) {
							document.head.removeChild(b.styleElement)
							delete b.sheet
							delete b.styleElement
						},
					},
				}}
			/>
		</React.Fragment>
	)
}
