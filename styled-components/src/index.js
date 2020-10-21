import * as ReactDOM from 'react-dom'
import * as React from 'react'
import * as Router from 'react-router-dom'
import loadable from '@loadable/component'
import './utils/iframe'
import './style.css'

const AsyncPage = loadable((props) => import(`./pages${props.location.pathname.replace(/\/$/, '') || '/index'}.js`), {
	cacheKey: (props) => props.location,
})

function App() {
	const location = Router.useLocation()
	return <AsyncPage location={location} />
}

ReactDOM.render(
	<React.StrictMode>
		<Router.BrowserRouter>
			<App />
		</Router.BrowserRouter>
	</React.StrictMode>,
	window.root
)
