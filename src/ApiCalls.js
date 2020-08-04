const url = "http://fortunecookieapi.herokuapp.com/v1";

export const getOneCookie = async () => {
		const response = await fetch(url + "/cookie?limit=1");
		const cookie = await response.json();
	  return response.status === 200 ? cookie : "there was a network error"
}

export const getVoiceData = async (textToSpeech) => {
	const response = await fetch(`https://api.voicerss.org/?key=b2e2b3e1483a4d2494f2b1440b85875c&hl=zh-cn&src=${textToSpeech}`);
	// console.log(response)
	const blob = await response.blob();
	return blob;

}
