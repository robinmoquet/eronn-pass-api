import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { PersonalData } from './personal.data.entity';

@Entity()
export class Address {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    city: string;

    @Column()
    zipCode: string;

    @Column()
    address: string;

    @Column()
    country: string;

    @ManyToOne(
        (type) => PersonalData,
        (personalData) => personalData.address
    )
    personalData: Promise<PersonalData>;
}
