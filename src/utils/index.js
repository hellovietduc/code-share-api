/**
 * Returns a random integer inclusively between min and max.
 * @param {number} min Lower bound number, round down to the nearest integer.
 * @param {number} max Upper bound number, round up to the nearest integer.
 * @returns {number} A random integer.
 */
const getRandomInt = (min, max) => {
    if (max < min) throw new Error(`Range is reversed, ${max} > ${min}`);
    const minInt = Math.ceil(min);
    const maxInt = Math.floor(max);
    return Math.floor(Math.random() * (maxInt - minInt + 1)) + minInt;
};

module.exports = {
    getRandomInt
};
