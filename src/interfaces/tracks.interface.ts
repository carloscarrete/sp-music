export interface TrackResponse {
    data: Track[];
    user: User;
}

export interface Track {
    _id:       string;
    name:      string;
    album:     string;
    cover:     string;
    artist:    Artist;
    duration:  Duration;
    favorite: boolean;
    mediaId:   string;
    deleted:   boolean;
    createdAt: Date;
    updatedAt: Date;
    audio:     Audio;
}

export interface Artist {
    name:        string;
    nickname:    string;
    nationality: string;
}

export interface Audio {
    _id:       string;
    url:       string;
    filename:  string;
    deleted:   boolean;
    createdAt: Date;
    updatedAt: Date;
}

export interface Duration {
    start: number;
    end:   number;
}

export interface User {
    _id:       string;
    name:      string;
    email:     string;
    role:      string;
    deleted:   boolean;
    createdAt: Date;
    updatedAt: Date;
}
