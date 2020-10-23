import * as React from 'react'

/* global globalThis:readonly */

const getBenchmarkStatus = (benchmark) => (benchmark.running ? 'running' : benchmark.count ? 'complete' : 'pending')
const getBenchmarkMax = (suite) => suite.reduce((max, benchmark) => Math.max(max, benchmark.hz), 0)

/* Benchmark UI
/* ========================================================================== */

/**
 * Displays a Benchmark user interface for performance testing.
 * @arg {import('./BenchmarkUI').BenchmarkUIProps} props
 */
function BenchmarkUI(props) {
	const { caption, description } = props
	const [, setUpdate] = React.useState(() => performance.now())
	const suite = React.useMemo(() => {
		const Benchmark = globalThis.Benchmark
		const suite = new Benchmark.Suite('Benchmark')
		for (const [name, { beforeEach, afterEach, beforeAll, afterAll, test, deferred = false }] of Object.entries(props.benchmarks)) {
			const benchmarkConfig = { name, onCycle() { setMax(getBenchmarkMax(suite)) }, deferred }
			const benchmarkFnBody = []
			if (beforeEach) benchmarkFnBody.push('beforeEach.call(this, this)')
			if (test) benchmarkFnBody.push('test.call(this, this)')
			if (afterEach) benchmarkFnBody.push('afterEach.call(this, this)')
			// eslint-disable-next-line
			benchmarkConfig.fn = Function(
				'beforeEach',
				'test',
				'afterEach',
				'return function(){return ' + benchmarkFnBody + '}'
			)(beforeEach, test, afterEach)
			// eslint-disable-next-line
			if (beforeAll) benchmarkConfig.teardown = Function('fn', 'return function(){return fn()}')(beforeAll)
			// eslint-disable-next-line
			if (afterAll) benchmarkConfig.teardown = Function('fn', 'return function(){return fn()}')(afterAll)
			suite.push(new Benchmark(benchmarkConfig))
		}
		return suite
	}, [props.benchmarks])
	globalThis.suite = suite
	const [max, setMax] = React.useState(() => getBenchmarkMax(suite))
	/** @type {import('./BenchmarkUI').OnClick} */
	const onClick = async (event) => {
		const { currentTarget } = event
		if (currentTarget.disabled) return
		currentTarget.disabled = true
		const onComplete = () => {
			currentTarget.disabled = false
			suite.off('complete', onComplete)
			setUpdate(performance.now())
		}
		suite.on('complete', onComplete).run({ async: true })
	}

	return (
		<table className="benchmarks">
			<caption>
				<h3>{caption}</h3>
				<p>{description}</p>
			</caption>
			<thead>
				<tr>
					<th>Benchmark</th>
					<th>Status</th>
					<th>Performance</th>
					<th>Grade</th>
				</tr>
			</thead>
			<tbody>
				{suite.map((benchmark) => (
					<tr key={benchmark.id} className={getBenchmarkStatus(benchmark)}>
						<th>{benchmark.name}</th>
						<td>{getBenchmarkStatus(benchmark)}</td>
						<td>{Math.trunc(benchmark.hz)} hz</td>
						<td>{(max === 0 ? 0 : (benchmark.hz / max) * 100).toFixed(1)}%</td>
					</tr>
				))}
			</tbody>
			<tfoot>
				<tr>
					<td>{navigator.userAgent}</td>
					<td colSpan={3} className="button">
						<button onClick={onClick}>Run Benchmarks</button>
					</td>
				</tr>
			</tfoot>
		</table>
	)
}

export default BenchmarkUI
