import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm'

@Entity({ name: 'products' })
export class ProductModel {
  @PrimaryColumn()
  id: string

  @Column({ nullable: false })
  name: string

  @Column({ nullable: false })
  description: string

  @Column({ nullable: false })
  purchasePrice: number

  @Column({ nullable: false })
  stock: number

  @CreateDateColumn({ nullable: false })
  createdAt: Date

  @UpdateDateColumn({ nullable: false })
  updatedAt: Date
}
