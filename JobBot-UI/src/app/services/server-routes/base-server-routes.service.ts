export abstract class BaseServerRoutesService {
  constructor() {
    // TODO: loads routes configuration from config file (to create config files)
  }

  public getBaseServerURL(): string {
    return 'http://localhost:8080';
  }
}
