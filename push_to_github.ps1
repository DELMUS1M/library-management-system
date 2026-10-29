[CmdletBinding()]
param(
    [string]$CommitMessage = "feat: complete book API, auth & authorization implementation",
    [string]$Branch = "main"
)

$ErrorActionPreference = "Stop"

$username = "DELMUS1M"
$email = "ogoradelmus1@gmail.com"
$repoUrl = "https://github.com/DELMUS1M/library-management-system.git"

Write-Host "`n[1/5] Configuring Git user credentials..." -ForegroundColor Cyan
git config user.name $username
git config user.email $email

Write-Host "`n[2/5] Checking Git repo..." -ForegroundColor Cyan
if (-not (Test-Path ".git")) {
    git init
}
git branch -M $Branch

Write-Host "`n[3/5] Setting remote repo..." -ForegroundColor Cyan
$remotes = git remote
if ($remotes -contains "origin") {
    git remote set-url origin $repoUrl
} else {
    git remote add origin $repoUrl
}

Write-Host "`n[4/5] Force-staging all directories..." -ForegroundColor Cyan
git add -f api/
git add -f docs/
git add -f README.md
git add -f push_to_github.ps1

Write-Host "`nStatus:" -ForegroundColor Yellow
git status --porcelain

$status = git status --porcelain
if ([string]::IsNullOrWhiteSpace($status)) {
    Write-Host "No unstaged changes." -ForegroundColor Yellow
} else {
    git commit -m $CommitMessage
    Write-Host "Committed changes." -ForegroundColor Green
}

Write-Host "`n[5/5] Pushing to GitHub..." -ForegroundColor Cyan
git push -u origin $Branch

Write-Host "`n[SUCCESS] Code successfully pushed to $repoUrl" -ForegroundColor Green
