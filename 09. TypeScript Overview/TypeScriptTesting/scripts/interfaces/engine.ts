interface Engine {
    running: boolean;
    volume: number;
    power: number;
    start(): void;
    stop(): void;
} 