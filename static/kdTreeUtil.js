// Utility for K-D Tree operations
class KdTreeUtil {
    constructor(kdTree) {
        this.kdTree = kdTree;
    }

    static colorToRGB(color) {
        // Convert hex color to RGB array
        let m = color.match(/^#?([\da-f]{2})([\da-f]{2})([\da-f]{2})$/i);
        return [parseInt(m[1], 16), parseInt(m[2], 16), parseInt(m[3], 16)];
    }

    static distanceFunction(a, b) {
        // Euclidean distance between two colors
        return Math.sqrt(Math.pow(a[0] - b[0], 2) + Math.pow(a[1] - b[1], 2) + Math.pow(a[2] - b[2], 2));
    }

    findClosestEmoji(rgbColor) {
        // Find the closest emoji for the given RGB color
        const nearest = this.kdTree.nearest(rgbColor, 1);
        return nearest[0][0].emoji;
    }
}

if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = KdTreeUtil;
}
