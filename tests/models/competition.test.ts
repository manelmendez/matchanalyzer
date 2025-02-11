import { Competition } from "../../src/models/competition";

describe("Competition Model", () => {
  let validCompetition: Competition;

  beforeEach(() => {
    validCompetition = {
      id: 1,
      name: "Champions League",
      avatar: "https://example.com/avatar.png",
      discipline: "Football",
      signupDate: new Date("2023-08-01"),
      managerId: 10,
      season: 2024,
      userId: 5,
      category: "Professional",
      teams: [],
    };
  });

  test("should create a valid competition", () => {
    expect(validCompetition).toBeDefined();
    expect(validCompetition.id).toBe(1);
    expect(validCompetition.name).toBe("Champions League");
    expect(validCompetition.discipline).toBe("Football");
    expect(validCompetition.managerId).toBe(10);
  });

  test("should require all mandatory fields", () => {
    expect(validCompetition).toMatchObject({
      name: expect.any(String),
      discipline: expect.any(String),
      managerId: expect.any(Number),
      season: expect.any(Number),
      userId: expect.any(Number),
      category: expect.any(String),
    });
  });

  test("should allow optional fields to be undefined", () => {
    const competitionWithoutOptional: Competition = {
      name: "World Cup",
      discipline: "Football",
      managerId: 20,
      season: 2026,
      userId: 8,
      category: "International",
    };
    expect(competitionWithoutOptional.avatar).toBeUndefined();
    expect(competitionWithoutOptional.signupDate).toBeUndefined();
    expect(competitionWithoutOptional.teams).toBeUndefined();
  });

  test("should accept valid category types", () => {
    const validCategories = ["Professional", "Amateur", "Youth"];
    expect(validCategories).toContain(validCompetition.category);
  });
});
