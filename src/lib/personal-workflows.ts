export interface PersonalAutomationWorkflow {
  title: string;
  label: string;
  description: string;
  technologies: string[];
  detail: string;
}

export const personalAutomationWorkflows: PersonalAutomationWorkflow[] = [
  {
    title: "Headphone Step Control",
    label: "Small tool, daily use",
    description: "A few lines of Python turn a repeated headphone adjustment into a direct -1 / +1 command.",
    technologies: ["Python", "-1 / +1", "Local automation"],
    detail: "The script stays deliberately small because the repeated action did not need another full application.",
  },
  {
    title: "Telegram Command Bridge",
    label: "Chat as the interface",
    description: "A Telegram bot exposes the command through a familiar chat window instead of adding another dashboard.",
    technologies: ["Telegram Bot", "Python", "Commands"],
    detail: "The bot translates a small command into the local action and keeps the interface lightweight.",
  },
  {
    title: "Termux + Tailscale SSH Path",
    label: "Personal infrastructure",
    description: "Termux gives me the remote terminal, while SSH reaches my main laptop through its private Tailscale network.",
    technologies: ["Termux", "Tailscale", "SSH", "Private network"],
    detail: "Termux → SSH over Tailscale → main laptop terminal → local Python utility.",
  },
];
