import { User } from './user';
import {FUser} from "../../mocks/fUser";

describe('User', () => {

  let user: User;

  beforeEach(() => {
    user = new User(FUser);
  });

  it('should create an instance', () => {
    expect(user).toBeTruthy();
  });

  it('should have correct name', () => {
    expect(user.name).toEqual('Jhon');
  });

  it('should have correct email', () => {
    expect(user.email).toEqual('example@email.com');
  });
});
