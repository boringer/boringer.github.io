import '../css/index.css';
import sentences from '../data/sentences.json';

const sentence = sentences[Math.floor(Math.random() * sentences.length)];
document.getElementById('sentence').innerHTML = sentence;
