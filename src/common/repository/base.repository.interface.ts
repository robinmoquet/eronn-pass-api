import { ObjectType } from 'typeorm';

export interface BaseRepositoryInterface {
    flush<E>(e: E): void;
}
