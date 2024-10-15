export const isFresh = (date: Date): boolean => {
    const now = Date.now();
    const freshnessThreshold = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
    return now - date.getTime() <= freshnessThreshold;
}