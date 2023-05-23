import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { ObjectType, Field, ID } from "type-graphql";

@ObjectType()
@Entity()
export class Country {
    @Field(() => ID)
    @PrimaryGeneratedColumn()
    id!: number;

    @Field()
    @Column({ type: 'varchar' })
    code!: string;

    @Field()
    @Column({ type: 'varchar' })
    name!: string;

    @Field()
    @Column({ type: 'varchar' })
    emoji!: string;

    @Field({ nullable: true })
    @Column({ type: 'varchar', nullable: true })
    codeContinent!: string;
}
