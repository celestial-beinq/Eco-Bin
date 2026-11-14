Add-Type -AssemblyName System.Drawing

$img1Path = "C:\Users\HP\.gemini\antigravity\brain\59e8b02a-bad6-428b-8876-dae32ec49d83\.user_uploaded\media_1794656829721_66b55c43.jpg"
$img3Path = "C:\Users\HP\.gemini\antigravity\brain\59e8b02a-bad6-428b-8876-dae32ec49d83\.user_uploaded\media_1794656896682_d55bc913.jpg"

$bmp1 = [System.Drawing.Bitmap]::FromFile($img1Path)
Write-Output "Image 1 size: $($bmp1.Width) x $($bmp1.Height)"

$bmp3 = [System.Drawing.Bitmap]::FromFile($img3Path)
Write-Output "Image 3 size: $($bmp3.Width) x $($bmp3.Height)"

$bmp1.Dispose()
$bmp3.Dispose()
