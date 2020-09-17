export default class Random {
    static number(min = 0, max = 0) {
        return Math.random() * (max - min) + min;
    }

    static int(min = 0, max = 0, includeMax = false) {
        return includeMax ? Math.floor(Random.number(min, max + 1)) : Math.floor(Random.number(min, max));
    }

    static pick(...options) {
        let totalChance = 0;
        const newOptions = [];

        if (options.length == 1) options = options[0];

        for (const i in options) {
            const option = options[i];
            totalChance += Math.abs(option.chance || 1);

            const newOption = {
                value: option.option || option,
                chance: totalChance
            };

            newOptions.push(newOption);
        }

        const random = Random.number(0, totalChance);

        for (const option of newOptions) {
            if (option.chance > random) return option.value;
        }

        return null;
    }

    static option(option: any, chance = 1) {
        return {
            option: option,
            chance: chance
        };
    }
}