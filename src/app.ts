import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import config from './app/config';
import router from './app/router';
import globalErrorHandler from './app/middleware/GlobalError';
import notFound from './app/middleware/notFound';

const app: Application = express();

//! parsers
app.use(express.json());
app.use(cors(
  {
    origin: [
      "https://65b892b3e0090ea16a9ece6d--silly-sundae-0a228d.netlify.app"
    ],
    credentials: true
  }));

app.get("/", (req: Request, res: Response) => {
  res.send(`Eye Server Running on port ${config.port}`);
});

//! Entry Point Api
app.use("/api", router);

//! global error handler middleware
app.use(globalErrorHandler);
app.use(notFound);

export default app;
