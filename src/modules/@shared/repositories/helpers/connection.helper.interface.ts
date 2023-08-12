import { type DataSource, type ObjectType, type Repository } from 'typeorm'

export interface ConnectionHelper {
  connect: () => Promise<DataSource>
  getRepository: <Entity>(entity: ObjectType<Entity>) => Repository<Entity>
}
