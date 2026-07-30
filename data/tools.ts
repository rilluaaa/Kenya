import type { ReviewMeta } from "@/types/content";

const review: ReviewMeta = {
  reviewed: false,
  reviewNotes: "Prototype content awaiting Kenyan clinical and localisation review.",
  sourceReference: "Prototype brief",
  locale: "en",
  version: "0.1.0",
};

export const birthPlanSteps = [
  { ...review, id: "placeOfCare", title: "Planned place of care", prompt: "What place has the family agreed to use?", helper: "Use a familiar name. Do not enter an exact home address.", type: "text" },
  { ...review, id: "mainTransport", title: "Main transport", prompt: "What is the main transport option?", helper: "Name the option the family expects to use.", type: "text" },
  { ...review, id: "backupTransport", title: "Backup transport", prompt: "What can the family use if the main option changes?", helper: "A different person or type of transport can be useful.", type: "text" },
  { ...review, id: "transportContact", title: "Person arranging transport", prompt: "Who will make the transport contact?", helper: "A first name or family role is enough.", type: "text" },
  { ...review, id: "supportPerson", title: "Support person", prompt: "Who has agreed to support the plan?", helper: "A first name or family role is enough.", type: "text" },
  { ...review, id: "importantContact", title: "Important contact", prompt: "Which contact should be easy to find?", helper: "Use only the minimum information needed for this private plan.", type: "text" },
  { ...review, id: "items", title: "Practical preparation", prompt: "Which prototype checklist items are ready?", helper: "Final wording requires local programme review.", type: "checklist" },
  { ...review, id: "remainingActions", title: "Remaining actions", prompt: "What still needs to happen?", helper: "Write one or two clear next actions.", type: "textarea" },
] as const;

export const preparationItems = [
  { ...review, id: "contact-card", label: "Important contact card" },
  { ...review, id: "documents", label: "Relevant documents" },
  { ...review, id: "personal-items", label: "Personal items for mother and baby" },
  { ...review, id: "phone-plan", label: "Charged phone and call plan" },
];

export const learningCards = [
  { ...review, id: "prepare", category: "Preparing for birth", title: "Make one shared plan", text: "Agree on the planned place of care and make sure the people involved can name it.", question: "Who else needs to understand the plan?", illustration: "house" },
  { ...review, id: "backup", category: "Making a backup plan", title: "Plan for change", text: "Name a second transport option before the main option becomes unavailable.", question: "What could be your second option?", illustration: "road" },
  { ...review, id: "support", category: "Family support", title: "Give each person a clear role", text: "A shared plan works better when everyone knows what they agreed to do.", question: "Which role can be confirmed today?", illustration: "people" },
  { ...review, id: "help", category: "Asking for help", title: "Keep contacts easy to find", text: "Record the minimum contact information the family needs and keep it with the plan.", question: "Who is responsible for making contact?", illustration: "phone" },
  { ...review, id: "newborn", category: "Preparing for the first days with a newborn", title: "Prepare support at home", text: "Talk about practical support the family can arrange after returning home.", question: "What everyday task can someone else help with?", illustration: "home" },
] as const;

export const guidedVisitQuestions = [
  { ...review, id: "preparation", topic: "Household preparation", question: "What has the household already prepared?", followUp: "What is the smallest useful action to take next?" },
  { ...review, id: "transport", topic: "Transport and backup", question: "What is the main transport plan, and what is the backup?", followUp: "Who will make contact if the plan needs to be used?" },
  { ...review, id: "support", topic: "Family support", question: "Who understands the plan and has agreed to help?", followUp: "Is any role still unclear?" },
  { ...review, id: "contacts", topic: "Important contacts", question: "Which contact information should be easy for the family to find?", followUp: "Where will the family keep it?" },
  { ...review, id: "concerns", topic: "Questions or concerns", question: "What questions does the family want to discuss with an appropriate health professional?", followUp: "Which question should not wait until the next routine visit?" },
  { ...review, id: "follow-up", topic: "Follow-up actions", question: "What should be checked again during the next household conversation?", followUp: "Who will take the next action?" },
] as const;

export const safetyContent = {
  ...review,
  title: "Education, not diagnosis",
  points: [
    "This prototype provides education only.",
    "It does not replace assessment by a qualified healthcare professional.",
    "Urgent concerns require contact with the appropriate local health service.",
    "All maternal and newborn health content requires review by qualified Kenyan maternal-health professionals before public use.",
  ],
};
