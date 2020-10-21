export type Measurements = number[]

/** Benchmark configuration and statistics. */
export interface Benchmark {
	/** Number of tests completed per millisecond. */
	hz: number
	/** Number of iterations that have been run. */
	iteration: number
	/** List of times elapsed during each test. */
	measurements: Measurements
	/** Function run as the test. */
	test: () => any
	/** Function run before all tests. */
	beforeAll?: () => any
	/** Function run after all tests. */
	afterAll?: () => any
	/** Function run before each test. */
	beforeEach?: () => any
	/** Function run after each test. */
	afterEach?: () => any
	/** Function run between each test. */
	between?: () => any
	/** Current value returned by the most run. */
	returnValue: () => any
	/** State of the test, which is pending, current, or complete. */
	state: 'pending' | 'current' | 'complete'
}

/** Collection of labeled benchmark configurations and statistics. */
export interface Benchmarks {
	/** Labeled Benchmark. */
	[k: string]: Benchmark
}

export type measure = (b: Benchmark) => Promise<Benchmark>

export default measure
