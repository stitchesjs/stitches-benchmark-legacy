import * as React from 'react'
import measure from './measure'

/* Benchmark UI
/* ========================================================================== */

/**
 * Displays a Benchmark user interface for performance testing.
 * @arg {import('./BenchmarkUI').BenchmarkUIProps} props
 */
function BenchmarkUI(props) {
	const { caption, description } = props
	const [benchmarks, setBenchmarks] = React.useState(() => {
		const benchmarks = { ...props.benchmarks }
		for (let benchmark of Object.values(benchmarks)) {
			benchmark.hz = 0
			benchmark.returnValue = null
			benchmark.state = 'pending'
			benchmark.between = async (b) => {
				await setBenchmarks({ ...benchmarks })
			}
		}
		return benchmarks
	})
	/** @type {import('./BenchmarkUI').OnClick} */
	const onClick = async (event) => {
		const { currentTarget } = event
		if (currentTarget.disabled) return
		currentTarget.disabled = true
		/** @type {import('./measure').Benchmark} */
		let b
		for (b of Object.values(benchmarks)) {
			b.state = 'running'
			setBenchmarks({ ...benchmarks })
			await measure(b)
			b.state = 'complete'
			setBenchmarks({ ...benchmarks })
		}
		currentTarget.disabled = false
	}
	const max = React.useMemo(() => Object.values(benchmarks).reduce(
		(max, benchmark) => Math.max(max, benchmark.hz),
		0
	), [benchmarks])

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
				{Object.entries(benchmarks).map(([name, benchmark]) => (
					<tr key={name} className={benchmark.state}>
						<th>{name}</th>
						<td>{benchmark.state}</td>
						<td>{benchmark.hz} ops/ms</td>
						<td>{(max === 0 ? 0 : benchmark.hz / max * 100).toFixed(1)}%</td>
					</tr>
				))}
			</tbody>
			<tfoot>
				<tr>
					<td colSpan={3}>{navigator.userAgent}</td>
					<td className="button">
						<button onClick={onClick}>Run Benchmarks</button>
					</td>
				</tr>
			</tfoot>
		</table>
	)
}

export default BenchmarkUI
