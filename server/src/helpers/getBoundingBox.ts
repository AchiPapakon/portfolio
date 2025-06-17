const getBoundingBox = (lat: number, lon: number, distanceMeters: number) => {
    const earthRadius = 6_378_137; // Earth's radius in meters (WGS84)

    // Latitude: 1 deg ≈ 111,320 meters
    const deltaLat = (distanceMeters / earthRadius) * (180 / Math.PI);

    // Longitude varies with latitude
    const deltaLon = (distanceMeters / (earthRadius * Math.cos((lat * Math.PI) / 180))) * (180 / Math.PI);

    const northLat = lat + deltaLat;
    const southLat = lat - deltaLat;
    const eastLon = lon + deltaLon;
    const westLon = lon - deltaLon;

    return {
        northLat,
        southLat,
        eastLon,
        westLon,
    };
};

export default getBoundingBox;
