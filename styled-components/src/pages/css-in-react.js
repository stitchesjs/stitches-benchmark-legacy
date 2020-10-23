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
						deferred: true,
						test(b) {
							return render(
								<EmotionBaseComponent>{b.count}</EmotionBaseComponent>,
								sandRoot,
								b.resolve
							)
						},
					},
					'Styled v5.2.0': {
						deferred: true,
						test(b) {
							return render(
								<StyledBaseComponent>{b.count}</StyledBaseComponent>,
								sandRoot,
								b.resolve
							)
						},
					},
					'Stitches Original': {
						deferred: true,
						test(b) {
							return render(
								<StitchesOriginalBaseComponent>{b.count}</StitchesOriginalBaseComponent>,
								sandRoot,
								b.resolve
							)
						},
					},
					'Stitches v0.0.2': {
						deferred: true,
						test(b) {
							return render(
								<Stitches002BaseComponent>{b.count}</Stitches002BaseComponent>,
								sandRoot,
								b.resolve
							)
						},
					},
					'Stitches v0.0.3': {
						deferred: true,
						test(b) {
							return render(
								<Stitches003BaseComponent>{b.count}</Stitches003BaseComponent>,
								sandRoot,
								b.resolve
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
						deferred: true,
						test(b) {
							return render(
								<EmotionDynamicComponent disabled={b.count % 2}>{b.count}</EmotionDynamicComponent>,
								sandRoot,
								b.resolve
							)
						},
					},
					'Styled v5.2.0': {
						deferred: true,
						test(b) {
							return render(
								<StyledDynamicComponent disabled={b.count % 2}>{b.count}</StyledDynamicComponent>,
								sandRoot,
								b.resolve
							)
						},
					},
					'Stitches Original': {
						deferred: true,
						test(b) {
							return render(
								<StitchesOriginalDynamicComponent {...(b.count % 2 ? { variant: 'muted' } : {})}>
									{b.count}
								</StitchesOriginalDynamicComponent>,
								sandRoot,
								b.resolve
							)
						},
					},
					'Stitches v0.0.2': {
						deferred: true,
						test(b) {
							return render(
								<Stitches002DynamicComponent {...(b.count % 2 ? { variant: 'muted' } : {})}>
									{b.count}
								</Stitches002DynamicComponent>,
								sandRoot,
								b.resolve
							)
						},
					},
					'Stitches v0.0.3': {
						deferred: true,
						test(b) {
							return render(
								<Stitches003DynamicComponent {...(b.count % 2 ? { variant: 'muted' } : {})}>
									{b.count}
								</Stitches003DynamicComponent>,
								sandRoot,
								b.resolve
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
						deferred: true,
						test(b) {
							return render(
								<EmotionOverrideComponent css={{ color: b.count % 2 ? 'red' : 'blue' }}>
									{b.count}
								</EmotionOverrideComponent>,
								sandRoot,
								b.resolve
							)
						},
					},
					'Styled v5.2.0': {
						deferred: true,
						test(b) {
							return render(
								<StyledOverrideComponent css={{ color: b.count % 2 ? 'red' : 'blue' }}>
									{b.count}
								</StyledOverrideComponent>,
								sandRoot,
								b.resolve
							)
						},
					},
					'Stitches Original': {
						deferred: true,
						test(b) {
							return render(
								<StitchesOriginalOverrideComponent css={{ color: b.count % 2 ? 'red' : 'blue' }}>
									{b.count}
								</StitchesOriginalOverrideComponent>,
								sandRoot,
								b.resolve
							)
						},
					},
					'Stitches v0.0.2': {
						deferred: true,
						test(b) {
							return render(
								<Stitches002OverrideComponent css={{ color: b.count % 2 ? 'red' : 'blue' }}>
									{b.count}
								</Stitches002OverrideComponent>,
								sandRoot,
								b.resolve
							)
						},
					},
					'Stitches v0.0.3': {
						deferred: true,
						test(b) {
							return render(
								<Stitches003OverrideComponent css={{ color: b.count % 2 ? 'red' : 'blue' }}>
									{b.count}
								</Stitches003OverrideComponent>,
								sandRoot,
								b.resolve
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
							return ReactDOMServer.renderToString(<EmotionBaseComponent>{b.count}</EmotionBaseComponent>)
						},
					},
					'Styled v5.2.0': {
						test(b) {
							return ReactDOMServer.renderToString(<StyledBaseComponent>{b.count}</StyledBaseComponent>)
						},
					},
					'Stitches Original': {
						test(b) {
							return ReactDOMServer.renderToString(
								<StitchesOriginalBaseComponent>{b.count}</StitchesOriginalBaseComponent>
							)
						},
					},
					'Stitches v0.0.2': {
						test(b) {
							return ReactDOMServer.renderToString(<Stitches002BaseComponent>{b.count}</Stitches002BaseComponent>)
						},
					},
					'Stitches v0.0.3': {
						test(b) {
							return ReactDOMServer.renderToString(<Stitches003BaseComponent>{b.count}</Stitches003BaseComponent>)
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
								<EmotionDynamicComponent disabled={b.count % 2}>{b.count}</EmotionDynamicComponent>
							)
						},
					},
					'Styled v5.2.0': {
						test(b) {
							return ReactDOMServer.renderToString(
								<StyledDynamicComponent disabled={b.count % 2}>{b.count}</StyledDynamicComponent>
							)
						},
					},
					'Stitches Original': {
						test(b) {
							return ReactDOMServer.renderToString(
								<StitchesOriginalDynamicComponent {...(b.count % 2 ? { variant: 'muted' } : {})}>
									{b.count}
								</StitchesOriginalDynamicComponent>
							)
						},
					},
					'Stitches v0.0.2': {
						test(b) {
							return ReactDOMServer.renderToString(
								<Stitches002DynamicComponent {...(b.count % 2 ? { variant: 'muted' } : {})}>
									{b.count}
								</Stitches002DynamicComponent>
							)
						},
					},
					'Stitches v0.0.3': {
						test(b) {
							return ReactDOMServer.renderToString(
								<Stitches003DynamicComponent {...(b.count % 2 ? { variant: 'muted' } : {})}>
									{b.count}
								</Stitches003DynamicComponent>
							)
						},
					},
				}}
			/>
		</React.Fragment>
	)
}
