export interface AddProductFacadeInputDto {
  id?: string
  name: string
  description: string
  purchasePrice: number
  stock: number
}

export interface CheckStockFacadeInputDto {
  productId: string
}

export interface CheckStockFacadeOutPutDto {
  productId: string
  stock: string
}

export default interface ProductAdmFacadeInterface {
  addProduct: (input: AddProductFacadeInputDto) => Promise<void>
  checkStock: (
    input: CheckStockFacadeInputDto,
  ) => Promise<CheckStockFacadeOutPutDto>
}
