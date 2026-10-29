# PowerShell Script to Sync Catalog & Search Code to GitHub
[CmdletBinding()]
param(
    [string]$CommitMessage = "feat: implement library catalog search and browsing client",
    [string]$Branch = "main"
)

$ErrorActionPreference = "Stop"
$username = "DELMUS1M"
$email = "ogoradelmus1@gmail.com"
$repoUrl = "https://github.com/DELMUS1M/library-management-system.git"

Write-Host "`n[1/5] Configuring Git User Identity..." -ForegroundColor Cyan
git config user.name $username
git config user.email $email

Write-Host "`n[2/5] Initializing Git Repository..." -ForegroundColor Cyan
if (-not (Test-Path ".git")) {
    git init
}
git branch -M $Branch

Write-Host "`n[3/5] Setting Remote Repository..." -ForegroundColor Cyan
$remotes = git remote
if ($remotes -contains "origin") {
    git remote set-url origin $repoUrl
} else {
    git remote add origin $repoUrl
}

Write-Host "`n[4/5] Staging All Files (Force Staging client/)..." -ForegroundColor Cyan
git add -f client/
git add .
git commit -m $CommitMessage

Write-Host "`n[5/5] Pushing to GitHub..." -ForegroundColor Cyan
git push -u origin $Branch

Write-Host "`n[SUCCESS] Code successfully pushed to $repoUrl" -ForegroundColor Green
