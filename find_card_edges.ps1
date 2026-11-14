Add-Type -AssemblyName System.Drawing

$img3 = [System.Drawing.Bitmap]::FromFile("C:\Users\HP\.gemini\antigravity\brain\59e8b02a-bad6-428b-8876-dae32ec49d83\.user_uploaded\media_1794656896682_d55bc913.jpg")

# Card 2
for ($x = 350; $x -le 370; $x++) {
    $c = $img3.GetPixel($x, 300)
    if ($c.R -lt 245 -or $c.G -lt 245 -or $c.B -lt 245) {
        Write-Output "Card 2 left edge at x=$x"
        break
    }
}
for ($x = 620; $x -ge 600; $x--) {
    $c = $img3.GetPixel($x, 300)
    if ($c.R -lt 245 -or $c.G -lt 245 -or $c.B -lt 245) {
        Write-Output "Card 2 right edge at x=$x"
        break
    }
}

# Card 3
for ($x = 625; $x -le 645; $x++) {
    $c = $img3.GetPixel($x, 300)
    if ($c.R -lt 245 -or $c.G -lt 245 -or $c.B -lt 245) {
        Write-Output "Card 3 left edge at x=$x"
        break
    }
}
for ($x = 890; $x -ge 870; $x--) {
    $c = $img3.GetPixel($x, 300)
    if ($c.R -lt 245 -or $c.G -lt 245 -or $c.B -lt 245) {
        Write-Output "Card 3 right edge at x=$x"
        break
    }
}

$img3.Dispose()
