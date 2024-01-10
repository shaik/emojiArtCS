document.addEventListener("DOMContentLoaded", function() {
    let cropper;
    const imageElement = document.getElementById('selectedImage');

    document.getElementById('imageInput').addEventListener('change', function(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                imageElement.src = e.target.result;
                imageElement.style.display = 'block';

                if (cropper) {
                    cropper.destroy();
                }
                cropper = new Cropper(imageElement, {
                    aspectRatio: 1, // Adjust as needed
                });
            };
            reader.readAsDataURL(file);
        }
    });

    document.getElementById('cropButton').addEventListener('click', function() {
        if (cropper) {
            const croppedCanvas = cropper.getCroppedCanvas();
            // Here you will need to add the logic to handle the cropped image
            // For example, getting the cropped image data and converting it to emoji art
        }
    });

    // Build the K-D trees for Hex Color and Normalized Color
    let hexColorTree, normalizedColorTree;

    fetch('static/emojiColorMap.json')
        .then(response => response.json())
        .then(data => {
            const hexPoints = data.map(item => ({
                position: KdTreeUtil.colorToRGB(item['Hex Color']),
                emoji: item.emoji
            }));
            const normalizedPoints = data.map(item => ({
                position: KdTreeUtil.colorToRGB(item['Normalized Color']),
                emoji: item.emoji
            }));

            hexColorTree = new kdTree(hexPoints, KdTreeUtil.distanceFunction, ["r", "g", "b"]);
            normalizedColorTree = new kdTree(normalizedPoints, KdTreeUtil.distanceFunction, ["r", "g", "b"]);
        })
        .catch(error => console.error('Error fetching JSON:', error));
});
