interface Direction {
    name: string;
    id: number;
}

interface Stop {
    accessible: boolean;
    code: string;
    id: number;
    isCancelled: boolean;
    isDisrupted: boolean;
    latitude: number;
    localityName: string;
    logicalId: number;
    longitude: number;
    name: string;
}

interface Destination {
    id: number;
    name: string;
}

interface Time {
    accessible: boolean;
    codeNotes: any;
    dateTime: string;
    destination: Destination;
    isCAnceled: boolean;
    isDisrupted: boolean;
    isTimeout: boolean;
    realDateTime: string;
    restriction: string;
    timeDifference: number;
}

interface LineLine {
    color: string;
    id: number;
    isDisrupted: boolean;
    name: string;
    network: string;
    number: string;
    transportMode: string;
}

interface Line {
    direction: Direction;
    distance: any;
    line: LineLine;
    stop: Stop;
    times: Array<Time>;
}

interface Departure {
    lines: Array<Line>;
    order: number;
    transportMode: string;
}

export type NextDeparture = Array<Departure>;
