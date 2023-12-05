import { Response, NextFunction } from 'express';
import { RequestWithUser } from '../src/interfaces/auth.interface';
import ProductsController from '../src/controllers/products.controller';
import { HttpException } from '../src/exceptions/HttpException';

jest.mock('../src/services/database.service'); 

describe('ProductsController', () => {
  let productsController: ProductsController;
  let req: RequestWithUser;
  let res: Response;
  let next: NextFunction;
  let createMock, findMock, findAllMock, deleteMock, updateMock;

  productsController = new ProductsController();
  res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as unknown as Response;
  next = jest.fn() as unknown as NextFunction;

  beforeEach(() => {
    createMock = jest.spyOn(productsController.productService, 'create');
    jest.clearAllMocks();
  });

  it('should create a product', async () => {
    const req = { body: { name: 'Test Product', description: 'Test Description', price: 10, currency: 'USD' }, user: { _id: 'user_id' } } as unknown as RequestWithUser;
    createMock.mockResolvedValueOnce({ status: true, result: { _id: 'product_id', name: 'Test Product' } });

    await productsController.createProduct(req, res, next);

    expect(createMock).toHaveBeenCalledWith({
      name: 'Test Product',
      description: 'Test Description',
      price: 10,
      currency: 'USD',
      store_id: 'user_id',
    });
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({ data: { _id: 'product_id', name: 'Test Product' }, message: 'success' });
  });

  it('should handle failed product creation', async () => {
    const req = { body: { wrongnamefield: 'Test Product', description: 'Test Description', price: 'wrongPriceType', currency: 'USD' }, user: { _id: 'user_id' } } as unknown as RequestWithUser;
    createMock.mockResolvedValueOnce({ status: false, error: 'db error' });

    await productsController.createProduct(req, res, next);

    expect(createMock).toHaveBeenCalledWith({
      "name": undefined,
      description: 'Test Description',
      price: 'wrongPriceType',
      currency: 'USD',
      store_id: 'user_id',
    });
    expect(next).toHaveBeenCalledWith(new HttpException(500, 'Error uploading product - db error'));

  })

  beforeEach(() => {
    req = {
      user: { _id: 'userId' },
      query: { page: '1', limit: '2' },
    } as unknown as RequestWithUser;

    findAllMock = jest.spyOn(productsController.productService, 'findAll');
    jest.clearAllMocks();
  });

  it('should find all products successfully', async () => {
    const expectedResult = { status: true, result: ['product1', 'product2'] };
    findAllMock.mockResolvedValueOnce(expectedResult);

    await productsController.findAllProducts(req, res, next);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ data: expectedResult.result, message: 'success' });
    expect(next).not.toHaveBeenCalled();
  });

  it('should handle error when finding all products', async () => {
    findAllMock.mockResolvedValueOnce({ status: false, result: [] });

    await productsController.findAllProducts(req, res, next);

    expect(next).toHaveBeenCalledWith(new HttpException(404, 'Products not found'));
    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
  });

  beforeEach(() => {
    req = {
      params: { product_id: 'exampleProductId' },
      user: { _id: 'user_id' },
    } as unknown as RequestWithUser;

    findMock = jest.spyOn(productsController.productService, 'find');
    jest.clearAllMocks();
  });

  it('should find a product by ID and send it in the response', async () => {
    const mockProduct = { _id: 'exampleProductId', name: 'Test Product' };

    findMock.mockResolvedValueOnce({ status: true, result: { _id: 'exampleProductId', name: 'Test Product' } });

    await productsController.findProduct(req, res, next);

    expect(findMock).toHaveBeenCalledWith({
      _id: 'exampleProductId',
      store_id: 'user_id',
    });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ data: mockProduct, message: 'success' });
    expect(next).not.toHaveBeenCalled();
  });

  it('should handle a case where the product is not found and call next with a 404 error', async () => {
    findMock.mockResolvedValueOnce({ status: false, result: {}});

    await productsController.findProduct(req, res, next);

    expect(findMock).toHaveBeenCalledWith({
      _id: 'exampleProductId',
      store_id: 'user_id',
    });
    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
    expect(next).toHaveBeenCalledWith(new HttpException(404, 'Product not found'));
  });

  beforeEach(() => {
    req = {
      user: { _id: 'user_id' },
      params: { product_id: 'exampleProductId' },
    } as unknown as RequestWithUser;

    deleteMock = jest.spyOn(productsController.productService, 'delete');
    jest.clearAllMocks();
  });

  it('should remove a product successfully', async () => {
    const expectedResult = { status: true };
    deleteMock.mockResolvedValueOnce(expectedResult);

    await productsController.removeProduct(req, res, next);

    expect(deleteMock).toHaveBeenCalledWith({
      _id: 'exampleProductId',
      store_id: 'user_id',
    });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ message: 'Product removed successfully' });
    expect(next).not.toHaveBeenCalled();
  });

  it('should handle error when removing a product', async () => {
    const expectedError = 'Database error';
    deleteMock.mockResolvedValueOnce({ status: false, error: expectedError });

    await productsController.removeProduct(req, res, next);

    expect(deleteMock).toHaveBeenCalledWith({
      _id: 'exampleProductId',
      store_id: 'user_id',
    });
    expect(next).toHaveBeenCalledWith(new HttpException(504, expectedError));
    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
  });

  beforeEach(() => {
    req = {
      user: { _id: 'user_id' },
      params: { product_id: 'exampleProductId' },
      body: { name: 'Updated Product', description: 'Updated Description' },
    } as unknown as RequestWithUser;
    updateMock = jest.spyOn(productsController.productService, 'update');
    jest.clearAllMocks();
  });

  it('should edit a product successfully', async () => {
    const expectedResult = { status: true };
    updateMock.mockResolvedValueOnce(expectedResult);

    await productsController.editProduct(req, res, next);

    expect(updateMock).toHaveBeenCalledWith({
      _id: 'exampleProductId',
      store_id: 'user_id',
    }, { name: 'Updated Product', description: 'Updated Description' });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ message: 'Product updated successfully' });
    expect(next).not.toHaveBeenCalled();
  });

  it('should handle error when editing a product', async () => {
    const expectedError = 'Database error';
    updateMock.mockResolvedValueOnce({ status: false, error: expectedError });

    await productsController.editProduct(req, res, next);

    expect(updateMock).toHaveBeenCalledWith({
      _id: 'exampleProductId',
      store_id: 'user_id',
    }, { name: 'Updated Product', description: 'Updated Description' });
    expect(next).toHaveBeenCalledWith(new HttpException(500, expectedError));
    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
  });
});
