import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent


def run(script: str) -> int:
    return subprocess.call(["npm", "run", script], cwd=ROOT)


def main() -> int:
    target = sys.argv[1] if len(sys.argv) > 1 else "build"
    if target not in ("build", "test"):
        print(f"unknown target: {target}", file=sys.stderr)
        return 2
    return run(target)


if __name__ == "__main__":
    sys.exit(main())
