import {  StorageRes } from "../interfaces/storage.interface";
import { Storage } from '../entities/domain/storage';


export class StorageMapper {
    static storageMapper(data: StorageRes) : Storage {
        return {
            _id: data._id,
            url: data.url,
            filename: data.filename
        }
    }
}