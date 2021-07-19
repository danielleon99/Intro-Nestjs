import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('users')
export class UserEntity {

    @PrimaryGeneratedColumn("increment")
    id: number;

    @Column({ type: 'varchar', length: 50 })
    firstName: string;

    @Column({ type: 'varchar', length: 50 })
    lastName: string;

    @Column({ type: 'varchar', unique: true, length: 150, nullable: false })
    userName: string;

    @Column({ type: 'varchar', length: 200, nullable: false})
    password: string;

    @Column({ type: 'bool', default: true })
    isActive: boolean;

}