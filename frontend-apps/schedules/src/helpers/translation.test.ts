import { translate } from './translation';

it('returns the correct translation for a valid key', () => {
    expect(translate('iFeelLucky')).toBe('I feel lucky');
    expect(translate('noDepartures')).toBe('No departures');
});

it('returns "-" for an invalid key', () => {
    expect(translate('nonexistent')).toBe('-');
});

it('returns "-" for an empty string', () => {
    expect(translate('')).toBe('-');
});

it('returns "-" for undefined', () => {
    expect(translate(undefined as unknown as string)).toBe('-');
});
