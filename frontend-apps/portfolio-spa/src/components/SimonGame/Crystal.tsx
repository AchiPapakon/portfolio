import { useContext, useEffect, useState } from 'react';
import { Box } from '@mui/material';
import type { CrystalColor } from './types';
import { Game, GameContext } from './controller';
import blueSound from './sounds/blue.mp3';
import redSound from './sounds/red.mp3';
import greenSound from './sounds/green.mp3';
import yellowSound from './sounds/yellow.mp3';

interface CrystalProps {
    color: CrystalColor;
    game: Game;
}

const Crystal = ({ color, game }: CrystalProps) => {
    // Create a const named hexColor that automatically maps the color prop to its corresponding hex value
    const innerShadowColor = {
        blue: '#8080FF',
        red: '#FF9999',
        green: '#00E600',
        yellow: '#8080FF',
    }[color];

    const [isSounding, setIsSounding] = useState(false);
    const { isOngoing } = useContext(GameContext);

    useEffect(() => {
        if (game.shouldPlayColor === color) {
            const audio = new Audio(
                {
                    blue: blueSound,
                    red: redSound,
                    green: greenSound,
                    yellow: yellowSound,
                }[color]
            );
            audio.play();
            audio.addEventListener('play', () => {
                setIsSounding(true);
            });
            audio.addEventListener('ended', () => {
                setIsSounding(false);
                game.setShouldPlayColor(null);
            });
        }
    }, [color, game]);

    return (
        <Box
            sx={{
                backgroundColor: color,
                border: '2px solid black',
                height: 200,
                width: 50,
                ...(isSounding && { boxShadow: `0 0 15px ${color}` }),
                ...(isOngoing &&
                    !isSounding && {
                        ':hover': {
                            boxShadow: `inset 0 0 15px ${innerShadowColor}`, // put a lighter tone of the "color" prop. For example, if "blue" then #8080FF
                        },
                    }),
            }}
            onClick={() => {
                if (game.isPlaying) {
                    game.handlePlayerInput(color);
                }
            }}
        />
    );
};

export default Crystal;
