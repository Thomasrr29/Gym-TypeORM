import { IsDate, IsString } from "class-validator";
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Membership } from "src/module/membership/entities/membership.entity";
import { User } from "src/module/user/entities/user.entity";
import { Coach } from "src/module/coach/entities/coach.entity";

@Entity()
export class Group {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    schedule: string

    @ManyToMany(() => User, (users) => users.groups)
    @JoinTable()
    users: User[]

    @OneToOne(() => Membership, (membership) => membership.groups, { nullable: false })
    @JoinColumn({name:'membership_id'})
    membership: Membership

    @ManyToOne(() => Coach, (coach) => coach.group)
    @JoinColumn({name: 'coach_id'})
    coach: Coach

}
