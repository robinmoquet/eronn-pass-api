import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { PersonalData } from './personal.data.entity';
import { IsString, Length } from 'class-validator';

@Entity()
export class Address {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    @IsString()
    @Length(3, 40)
    city: string;

    @Column()
    @IsString()
    @Length(2, 10)
    zipCode: string;

    @Column()
    @IsString()
    @Length(3, 60)
    address: string;

    @Column()
    @IsString()
    @Length(3, 20)
    country: string;

    @ManyToOne(
        (type) => PersonalData,
        (personalData) => personalData.address
    )
    personalData: Promise<PersonalData>;
}
