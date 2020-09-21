export default class WithZeroes {
    static parse(number: number, digits: number) {
        const numZeroes = digits - Math.floor(Math.log10(Math.abs(number) || 1)) - 1;
        let str = "";

        for (let i = 0; i < numZeroes; i++) {
            str += "0";
        }

        str += number.toString();

        return str;
    }
}