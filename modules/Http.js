class Http {
	static async fetchData(url) {
		try {
			let response = await fetch(url);
			let data = await response.json();
			return await data;
		} catch (err) {
			return await err;
		}
	}
}

export default Http;
