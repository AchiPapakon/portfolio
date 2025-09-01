import { createContext } from 'react';
import { CrystalColor } from './types';
import GameOverSound from './sounds/error.mp3';

interface GameContextType {
    isOngoing: boolean;
}

export const GameContext = createContext<GameContextType>({
    isOngoing: false,
});

export class Game {
    public update: () => void;

    private timerNPCBeep: ReturnType<typeof setTimeout> | null = null;

    private timerPlayerInput: ReturnType<typeof setTimeout> | null = null;

    private playerFailed: boolean = false;

    public series: CrystalColor[] = [];

    private currentIndex: number = 0;

    private isStrict: boolean = false;

    public isPlaying: boolean = false;

    public shouldPlayColor: CrystalColor | null = null;

    constructor(update: (newGame: Game) => void) {
        this.update = () => update({ ...this });
    }

    addRandomColor = () => {
        const randomColor = Object.values(CrystalColor)[Math.floor(Math.random() * 4)];
        this.series = [...this.series, randomColor];

        return randomColor;
    };

    start = () => {
        this.isStrict = false;
        this.stop();
        this.next();
    };

    startStrict = () => {
        this.isStrict = true;
        this.stop();
        this.next();
    };

    stop = () => {
        this.isPlaying = false;
        this.series = [];

        if (this.timerNPCBeep) {
            clearTimeout(this.timerNPCBeep);
        }
        if (this.timerPlayerInput) {
            clearTimeout(this.timerPlayerInput);
        }

        this.update();
    };

    incorrect = () => {
        const sound = new Audio(GameOverSound);
        sound.play();
        this.playerFailed = true;
        this.isPlaying = false;

        if (this.isStrict) {
            this.series = [];
            this.next();
        } else {
            this.next(0);
        }
    };

    handlePlayerInput = (color: CrystalColor) => {
        const isCorrect = color === this.series[this.currentIndex];
        if (isCorrect) {
            if (this.timerPlayerInput) {
                clearTimeout(this.timerPlayerInput);
            }
            this.shouldPlayColor = color;

            if (this.currentIndex === this.series.length - 1) {
                // Reached the end of the sequence
                this.isPlaying = false;
                this.next();
            } else {
                this.currentIndex += 1;

                this.timerPlayerInput = setTimeout(() => {
                    this.incorrect();
                }, 5_000);
            }
        } else {
            this.incorrect();
        }
        this.update();
    };

    next = (index?: number) => {
        const timeoutSeconds = this.playerFailed ? 2_000 : 1_000;
        this.playerFailed = false;

        if (index === undefined) {
            this.addRandomColor();
            this.next(0);
        } else {
            this.timerNPCBeep = setTimeout(() => {
                const isLast: boolean = index === this.series.length - 1;
                const currentColor = this.series[index] ?? this.addRandomColor();
                this.shouldPlayColor = currentColor;

                if (isLast) {
                    this.isPlaying = true;
                    this.currentIndex = 0;

                    this.timerPlayerInput = setTimeout(() => {
                        this.incorrect();
                    }, 5_000);
                } else {
                    this.next(index + 1);
                }

                this.update();
            }, timeoutSeconds);
        }
    };

    setShouldPlayColor = (color: CrystalColor | null) => {
        this.shouldPlayColor = color;
        this.update();
    };
}
