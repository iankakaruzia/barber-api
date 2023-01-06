import { Barber } from './barber.entity';

describe('Barber Entity', () => {
  it('should be able to create a barber', () => {
    const barber = new Barber({
      name: 'John Doe',
      pictureUrl: 'https://example.com',
      slots: ['09:00', '10:00', '11:00'],
      workingDays: ['monday', 'tuesday', 'wednesday'],
    });

    expect(barber).toBeInstanceOf(Barber);
    expect(barber.name).toBe('John Doe');
  });
});
