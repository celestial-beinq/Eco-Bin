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

# In Image 1 (1024x661):
# The truck image is on the left side, below the header.
# Let's crop: X ~ 70, Y ~ 200, Width ~ 505, Height ~ 325
$rectTruck = new-object System.Drawing.Rectangle(70, 203, 505, 323)
Crop-Image $img1Path $rectTruck "public/images/about-truck.jpg"
Write-Output "Cropped about-truck.jpg"

# In Image 3 (961x619):
# There are 3 cards across.
# Card 1 image: X ~ 85, Y ~ 250, Width ~ 250, Height ~ 160
# Card 2 image: X ~ 357, Y ~ 250, Width ~ 250, Height ~ 160
# Card 3 image: X ~ 629, Y ~ 250, Width ~ 250, Height ~ 160
$rectCard1 = new-object System.Drawing.Rectangle(85, 246, 252, 160)
Crop-Image $img3Path $rectCard1 "public/images/service-residential.jpg"

$rectCard2 = new-object System.Drawing.Rectangle(357, 246, 252, 160)
Crop-Image $img3Path $rectCard2 "public/images/service-commercial.jpg"

$rectCard3 = new-object System.Drawing.Rectangle(629, 246, 252, 160)
Crop-Image $img3Path $rectCard3 "public/images/service-construction.jpg"
Write-Output "Cropped 3 service images"
