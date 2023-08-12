import { type ObjectType, type Repository } from 'typeorm'
import { PgConnection } from '../helpers/connection.helper'
import { type ConnectionHelper } from '../helpers/connection.helper.interface'

export abstract class PgRepository {
  constructor(
    private readonly connection: ConnectionHelper = PgConnection.getInstance(),
  ) {}

  getRepository<Entity>(entity: ObjectType<Entity>): Repository<Entity> {
    return this.connection.getRepository(entity)
  }
}
