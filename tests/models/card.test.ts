import { Card } from "../../src/models/card";

describe("Card Model", () => {
  let validCard: Card;

  beforeEach(() => {
    validCard = {
      id: 1,
      minute: 45,
      type: "yellow",
      goalId: 10,
      playerId: 5,
      matchId: 2,
      roundId: 3,
      userId: 4,
      matchpartId: 6,
    };
  });

  test("should create a valid card", () => {
    expect(validCard).toBeDefined();
    expect(validCard.id).toBe(1);
    expect(validCard.minute).toBe(45);
    expect(validCard.type).toBe("yellow");
  });

  test("should require all mandatory fields", () => {
    expect(validCard).toMatchObject({
      minute: expect.any(Number),
      type: expect.any(String),
      goalId: expect.any(Number),
      playerId: expect.any(Number),
      matchId: expect.any(Number),
      roundId: expect.any(Number),
      userId: expect.any(Number),
      matchpartId: expect.any(Number),
    });
  });

  test("should allow optional id field", () => {
    const cardWithoutId: Card = { ...validCard, id: undefined };
    expect(cardWithoutId.id).toBeUndefined();
  });

  test("should accept valid card types", () => {
    const validTypes = ["yellow", "red"];
    expect(validTypes).toContain(validCard.type);
  });
});
