export const getNewTime = (hours: number, minutes: number, seconds: number) => {
    const newHours = Math.max(hours, 0);
    const newMinutes = Math.max(minutes, 0);
    const newSeconds = Math.max(seconds, 0);
    return `${String(newHours).padStart(2, '0')}:${String(newMinutes).padStart(2, '0')}:${String(newSeconds).padStart(2, '0')}`;
};
