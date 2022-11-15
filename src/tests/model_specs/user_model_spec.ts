/* eslint-disable no-undef */
import { userModel } from '../../models/user_model';
import { userRe, UserCRType } from '../../types/user_type';
const USER = new userModel();
const id: number = 4;

describe('USER Model', () => {
  it('should have a getAll  method', () => {
    expect(USER.getAll).toBeDefined();
  });

  it('should have a getById method', () => {
    expect(USER.getById).toBeDefined();
  });

  it('should have a create method', () => {
    expect(USER.create).toBeDefined();
  });

  it('should have a delete method', () => {
    expect(USER.delete).toBeDefined();
  });

  it('should create a USER with auth to true using create method', async () => {
    const result: UserCRType = await USER.create({
      firstname: 'Bassam',
      lastname: 'Allam',
      password: 'IhaveToGo3384#'
    });
    expect(result.auth).toEqual(true);
    expect(result.token).toBeDefined();
  });

  it('should return all USERs using getAll method', async () => {
    const result: userRe[] = await USER.getAll();
    expect(result).toHaveSize(1);
    expect(result[0].id).toEqual(id);
    expect(result[0].firstname).toEqual('Bassam');
    expect(result[0].lastname).toEqual('Allam');
    expect(result[0].password.length).toBeGreaterThanOrEqual(60);
    expect(result[0].password).not.toEqual('IhaveToGo3384#');
  });

  it('should return the correct USER using getById method', async () => {
    const result: userRe = await USER.getById(id);
    expect(result.id).toEqual(id);
    expect(result.firstname).toEqual('Bassam');
    expect(result.lastname).toEqual('Allam');
    expect(result.password.length).toBeGreaterThanOrEqual(60);
  });

  it('should delete the correct user using delete method', async () => {
    const result: userRe = await USER.delete(id);
    expect(result.id).toEqual(id);
    expect(result.firstname).toEqual('Bassam');
    expect(result.lastname).toEqual('Allam');
    expect(result.password.length).toBeGreaterThanOrEqual(60);
  });
});