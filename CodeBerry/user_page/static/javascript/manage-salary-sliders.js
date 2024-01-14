function adjustInputWidth(value, elementId) {
    const autoWidthInput = document.getElementById(elementId);
    autoWidthInput.value = value;
    const textWidth = getTextWidth(value, window.getComputedStyle(autoWidthInput).font);
    autoWidthInput.style.width = `${textWidth + 10}px`;
}

function getTextWidth(text, font) {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    context.font = font || getComputedStyle(document.body).font;
    const metrics = context.measureText(text);
    
    return metrics.width;
}

function updateSize(salarySlider, sizeCalibrationObjectId) {
    const span = document.getElementById(sizeCalibrationObjectId);
    const input = document.getElementById(salarySlider);
    span.innerText = input.value;
    adjustInputWidth(input.value, salarySlider);
}