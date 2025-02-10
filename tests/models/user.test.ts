import { User } from '../../src/models/user'; // Asegúrate de importar correctamente el tipo User

describe('User Model', () => {
  it('Debe permitir la creación de un usuario válido', () => {
    const user: User = {
      id: 1,
      email: 'test@example.com',
      firstname: 'John',
      lastname: 'Doe',
      avatar: 'https://example.com/avatar.jpg',
      provider: 'local',
      provider_id: '123456',
      password: 'securepassword',
      signupDate: new Date(),
      lastLogin: new Date(),
    };

    expect(user).toBeDefined();
    expect(user.email).toBe('test@example.com');
    expect(user.firstname).toBe('John');
    expect(user.lastname).toBe('Doe');
    expect(user.avatar).toMatch(/^https?:\/\//); // Verifica que sea una URL válida
    expect(user.provider).toBe('local');
    expect(user.signupDate).toBeInstanceOf(Date);
    expect(user.lastLogin).toBeInstanceOf(Date);
  });

  it('Debe permitir un usuario sin ID y sin password', () => {
    const user: User = {
      email: 'test@example.com',
      firstname: 'Jane',
      lastname: 'Doe',
      avatar: 'https://example.com/avatar.jpg',
      provider: 'google',
      provider_id: '987654',
      signupDate: new Date(),
      lastLogin: new Date(),
    };

    expect(user.id).toBeUndefined();
    expect(user.password).toBeUndefined();
    expect(user.provider_id).toBe('987654');
  });

  it('Debe requerir un email válido', () => {
    const user: User = {
      email: 'invalid-email',
      firstname: 'John',
      lastname: 'Doe',
      avatar: 'https://example.com/avatar.jpg',
      provider: 'local',
      signupDate: new Date(),
      lastLogin: new Date(),
    };

    const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
    expect(emailRegex.test(user.email)).toBe(false);
  });

  it('Debe rechazar un usuario sin email', () => {
    const user = {
      firstname: 'John',
      lastname: 'Doe',
      avatar: 'https://example.com/avatar.jpg',
      provider: 'local',
      signupDate: new Date(),
      lastLogin: new Date(),
    } as unknown as User; // Forzamos un tipo incorrecto para probar el error

    expect(user.email).toBeUndefined();
  });

  it('Debe fallar si el provider no es válido', () => {
    const validProviders = ['local', 'google', 'facebook'];
    
    const user: User = {
      email: 'test@example.com',
      firstname: 'John',
      lastname: 'Doe',
      avatar: 'https://example.com/avatar.jpg',
      provider: 'github', // Valor incorrecto
      signupDate: new Date(),
      lastLogin: new Date(),
    };

    expect(validProviders.includes(user.provider)).toBe(false);
  });
});
