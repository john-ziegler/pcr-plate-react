import React from 'react';
var ReactBootstrap = require('react-bootstrap');
var PropTypes = React.PropTypes;

var Well = React.createClass({
	render: function() {
		return (
			<ReactBootstrap.Well style={{border: "1px solid darkgray", padding: '5px', width: '100%', height: '100%', }}>
				{this.props.children}
			</ReactBootstrap.Well>
		);
	}
});

module.exports = Well;