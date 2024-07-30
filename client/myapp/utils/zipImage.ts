export const dealImage = (
    base64: string | undefined,
    w: number,
    callback?: (base64: string) => void
): void => {
    if (!base64) {
        console.error('Base64 string is undefined.');
        return;
    }

    let newImage = new Image();
    let quality = 0.6; // Compression ratio between 0 and 1
    newImage.src = base64;
    newImage.setAttribute("crossOrigin", 'Anonymous'); // Needed for cross-origin images

    newImage.onload = function () {
        let imgWidth = newImage.width;
        let imgHeight = newImage.height;
        let canvas = document.createElement("canvas");
        let ctx = canvas.getContext("2d");

        if (!ctx) {
            console.error('Canvas context is null.');
            return;
        }

        if (Math.max(imgWidth, imgHeight) > w) {
            if (imgWidth > imgHeight) {
                canvas.width = w;
                canvas.height = w * imgHeight / imgWidth;
            } else {
                canvas.height = w;
                canvas.width = w * imgWidth / imgHeight;
            }
        } else {
            canvas.width = imgWidth;
            canvas.height = imgHeight;
        }

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(newImage, 0, 0, canvas.width, canvas.height);
        let compressedBase64 = canvas.toDataURL("image/jpeg", quality); // Compression statement

        // Optional further compression to target size range (uncomment and adjust as needed)
        // while (compressedBase64.length / 1024 > 150) {
        //     quality -= 0.01;
        //     compressedBase64 = canvas.toDataURL("image/jpeg", quality);
        // }
        // while (compressedBase64.length / 1024 < 50) {
        //     quality += 0.001;
        //     compressedBase64 = canvas.toDataURL("image/jpeg", quality);
        // }

        if (callback) {
            callback(compressedBase64);
        } // Return the compressed image through the callback
    };

    newImage.onerror = function () {
        console.error('Error loading image.');
    };
};