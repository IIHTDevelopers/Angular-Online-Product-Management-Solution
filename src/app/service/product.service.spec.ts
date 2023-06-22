
import { HttpParams } from '@angular/common/http';
import { of } from 'rxjs';
import { ProductService } from './product.service';
describe('ProductService', () => {
  let service: ProductService;
  let httpClientSpy: any;
  beforeEach(() => {
    httpClientSpy = {
      get: jest.fn(),
      post: jest.fn(),
      put: jest.fn(),
      delete: jest.fn(),
    };
    service = new ProductService(httpClientSpy);
  });

  describe('business', () => {
    it('service should be created', () => {
      expect(service).toBeTruthy(); 
     });



    it('should get all products by calling getAllProducts() in service', () => {
      const res = 'some message';
      const url = 'http://127.0.0.1:8081/e-commerce/api/products';
      jest.spyOn(httpClientSpy, 'get').mockReturnValue(of(res)); 
      service.getAllProducts();
      expect(httpClientSpy.get).toHaveBeenCalledWith(url); 
    });

    it('should get a product calling getProductById() in service', () => {
      const res = 'some message';
      const url = 'http://127.0.0.1:8081/e-commerce/api/products/1';
      jest.spyOn(httpClientSpy, 'get').mockReturnValue(of(res)); 
      service.getProductById(1); 
      expect(httpClientSpy.get).toHaveBeenCalledWith(url);
    });

    it('should add the product calling addProduct() in service', () => {
      const data = {
        id: 1,
        name: 'Mobile',
        price: 7000,
        category: 'Electronics',
        stock: 5
      };
      const res = 'some message';
      const url = 'http://127.0.0.1:8081/e-commerce/api/products';
      jest.spyOn(httpClientSpy, 'post').mockReturnValue(of(res));
      service.addProduct(data);
      expect(httpClientSpy.post).toHaveBeenCalledWith(url, data);
    });
    

    it('should update the product calling updateProduct() in service', () => {
      const command1 = 1;
      const data = {
        id: 1,
        name: 'Mobile',
        price: 7000,
        category: 'Electronics',
        stock: 5
      };

      const res = 'some message';
      const url = 'http://127.0.0.1:8081/e-commerce/api/products/1';
      jest.spyOn(httpClientSpy, 'put').mockReturnValue(of(res));
      service.updateProduct(data);
      expect(httpClientSpy.put).toHaveBeenCalledWith(url, data);
    });

    it('should delete the product calling deleteProduct() in service', () => {
      const command = 1;
      const res = 'some message';
      const API_URL = 'http://127.0.0.1:8081/e-commerce/api/products/1';
      jest.spyOn(httpClientSpy, 'delete').mockReturnValue(of(res));
      service.deleteProduct(command);
      expect(httpClientSpy.delete).toHaveBeenCalledWith(API_URL);
    });

    it('should search the product with price by calling searchProducts() in service', () => {
      let params = new HttpParams();
      params = params.set('price', '100');
      const res = 'some message';
      const API_URL = 'http://127.0.0.1:8081/e-commerce/api/products/search';
      jest.spyOn(httpClientSpy, 'get').mockReturnValue(of(res));
      service.searchProducts('', 100, '');
      expect(httpClientSpy.get).toHaveBeenCalledWith(API_URL, { params });
    });

    it('should search the product with name by calling searchProducts() in service', () => {
      let params = new HttpParams();
      params = params.set('name', 'Mobile');
      const res = 'some message';
      const API_URL = 'http://127.0.0.1:8081/e-commerce/api/products/search';
      jest.spyOn(httpClientSpy, 'get').mockReturnValue(of(res));
      service.searchProducts('Mobile', 0, '');
      expect(httpClientSpy.get).toHaveBeenCalledWith(API_URL, { params });
    });

    it('should search the product with category by calling searchProducts() in service', () => {
      let params = new HttpParams();
      params = params.set('category', 'Electronics');
      const res = 'some message';
      const API_URL = 'http://127.0.0.1:8081/e-commerce/api/products';
      jest.spyOn(httpClientSpy, 'get').mockReturnValue(of(res));
      service.searchProducts('', 0, 'Electronics');
      expect(httpClientSpy.get).toHaveBeenCalledWith(API_URL + '/search', { params });
    });

  });
});




//Chat GPT test cases- also working


// describe('ProductService', () => {
//   let service: ProductService;
//   let httpMock: HttpTestingController;

//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       imports: [HttpClientTestingModule],
//       providers: [ProductService]
//     });

//     service = TestBed.inject(ProductService);
//     httpMock = TestBed.inject(HttpTestingController);
//   });

//   afterEach(() => {
//     httpMock.verify();
//   });

//   it('should retrieve all products', () => {
//     const mockProducts: Product[] = [
//       { id: 1, name: 'Product 1', price: 10.99, category: 'Electronics', stock: 10 },
//       { id: 2, name: 'Product 2', price: 19.99, category: 'Clothing', stock: 5 },
//       { id: 3, name: 'Product 3', price: 7.99, category: 'Furniture', stock: 3 }
//     ];

