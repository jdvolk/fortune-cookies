const url = "http://fortunecookieapi.herokuapp.com/v1";

export const getOneCookie = async () => {
		const response = await fetch(url + "/cookie?limit=1");
		const cookie = await response.json();
	  return response.status === 200 ? cookie : "there was a network error"
}

export const getVoiceData = async (textToSpeech) => {
	try {
		const response = await fetch(`https://api.voicerss.org/?key=b2e2b3e1483a4d2494f2b1440b85875c&hl=zh-cn&src=${textToSpeech}`);
		// console.log(response)
		const blob = await response.blob();
		return blob;

	} catch (error) {
		return error;
	}
}

export const handleTextToSpeech = async (textToSpeech) => {
	try {
		const blob = await getVoiceData(textToSpeech);
		console.log(blob);
		const url = URL.createObjectURL(blob);
		return url;
	} catch (error) {
		return error;
	}
}

export const getFullCookie = async () => {
	try {
		var cookie = await getOneCookie();
		cookie[0].audioUrl = await handleTextToSpeech(cookie[0].lesson.chinese);	
		return cookie;
	} catch (error) {
		return error;
	}
}



