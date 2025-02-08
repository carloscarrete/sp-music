import webPlayerApi from "../../api/webPlayerApi";
import { TrackResponse } from "../../interfaces/tracks.interface";
import { TrackMapper } from "../../mappers/tracks.mapper";


export const getTracks = async () => {
    try {
        const { data } = await webPlayerApi.get<TrackResponse>('/storage');
        //console.log(data.data)
        const tracks = data.data.map((track)=> TrackMapper.trackMapper(track));
        console.log(tracks)
        //console.log(tracks);
    } catch (error) {
        console.log(error);
        throw new Error("Algo salió mal");

    }
}