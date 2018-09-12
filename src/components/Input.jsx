import React from 'react';

const Input = props => {
	return (
		<div className="form-group form-inline " style={props.style}>
			<label htmlFor={props.name} className="form-label">
				{props.title}:
			</label>
			<input
				className="form-control"
				id={props.name}
				name={props.name}
				value={props.value}
				type={props.inputtype}
				onChange={props.handlechange}
				placeholder={props.placeholder}
				{...props}
			/>
		</div>
	);
};

export default Input;
