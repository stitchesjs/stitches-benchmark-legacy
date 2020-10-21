import * as Measure from './measure'
import 'react'

export type BenchmarkUIProps = {
	/** Caption title of the benchmark. */
	caption?: string,
	/** Description of the benchmark. */
	description?: string,
	/** Collection of labeled benchmark configurations and statistics. */
	benchmarks: Measure.Benchmarks
}

export type OnClick = React.MouseEventHandler<HTMLButtonElement>
