import { Tracks } from "../entities/domain/tracks";
import { Track } from "../interfaces/tracks.interface";

export class TrackMapper {
    static trackMapper(track: Track): Tracks{
        return {
            _id: track._id,
            filename: track.filename,
            url: track.url
        }
    }
}