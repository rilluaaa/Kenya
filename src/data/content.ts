import type { PerspectiveId, PlanItem, StoryChoice } from "../types";

export const storyStages = [
  { id: "opening", label: "Begin" },
  { id: "readiness", label: "Prepare together" },
  { id: "assumptions", label: "Check assumptions" },
  { id: "story", label: "Listen together" },
  { id: "first-decision", label: "Choose a response" },
  { id: "transport", label: "Make a backup" },
  { id: "outcome", label: "See the outcome" },
  { id: "plan", label: "Our plan" },
  { id: "closing", label: "Finish" },
];

export const assumptions = [
  {
    id: "transport",
    topic: "Transport",
    statement: "We can arrange transport after labour begins.",
    explanation:
      "Transport may be harder to arrange at night or under pressure. Discussing a primary and backup option early can make the next step clearer.",
  },
  {
    id: "shared-plan",
    topic: "Shared responsibility",
    statement: "Only the pregnant woman needs to know the plan.",
    explanation:
      "A shared plan helps other family members act when calls, bags, transport, and childcare all need attention.",
  },
  {
    id: "backup",
    topic: "Backup contacts",
    statement: "A backup contact is unnecessary if we already have one driver.",
    explanation:
      "One person may become unavailable. A second agreed contact or transport option can reduce last-minute confusion.",
  },
  {
    id: "preparing-early",
    topic: "Preparing early",
    statement: "Preparing early means something is expected to go wrong.",
    explanation:
      "Preparation is not a prediction. It is a practical conversation that helps families respond more calmly if plans need to change.",
  },
];

export const perspectives: Array<{
  id: PerspectiveId;
  name: string;
  role: string;
  thought: string;
}> = [
  {
    id: "amina",
    name: "Amina",
    role: "Expecting her baby soon",
    thought:
      "I want to know that I can speak up, and that the people around me know the plan too.",
  },
  {
    id: "supporter",
    name: "Nia",
    role: "Amina's supporting family member",
    thought:
      "I can help most when I know which call to make, what to carry, and who will stay with the children.",
  },
  {
    id: "promoter",
    name: "Wanjiku",
    role: "Community Health Promoter",
    thought:
      "My role is to help the family discuss their options and connect with appropriate professional support.",
  },
];

export const firstDecisionChoices: StoryChoice[] = [
  {
    id: "review-plan",
    label: "Review our plan and contact support",
    consequence:
      "The family brings the plan into view. Nia finds the agreed contact while Amina explains what feels different.",
  },
  {
    id: "wait",
    label: "Wait without checking the plan",
    consequence:
      "The family waits, but the unanswered questions stay with them. When they look again, several practical details still need decisions.",
  },
  {
    id: "ask-relatives",
    label: "Ask several relatives first",
    consequence:
      "Different relatives offer different suggestions. The family spends time comparing advice before checking the agreed support contact.",
  },
];

export const transportChoicesWithBackup: StoryChoice[] = [
  {
    id: "backup-transport",
    label: "Activate our backup transport",
    consequence:
      "Nia calls the agreed backup. The family can focus on the next practical steps while transport is confirmed.",
  },
  {
    id: "support-person",
    label: "Contact our agreed support person",
    consequence:
      "The support person helps confirm another option and keeps the family plan moving.",
  },
  {
    id: "last-minute",
    label: "Search for transport now",
    consequence:
      "The family begins calling around. Several details need to be explained again while they search.",
  },
  {
    id: "keep-waiting",
    label: "Keep waiting for the original driver",
    consequence:
      "The family keeps checking the phone. The uncertainty makes it harder to decide when to try another option.",
  },
];

export const transportChoicesWithoutBackup: StoryChoice[] = [
  {
    id: "support-person",
    label: "Contact someone we trust",
    consequence:
      "The family asks a trusted person to help explore available options. They still need to confirm who can come and when.",
  },
  {
    id: "last-minute",
    label: "Search for transport now",
    consequence:
      "The family begins calling around. Several details need to be explained while they search.",
  },
  {
    id: "keep-waiting",
    label: "Keep waiting for the original driver",
    consequence:
      "The family keeps checking the phone. The uncertainty makes it harder to decide when to try another option.",
  },
];

