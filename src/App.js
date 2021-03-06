import React, {Component } from 'react';
import CardList from './CardList';
import SearchBox from './SearchBox';
import { robots } from './robots';
import './App.css';
import './SearchBox.css';
import Scroll from './Scroll';
import ErrorBoundary from './ErrorBoundary';


class App extends Component {
	constructor() {
		super()
		this.state = {
			robots: [],
			searchfield: ''
		}
	}

//React Hooks

// function App() {

// 	const [robots, setRobots] = useState([]);
// 	const [searchfield, setSearchfield] = useState('');
// }

	componentDidMount() {
		fetch('https://jsonplaceholder.typicode.com/users')
		.then(response =>response.json())
		.then(users => {this.setState({robots: users})});
	}

	 onSearchChange = (event) => {
		this.setState({searchfield: event.target.value})
		
	}

	render() {

		const filteredRobots = this.state.robots.filter(robot =>{
			return robot.name.toLowerCase().includes(this.state.searchfield.toLowerCase())

		})

		if(this.state.robots.length === 0)
		{
			return <h1>Loading . . .</h1>
		}
		else {	
		return (
		<div className='tc'>
			<h1 className='f2 grow'><span>R</span>obo<span>F</span>riends</h1>
			<SearchBox searchChange={this.onSearchChange} />
			<Scroll>
			<ErrorBoundary>
				<CardList robots = {filteredRobots} />
			</ErrorBoundary>
			</Scroll>
		</div>

			)
		}
}
}


export default App;