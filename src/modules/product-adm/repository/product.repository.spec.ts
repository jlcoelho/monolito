import { type DataSource, type Repository } from 'typeorm'
import { ProductModel } from './product.model'
import Product from '../domain/product.entity'
import ProductRepository from './product.repository'
import Id from '@/modules/@shared/domain/value-object/id.value-object'
import { TestHelper } from '@/modules/@shared/repositories/helpers/test.helper'

describe('ProductRepository test', () => {
  let repository: Repository<ProductModel>

  let dataSource: DataSource

  beforeEach(async () => {
    dataSource = await TestHelper.instance.connect()
    repository = TestHelper.instance.getRepository(ProductModel)
  })

  afterEach(async () => {
    await TestHelper.instance.down()
  })

  it('should create a product', async () => {
    const productProps = {
      id: new Id('1'),
      name: 'Product 1',
      description: 'Product 1 description',
      purchasePrice: 100,
      stock: 10,
    }
    const product = new Product(productProps)
    const productRepository = new ProductRepository(dataSource)
    await productRepository.add(product)

    const productDb = await repository.findOne({
      where: { id: productProps.id.id },
    })

    expect(productProps.id.id).toEqual(productDb.id)
    expect(productProps.name).toEqual(productDb.name)
    expect(productProps.description).toEqual(productDb.description)
    expect(productProps.purchasePrice).toEqual(productDb.purchasePrice)
    expect(productProps.stock).toEqual(productDb.stock)
  })

  it('should find a product', async () => {
    const productRepository = new ProductRepository(dataSource)

    const productModel = repository.create({
      id: '1',
      name: 'Product 1',
      description: 'Product 1 description',
      purchasePrice: 100,
      stock: 10,
      createdAt: new Date(),
      updatedAt: new Date(),
    })

    await repository.insert(productModel)

    const product = await productRepository.find('1')

    expect(product.id.id).toEqual('1')
    expect(product.name).toEqual('Product 1')
    expect(product.description).toEqual('Product 1 description')
    expect(product.purchasePrice).toEqual(100)
    expect(product.stock).toEqual(10)
  })
})
