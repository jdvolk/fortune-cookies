const url = "http://fortunecookieapi.herokuapp.com/v1";

export const getOneCookie = async () => {
		const response = await fetch(url + "/cookie?limit=1");
		const cookie = await response.json();
	  return response.status === 200 ? cookie : "there was a network error"
}
