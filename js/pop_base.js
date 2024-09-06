// document.addEventListener('DOMContentLoaded', function() {
function drawBbox(url, results) {
    const imgElement = document.getElementById('sourceImg');
    imgElement.setAttribute('src', url)

    const canvas = document.getElementById('imageCanvas');
    imgElement.onload = () => {
        canvas.width = imgElement.width;
        canvas.height = imgElement.height;
        let lineHeight = Math.round(imgElement.height * 0.04)
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        ctx.drawImage(imgElement, 0, 0, imgElement.width, imgElement.height);
        ctx.lineWidth = 4;
        ctx.font = `${lineHeight}px Microsoft YaHei`;

        // 遍历检测结果并绘制矩形框
        for (let idx in results.detection_classes) {
            const className = results.detection_classes[idx]
            const [y1, x1, y2, x2] = results.detection_boxes[idx]
            const score = results.detection_scores[idx]

            const color = getColor(className);
            ctx.strokeStyle = color;
            ctx.fillStyle = color;
            
            ctx.strokeRect(x1, y1, x2 - x1, y2 - y1);
            ctx.fillText(`${className} (${score.toFixed(2)})`, x1, y2+lineHeight)
        }
    }
}

function getColor(label) {
    // 定义不同类别的颜色
    const colorMap = {
        "Mouse_bite": "red",
        "Open_circuit": "grey",
        "Short": "blue",
        "Open_circuit": "green",
        "Spurious_copper": "yellow"
    };
    return colorMap[label] || "magenta"; // 默认颜色
}

