import webPlayerApi from "../../api/webPlayerApi";
import { Storage } from "../../entities/domain/storage";
import { StorageMapper } from "../../mappers/storage.mapper";


export const uploadFile = async (formData: FormData) : Promise<Storage> => {
    try{
        const {data} = await webPlayerApi.post('/storage', formData);
        const storage = StorageMapper.storageMapper(data.data);
        return storage
    }catch(error){
        console.error(error);
        throw new Error("Algo salió mal");
    }
}