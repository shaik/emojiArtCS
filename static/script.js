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
            // Further processing of croppedCanvas
        }
    });
});

// Assuming kdTree is available globally after including the library
let hexColorTree, normalizedColorTree;
const KdTreeUtil = require('./kdTreeUtil');

document.addEventListener("DOMContentLoaded", function() {
    fetch('{{ url_for("static", filename="emojiColorMap.json") }}')
        .then(response => response.json())
        .then(data => {
            // Build the K-D trees for Hex Color and Normalized Color
            const hexPoints = data.map(item => ({
                position: KdTreeUtil.colorToRGB(item.hexColor),
                emoji: item.emoji
            }));
            const normalizedPoints = data.map(item => ({
                position: KdTreeUtil.colorToRGB(item.normalizedColor),
                emoji: item.emoji
            }));

            hexColorTree = new kdTree.kdTree(hexPoints, KdTreeUtil.distanceFunction, ["r", "g", "b"]);
            normalizedColorTree = new kdTree.kdTree(normalizedPoints, KdTreeUtil.distanceFunction, ["r", "g", "b"]);
        })
        .catch(error => console.error('Error fetching JSON:', error));

    // Additional client-side logic...
});
