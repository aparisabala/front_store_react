const tryParseJson = (text) => {
    try {
        return {status: true,data: JSON.parse(text)};
    } catch (err) {
        return {status: false, error: err}; 
    }
}

const chunkArray = (arr, chunkSize) => {
    const chunks = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
        chunks.push(arr.slice(i, i + chunkSize));
    }
    return chunks;
}
export {tryParseJson,chunkArray}  