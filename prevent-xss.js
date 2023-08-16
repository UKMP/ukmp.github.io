function sanitizeInput(input) {
    if (typeof input !== 'string') {
        return '';
    }
    return input.replace(/[^\w\s]/gi, '');
}

function preventXSS() {
    const inputs = document.getElementsByTagName('input');
    for (let i = 0; i < inputs.length; i++) {
        inputs[i].value = sanitizeInput(inputs[i].value);
    }

    const textareas = document.getElementsByTagName('textarea');
    for (let i = 0; i < textareas.length; i++) {
        textareas[i].value = sanitizeInput(textareas[i].value);
    }

    const elements = document.getElementsByTagName('*');
    for (let i = 0; i < elements.length; i++) {
        const attributes = elements[i].attributes;
        for (let j = 0; j < attributes.length; j++) {
            const attribute = attributes[j];
            if (attribute.name.startsWith('on')) {
                elements[i].removeAttribute(attribute.name);
            } else {
                attribute.value = sanitizeInput(attribute.value);
            }
        }
    }
}
