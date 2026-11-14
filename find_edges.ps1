Add-Type -AssemblyName System.Drawing

$img1 = [System.Drawing.Bitmap]::FromFile("C:\Users\HP\.gemini\antigravity\brain\59e8b02a-bad6-428b-8876-dae32ec49d83\.user_uploaded\media_1794656829721_66b55c43.jpg")
# In img1, the truck image has a top-left corner around x=70..75, y=200..208. Let's find where white (background) transitions to non-white in that region:
for ($y = 195; $y -le 215; $y++) {
    $c = $img1.GetPixel(150, $y)
    if ($c.R -lt 250 -or $c.G -lt 250 -or $c.B -lt 250) {
        Write-Output "Image 1 truck top edge at y=$y"
        break
    }
}
for ($x = 60; $x -le 85; $x++) {
    $c = $img1.GetPixel($x, 250)
    if ($c.R -lt 250 -or $c.G -lt 250 -or $c.B -lt 250) {
        Write-Output "Image 1 truck left edge at x=$x"
        break
    }
}
for ($x = 580; $x -ge 560; $x--) {
    $c = $img1.GetPixel($x, 250)
    if ($c.R -lt 250 -or $c.G -lt 250 -or $c.B -lt 250) {
        Write-Output "Image 1 truck right edge at x=$x"
        break
    }
}
for ($y = 540; $y -ge 515; $y--) {
    $c = $img1.GetPixel(150, $y)
    if ($c.R -lt 250 -or $c.G -lt 250 -or $c.B -lt 250) {
        Write-Output "Image 1 truck bottom edge at y=$y"
        break
    }
}
$img1.Dispose()

$img3 = [System.Drawing.Bitmap]::FromFile("C:\Users\HP\.gemini\antigravity\brain\59e8b02a-bad6-428b-8876-dae32ec49d83\.user_uploaded\media_1794656896682_d55bc913.jpg")
# Let's find card 1 image edges
for ($y = 240; $y -le 255; $y++) {
    $c = $img3.GetPixel(150, $y)
    if ($c.R -lt 245 -or $c.G -lt 245 -or $c.B -lt 245) {
        Write-Output "Card 1 top edge at y=$y"
        break
    }
}
for ($x = 80; $x -le 95; $x++) {
    $c = $img3.GetPixel($x, 300)
    if ($c.R -lt 245 -or $c.G -lt 245 -or $c.B -lt 245) {
        Write-Output "Card 1 left edge at x=$x"
        break
    }
}
for ($x = 345; $x -ge 325; $x--) {
    $c = $img3.GetPixel($x, 300)
    if ($c.R -lt 245 -or $c.G -lt 245 -or $c.B -lt 245) {
        Write-Output "Card 1 right edge at x=$x"
        break
    }
}
for ($y = 420; $y -ge 390; $y--) {
    $c = $img3.GetPixel(150, $y)
    if ($c.R -lt 245 -or $c.G -lt 245 -or $c.B -lt 245) {
        Write-Output "Card 1 bottom edge at y=$y"
        break
    }
}
$img3.Dispose()
