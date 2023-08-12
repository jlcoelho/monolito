import { type DataSource, type Repository } from 'typeorm'
import { ProductModel } from '../repository/product.model'
import ProductAdmFacadeFactory from '../factory/facade.factory'
import { TestHelper } from '@/modules/@shared/repositories/helpers/test.helper'

describe('ProductAdmFacade test', () => {
  let repository: Repository<ProductModel>

  let dataSource: DataSource

  beforeAll(async () => {
    dataSource = await TestHelper.instance.connect()
    repository = TestHelper.instance.getRepository(ProductModel)
  })

  afterAll(async () => {
    await TestHelper.instance.down()
  })

  it('should create product', async () => {
    const productFacade = ProductAdmFacadeFactory.create(dataSource)

    const input = {
      id: '1',
      name: 'Product 1',
      description: 'Product 1 description',
      purchasePrice: 10,
      stock: 10,
    }

    await productFacade.addProduct(input)

    const product = await repository.findOne({
      where: { id: input.id },
    })

    expect(product).toBeDefined()
    expect(product.id).toEqual(input.id)
    expect(product.name).toEqual(input.name)
    expect(product.description).toEqual(input.description)
    expect(product.purchasePrice).toEqual(input.purchasePrice)
    expect(product.stock).toEqual(input.stock)
  })

  it('should check product stock', async () => {
    const productFacade = ProductAdmFacadeFactory.create(dataSource)

    const input = {
      id: '1',
      name: 'Product 1',
      description: 'Product 1 description',
      purchasePrice: 10,
      stock: 10,
    }

    await productFacade.addProduct(input)

    const result = await productFacade.checkStock({ productId: '1' })

    expect(result.productId).toBe(input.id)
    expect(result.stock).toBe(input.stock)
  })
})
