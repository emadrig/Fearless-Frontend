import React, { useEffect, useState } from "react";

function LocationForm() {
	const [states, setStates] = useState([]);
	// const initialStates = props.states;
	const [name, setName] = useState("");
	const [roomCount, setRoomCount] = useState("");
	const [city, setCity] = useState("");
	const [state, setState] = useState("");

	const fetchData = async () => {
		const url = "http://localhost:8000/api/states/";

		const response = await fetch(url);

		if (response.ok) {
			const data = await response.json();
			setStates(data.states);
		}
	};

	useEffect(() => {
		fetchData();
	}, []);

	const handleSubmit = async (event) => {
		event.preventDefault();

		const data = {};

		data.name = name;
		data.room_count = roomCount;
		data.city = city;
		data.state = state;

		const locationUrl = "http://localhost:8000/api/locations/";

		const fetchConfig = {
			method: "post",
			body: JSON.stringify(data),
			headers: {
				"Content-Type": "application/json",
			},
		};

		const response = await fetch(locationUrl, fetchConfig);

		if (response.ok) {
			// const newLocation = await response.json();
			// console.log(newLocation);

			setName("");
			setRoomCount("");
			setCity("");
			setState("");
		}
	};

	const handleNameChange = async (event) => {
		const value = event.target.value;
		setName(value);
	};

	const handleRoomCountChange = async (event) => {
		const value = event.target.value;
		setRoomCount(value);
	};
	const handleCityChange = async (event) => {
		const value = event.target.value;
		setCity(value);
	};
	const handleStateChange = async (event) => {
		const value = event.target.value;
		setState(value);
	};

	return (
		<div className="row">
			<div className="offset-3 col-6">
				<div className="shadow p-4 mt-4">
					<h1>Create a new location</h1>
					<form onSubmit= {handleSubmit} id="create-location-form">
						<div className="form-floating mb-3">
							<input
								value={name}
								placeholder="Name"
								onChange={handleNameChange}
								required
								type="text"
								name="name"
								id="name"
								className="form-control"
							/>
							<label htmlFor="name">Name</label>
						</div>
						<div className="form-floating mb-3">
							<input
								value={roomCount}
								placeholder="Room count"
								onChange={handleRoomCountChange}
								required
								type="number"
								name="room_count"
								id="room_count"
								className="form-control"
							/>
							<label htmlFor="room_count">Room count</label>
						</div>
						<div className="form-floating mb-3">
							<input
								value={city}
								placeholder="City"
								onChange={handleCityChange}
								required
								type="text"
								name="city"
								id="city"
								className="form-control"
							/>
							<label htmlFor="city">City</label>
						</div>
						<div className="mb-3">
							<select
								value={state}
								onChange={handleStateChange}
								required
								name="state"
								id="state"
								className="form-select"
							>
								<option value="">Choose a state</option>
								{states.map((state) => {
									return (
										<option value={state.abbreviation} key={state.abbreviation}>
											{state.name}
										</option>
									);
								})}
							</select>
						</div>
						<button className="btn btn-primary">Create</button>
					</form>
				</div>
			</div>
		</div>
	);
}

export default LocationForm;
