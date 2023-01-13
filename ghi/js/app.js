function createCard(name, description, pictureUrl, starts, ends, location) {
	return `
    <div class="card shadow-lg" style="padding-bottom":>
        <img src="${pictureUrl}" class="card-img-top">
        <div class="card-body">
            <h5 class="card-title">${name}</h5>
            <h6 class="card-subtitle text-muted">${location}</h6>
            <p class="card-text">${description}</p>
        </div>
        <div class="card-footer">
            ${new Date(starts).toLocaleDateString()} -
            ${new Date(ends).toLocaleDateString()}
        </div>
    </div>
        `;
}

window.addEventListener("DOMContentLoaded", async () => {
	const url = "http://localhost:8000/api/conferences/";

	try {
		const response = await fetch(url);

		if (!response.ok) {
			// Figure out what to do when the response is bad
		} else {
			const data = await response.json();
			let index = 0;

			for (let conference of data.conferences) {
				const detailUrl = `http://localhost:8000${conference.href}`;
				const detailResponse = await fetch(detailUrl);
				if (detailResponse.ok) {
					const details = await detailResponse.json();
					console.log(details);
					const title = details.conference.name;
					const starts = details.conference.starts;
					console.log(starts);
					const ends = details.conference.ends;
					console.log(ends);
					const description = details.conference.description;
					const pictureUrl = details.conference.location.picture_url;
					const location = details.conference.location.name;
					const html = createCard(
						title,
						description,
						pictureUrl,
						starts,
						ends,
						location
					);
					const columnTag = document.querySelector(
						`#col-${index % 3}`
					);
					columnTag.innerHTML += html;
					index += 1;
				}
			}
		}
	} catch (e) {
		console.error(e);
		// Figure out what to do if an error is raised
	}
});
