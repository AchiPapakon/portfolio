import getBoundingBox from './getBoundingBox';

it('100m', () => {
    expect(getBoundingBox(40, 10, 100)).toEqual({
        northLat: 40.00089831528412,
        southLat: 39.99910168471588,
        eastLon: 10.001172667320008,
        westLon: 9.998827332679992,
    });
});
