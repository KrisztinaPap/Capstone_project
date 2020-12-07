export class User {
  _email;
  _name;
  _token;
  _expiration;

  constructor(email, name, token, expiration) {
    this._email = email;
    this._name = name;
    this._token = token;
    this._expiration = expiration;
  }

  /**
   * Get email for the user.
   */
  get email() { return this._email; }

  /**
   * Get name for the user.
   */
  get name() { return this._name; }

  /**
   * Get auth token which needs to be sent
   * on all connections.
   */
  get token() { return this._token; }

  /**
   * Gets the expiration time when
   * the user will need to re-login.
   */
  get expiration() { return this._expiration }
}

/**
 * Anonymous User details which are used in place of an actual signed in user.
 */
export const AnonymousUser = new User("", "User", "", new Date(1901, 1, 1));

export default User;
