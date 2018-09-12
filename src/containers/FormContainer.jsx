import React, { Component } from 'react';

/* Import Components */
import Input from '../components/Input';
import Button from '../components/Button';
import ReactTable from 'react-table';
import 'react-table/react-table.css';

export default class FormContainer extends Component {
	constructor(props) {
		super(props);

		this.state = {
			data: this.props.data,
			newUser: { id: 0, name: '', age: '', nickname: '' },
			toggleInput: false,
			edit: false,
			rowEdit: null,
		};
	}

	/* This lifecycle hook gets executed when the component mounts */
	handleFormSubmit = event => {
		event.preventDefault();
		let { newUser, data } = this.state;

		if (newUser !== 'undefined' && newUser.name !== '' && newUser.age !== '' && newUser.nickname !== '') {
			newUser.id = data.length + 1;
			data.push(newUser);
			// save to local storage
			this.setState({
				toggleInput: !this.state.toggleInput,
				data: data,
				newUser: { id: 0, name: '', age: '', nickname: '' },
			});

			// localStorage.setItem('data', this.state.data);
			localStorage.setItem('data', JSON.stringify(this.state.data));
		}
	};

	handleName = event => {
		// console.log(event);
		let value = event.target.value;

		this.setState(prevState => ({ newUser: { ...prevState.newUser, name: value } })); // ,
		// () => console.log(this.state.newUser)
	};

	handleAge = event => {
		let value = event.target.value;
		this.setState(prevState => ({ newUser: { ...prevState.newUser, age: value } }));
	};

	handleNickname = event => {
		// console.log(event);
		let value = event.target.value;

		this.setState(prevState => ({
			newUser: { ...prevState.newUser, nickname: value },
		})); // ,
		// () => console.log(this.state.newUser)
	};

	handleTogle = event => {
		// console.log(event);
		this.setState({ toggleInput: !this.state.toggleInput });
	};

	handleAdd = event => {
		console.log(event.target.value);
	};

	renderEditable = cellInfo => {
		if (this.state.rowEdit.index === cellInfo.index) {
			return (
				<div
					style={{ backgroundColor: '#dacaca' }} // #fafafa #cacaba
					contentEditable
					suppressContentEditableWarning
					onBlur={e => {
						const data = [...this.state.data];
						data[cellInfo.index][cellInfo.column.id] = e.target.innerHTML;
						this.setState({ data, edit: false, rowEdit: null });
						localStorage.setItem('data', JSON.stringify(this.state.data));
					}}
					dangerouslySetInnerHTML={{ __html: this.state.data[cellInfo.index][cellInfo.column.id] }}
				/>
			);
		} else {
			return (
				<div
					onBlur={e => {
						const data = [...this.state.data];
						data[cellInfo.index][cellInfo.column.id] = e.target.innerHTML;
						this.setState({ data });
					}}
					dangerouslySetInnerHTML={{ __html: this.state.data[cellInfo.index][cellInfo.column.id] }}
				/>
			);
		}
	};

	handleEdit = (e, row) => {
		// console.log(e, row);
		this.setState({ edit: true, rowEdit: row });
	};

	handleDelete = (e, row) => {
		//console.log(e, row.index);
		this.state.data.splice(row.index, 1);
		// console.log(this.state.data);
		const data = [...this.state.data];
		this.setState({ data });
	};

	render() {
		return (
			<div>
				<div>
					{/* <Table data={this.state.data} /> */}
					<div>
						<ReactTable
							data={this.state.data}
							columns={[
								{ Header: 'Name', accessor: 'name', Cell: this.state.edit ? this.renderEditable : '' },
								{ Header: 'Age', accessor: 'age', Cell: this.state.edit ? this.renderEditable : '' },
								{
									Header: 'NickName',
									accessor: 'nickname',
									Cell: this.state.edit ? this.renderEditable : '',
								},
								{
									Header: 'Action',
									id: 'full',
									accessor: d => <div dangerouslySetInnerHTML={{ __html: d.id }} />,
									Cell: row => (
										<div>
											<Button
												title="Edit"
												type="primary"
												style={{ margin: 7 }}
												action={e => this.handleEdit(e, row)}
											/>
											<Button
												title="Delete"
												type="primary"
												style={{}}
												action={e => this.handleDelete(e, row)}
											/>
										</div>
									),
								},
							]}
							defaultPageSize={5}
							className="-striped -highlight"
						/>
					</div>
				</div>
				<div>
					<br />
					{this.state.toggleInput ? (
						<form className="container-fluid ">
							<div className="form-inline">
								<div className="form-inline col-md-12" style={{ margin: 2 }}>
									<Input
										style={{ margin: 7 }}
										inputtype={'text'}
										title={'Full Name'}
										name={'name'}
										placeholder={'Enter your name'}
										handlechange={this.handleName}
									/>
									<Input
										inputtype={'number'}
										name={'age'}
										title={'Age'}
										handlechange={this.handleAge}
									/>
									<Input
										style={{ margin: 7 }}
										inputtype={'text'}
										title={'Nick Name'}
										name={'nickname'}
										placeholder={'Enter your nick name'}
										handlechange={this.handleNickname}
									/>
									<Button
										title="Save"
										type="primary"
										style={{ margin: 7 }}
										action={this.handleFormSubmit}
									/>
									<Button title="Cancel" type="primary" style={{}} action={this.handleTogle} />
								</div>
							</div>
						</form>
					) : null}
				</div>
				<br />
				<div className="col-md-1">
					<Button title="Add" type="primary" style={{}} action={this.handleTogle} />
				</div>
			</div>
		);
	}
}
