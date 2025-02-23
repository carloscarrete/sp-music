export interface StorageResponse {
    data: StorageRes;
}

export interface StorageRes {
    url:       string;
    filename:  string;
    _id:       string;
    deleted:   boolean;
    createdAt: Date;
    updatedAt: Date;
}
