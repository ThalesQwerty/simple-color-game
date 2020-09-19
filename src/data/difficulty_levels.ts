export default [
    {
        score: 0,
        rotation: {
            minSpeed: 5,
            maxSpeed: 5,
            minTime:  1000,
            maxTime:  10000,
            turnChance: 0.25,
            acceleration: 60,
        },
        colors: {
            timeout: 4000,
            sameAsTextChance: 1
        }  
    },
    {
        score: 3,
        rotation: {
            minSpeed: 5,
            maxSpeed: 10,
            minTime:  1000,
            maxTime:  10000,
            turnChance: 0.25,
            acceleration: 60,
        },
        colors: {
            timeout: 3500,
            sameAsTextChance: 1/2
        }  
    },
    {
        score: 6,
        rotation: {
            minSpeed: 5,
            maxSpeed: 15,
            minTime:  1000,
            maxTime:  10000,
            turnChance: 0.25,
            acceleration: 60,
        },
        colors: {
            timeout: 3000,
            sameAsTextChance: 1/4
        }  
    },
    {
        score: 10,
        rotation: {
            minSpeed: 10,
            maxSpeed: 20,
            minTime:  1000,
            maxTime:  10000,
            turnChance: 0.25,
            acceleration: 60,
        },
        colors: {
            timeout: 2000,
            sameAsTextChance: 1/6
        }  
    },
    {
        score: 20,
        rotation: {
            minSpeed: 15,
            maxSpeed: 30,
            minTime:  1000,
            maxTime:  10000,
            turnChance: 0.25,
            acceleration: 60,
        },
        colors: {
            timeout: 1500,
            sameAsTextChance: 1/6
        }  
    },
    {
        score: 30,
        rotation: {
            minSpeed: 20,
            maxSpeed: 35,
            minTime:  1000,
            maxTime:  10000,
            turnChance: 0.5,
            acceleration: 60,
        },
        colors: {
            timeout: 1250,
            sameAsTextChance: 1/6
        }  
    },
    {
        score: 40,
        rotation: {
            minSpeed: 20,
            maxSpeed: 40,
            minTime:  1000,
            maxTime:  8000,
            turnChance: 0.5,
            acceleration: 60,
        },
        colors: {
            timeout: 1000,
            sameAsTextChance: 1/6
        }  
    },
]; 