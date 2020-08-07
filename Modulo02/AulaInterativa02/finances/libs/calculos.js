function media(array) {
    const sum = somatario(array);
    const media = sum / array.length;
    return media;
}

function somatario(array) {
    const sum = array.reduce((previousValue, currentValue) => {
        return previousValue + currentValue;
    }, 0);
    return sum;
}

export default {media, somatario};