export type Message = {
    timestamp?: number;
    msg: string;
    username?: string;
    type?: string;
    colour?: string;
};

export type TimerMessage = {
    startTime: number;
    msg: string;
    duration: number;
};

export type HighestBidderMessage = {
    username: string;
    profilePic: string;
    bid: number;
};

export type ServerToClientEvents = {
    message: (message: Message) => void;
    startTimer: (message: TimerMessage) => void;
    biddingUpdate: (message: HighestBidderMessage) => void;
};

export type ClientToServerEvents = {
    message: (message: string) => void;
};
