class LocalStorageService {
  // Token-specific methods
  static setToken(token: string) {
    localStorage.setItem('token', token);
  }

  static getToken() {
    return localStorage.getItem('token');
  }

  static removeToken() {
    localStorage.removeItem('token');
  }

  // Generic methods for other data
  static setItem(key: string, value: string) {
    localStorage.setItem(key, value);
  }

  static getItem(key: string) {
    return localStorage.getItem(key);
  }

  static removeItem(key: string) {
    localStorage.removeItem(key);
  }

  // Clear all stored data (if needed)
  static clear() {
    localStorage.clear();
  }
}

export default LocalStorageService;
