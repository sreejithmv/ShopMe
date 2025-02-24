import Product from '../models/product';
import User from '../models/user';

class UserServices {

  user: User = new User({});

  setUser(user: User) {
    this.user = user;
  }

  getLoggedInUser(): User {
    return this.user;
  }

  cartList: Product[] = [];

  addCart(user: Product) {
    this.cartList.push(user);
  }

  getCart() {
    return this.user;
  }

  async login(username: string, password: string) {
    return fetch('https://fakestoreapi.com/auth/login', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({username: username, password: password}),
    }).then(response => response.json());
  }
  async register(user: User) {
    return fetch('https://fakestoreapi.com/auth/register', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(user),
    }).then(response => response.json());
  }

  async updateUser(user: User) {
    console.log(user);
    return fetch(`https://fakestoreapi.com/users/${user.id}`, {
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(user),
    }).then(response => response.json()).catch(err => console.log(err));
  }

  async getUser(id: number) {
    return fetch(`https://fakestoreapi.com/users/${id}`).then(response =>
      response.json(),
    );
  }
}
export default new UserServices();
