import dayjs from 'dayjs';
import { useRouteMatch } from 'react-router-dom';
import {User, AnonymousUser} from '../models/User';


const buildUserFromPlainObj = (obj) => {
  return new User(obj.email, obj.name, obj.token, obj.expiration);
}

export default class AuthService {
  isAuthenticated(user) {
    if(user instanceof User) {
      return (user.token !== null && dayjs().isBefore(dayjs(user.expiration)));
    }
    return false;
  }

  loadUser() {
    const savedUser = JSON.parse(localStorage.getItem('user'));
    return (savedUser) ? buildUserFromPlainObj(savedUser) : AnonymousUser;
  }

  signin(user) {
    localStorage.setItem('user', JSON.stringify(user));
    return buildUserFromPlainObj(user);
  }

  signout() {
      localStorage.removeItem('user');
      return AnonymousUser;
  }

  updateName(user, newName) {
    const newUser = {email: user.email, name: newName, token: user.token, expiration: user.expiration};
    return this.signin(newUser);
  }
}
