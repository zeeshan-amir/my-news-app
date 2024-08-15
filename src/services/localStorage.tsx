class StorageService {
  private storageKey: string;

  constructor(key: string) {
    this.storageKey = key;
  }

  get<T>(): T | null {
    const data = localStorage.getItem(this.storageKey);
    return data ? JSON.parse(data) : null;
  }

  set<T>(value: T): void {
    localStorage.setItem(this.storageKey, JSON.stringify(value));
  }

  remove(): void {
    localStorage.removeItem(this.storageKey);
  }

  clearAll(): void {
    localStorage.clear();
  }
}

const preferencesStorageService = new StorageService('preferences');

export default preferencesStorageService;
