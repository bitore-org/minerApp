class Storage {
  private static instance: Storage;

  private constructor() {}

  public static getInstance(): Storage {
    if (!Storage.instance) {
      Storage.instance = new Storage();
    }

    return Storage.instance;
  }

  public get<T>(key: string): T | null {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  }

  public set<T>(key: string, data: T): T {
    localStorage.setItem(key, JSON.stringify(data));
    return data;
  }
}

export default Storage.getInstance();
