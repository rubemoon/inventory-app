
export const sessionMiddleware = session({
  secret: "your_secret_key",
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }, 
});

export function getSession(req: any) {
  return req.session;
}

function session(arg0: { secret: string; resave: boolean; saveUninitialized: boolean; cookie: { secure: boolean; }; }) {
  throw new Error("Function not implemented.");
}