export const planItems: PlanItem[] = [
  {
    id: "facility",
    label: "Preferred health facility",
    prompt: "Facility name",
    group: "journey",
  },
  {
    id: "transport",
    label: "Primary transport",
    prompt: "Driver or transport option",
    group: "journey",
  },
  {
    id: "backup-transport",
    label: "Backup transport",
    prompt: "Second transport option",
    group: "journey",
  },
  {
    id: "companion",
    label: "Main accompanying person",
    prompt: "Name or relationship",
    group: "people",
  },
  {
    id: "backup-companion",
    label: "Backup accompanying person",
    prompt: "Name or relationship",
    group: "people",
  },
  {
    id: "childcare",
    label: "Caregiver for other children",
    prompt: "Name or arrangement",
    group: "people",
  },
  {
    id: "health-contact",
    label: "Primary health contact",
    prompt: "Name and phone number",
    group: "contacts",
  },
  {
    id: "community-contact",
    label: "Community contact",
    prompt: "Name and phone number",
    group: "contacts",
  },
  {
    id: "items",
    label: "Important items prepared",
    prompt: "Where the prepared bag is kept",
    group: "items",
  },
  {
    id: "phone-plan",
    label: "Phone and charging plan",
    prompt: "Charging or spare-phone plan",
    group: "items",
  },
];

export const reviewNotice =
  "Placeholder educational content. Review with qualified Kenyan maternal-health professionals before publication.";

export const assumptionResponseLabels = [
  "This sounds right",
  "I am not sure",
  "Let us check",
];

export const planStatusLabels = {
  ready: "Ready",
  "needs-discussion": "Needs discussion",
  "not-arranged": "Not yet arranged",
} as const;

export const pageCopy = {
  hero: {
    eyebrow: "A family story about preparing together",
    title: "If labour starts tonight, do we know what to do?",
    titleLineOne: "If labour starts tonight,",
    titleLineTwo: "do we know what to do?",
    body: "Preparing together can make difficult moments easier to manage.",
    action: "Start the journey",
    caption: "Amina's family begins with a conversation at home.",
  },
  readiness: {
    title: "Put the practical plan in view.",
    body: "Bring the bag, contacts, transport ideas, and family roles into one conversation before they are needed.",
    caption:
      "A shared plan begins when everyone can see the next practical step.",
  },
  assumptions: {
    title: "Assumption or reality?",
    body: "Pause on one statement at a time. This is a conversation, not a test.",
  },
  character: {
    title: "Tonight, something feels different.",
    body: "Amina speaks first. Her family and Community Health Promoter each hold a different part of the shared plan.",
  },
  firstDecision: {
    title: "What should the family do first?",
    body: "Amina says she has noticed a change and is unsure what it means. Choose how the family responds.",
  },
  transport: {
    kicker: "The original driver is unavailable.",
    withBackupTitle: "The backup plan is ready.",
    withBackupBody:
      "Reviewing the shared plan brings the family's agreed backup choices into view.",
    withoutBackupTitle: "A new transport plan is needed.",
    withoutBackupBody:
      "Because the shared plan was not checked first, the family must find another way forward now.",
    action: "See what happens next",
  },
  outcome: {
    prepared: {
      label: "The family prepared together",
      title: "Clear roles make the next step calmer.",
      body: "The bag is ready, contacts are easy to find, and the family knows which backup to activate. Preparation cannot control every situation, but it can reduce confusion and make it easier to act.",
    },
    open: {
      label: "Some details were still open",
      title: "A conversation now can reduce pressure later.",
      body: "Different assumptions slow the next decision. Many families face these challenges. Discussing the plan early can make the next step clearer.",
    },
  },
  plan: {
    eyebrow: "Take the conversation with you",
    title: "Build our family plan",
    body: "Add only practical planning details. Do not enter medical history or other private health information.",
    privacy:
      "Nothing is sent to a server. Your entries stay in this browser session.",
    groups: {
      journey: {
        title: "The journey",
        body: "Decide where you plan to go and how you will get there.",
      },
      people: {
        title: "People and roles",
        body: "Agree who will accompany, carry, call, and care for others.",
      },
      contacts: {
        title: "Contacts",
        body: "Keep the appropriate support contacts easy to reach.",
      },
      items: {
        title: "Items and phone",
        body: "Bring practical supplies and charging arrangements together.",
      },
    },
  },
  closing: {
    title: "Preparation begins with one conversation.",
    body: "Talk together, decide who will help, and make a backup plan before it is needed.",
  },
  footer:
    "A prototype for family birth preparation. No medical advice or diagnosis.",
} as const;

export const contentByLocale = {
  en: {
    pageCopy,
    storyStages,
    assumptions,
    assumptionResponseLabels,
    perspectives,
    firstDecisionChoices,
    transportChoicesWithBackup,
    transportChoicesWithoutBackup,
    planItems,
    planStatusLabels,
    reviewNotice,
  },
} as const;

export type Locale = keyof typeof contentByLocale;
