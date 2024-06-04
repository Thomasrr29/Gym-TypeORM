import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "src/module/user/entities/user.entity";
import { Group } from "src/module/groups/entities/group.entity";

@Entity()
export class Membership {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    startDate:Date

    @Column()
    endDate:Date

    @OneToMany(() => User, (users) => users.membership)
    @JoinColumn({name:'user_id'})
    users: User[]

    @OneToMany(() => Group, (group) => group.membership)
    @JoinColumn({name:'group_id'})
    groups: Group[]

}
