/* Benchmark Utilities
/* ========================================================================== */

const now = () => Math.trunc(performance.now())
const ms = (ms = 5) => new Promise((resolve) => setTimeout(resolve, ms))
const getHz = (/** @type {import('./measure').Measurements} */ measurements) =>
	Math.trunc(measurements.reduce((ahz, add) => ahz + (add === 0 ? 0 : 1000 / add), 0) / measurements.length)

/** @type {import('./measure').measure} */
const measure = async (b) => {
	// Prepare the benchmark...
	b.hz = 0
	b.iteration = 0
	b.measurements = Array.isArray(b.measurements) ? b.measurements : []
	b.returnValue = null
	let { beforeAll, beforeEach, test, afterEach, between, afterAll, hz, iteration, measurements } = b
	let results = null
	let started = 0
	let elapsed = 0
	let startat = now()
	// Run the setup before all tests...
	results = beforeAll && beforeAll(b)
	if (results?.then) results = await results
	b.hz = hz
	b.iteration = iteration
	b.measurements = measurements
	// Run the test repeatedly
	while (true) {
		++iteration
		// Run the setup before each test...
		results = beforeEach && beforeEach(b)
		if (results?.then) results = await results
		b.hz = hz
		b.iteration = iteration
		b.measurements = measurements
		// Run and measure each test...
		started = now()
		results = test(b)
		if (results?.then) await results
		elapsed = now() - started
		measurements.push(elapsed)
		hz = getHz(measurements)
		b.hz = hz
		b.iteration = iteration
		b.measurements = measurements
		// Run the teardown after each test...
		results = afterEach && afterEach(b)
		if (results?.then) results = await results
		b.returnValue = results
		b.hz = hz
		b.iteration = iteration
		b.measurements = measurements
		// Run the between (added for UI updates)...
		results = between && between(b)
		if (results?.then) results = await results
		// Pause testing for 5 milliseconds...
		await ms(5)
		// Stop testing if 5 seconds have passed...
		if (now() - startat > 5000) break
	}
	// Run the teardown after all tests...
	results = afterAll && afterAll(b)
	if (results?.then) await results
	b.hz = hz
	b.iteration = iteration
	b.measurements = measurements
	// Return the benchmark...
	return b
}

export default measure
