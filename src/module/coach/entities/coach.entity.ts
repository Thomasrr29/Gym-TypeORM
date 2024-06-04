import { group } from "console";
import { Group } from "src/module/groups/entities/group.entity";
import { User } from "src/module/user/entities/user.entity";
import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Coach {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    email: string

    @OneToMany(() => User, (users) => users.coaches)
    @JoinColumn({name: 'user_id'})
    Users: User[]

    @OneToMany(() => Group, (group) => group.coach)
    @JoinColumn({name: 'group_id'})
    group: Group[]

}
