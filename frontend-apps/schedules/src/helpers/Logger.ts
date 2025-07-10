/* eslint-disable no-console */
class Logger {
    private isDebugMode: boolean = import.meta.env.DEV;

    log(message: string, color?: string) {
        if (!this.isDebugMode) {
            return null;
        }

        if (color) {
            console.log(`%c${message}`, `color: ${color}`);
        } else {
            console.log(message);
        }

        return null;
    }

    info(message: string) {
        this.log(message, 'cyan');
    }

    debug(message: string) {
        this.log(message, 'orange');
    }

    error(message: string) {
        this.log(message, 'red');
    }
}

const logger = new Logger();

export default logger;
