import 'core-js/fn/string/at';

class Typer {
    constructor(element: HTMLElement) {
        this.element = element;
    }

    async type(text: string) {
        // @ts-ignore
        const char = text.at(0);

        if (!char) {
            return;
        }

        this.abortWaiting();
        this.output(char);

        await this.wait(this.getDelay(char));
        this.type(text.slice(char.length));
    }

    private output(string: string) {
        this.element.insertAdjacentText('beforeend', string);
    }

    /**
     * Determine the delay (ms) according to the character just typed.
     */
    private getDelay(char: string) {
        switch (char) {
            case ',':
                return 500;

            case '!':
                return 1000;

            default:
                return 150;
        }
    }

    /**
     * Wait before typing the next character.
     */
    private wait(delay: number) {
        return new Promise((resolve) => {
            this.waitingTimer = setTimeout(() => {
                this.element.classList.add(Typer.WAITING_CLASS);
            }, 200);

            setTimeout(resolve, delay);
        });
    }

    private abortWaiting() {
        this.element.classList.remove(Typer.WAITING_CLASS);
        clearTimeout(this.waitingTimer);
        this.waitingTimer = null;
    }

    private element: HTMLElement;
    private waitingTimer: NodeJS.Timeout;

    private static WAITING_CLASS = 'waiting';
}

export default Typer;
