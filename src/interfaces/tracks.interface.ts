 export interface TrackResponse {
    data: Track[];
} 

export interface Track {
    _id:       string;
    url:       string;
    filename:  string;
    deleted:   boolean;
    createdAt: Date;
    updatedAt: Date;
}
