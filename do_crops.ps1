Add-Type -AssemblyName System.Drawing

$img1Path = "C:\Users\HP\.gemini\antigravity\brain\59e8b02a-bad6-428b-8876-dae32ec49d83\.user_uploaded\media_1794656829721_66b55c43.jpg"
$img3Path = "C:\Users\HP\.gemini\antigravity\brain\59e8b02a-bad6-428b-8876-dae32ec49d83\.user_uploaded\media_1794656896682_d55bc913.jpg"

function Crop-Image($srcPath, $rect, $destPath) {
    $src = [System.Drawing.Bitmap]::FromFile($srcPath)
    $cropBmp = new-object System.Drawing.Bitmap($rect.Width, $rect.Height)
    $g = [System.Drawing.Graphics]::FromImage($cropBmp)
    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
    $destRect = new-object System.Drawing.Rectangle(0, 0, $rect.Width, $rect.Height)
    $g.DrawImage($src, $destRect, $rect, [System.Drawing.GraphicsUnit]::Pixel)
    $cropBmp.Save($destPath, [System.Drawing.Imaging.ImageFormat]::Jpeg)
    $g.Dispose()
    $cropBmp.Dispose()
    $src.Dispose()
}

$truckRect = new-object System.Drawing.Rectangle(71, 201, 504, 339)
Crop-Image $img1Path $truckRect "public/images/about-truck.jpg"

$card1Rect = new-object System.Drawing.Rectangle(85, 240, 260, 154)
Crop-Image $img3Path $card1Rect "public/images/service-residential.jpg"

$card2Rect = new-object System.Drawing.Rectangle(358, 240, 262, 154)
Crop-Image $img3Path $card2Rect "public/images/service-commercial.jpg"

$card3Rect = new-object System.Drawing.Rectangle(631, 240, 259, 154)
Crop-Image $img3Path $card3Rect "public/images/service-construction.jpg"

Write-Output "Successfully cropped and saved all images!"
