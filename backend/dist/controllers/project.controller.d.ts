import { Request, Response } from "express";
export declare const addProject: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const getAllProjects: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const getSingleProject: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const editProject: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const removeProject: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
