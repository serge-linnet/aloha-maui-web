param (
    [string]$token,
    [string]$newValue,
    [string]$filePath
)

$fileContent = Get-Content -Path $filePath -Raw
$newContent = $fileContent -replace $token, $newValue
$newContent | Set-Content -Path $filePath

Write-Host "Token '$token' replaced with '$newValue' in the file."