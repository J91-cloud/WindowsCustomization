function hack { cd "C:\Users\jessy\Documents\GitProjects\HackerHub" }
function power {cd "C:\Users\jessy\Documents\Powershell-scripts"}
function alerts-fe {cd "C:\Users\jessy\Documents\Final Project\ECP\league_alerts-ChamplainECP\computer_alerts-fe"}
function alerts-be {cd "C:\Users\jessy\Documents\Final Project\ECP\league_alerts-ChamplainECP\computer_alerts-be"}
function WindowsCustomization { cd "C:\Users\jessy\Documents\WindowsCustomization" }


function codex {
    param (
        [string]$prompt
    )
    # Run the Ollama command
    $response = ollama run codellama:13b $prompt

    # Add ANSI escape codes to highlight code blocks with a powder blue background
    $response = $response -replace '```([^`]*)```', "`e[44;97m$1`e[0m"  # Powder blue background (ANSI 44) with white text (ANSI 97)

    # Output the styled response
    Write-Output $response
}







# Import the Chocolatey Profile that contains the necessary code to enable
# tab-completions to function for `choco`.
# Be aware that if you are missing these lines from your profile, tab completion
# for `choco` will not function.
# See https://ch0.co/tab-completion for details.
$ChocolateyProfile = "$env:ChocolateyInstall\helpers\chocolateyProfile.psm1"
if (Test-Path($ChocolateyProfile)) {
  Import-Module "$ChocolateyProfile"
}

