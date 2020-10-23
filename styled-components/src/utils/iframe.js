/* globals globalThis:readonly */

const iframe = document.createElement('iframe')
iframe.sandbox.add('allow-same-origin')
iframe.sandbox.add('allow-scripts')
iframe.srcdoc = [
	[`<`, `!doctype html`, `>`].join(''),
	[`<`, `meta charset="utf-8" /`, `>`].join(''),
	[`<`, `meta name="viewport" content="width=device-width" /`, `>`].join(''),
].join('')

document.body.appendChild(iframe)

globalThis.sand = iframe.contentWindow
globalThis.sandRoot = globalThis.sand.document.createElement('div')

globalThis.sand.addEventListener('load', () => {
	globalThis.sand.document.body.appendChild(globalThis.sandRoot)
})
