import * as React from 'react'
import * as ReactDOM from 'react-dom'
import * as ReactDOMServer from 'react-dom/server'
import emotionStyled from '@emotion/styled'
import componentsStyled from 'styled-components'
import { createStyled as createStitchesOriginal } from '@stitches/styled'
import { createStyled as createStitches002 } from '@stitches/react'
import { createStyled as createStitches003 } from '@stitches/react-canary'
import BenchmarkUI from '../utils/BenchmarkUI'

const { render } = ReactDOM

/* global sandRoot:readonly */

/* Setup Emotion v10.0.27
/* ========================================================================== */

const EmotionBaseComponent = emotionStyled.div({
	color: 'blue',
	padding: '1rem',
})

const EmotionDynamicComponent = emotionStyled.div((props) => ({
	opacity: props.disabled ? 0.5 : 1,
}))

const EmotionOverrideComponent = emotionStyled.div((props) => props.css)

/* Setup Styled v5.2.0
/* ========================================================================== */

const StyledBaseComponent = componentsStyled.div({
	color: 'blue',
	padding: '1rem',
})

const StyledDynamicComponent = componentsStyled.div((props) => ({
	opacity: props.disabled ? 0.5 : 1,
}))

const StyledOverrideComponent = componentsStyled.div((props) => props.css)

/* Setup Stitches Original (when it was called `styled`)
/* ========================================================================== */

const { styled: stitchesOriginal } = createStitchesOriginal({})

const StitchesOriginalBaseComponent = stitchesOriginal.div({
	color: 'blue',
	padding: '1rem',
})

const StitchesOriginalDynamicComponent = stitchesOriginal.div(
	{},
	{
		variant: {
			muted: {
				opacity: 0.5,
			},
		},
	}
)

const StitchesOriginalOverrideComponent = stitchesOriginal.div({})

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

const Stitches002OverrideComponent = stitches002.div({})

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

const Stitches003OverrideComponent = stitches003.div({})

export default function CssInReactPage() {
	return (
		<React.Fragment>
			<BenchmarkUI
				caption="Rendering Static React Components"
				description="This test represents rendering a static component with a unique value using ReactDOM."
				benchmarks={{
					'Emotion v10.0.27': {
						test(b) {
							return render(
								<EmotionBaseComponent>{b.iteration}</EmotionBaseComponent>,
								sandRoot
							)
						},
					},
					'Styled v5.2.0': {
						test(b) {
							return render(
								<StyledBaseComponent>{b.iteration}</StyledBaseComponent>,
								sandRoot
							)
						},
					},
					'Stitches Original': {
						test(b) {
							return render(
								<StitchesOriginalBaseComponent>{b.iteration}</StitchesOriginalBaseComponent>,
								sandRoot
							)
						},
					},
					'Stitches v0.0.2': {
						test(b) {
							return render(
								<Stitches002BaseComponent>{b.iteration}</Stitches002BaseComponent>,
								sandRoot
							)
						},
					},
					'Stitches v0.0.3': {
						test(b) {
							return render(
								<Stitches003BaseComponent>{b.iteration}</Stitches003BaseComponent>,
								sandRoot
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
							return render(
								<EmotionDynamicComponent disabled={b.iteration % 2}>{b.iteration}</EmotionDynamicComponent>,
								sandRoot
							)
						},
					},
					'Styled v5.2.0': {
						test(b) {
							return render(
								<StyledDynamicComponent disabled={b.iteration % 2}>{b.iteration}</StyledDynamicComponent>,
								sandRoot
							)
						},
					},
					'Stitches Original': {
						test(b) {
							return render(
								<StitchesOriginalDynamicComponent {...(b.iteration % 2 ? { variant: 'muted' } : {})}>
									{b.iteration}
								</StitchesOriginalDynamicComponent>,
								sandRoot
							)
						},
					},
					'Stitches v0.0.2': {
						test(b) {
							return render(
								<Stitches002DynamicComponent {...(b.iteration % 2 ? { variant: 'muted' } : {})}>
									{b.iteration}
								</Stitches002DynamicComponent>,
								sandRoot
							)
						},
					},
					'Stitches v0.0.3': {
						test(b) {
							return render(
								<Stitches003DynamicComponent {...(b.iteration % 2 ? { variant: 'muted' } : {})}>
									{b.iteration}
								</Stitches003DynamicComponent>,
								sandRoot
							)
						},
					},
				}}
			/>

			<BenchmarkUI
				caption="Rendering Overriden React Components"
				description="This test represents rendering an override component with via the `css` prop."
				benchmarks={{
					'Emotion v10.0.27': {
						test(b) {
							return render(
								<EmotionOverrideComponent css={{ color: b.iteration % 2 ? 'red' : 'blue' }}>
									{b.iteration}
								</EmotionOverrideComponent>,
								sandRoot
							)
						},
					},
					'Styled v5.2.0': {
						test(b) {
							return render(
								<StyledOverrideComponent css={{ color: b.iteration % 2 ? 'red' : 'blue' }}>
									{b.iteration}
								</StyledOverrideComponent>,
								sandRoot
							)
						},
					},
					'Stitches Original': {
						test(b) {
							return render(
								<StitchesOriginalOverrideComponent css={{ color: b.iteration % 2 ? 'red' : 'blue' }}>
									{b.iteration}
								</StitchesOriginalOverrideComponent>,
								sandRoot
							)
						},
					},
					'Stitches v0.0.2': {
						test(b) {
							return render(
								<Stitches002OverrideComponent css={{ color: b.iteration % 2 ? 'red' : 'blue' }}>
									{b.iteration}
								</Stitches002OverrideComponent>,
								sandRoot
							)
						},
					},
					'Stitches v0.0.3': {
						test(b) {
							return render(
								<Stitches003OverrideComponent css={{ color: b.iteration % 2 ? 'red' : 'blue' }}>
									{b.iteration}
								</Stitches003OverrideComponent>,
								sandRoot
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
					'Stitches Original': {
						test(b) {
							return ReactDOMServer.renderToString(
								<StitchesOriginalBaseComponent>{b.iteration}</StitchesOriginalBaseComponent>
							)
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
					'Stitches Original': {
						test(b) {
							return ReactDOMServer.renderToString(
								<StitchesOriginalDynamicComponent {...(b.iteration % 2 ? { variant: 'muted' } : {})}>
									{b.iteration}
								</StitchesOriginalDynamicComponent>
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
