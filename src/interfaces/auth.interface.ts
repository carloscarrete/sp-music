export interface AuthResponse {
    data: Data;
}

export interface Data {
    token: string;
    user:  UserResponse;
}

export interface UserResponse {
    name:      string;
    email:     string;
    role:      string;
    _id:       string;
    deleted:   boolean;
    createdAt: Date;
    updatedAt: Date;
}
