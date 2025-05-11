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

export type WinnerBidData = {
  amount: number;
  timestamp: number;
  userData: {
    username: string;
    profilePic: string;
  } | null;
};

export type ServerToClientEvents = {
  message: (message: Message) => void;
  startTimer: (message: TimerMessage) => void;
  timerComplete: (data: { msg: string; finalBidData: WinnerBidData }) => void;
  biddingUpdate: (message: HighestBidderMessage) => void;
};

export type ClientToServerEvents = {
  message: (message: string) => void;
  startTimer: (data: { msg: string; duration: number }) => void;
  placeBid: (data: { amount: number }) => void;
};

export type User = {
  _id?: string;
  username: string;
  registration_date: number;
  isSeller: boolean;
  wallet: number;
  profilePic: string;
} & MSUserData;

export type MSUserData = {
  '@odata.context': string;
  businessPhones: string[];
  displayName: string;
  givenName: string;
  id: string;
  jobTitle: string;
  mail: string;
  mobilePhone: string | null;
  officeLocation: string | null;
  preferredLanguage: string;
  surname: string;
  userPrincipalName: string;
};
