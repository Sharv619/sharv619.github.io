# Nova Act Workflow Runner

This runner invokes the existing Nova Act workflow definition:

```text
sharv619-nova-act
```

Artifacts are written by AWS to:

```text
s3://sharv619-knowledge-base/nova-act/
```

## Setup

From the repo root:

```bash
cd aws/nova-act
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```

Configure AWS credentials with access to account `826851349163` and Region `us-east-1`:

```bash
aws configure
export AWS_REGION=us-east-1
export AWS_DEFAULT_REGION=us-east-1
```

## Run

From the repo root:

```bash
npm run nova-act:run
```

Or pass your own prompt:

```bash
npm run nova-act:run -- "Open the chatbot and ask what projects Himanshu has built. Check whether the answer is relevant."
```

You can also run the Python file directly:

```bash
python3 aws/nova-act/workflow.py "Open the portfolio homepage and verify the main sections load correctly."
```

## Configuration

These environment variables are optional:

```bash
export NOVA_ACT_WORKFLOW_DEFINITION_NAME=sharv619-nova-act
export NOVA_ACT_MODEL_ID=nova-act-latest
export NOVA_ACT_STARTING_PAGE=https://sharv619.github.io
export NOVA_ACT_SCREEN_WIDTH=1600
export NOVA_ACT_SCREEN_HEIGHT=900
export NOVA_ACT_HEADLESS=true
```

Set `NOVA_ACT_HEADLESS=false` if you want to watch the browser locally.

For local testing against the Next.js dev server:

```bash
npm run dev
export NOVA_ACT_STARTING_PAGE=http://localhost:3000
npm run nova-act:run
```
