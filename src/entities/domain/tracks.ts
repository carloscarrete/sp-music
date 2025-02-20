import { Artist, Audio, Duration } from "../../interfaces/tracks.interface";

export interface Tracks {
    _id: string;
    name: string;
    album: string
    cover: string;
    artist: Artist;
    duration: Duration;
    favorite: boolean;

    audio: Audio;
}