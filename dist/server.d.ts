import express from 'express';
import { Routes } from './src/interfaces/routes.interface';
declare class App {
    app: express.Application;
    env: string;
    port: string | number;
    constructor(routes: Routes[]);
    listen(): void;
}
export default App;
