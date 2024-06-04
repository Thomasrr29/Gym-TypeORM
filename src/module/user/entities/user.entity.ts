import { Coach } from "src/module/coach/entities/coach.entity";
import { Group } from "src/module/groups/entities/group.entity";
import { Membership } from "src/module/membership/entities/membership.entity";
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { JoinTable } from "typeorm";

@Entity()
export class User {
    
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    cellphone: number

    @Column()
    email: string
    
    @ManyToOne(() => Membership, (membership) => membership.users)
    @JoinColumn({name:'membership_id'})
    membership: Membership

    @ManyToOne(() => Coach, (coach) => coach.Users)
    @JoinColumn({name: 'coach_id'})
    coaches: Coach

    @ManyToMany(() => Group, (group) => group.users)
    groups: Group[]
    
    @Column()
    role: string


}
