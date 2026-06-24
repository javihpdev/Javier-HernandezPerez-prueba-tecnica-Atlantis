import { Paginator } from './paginator';

describe('Paginator', () => {
  let paginator: Paginator;

  beforeEach(() => {
    paginator = new Paginator();
  });

  it('should create an instance', () => {
    expect(new Paginator()).toBeTruthy();
  });

  it('should set and get pageNumber', () => {
    paginator.pageNumber = 5;
    expect(paginator.pageNumber).toEqual(5);
  });

  it('should set and get pageSize', () => {
    paginator.pageSize = 10;
    expect(paginator.pageSize).toEqual(10);
  });

  it('should set and get pageTotal', () => {
    paginator.pageTotal = 50;
    expect(paginator.pageTotal).toEqual(50);
  });

  it('should set and get orderField', () => {
    paginator.orderField = 'name';
    expect(paginator.orderField).toEqual('name');
  });

  it('should set and get orderType', () => {
    paginator.orderType = 'asc';
    expect(paginator.orderType).toEqual('asc');

    paginator.orderType = 'desc';
    expect(paginator.orderType).toEqual('desc')

  });
});
