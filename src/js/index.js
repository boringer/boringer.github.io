import '../css/index.css';
import sentences from '../data/sentences.json';

const sentence = sentences[Math.floor(Math.random() * sentences.length)];
[
	'en',
	'zh',
].forEach((lang) => {
	document.getElementById(lang).innerHTML = sentence[lang];
});