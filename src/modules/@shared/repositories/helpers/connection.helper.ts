import {
  type Repository,
  type DataSource,
  type QueryRunner,
  type ObjectType,
  ConnectionNotFoundError,
} from 'typeorm'
import AppDataSource from '../config/ormconfig'
import { type ConnectionHelper } from './connection.helper.interface'

export class PgConnection implements ConnectionHelper {
  private static instance?: PgConnection
  private readonly query?: QueryRunner
  private dataSource?: DataSource

  private constructor() {}

  static getInstance(): PgConnection {
    if (PgConnection.instance === undefined)
      PgConnection.instance = new PgConnection()
    return PgConnection.instance
  }

  async connect(): Promise<DataSource> {
    this.dataSource = await AppDataSource.initialize()
    return this.dataSource
  }

  getRepository<Entity>(entity: ObjectType<Entity>): Repository<Entity> {
    if (this.dataSource === undefined)
      throw new ConnectionNotFoundError('No connection was found')
    if (this.query !== undefined)
      return this.query.manager.getRepository(entity)
    return this.dataSource.getRepository(entity)
  }
}
