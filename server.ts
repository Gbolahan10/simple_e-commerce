import compression from 'compression';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import hpp from 'hpp';
import { NODE_ENV, PORT, DATABASE_URL, ORIGIN, CREDENTIALS } from './src/config/index';
import { Routes } from './src/interfaces/routes.interface';
import errorMiddleware from './src/middlewares/error.middleware';

class App {
  public app: express.Application;
  public env: string;

  constructor(routes: Routes[]) {
    this.app = express();
    this.env = NODE_ENV || 'development';

    this.initializeMiddlewares();
    this.initializeRoutes(routes);
    this.initializeErrorHandling();
  }

  // Mongoose connection setup (no need to listen on a port)
  public async connectToDatabase() {
    try {
      await mongoose.connect(DATABASE_URL);
      mongoose.Promise = global.Promise;
      console.log('🚀 Successfully connected to the database');
    } catch (error) {
      console.error('❌ Error connecting to the database:', error);
    }
  }

  public getServer() {
    return this.app;
  }

  private initializeMiddlewares() {
    this.app.use(cors({ origin: ORIGIN, credentials: CREDENTIALS }));
    this.app.use(hpp());
    this.app.use(helmet());
    this.app.use(compression());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cookieParser());
  }

  private initializeRoutes(routes: Routes[]) {
    routes.forEach(route => {
      this.app.use('/', route.router);
    });
  }

  private initializeErrorHandling() {
    this.app.use(errorMiddleware);
  }
}

export default App;
