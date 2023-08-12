import type UseCaseInterface from '@/modules/@shared/usecase/use-case.interface'
import {
  type AddProductFacadeInputDto,
  type CheckStockFacadeInputDto,
  type CheckStockFacadeOutPutDto,
} from './product-adm.facade.interface'
import type ProductAdmFacadeInterface from './product-adm.facade.interface'

export interface UseCasesProps {
  addUseCase: UseCaseInterface
  stockUseCase: UseCaseInterface
}

export default class ProductAdmFacade implements ProductAdmFacadeInterface {
  private readonly _addUsecase: UseCaseInterface
  private readonly _checkStockUsecase: UseCaseInterface

  constructor(usecasesProps: UseCasesProps) {
    this._addUsecase = usecasesProps.addUseCase
    this._checkStockUsecase = usecasesProps.stockUseCase
  }

  async addProduct(input: AddProductFacadeInputDto): Promise<void> {
    return await this._addUsecase.execute(input)
  }

  async checkStock(
    input: CheckStockFacadeInputDto,
  ): Promise<CheckStockFacadeOutPutDto> {
    return await this._checkStockUsecase.execute(input)
  }
}
