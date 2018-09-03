import 'core-js/fn/string/at';

class Typer {
    constructor(element) {
        this.element = element;
    }

    type(text) {
        const char = text.at(0);

        if (!char) {
            return;
        }

        this.abortWaiting();
        this.output(char);

        this.wait();

        const delay = this.getDelay(char);
        setTimeout(() => {
            this.type(text.slice(char.length));
        }, delay);
    }

    output(string) {
        this.element.insertAdjacentText('beforeend', string);
    }

    getDelay(char) {
        switch (char) {
            case ',':
                return 500;

            case '!':
                return 1000;

            default:
                return 150;
        }
    }

    wait() {
        this.waitingTimer = setTimeout(() => {
            this.element.classList.add(this.constructor.WAITING_CLASS);
        }, 200);
    }

    abortWaiting() {
        this.element.classList.remove(this.constructor.WAITING_CLASS);
        clearTimeout(this.waitingTimer);
        this.waitingTimer = null;
    }

    element;
    waitingTimer = null;

    static WAITING_CLASS = 'waiting';
}

export default Typer;
