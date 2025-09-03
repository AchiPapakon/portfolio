import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../users/user.entity';

@Entity('apartments')
export class Apartment {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'userId' })
    user: User;

    @Column()
    userId: number;

    @Column({ length: 100 })
    city: string;

    @Column({ length: 100 })
    street: string;

    @Column({ nullable: true })
    floor: number;

    @Column({ type: 'float', nullable: true })
    surface: number;

    @Column({ length: 10, nullable: true })
    energyClass: string;

    @Column({ length: 100, nullable: true })
    owner: string;

    @Column({ length: 100, nullable: true })
    tenant: string;
}
