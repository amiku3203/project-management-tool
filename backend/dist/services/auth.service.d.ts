export declare const registerUser: (name: string, email: string, password: string) => Promise<{
    id: unknown;
    name: string;
    email: string;
}>;
export declare const loginUser: (email: string, password: string) => Promise<{
    user: import("mongoose").Document<unknown, {}, import("../models/auth.model").IUser, {}, {}> & import("../models/auth.model").IUser & Required<{
        _id: unknown;
    }> & {
        __v: number;
    };
    token: string;
}>;
