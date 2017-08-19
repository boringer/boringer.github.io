import '../css/index.css';

class Typer {
	constructor(words, element) {
		this.words = words;
		this.element = element;
		this.output = this.element
			? (string) => {
				this.element.insertAdjacentText('beforeend', string);
			}
			: console.log;
	}

	type() {
		const char = this.words[this.index];

		if (!char) {
			return;
		}

		this.abortWaiting();
		this.output(char);
		this.index++;

		this.wait();

		const delay = this.getDelay(char);
		setTimeout(this.type.bind(this), delay);
	}

	getDelay(char) {
		switch (char) {
			case ',':
				return 500;

			default:
				return 150;
		}
	}

	wait() {
		this.waitingTimer = setTimeout(() => {
			this.element.classList.add(this.waitingClass);
		}, 200);
	}

	abortWaiting() {
		this.element.classList.remove(this.waitingClass);
		clearTimeout(this.waitingTimer);
		this.waitingTimer = null;
	}

	get waitingClass() {
		return 'waiting';
	}

	index = 0;
	waitingTimer = null;
}

setTimeout(() => {
	new Typer('Here\'s nothing, you idiot!', document.getElementById('words')).type();
}, Math.round(Math.random() * 2000) + 3000);