import express from 'express';
import { Routes } from './src/interfaces/routes.interface';
declare class App {
    app: express.Application;
    env: string;
    constructor(routes: Routes[]);
    connectToDatabase(): Promise<void>;
    getServer(): express.Application;
    private initializeMiddlewares;
    private initializeRoutes;
    private initializeErrorHandling;
}
export default App;
