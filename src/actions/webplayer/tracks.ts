import webPlayerApi from "../../api/webPlayerApi";
import { Tracks } from "../../entities/domain/tracks";
import { CreateTrack, Track, TrackResponse } from "../../interfaces/tracks.interface";
import { TrackMapper } from "../../mappers/tracks.mapper";


export const getTracks = async (): Promise<Tracks[]> => {
    try {
        const { data } = await webPlayerApi.get<TrackResponse>('/tracks');
        const tracks = data.data.map((track) => TrackMapper.trackMapper(track));
        return tracks;
    } catch (error) {
        console.log(error);
        throw new Error("Algo salió mal");

    }
}

export const createTrack = async (track: CreateTrack): Promise<Tracks> => {
    try {
        const { data } = await webPlayerApi.post<Track>('/tracks', track);
        const newTrack = TrackMapper.trackMapper(data);
        return newTrack;
    }
    catch (error) {
        console.log(error);
        throw new Error("Algo salió mal");
    }
}

export const updateTrack = async (track: Tracks) => {
    try {
        const res = await webPlayerApi.put(`/tracks/${track._id}`, {
            ...track,
            mediaId: track.audio._id,
        });
        return res.data;
    } catch (error) {
        console.log(error)
    }
}

export const deleteTrack = async (trackId: string) => {
    try{
        const res = await webPlayerApi.delete(`/tracks/${trackId}`);
        return res.data
    }catch(error){
        console.log(error)
    }
}

export const setFavoriteTrack = async (trackId: string) => {
    try {
        const { data } = await webPlayerApi.put(`/tracks/${trackId}/favorite`);
        return data;
    } catch (error) {
        console.log(error)
    }
}