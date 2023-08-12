import { PgRepository } from '@/modules/@shared/repositories/postgres/repository'
import Id from '../../@shared/domain/value-object/id.value-object'
import Product from '../domain/product.entity'
import type ProductGateway from '../gateway/product.gateway'
import { ProductModel } from './product.model'

export default class ProductRepository
  extends PgRepository
  implements ProductGateway
{
  private readonly repository = this.getRepository(ProductModel)

  async add(product: Product): Promise<void> {
    const productModel = this.repository.create({
      id: product.id.id,
      name: product.name,
      description: product.description,
      purchasePrice: product.purchasePrice,
      stock: product.stock,
      createdAt: new Date(),
      updatedAt: new Date(),
    })

    await this.repository.save(productModel)
  }

  async find(id: string): Promise<Product> {
    const product = await this.repository.findOne({
      where: { id },
    })

    if (!product) {
      throw new Error(`Product with id ${id} not found`)
    }

    return new Product({
      id: new Id(product.id),
      name: product.name,
      description: product.description,
      purchasePrice: product.purchasePrice,
      stock: product.stock,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt,
    })
  }
}
