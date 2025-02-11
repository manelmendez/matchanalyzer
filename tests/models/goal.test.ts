import { Goal } from "../../src/models/goal";

describe("Goal Model", () => {
  let validGoal: Goal;

  beforeEach(() => {
    validGoal = {
      id: 1,
      minute: 30,
      type: "header",
      playerId: 7,
      matchId: 3,
      roundId: 2,
      userId: 5,
      matchpartId: 4,
    };
  });

  test("should create a valid goal", () => {
    expect(validGoal).toBeDefined();
    expect(validGoal.id).toBe(1);
    expect(validGoal.minute).toBe(30);
    expect(validGoal.type).toBe("header");
    expect(validGoal.playerId).toBe(7);
  });

  test("should require all mandatory fields", () => {
    expect(validGoal).toMatchObject({
      minute: expect.any(Number),
      type: expect.any(String),
      playerId: expect.any(Number),
      matchId: expect.any(Number),
      roundId: expect.any(Number),
      userId: expect.any(Number),
      matchpartId: expect.any(Number),
    });
  });

  test("should allow optional id field", () => {
    const goalWithoutId: Goal = { ...validGoal, id: undefined };
    expect(goalWithoutId.id).toBeUndefined();
  });

  test("should accept valid goal types", () => {
    const validTypes = ["header", "penalty", "free kick", "own goal"];
    expect(validTypes).toContain(validGoal.type);
  });
});
