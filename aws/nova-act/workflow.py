import argparse
import os

from nova_act import NovaAct, workflow


WORKFLOW_DEFINITION_NAME = os.getenv(
    "NOVA_ACT_WORKFLOW_DEFINITION_NAME",
    "sharv619-nova-act",
)
MODEL_ID = os.getenv("NOVA_ACT_MODEL_ID", "nova-act-latest")
STARTING_PAGE = os.getenv("NOVA_ACT_STARTING_PAGE", "https://sharv619.github.io")
SCREEN_WIDTH = int(os.getenv("NOVA_ACT_SCREEN_WIDTH", "1600"))
SCREEN_HEIGHT = int(os.getenv("NOVA_ACT_SCREEN_HEIGHT", "900"))
HEADLESS = os.getenv("NOVA_ACT_HEADLESS", "true").lower() != "false"
DEFAULT_PROMPT = (
    "Open the portfolio homepage, verify the main sections load correctly, "
    "then open the chatbot and ask what projects Himanshu has built. "
    "Report whether the answer is relevant."
)
PROMPT_GUARDRAILS = (
    "Stay on the portfolio site unless the prompt explicitly asks you to open an external site. "
    "For external project links, inspect the visible link text or destination and report anything suspicious; "
    "do not leave the portfolio just to check a link. "
    "Give a concise final report. "
)


@workflow(workflow_definition_name=WORKFLOW_DEFINITION_NAME, model_id=MODEL_ID)
def portfolio_workflow(prompt: str) -> None:
    with NovaAct(
        starting_page=STARTING_PAGE,
        headless=HEADLESS,
        screen_width=SCREEN_WIDTH,
        screen_height=SCREEN_HEIGHT,
    ) as nova:
        nova.act(f"{PROMPT_GUARDRAILS}\n\nTask: {prompt}")


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Run the sharv619 Nova Act portfolio workflow.",
    )
    parser.add_argument(
        "prompt",
        nargs="?",
        default=DEFAULT_PROMPT,
        help="Instruction to run with Nova Act.",
    )
    return parser.parse_args()


if __name__ == "__main__":
    args = parse_args()
    portfolio_workflow(args.prompt)
