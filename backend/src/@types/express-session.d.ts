import session from 'express-session';

declare module 'express-session' {
  interface SessionData {
    user: { id: number; username: string; email: string; image: string };
  }
}

declare module 'express' {
  interface Request {
    session: session.Session & Partial<session.SessionData>;
  }
}