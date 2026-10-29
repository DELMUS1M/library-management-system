# PowerShell script to configure Git and push code to GitHub
[CmdletBinding()]
param(
    [string]$CommitMessage = "feat: implement library management system data layer",
    [string]$Branch = "main"
)

$ErrorActionPreference = "Stop"

$username = "DELMUS1M"
$email = "ogoradelmus1@gmail.com"
$repoUrl = "https://github.com/DELMUS1M/library-management-system.git"

Write-Host "`n[1/5] Configuring Git user identity..." -ForegroundColor Cyan
git config user.name $username
git config user.email $email
Write-Host "Configured user.name = $username, user.email = $email" -ForegroundColor Green

Write-Host "`n[2/5] Checking repository initialization..." -ForegroundColor Cyan
if (-not (Test-Path ".git")) {
    git init
    Write-Host "Initialized local Git repository." -ForegroundColor Green
}
git branch -M $Branch

Write-Host "`n[3/5] Configuring remote repository..." -ForegroundColor Cyan
$remotes = git remote
if ($remotes -contains "origin") {
    git remote set-url origin $repoUrl
} else {
    git remote add origin $repoUrl
}
Write-Host "Remote origin set to $repoUrl" -ForegroundColor Green

Write-Host "`n[4/5] Staging and committing files..." -ForegroundColor Cyan
git add .
$status = git status --porcelain
if ([string]::IsNullOrWhiteSpace($status)) {
    Write-Host "No unstaged changes detected." -ForegroundColor Yellow
} else {
    git commit -m $CommitMessage
    Write-Host "Committed changes with message: " -ForegroundColor Green
}

Write-Host "`n[5/5] Pushing code to GitHub..." -ForegroundColor Cyan
git push -u origin $Branch

Write-Host "`n[SUCCESS] Code successfully pushed to https://github.com/DELMUS1M/library-management-system.git" -ForegroundColor Green
