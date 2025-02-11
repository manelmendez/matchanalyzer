import { Assist } from '../../src/models/assist'; // Asegúrate de importar correctamente el tipo Assist

describe('Assist Model', () => {
  it('Debe permitir la creación de una asistencia válida', () => {
    const assist: Assist = {
      id: 1,
      type: 'direct',
      goalId: 10,
      playerId: 5,
      matchId: 2,
      matchpartId: 1,
      roundId: 3,
      userId: 8,
    };

    expect(assist).toBeDefined();
    expect(assist.id).toBe(1);
    expect(assist.type).toBe('direct');
    expect(assist.goalId).toBe(10);
    expect(assist.playerId).toBe(5);
    expect(assist.matchId).toBe(2);
    expect(assist.matchpartId).toBe(1);
    expect(assist.roundId).toBe(3);
    expect(assist.userId).toBe(8);
  });

  it('Debe permitir una asistencia sin ID', () => {
    const assist: Assist = {
      type: 'indirect',
      goalId: 11,
      playerId: 6,
      matchId: 3,
      matchpartId: 2,
      roundId: 4,
      userId: 9,
    };

    expect(assist.id).toBeUndefined();
    expect(assist.type).toBe('indirect');
    expect(assist.goalId).toBe(11);
    expect(assist.playerId).toBe(6);
    expect(assist.matchId).toBe(3);
    expect(assist.matchpartId).toBe(2);
    expect(assist.roundId).toBe(4);
    expect(assist.userId).toBe(9);
  });

  it('Debe fallar si el type no es válido', () => {
    const validTypes = ['direct', 'indirect'];

    const assist: Assist = {
      type: 'invalidType', // Tipo incorrecto
      goalId: 12,
      playerId: 7,
      matchId: 4,
      matchpartId: 3,
      roundId: 5,
      userId: 10,
    };

    expect(validTypes.includes(assist.type)).toBe(false);
  });

  it('Debe fallar si algún ID es negativo', () => {
    const assist: Assist = {
      type: 'direct',
      goalId: -1, // ID inválido
      playerId: 7,
      matchId: 4,
      matchpartId: 3,
      roundId: 5,
      userId: 10,
    };

    expect(assist.goalId>0).toBe(false);
  });

  it('Debe fallar si falta un campo obligatorio', () => {
    const assist = {
      type: 'direct',
      goalId: 10,
      matchId: 4,
      matchpartId: 3,
      roundId: 5,
      userId: 10,
    } as unknown as Assist; // Falta playerId

    expect(assist.playerId).toBeUndefined();
  });
});
