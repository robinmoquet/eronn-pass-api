import { BaseRepository } from '../../../common/repository/base.repository';
import { PersonalData } from '../entity/personal.data.entity';
import { EntityRepository } from 'typeorm';

@EntityRepository(PersonalData)
export class PersonalDataRepository extends BaseRepository<PersonalData> {}
