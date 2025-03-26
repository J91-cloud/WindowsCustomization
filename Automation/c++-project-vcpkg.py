import os;
import subprocess;


PROJECT_DIR = os.path.join(os.getcwd)
VCPKG_DIR = os.path.join(PROJECT_DIR, "vcpkg")


def run_command(command, cwd=None):
    GREEN = "\033[92m" ## Make the command green
    RESET = "\033[0m"
    print(f"{GREEN}Running: {command}{RESET}")
    subprocess.run(command, shell=True, cwd=cwd, check=True)
 

def download_vcpkg():
    #Git clone the repo
    run_command("")
    if not os.path.exists(VCPKG_DIR):
        run_command(f"git clone https://github.com/microsoft/vcpkg.git {VCPKG_DIR}")
        
    #cd into the vcpkg folder
    #cd into the bat folder or whatever
    run_command(f".\\bootstrap-vcpkg.bat", cwd=VCPKG_DIR)  # Windows

    
if __name__ == "__main__":
    ##Execute the command
    download_vcpkg()