window.addEventListener("DOMContentLoaded", async () => {
	const selectTag = document.getElementById("conference");

	const form = document.getElementById("create-attendee-form");
	form.addEventListener("submit", async (event) => {
		event.preventDefault();
		const data = Object.fromEntries(new FormData(form));

		const attendee_url = "http://localhost:8001/api/attendees/";
		const fetchOptions = {
			method: "post",
			body: JSON.stringify(data),
			headers: {
				"Content-type": "application/json",
			},
		};
		const attendeeResponse = await fetch(attendee_url, fetchOptions);
		if (attendeeResponse.ok) {
			const success = document.getElementById("success-message");
			form.classList.add("d-none");
			success.classList.remove("d-none");
		} else {
			console.log(atteendeeResponse);
		}
	});

	const url = "http://localhost:8000/api/conferences/";
	const response = await fetch(url);
	if (response.ok) {
		const data = await response.json();

		for (let conference of data.conferences) {
			const option = document.createElement("option");
			option.value = conference.href;
			option.innerHTML = conference.name;
			selectTag.appendChild(option);
		}
		// here, add the "d-none" class to the loading icon
		const loadingTag = document.getElementById(
			"loading-conference-spinner"
		);
		loadingTag.classList.add("d-none");

		// Here, remove the "d-none" class from the select tag
		const successTag = document.getElementById("conference");
		successTag.classList.remove("d-none");
	}
});
