import {
  ConnectionNotFoundError,
  DataSource,
  type ObjectType,
  type Repository,
} from 'typeorm'
import { type ConnectionHelper } from './connection.helper.interface'

export class TestHelper implements ConnectionHelper {
  private static _instance: TestHelper

  private constructor() {}

  public static get instance(): TestHelper {
    if (!this._instance) this._instance = new TestHelper()

    return this._instance
  }

  private dataSource!: DataSource

  async connect(): Promise<DataSource> {
    this.dataSource = new DataSource({
      type: 'better-sqlite3',
      database: ':memory:',
      entities: ['src/modules/**/repository/*.model.ts'],
      logging: false,
      synchronize: true,
    })

    return await this.dataSource.initialize()
  }

  async down(): Promise<void> {
    await this.dataSource.destroy()
  }

  getRepository<Entity>(entity: ObjectType<Entity>): Repository<Entity> {
    if (this.dataSource === undefined)
      throw new ConnectionNotFoundError('No connection was found')

    return this.dataSource.getRepository(entity)
  }
}
