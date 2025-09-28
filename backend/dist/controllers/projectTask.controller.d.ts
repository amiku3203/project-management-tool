import { Request, Response } from "express";
export declare const addTaskToProject: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const getProjectTasks: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const getProjectTask: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const updateProjectTask: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const deleteProjectTask: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
