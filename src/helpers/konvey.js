export async function konvey(url, id, token, method, body) {
	let config = {
		method: method,
		headers: {
			Authorization: `Bearer ${token}`,
			'content-type': 'application/json',
		},
		body: body ? JSON.stringify(body) : null,
	};
	return fetch(`${id ? url + id : url}`, config).then(async (res) => {
		// error handling with respective messages is handled by the backend
		let data = await res.json();
		if (res.ok) {
			if (data.length > 1) {
				const chronologicalData = data.reverse();
				return chronologicalData;
			} else {
				return data;
			}
		} else {
			return Promise.reject(data);
		}
	});
}
