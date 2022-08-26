declare namespace Express {
  export interface Request {
    session?: Session;
    sessionID?: string;
  }
}
