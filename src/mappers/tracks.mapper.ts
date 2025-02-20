import { Tracks } from "../entities/domain/tracks";
import { Track } from "../interfaces/tracks.interface";

export class TrackMapper {
    static trackMapper(track: Track): Tracks{
        return {
            _id: track._id,
            name: track.name,
            album: track.album,
            cover: track.cover,
            artist: track.artist,
            duration: track.duration,
            audio: track.audio,
            favorite: track.favorite
        }
    }
}

