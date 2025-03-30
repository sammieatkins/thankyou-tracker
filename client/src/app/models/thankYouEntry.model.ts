export interface ThankYouEntry {
  _id?: string;
  giverName: string;
  preferredName?: string;
  giftDescription: string;
  giftNote?: string;
  dateReceived: string;
  progress: {
    written: boolean;
    addressed: boolean;
    stuffed: boolean;
    stamped: boolean;
    sent: boolean;
  };
}
