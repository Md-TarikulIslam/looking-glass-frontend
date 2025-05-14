export const createImage = (url) =>
    new Promise((resolve, reject) => {
      const image = new Image();
      image.addEventListener('load', () => resolve(image));
      image.addEventListener('error', (error) => reject(error));
      image.src = url;
    });
  
  export async function getCroppedImg(imageSrc, pixelCrop) {
    const image = await createImage(imageSrc);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
  
    const maxSize = Math.max(image.width, image.height);
    canvas.width = maxSize;
    canvas.height = maxSize;
  
    // Draw the source image into the canvas
    ctx.drawImage(
      image,
      maxSize / 2 - image.width / 2,
      maxSize / 2 - image.height / 2
    );
  
    // Create a smaller canvas for the cropped image
    const cropCanvas = document.createElement('canvas');
    cropCanvas.width = pixelCrop.width;
    cropCanvas.height = pixelCrop.height;
    const cropCtx = cropCanvas.getContext('2d');
  
    // Draw the cropped area into the new canvas
    cropCtx.drawImage(
      canvas,
      pixelCrop.x,
      pixelCrop.y,
      pixelCrop.width,
      pixelCrop.height,
      0,
      0,
      pixelCrop.width,
      pixelCrop.height
    );
  
    // Create a blob from the cropped canvas
    return new Promise((resolve, reject) => {
      cropCanvas.toBlob((blob) => {
        if (!blob) {
          reject(new Error('Failed to create blob'));
          return;
        }
        const file = new File([blob], 'cropped-image.png', { type: 'image/png' });
        resolve({
          file,
          url: URL.createObjectURL(blob)
        });
      }, 'image/png', 1);
    });
  }