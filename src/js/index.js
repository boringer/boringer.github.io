import '../css/index.css';

class Typer {
	constructor(words, element) {
		this.words = words;
		this.element = element;
		this.output = this.element
			? (words) => {
				this.element.innerHTML = words;
			}
			: console.log;
	}

	index = 0;

	type() {
		const char = this.words[this.index];

		if (!char) {
			if (this.element) {
				this.element.classList.add('waiting');
			}

			return;
		}

		this.output(this.words.slice(0, this.index + 1));
		this.index++;

		const delay = this.getDelay(char);
		setTimeout(this.type.bind(this), delay);
	}

	getDelay(char) {
		switch (char) {
			case ',':
				return 400;

			case '.':
				return 600;

			default:
				return 150;
		}
	}
}

setTimeout(() => {
	new Typer('Here\'s nothing, you idiot!', document.getElementById('words')).type();
}, 4000);