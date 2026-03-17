export type SignUpPayload = {
    email: string;
    password: string;
};

export type SignInPayload = {
    email: string;
    password: string;
};

export type InsertUserPayload = {
    id: string;
    name: string;
    username: string;
    email: string;
    codeforcesHandle: string;
};

export type ServiceError = {
    message: string;
};