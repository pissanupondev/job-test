import { AgePipe } from './age-pipe';

describe('AgePipe', () => {
  let pipe: AgePipe;

  beforeEach(() => {
    pipe = new AgePipe();
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return correct age when birthDate is string', () => {
    const currentYear = new Date().getFullYear();
    const birthDate = '2000-01-01';

    const result = pipe.transform(birthDate);

    expect(result).toBe(currentYear - 2000);
  });

  it('should return correct age when birthDate is Date object', () => {
    const currentYear = new Date().getFullYear();
    const birthDate = new Date(1995, 5, 10);

    const result = pipe.transform(birthDate);

    expect(result).toBe(currentYear - 1995);
  });

  it('should return 0 when birthDate is null', () => {
    const result = pipe.transform(null);
    expect(result).toBe(0);
  });

  it('should return 0 when birthDate is undefined', () => {
    const result = pipe.transform(undefined as any);
    expect(result).toBe(0);
  });

});