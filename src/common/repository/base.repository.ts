import { Repository, getCustomRepository, ObjectType } from 'typeorm';
import { BaseRepositoryInterface } from './base.repository.interface';

export class BaseRepository<E> extends Repository<E>
    implements BaseRepositoryInterface {
    public flush<E>(entity: E): void {
        this.save(entity);
    }

    public static getInstance<T>(instace: ObjectType<T>): T {
        return getCustomRepository(instace);
    }
}
