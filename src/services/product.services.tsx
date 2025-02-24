class ProductService {
  async getProductCategory() {
    return fetch('https://fakestoreapi.com/products/categories').then(
      response => response.json(),
    );
  }

  async getProductsByCategory(category: String) {
    return fetch(`https://fakestoreapi.com/products/category/${category}`).then(
      response => response.json(),
    );
  }

  async getProductById(id: number) {
    return fetch(`https://fakestoreapi.com/products/${id}`).then(response =>
      response.json(),
    );
  }

  async getAllProducts() {
    return fetch('https://fakestoreapi.com/products').then(response =>
      response.json(),
    );
  }
}

export default new ProductService();
