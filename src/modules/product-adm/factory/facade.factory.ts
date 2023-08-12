/* eslint-disable @typescript-eslint/no-extraneous-class */
import { type ConnectionHelper } from '@/modules/@shared/repositories/helpers/connection.helper.interface'
import ProductAdmFacade from '../facade/product-adm.facade'
import ProductRepository from '../repository/product.repository'
import AddProductUseCase from '../usecase/add-product/add-product.usecase'
import CheckStockUseCase from '../usecase/check-stock/check-stock.usecase'

export default class ProductAdmFacadeFactory {
  static create(connection?: ConnectionHelper): ProductAdmFacade {
    const productRepository = new ProductRepository(connection)
    const addProductUseCase = new AddProductUseCase(productRepository)
    const checkStockUseCase = new CheckStockUseCase(productRepository)
    const productFacade = new ProductAdmFacade({
      addUseCase: addProductUseCase,
      stockUseCase: checkStockUseCase,
    })

    return productFacade
  }
}
