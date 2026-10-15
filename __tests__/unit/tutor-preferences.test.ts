import { inferTutorPreferences } from "@/lib/ai/tutor-preferences";

describe("tutor onboarding preference detection", () => {
  it("detects a stated CEFR level and travel topic", () => {
    expect(inferTutorPreferences("I want to practise travel and my level is A2")).toEqual({
      level: "A2",
      topic: "travel",
      levelDetected: true,
      topicDetected: true,
    });
  });

  it("detects Spanish topic and level phrases", () => {
    expect(inferTutorPreferences("Quiero practicar gramática y soy B1")).toEqual({
      level: "B1",
      topic: "grammar",
      levelDetected: true,
      topicDetected: true,
    });
  });

  it("supports spoken level names", () => {
    expect(inferTutorPreferences("I am an advanced learner and want to practice IELTS")).toMatchObject({
      level: "C1",
      topic: "exams",
      levelDetected: true,
      topicDetected: true,
    });
  });

  it("keeps safe fallbacks when the learner hasn't chosen yet", () => {
    expect(inferTutorPreferences("I am not sure yet", { level: "A2", topic: "travel" })).toEqual({
      level: "A2",
      topic: "travel",
      levelDetected: false,
      topicDetected: false,
    });
  });

  it("does not accept invalid fallback levels or topics", () => {
    expect(inferTutorPreferences("I am not sure", { level: "expert", topic: "not-a-topic" })).toEqual({
      level: "B1",
      topic: "general",
      levelDetected: false,
      topicDetected: false,
    });
  });
});
