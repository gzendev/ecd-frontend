export class Usuario {

  public userName!: string;
  public firstName!: string;
  public lastName!: string;
  public token!: string;
  public roles!: string[];
  public actions!: string;
  public language!: string;
  public email!: string;

  constructor(data?: any) {
    if (data) {
      this.userName = data.userName;
      this.firstName = data.firstName,
      this.lastName = data.lastName;
      this.token = data.token;
      this.roles = data.roles;
      this.actions = data.actions;
      this.language = data.language;
      this.email = data.email;
    }
  }
}
