const getTimeDiff = (earlierDate: string, laterDate: number) => {
    if (new Date(earlierDate).toString() === 'Invalid Date') {
        return '-';
    }

    let ms = new Date(earlierDate).getTime() - laterDate;

    if (ms <= 0) {
        return '-';
    }

    const days = Math.floor(ms / 24 / 60 / 60 / 1000);
    ms -= days * 24 * 60 * 60 * 1000;

    const hours = Math.floor(ms / 60 / 60 / 1000);
    ms -= hours * 60 * 60 * 1000;

    const minutes = Math.floor(ms / 60 / 1000);
    ms -= minutes * 60 * 1000;

    const seconds = Math.floor(ms / 1000);

    const arr: string[] = [];
    arr.push(String(days));
    arr.push(String(hours).padStart(2, '0'));
    arr.push(String(minutes).padStart(2, '0'));
    arr.push(String(seconds).padStart(2, '0'));

    let started = false;
    const arrSanitized: string[] = arr.reduce((acc: string[], cur) => {
        if (started) {
            acc.push(cur);
        } else if (Number(cur)) {
            started = true;
            acc.push(cur);
        }

        return acc;
    }, []);

    return arrSanitized.join(':');
};

export default getTimeDiff;
