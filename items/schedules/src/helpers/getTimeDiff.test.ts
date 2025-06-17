import getTimeDiff from './getTimeDiff';

const base = new Date('2024-01-01T00:00:00Z').getTime();

it('returns "00:00:00" for same time', () => {
    expect(getTimeDiff('2024-01-01T00:00:00Z', base)).toBe('-');
});

it('returns "0:00:01" for 1 second difference', () => {
    expect(getTimeDiff('2024-01-01T00:00:01Z', base)).toBe('01');
});

it('returns "0:01:00" for 1 minute difference', () => {
    expect(getTimeDiff('2024-01-01T00:01:00Z', base)).toBe('01:00');
});

it('returns "01:00:00" for 1 hour difference', () => {
    expect(getTimeDiff('2024-01-01T01:00:00Z', base)).toBe('01:00:00');
});

it('returns "1:00:00:00" for 1 day difference', () => {
    expect(getTimeDiff('2024-01-02T00:00:00Z', base)).toBe('1:00:00:00');
});

it('returns "2:03:04:05" for 2 days, 3 hours, 4 minutes, 5 seconds', () => {
    expect(getTimeDiff('2024-01-03T03:04:05Z', base)).toBe('2:03:04:05');
});

it('returns "-" if earlierDate is before laterDate', () => {
    expect(getTimeDiff('2023-12-31T23:59:59Z', base)).toBe('-');
});

it('returns "-" if earlierDate is invalid', () => {
    expect(getTimeDiff('invalid-date', base)).toBe('-');
});
