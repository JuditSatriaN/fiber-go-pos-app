function buildErrorMessage(text) {
    if (text == null || text.length === 0) {
        return ""
    }
    return text.charAt(0).toUpperCase() + text.slice(1);
}