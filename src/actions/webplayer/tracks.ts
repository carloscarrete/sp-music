import webPlayerApi from "../../api/webPlayerApi";
import { Tracks } from "../../entities/domain/tracks";
import { TrackResponse } from "../../interfaces/tracks.interface";
import { TrackMapper } from "../../mappers/tracks.mapper";


export const getTracks = async () : Promise<Tracks[]> => {
    try {
        const { data } = await webPlayerApi.get<TrackResponse>('/tracks');
        const tracks = data.data.map((track)=> TrackMapper.trackMapper(track));
        return tracks;
    } catch (error) {
        console.log(error);
        throw new Error("Algo salió mal");

    }
}