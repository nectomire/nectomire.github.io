class GlidingImages {
    constructor(imagePaths) {
        this.imagePaths = imagePaths;
        this.currentImageIndex = 0;
        this.shuffledImages = [...imagePaths];
        this.currentImageElement = null;
        
        this.shuffleImages();
        this.startImageCycle();
    }

    shuffleImages() {
        for (let i = this.shuffledImages.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.shuffledImages[i], this.shuffledImages[j]] = [this.shuffledImages[j], this.shuffledImages[i]];
        }
    }

    getRandomYPosition() {
        const viewportHeight = window.innerHeight;
        const imageHeight = 400; 
        const minY = viewportHeight * 0.2;
        const maxY = viewportHeight * 0.8 - imageHeight;
        return Math.random() * (maxY - minY) + minY;
    }

    getRandomSide() {
        return Math.random() < 0.5 ? 'left-side' : 'right-side';
    }

    createImageElement(imagePath) {
        const img = document.createElement('img');
        img.src = imagePath;
        const side = this.getRandomSide();
        img.className = `gliding-image ${side} initial`;
        img.style.top = `${this.getRandomYPosition()}px`;
        document.body.appendChild(img);
        return img;
    }

    showNextImage() {
        if (this.imagePaths.length === 0) return;

        // Get next image path
        const imagePath = this.shuffledImages[this.currentImageIndex];
        this.currentImageIndex = (this.currentImageIndex + 1) % this.shuffledImages.length;
        
        // If we've shown all images, shuffle again
        if (this.currentImageIndex === 0) {
            this.shuffleImages();
        }

        // Create and position the image
        this.currentImageElement = this.createImageElement(imagePath);
        
        // Start slide-in animation after a small delay
        setTimeout(() => {
            this.currentImageElement.classList.remove('initial');
            this.currentImageElement.classList.add('slide-in');
        }, 100);

        // Start slide-out animation after 10 seconds
        setTimeout(() => {
            if (this.currentImageElement) {
                this.currentImageElement.classList.remove('slide-in');
                this.currentImageElement.classList.add('slide-out');
                
                // Remove element after slide-out animation completes
                setTimeout(() => {
                    if (this.currentImageElement && this.currentImageElement.parentNode) {
                        this.currentImageElement.parentNode.removeChild(this.currentImageElement);
                    }
                }, 3000);
            }
        }, 10000);
    }

    startImageCycle() {
        // Show first image immediately
        this.showNextImage();
        
        // Then show subsequent images every 20 seconds
        setInterval(() => {
            this.showNextImage();
        }, 20000);
    }
}