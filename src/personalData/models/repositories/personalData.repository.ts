import { BaseRepository } from '../../../common/repository/base.repository';
import { PersonalData } from '../entity/personal.data.entity';
import { EntityRepository } from 'typeorm';
import { Address } from '../entity/address.entity';
import { AddressDto } from '../dto/address.dto';
import { DataManager } from '../../../utils/DataManager';

@EntityRepository(PersonalData)
export class PersonalDataRepository extends BaseRepository<PersonalData> {
    /**
     * Ajout une address à des données personnel d'un user
     *
     * @param  {AddressDto} addressDto
     * @param  {PersonalData} personalData
     * @returns Promise
     */
    async addAddress(addressDto: AddressDto, personalData: PersonalData): Promise<Address> {
        const address = await DataManager.handleDto<Address>(addressDto, new Address());

        const prevAddress = await personalData.address;
        personalData.address = Promise.resolve([...prevAddress, address]);

        this.flush(personalData);

        return address;
    }
}
