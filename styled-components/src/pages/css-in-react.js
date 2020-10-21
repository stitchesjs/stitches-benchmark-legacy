import * as React from 'react'
import * as ReactDOM from 'react-dom'
import * as ReactDOMServer from 'react-dom/server'
import emotionStyled from '@emotion/styled'
import componentsStyled from 'styled-components'
import { createStyled as createStitches002 } from '@stitches/react'
import { createStyled as createStitches003 } from '@stitches/react-canary'
import BenchmarkUI from '../utils/BenchmarkUI'

/* Setup Emotion v10.0.27
/* ========================================================================== */

const EmotionBaseComponent = emotionStyled.div({
	color: 'blue',
	padding: '1rem',
})

const EmotionDynamicComponent = emotionStyled.div((props) => ({
	opacity: props.disabled ? 0.5 : 1,
}))

/* Setup Styled v5.2.0
/* ========================================================================== */

const StyledBaseComponent = componentsStyled.div({
	color: 'blue',
	padding: '1rem',
})

const StyledDynamicComponent = componentsStyled.div((props) => ({
	opacity: props.disabled ? 0.5 : 1,
}))

/* Setup Stitches v0.0.2
/* ========================================================================== */

const { styled: stitches002 } = createStitches002({})

const Stitches002BaseComponent = stitches002.div({
	color: 'blue',
	padding: '1rem',
})

const Stitches002DynamicComponent = stitches002.div({
	variants: {
		variant: {
			muted: {
				opacity: 0.5,
			},
		},
	},
})

/* Setup Stitches v0.0.3
/* ========================================================================== */

const { styled: stitches003 } = createStitches003({})

const Stitches003BaseComponent = stitches003.div({
	color: 'blue',
	padding: '1rem',
})

const Stitches003DynamicComponent = stitches003.div({
	variants: {
		variant: {
			muted: {
				opacity: 0.5,
			},
		},
	},
})

export default function CssInReactPage() {
	return (
		<React.Fragment>
			<BenchmarkUI
				caption="Rendering Static React Components"
				description="This test represents rendering a static component with a unique value using ReactDOM."
				benchmarks={{
					'Emotion v10.0.27': {
						test(b) {
							return ReactDOM.render(
								<EmotionBaseComponent>{b.iteration}</EmotionBaseComponent>,
								document.getElementById('test')
							)
						},
					},
					'Styled v5.2.0': {
						test(b) {
							return ReactDOM.render(
								<StyledBaseComponent>{b.iteration}</StyledBaseComponent>,
								document.getElementById('test')
							)
						},
					},
					'Stitches v0.0.2': {
						test(b) {
							return ReactDOM.render(
								<Stitches002BaseComponent>{b.iteration}</Stitches002BaseComponent>,
								document.getElementById('test')
							)
						},
					},
					'Stitches v0.0.3': {
						test(b) {
							return ReactDOM.render(
								<Stitches003BaseComponent>{b.iteration}</Stitches003BaseComponent>,
								document.getElementById('test')
							)
						},
					},
				}}
			/>
			<BenchmarkUI
				caption="Rendering Dynamic React Components"
				description="This test represents rendering a dynamic component with a unique value using ReactDOM."
				benchmarks={{
					'Emotion v10.0.27': {
						test(b) {
							return ReactDOM.render(
								<EmotionDynamicComponent disabled={b.iteration % 2}>{b.iteration}</EmotionDynamicComponent>,
								document.getElementById('test')
							)
						},
					},
					'Styled v5.2.0': {
						test(b) {
							return ReactDOM.render(
								<StyledDynamicComponent disabled={b.iteration % 2}>{b.iteration}</StyledDynamicComponent>,
								document.getElementById('test')
							)
						},
					},
					'Stitches v0.0.2': {
						test(b) {
							return ReactDOM.render(
								<Stitches002DynamicComponent {...(b.iteration % 2 ? { variant: 'muted' } : {})}>
									{b.iteration}
								</Stitches002DynamicComponent>,
								document.getElementById('test')
							)
						},
					},
					'Stitches v0.0.3': {
						test(b) {
							return ReactDOM.render(
								<Stitches003DynamicComponent {...(b.iteration % 2 ? { variant: 'muted' } : {})}>
									{b.iteration}
								</Stitches003DynamicComponent>,
								document.getElementById('test')
							)
						},
					},
				}}
			/>
			<BenchmarkUI
				caption="Rendering Static React Components to Strings"
				description="This test represents rendering a static component with a unique value to a string using ReactDOM Server."
				benchmarks={{
					'Emotion v10.0.27': {
						test(b) {
							return ReactDOMServer.renderToString(<EmotionBaseComponent>{b.iteration}</EmotionBaseComponent>)
						},
					},
					'Styled v5.2.0': {
						test(b) {
							return ReactDOMServer.renderToString(<StyledBaseComponent>{b.iteration}</StyledBaseComponent>)
						},
					},
					'Stitches v0.0.2': {
						test(b) {
							return ReactDOMServer.renderToString(<Stitches002BaseComponent>{b.iteration}</Stitches002BaseComponent>)
						},
					},
					'Stitches v0.0.3': {
						test(b) {
							return ReactDOMServer.renderToString(<Stitches003BaseComponent>{b.iteration}</Stitches003BaseComponent>)
						},
					},
				}}
			/>
			<BenchmarkUI
				caption="Rendering Dynamic React Components to Strings"
				description="This test represents rendering a dynamic component with a unique value to a string using ReactDOM Server."
				benchmarks={{
					'Emotion v10.0.27': {
						test(b) {
							return ReactDOMServer.renderToString(
								<EmotionDynamicComponent disabled={b.iteration % 2}>{b.iteration}</EmotionDynamicComponent>
							)
						},
					},
					'Styled v5.2.0': {
						test(b) {
							return ReactDOMServer.renderToString(
								<StyledDynamicComponent disabled={b.iteration % 2}>{b.iteration}</StyledDynamicComponent>
							)
						},
					},
					'Stitches v0.0.2': {
						test(b) {
							return ReactDOMServer.renderToString(
								<Stitches003DynamicComponent {...(b.iteration % 2 ? { variant: 'muted' } : {})}>
									{b.iteration}
								</Stitches003DynamicComponent>
							)
						},
					},
					'Stitches v0.0.3': {
						test(b) {
							return ReactDOMServer.renderToString(
								<Stitches003DynamicComponent {...(b.iteration % 2 ? { variant: 'muted' } : {})}>
									{b.iteration}
								</Stitches003DynamicComponent>
							)
						},
					},
				}}
			/>
		</React.Fragment>
	)
}
