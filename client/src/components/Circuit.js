import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchCircuit, stepIntoCircuit, changeInputs } from '../actions';
import * as renderEngine from '../engines/renderEngine';


class Circuit extends Component {
	constructor(props) {
		super(props);
		this.internalCircuitclickEvent = this.internalCircuitclickEvent.bind(this); 
		this.canvas = this.refs.ref;
	}

	componentDidMount() {
		console.log(this);
		var uid = this.props.location.pathname
		this.props.fetchCircuit(uid.replace("/circuit/", ""));
	}


	startRenderEngine(ref) {
		this.canvas = renderEngine.initialize(ref);
		renderEngine.render(this.canvas, this.props.circuit, this.internalCircuitclickEvent);
		//this.props.changeInputs({circuit: this.props.circuit, inputs: [1, 1, 1], canvas: this.canvas});
	}
	
	internalCircuitclickEvent(data) {	
		var temp = {circuit: this.props.circuit, data}
		this.props.stepIntoCircuit(temp);
	}

	render() {
		console.log(this.props.circuit)
		// if the circuit has not been fetched
		if (!this.props.circuit) {
			return <div> Loading Circuit!!!! </div>;
		}
		// if the circuit has been built
		else {
			return <div ref={ref => this.startRenderEngine(ref) } className="circuitCanvas"/>
		}
	}
}

function mapStateToProps({ circuit, builtCircuit }, ownprops) {
	return { circuit, builtCircuit };
}

export default connect(
	mapStateToProps,
	{ fetchCircuit, stepIntoCircuit, changeInputs }
)(Circuit);