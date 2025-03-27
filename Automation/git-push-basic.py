import os;
import subprocess;
import argparse;


def run_command(command, cwd=None):
    GREEN = "\033[92m" ##MAke the command green.
    RESET = "\033[0m"
    print(f"{GREEN}Running: {command}{RESET}")
    subprocess.run(command,shell=True,cwd=cwd,check=True)

def git_push_basic(message):
    run_command("echo You are performing a basic git push")
    run_command("git add .")
    run_command(f'git commit -m "{message}"')
    run_command("git push")

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Automate Git Push")
    parser.add_argument("--message", type=str, required=True, help="Commit message")
    args = parser.parse_args()
    ##Execute the command
    git_push_basic(args.message)


