# PowerShell script to force stage and push reading list, auth flow & space booking work
[CmdletBinding()]
param(
    [string]$CommitMessage = "feat: implement reading list context, auth flow, and space booking form",
    [string]$Branch = "main"
)

$ErrorActionPreference = "Stop"
$username = "DELMUS1M"
$email = "ogoradelmus1@gmail.com"
$repoUrl = "https://github.com/DELMUS1M/library-management-system.git"

Write-Host "`n[1/5] Setting Git user credentials..." -ForegroundColor Cyan
git config user.name $username
git config user.email $email

Write-Host "`n[2/5] Checking Git repository..." -ForegroundColor Cyan
if (-not (Test-Path ".git")) {
    git init
}
git branch -M $Branch

Write-Host "`n[3/5] Setting remote origin..." -ForegroundColor Cyan
$remotes = git remote
if ($remotes -contains "origin") {
    git remote set-url origin $repoUrl
} else {
    git remote add origin $repoUrl
}

Write-Host "`n[4/5] Force-staging files..." -ForegroundColor Cyan
git add -f .
git status --porcelain

Write-Host "`n[5/5] Committing and pushing to GitHub..." -ForegroundColor Cyan
git commit -m $CommitMessage
git push -u origin $Branch

Write-Host "`n[SUCCESS] Code successfully pushed to $repoUrl" -ForegroundColor Green
