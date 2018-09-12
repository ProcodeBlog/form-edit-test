import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import './css/Table.css';
import FormContainer from './containers/FormContainer';

// data should get from localstorage
var data = [
	{ id: 1, name: 'Mr. Gob Bog', age: 23, nickname: 'Gob' },
	{ id: 2, name: 'Mr. Buster Retsub', age: 45, nickname: 'Buster' },
	{ id: 3, name: 'George Michael', age: 33, nickname: 'Geo' },
];

const supportsLocalStorage = () => {
	return typeof Storage !== 'undefined';
};

class App extends Component {
	constructor(props) {
		super(props);

		if (!supportsLocalStorage()) {
			console.log('No HTML5 localStorage Support');
		} else {
			const dataStorage = localStorage.getItem('data');
			if (dataStorage) {
				data = JSON.parse(dataStorage);
			}
		}
		this.state = { data: data };
	}

	render() {
		return (
			<div className="App">
				<header className="App-header">
					<img src={logo} className="App-logo" alt="logo" />
					<h1 className="App-title">Welcome to React</h1>
				</header>
				<p className="tb-header">SPA Application</p>
				<FormContainer data={data} />
			</div>
		);
	}
}

export default App;