//     service.getAllProducts().subscribe(products => {
//       expect(products.length).toBe(3);
//       expect(products).toEqual(mockProducts);
//     });

//     const request = httpMock.expectOne('http://127.0.0.1:8081/e-commerce/api/products');
//     expect(request.request.method).toBe('GET');
//     request.flush(mockProducts);
//   });

//   //Not implemented in code

//   // it('should retrieve a product by ID', () => {
//   //   const mockProduct: Product = { id: 1, name: 'Product 1', price: 10.99, category: 'Electronics', stock: 10 };

//   //   service.getProductById(1).subscribe(product => {
//   //     expect(product).toEqual(mockProduct);
//   //   });

//   //   const request = httpMock.expectOne('/api/products/1');
//   //   expect(request.request.method).toBe('GET');
//   //   request.flush(mockProduct);
//   // });

//   it('should create a new product', () => {
//     const newProduct: Product = { id:1,name: 'New Product', price: 15.99, category: 'Electronics', stock: 5 };

//     service.addProduct(newProduct).subscribe(product => {
//       expect(product).toEqual(newProduct);
//     });

//     const request = httpMock.expectOne('http://127.0.0.1:8081/e-commerce/api/products');
//     expect(request.request.method).toBe('POST');
//     expect(request.request.body).toEqual(newProduct);
//     request.flush(newProduct);
//   });

//   it('should update an existing product', () => {
//     const updatedProduct: Product = { id: 1, name: 'Updated Product', price: 12.99, category: 'Electronics', stock: 8 };

//     service.updateProduct(updatedProduct).subscribe(product => {
//       expect(product).toEqual(updatedProduct);
//     });

//     const request = httpMock.expectOne('http://127.0.0.1:8081/e-commerce/api/products/1');
//     expect(request.request.method).toBe('PUT');
//     expect(request.request.body).toEqual(updatedProduct);
//     request.flush(updatedProduct);
//   });

//   it('should delete a product', () => {
//     const productId = 1;

//     service.deleteProduct(productId).subscribe(response => {
//       expect(response).toBeTruthy();
//     });

//     const request = httpMock.expectOne('http://127.0.0.1:8081/e-commerce/api/products/1');
//     expect(request.request.method).toBe('DELETE');
//     request.flush({});
//   });


//   it('should search products by price range', () => {
//     const mockProducts: Product[] = [
//       { id: 1, name: 'Product 1', price: 10.99, category: 'Electronics', stock: 10 },
//       { id: 2, name: 'Product 2', price: 19.99, category: 'Clothing', stock: 5 },
//       { id: 3, name: 'Product 3', price: 7.99, category: 'Furniture', stock: 3 }
//     ];
//     const searchPrice = 10.99;

//     service.searchProducts('', searchPrice, '').subscribe(products => {
//       expect(products.length).toBe(1);
//       expect(products[0].price).toEqual(searchPrice);
//     });

//     const request = httpMock.expectOne(`http://127.0.0.1:8081/e-commerce/api/products/search?price=${searchPrice}`);
//     expect(request.request.method).toBe('GET');
//     request.flush(mockProducts.filter(p => p.price === searchPrice));
//   });

//   //Not working

//   // it('should search products by name', () => {
//   //   const mockProducts: Product[] = [
//   //     { id: 1, name: 'Product 1', price: 10.99, category: 'Electronics', stock: 10 },
//   //     { id: 2, name: 'Product 2', price: 19.99, category: 'Clothing', stock: 5 },
//   //     { id: 3, name: 'Product 3', price: 7.99, category: 'Furniture', stock: 3 }
//   //   ];
//   //   const searchName = 'Product 1';

//   //   service.searchProducts(searchName,0,'').subscribe(products => {
//   //     expect(products.length).toBe(1);
//   //     expect(products[0].name).toEqual(searchName);
//   //   });

//   //   const request = httpMock.expectOne(`http://127.0.0.1:8081/e-commerce/api/products/search?name=${searchName}`);
//   //   expect(request.request.method).toBe('GET');
//   //   request.flush(mockProducts.filter(p => p.name === searchName));
//   // });

//   it('should search products by category', () => {
//     const mockProducts: Product[] = [
//       { id: 1, name: 'Product 1', price: 10.99, category: 'Electronics', stock: 10 },
//       { id: 2, name: 'Product 2', price: 19.99, category: 'Clothing', stock: 5 },
//       { id: 3, name: 'Product 3', price: 7.99, category: 'Furniture', stock: 3 }
//     ];
//     const category = 'Electronics';

//     service.searchProducts('',0,category).subscribe(products => {
//       expect(products.length).toBe(1);
//       expect(products[0].category).toEqual(category);
//     });

//     const request = httpMock.expectOne(`http://127.0.0.1:8081/e-commerce/api/products/search?category=${category}`);
//     expect(request.request.method).toBe('GET');
//     request.flush(mockProducts.filter(p => p.category === category));
//   });

// });

