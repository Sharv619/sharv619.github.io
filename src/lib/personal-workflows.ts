export interface PersonalAutomationWorkflow {
  title: string;
  label: string;
  description: string;
  technologies: string[];
  detail: string;
}

export const personalAutomationWorkflows: PersonalAutomationWorkflow[] = [
  {
    title: "Headphone -1 / +1 Control",
    label: "Tiny fix, daily use",
    description: "I wanted a quicker way to nudge my headphone setting down or up, so I wrapped a simple -1 / +1 input in a few lines of Python.",
    technologies: ["Python", "-1 / +1", "Local automation"],
    detail: "A deliberately small script for a repetitive action that did not need a full app.",
  },
  {
    title: "Telegram Bot Remote",
    label: "Chat instead of a dashboard",
    description: "I connected the control to a Telegram bot so I can trigger the little automation with a message instead of opening another panel.",
    technologies: ["Telegram Bot", "Python", "Commands"],
    detail: "A familiar chat window became the lightweight remote for a personal tool.",
  },
  {
    title: "Tailscale + SSH Link",
    label: "Private remote access",
    description: "I use Tailscale and SSH to reach the machine privately, keeping the useful remote workflow without exposing another public endpoint.",
    technologies: ["Tailscale", "SSH", "Private network"],
    detail: "Telegram message → bot command → Tailscale → SSH → local Python script.",
  },
];
