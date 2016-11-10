import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, hashHistory} from "react-router";

import NavigationBar from './components/NavigationBar';

import Layout from './components/Layout'
import App from './pages/App';
import Home from './pages/Home';
import Edit from './pages/Edit';
import Help from './pages/Help';

//Create routes between the pages
render( 
		<Router history={hashHistory}>
			<Route path="/" component={Layout}>	
				<IndexRoute component={Home}></IndexRoute>
				<Route path="edit" component={Edit}></Route>
				<Route path="register" component={App}></Route>	
				<Route path="help" component={Help}></Route>	
			</Route>
		</Router>, 	

document.querySelector('.app'));
