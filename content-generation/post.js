var openai = require("openai-node");
var fs = require('fs');
var differenceInDays = require('date-fns/differenceInDays')
var addDays = require('date-fns/addDays')


openai.api_key = process.env.OPENAI_API_KEY;


const destinationTypes = [{
    type: "city",
    accomodationTypes: ["Inn", "Château",  "Hotel & Spa", "Hotel", "Palace", "Suites"],
    names: ["Shoreditch", "Singapore", "Victoria", "Marylebone", "Kensington", "St Paul's", "Castille", "Providence", "Bristol", "Cipriani", "Gritti Palace", "di Positano", "di Carpiano", "Sant'Andrea"],
    photos: [""],
    adjectives: ["gastronomical", "charming", "upscale", "stylish", "sophisticated", "historical", "gorgeous", "jawdropping", "romantic", "vibrant", "breathtaking", "sophisticated", "electric", "rustic"],
},{
    type: "beach",
    accomodationTypes: ["Resort", "Lodge", "Hotel & Spa", "Hotel", "Guest House", "Private Island", "Suites"],
    names: ["Paradise Beach", "Ocean Sunset", "Sandy Dunes", "Ocean View", "Zighy Bay", "Aqua Beach", "Sunset Dream", "Naladhu", "Paracas", "Virgin Gorda", "St. Barts", "White Pebble"],
    photos: [""],
    adjectives: ["charming", "upscale", "stylish", "sophisticated", "gorgeous", "jawdropping", "pristene", "romantic", "sun-soaked", "magical", "breathtaking", "sophisticated", "rustic", "spiritual"],
},{
    type: "jungle",
    accomodationTypes: ["Ranch", "Lodge", "Safari Camp", "Camp", "Ecolodge"],
    names: ["Ubud", "Chiang Mai", "Mashpi", "San Ignacio", "Puerto Maldonado", "Osa Peninsula", "Yasuni National Park", "Pacuare", "Grosso"],
    photos: [""],
    adjectives: ["charming", "jawdropping", "pristene", "romantic", "magical", "breathtaking", "rustic", "spiritual"],
},{
    type: "plains",
    accomodationTypes: ["Inn", "Ranch", "Lodge", "Camp", "Ecolodge"],
    names: ["Naladhu", "Brush Creek", "Mashpi", "Sabi Sands", "Paracas", "Madikew Game Reserve", "Rift Valley"],
    photos: [""],
    adjectives: ["charming", "rural", "ecological", "isolated", "remote", "private", "breathtaking", "rustic", "spiritual"]
}]


function selectRandom(array) {
    return array[Math.floor(Math.random() * array.length)];
}

function selectRandomFileFromDirectory(directory) {
    return selectRandom(fs.readdirSync(directory));
}

const startDate = new Date(2021, 10, 1);
const endDate = new Date();
const daysBetweenStartAndEnd = differenceInDays(endDate, startDate);
// const datesFromStartToEnd = [...daysBetweenStartAndEnd].map()

function arrayLengthFromNumber(number) {
    return Array.from(Array(number).keys());
}


function outputEveryFewItem(array, diff) {
    return array.filter((item, index) => index % randomNumberBetween(-diff, diff) === 0);
}

function outputEveryItem(array, number) {
    return array.filter((item, index) => index % number === 0);
}

function randomNumberBetween(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

const blogPostDays = outputEveryFewItem(outputEveryItem(arrayLengthFromNumber(daysBetweenStartAndEnd), 2), 5)


blogPostDays.forEach(day => {
    const date = addDays(startDate, day);
    const dateString = date.toISOString().split('T')[0];
    console.log(dateString)
    const type = selectRandom(destinationTypes)
    const accomodationType = selectRandom(type.accomodationTypes)
    const name = `${accomodationType} ${selectRandom(type.names)}`
    const prompt = `${name} is a ${selectRandom(type.adjectives)} ${accomodationType.toLowerCase()}`
    const image = selectRandomFileFromDirectory(`./img/${type.type}`)
    console.log('!!!!!!!!!!!!!!!', image, prompt)

    //Completion
    openai.Completion.create({
        engine: "davinci",
        prompt: prompt,
        temperature: 0.7,
        max_tokens: 1800,
        top_p: 1,
        frequency_penalty: 0.5,
        presence_penalty: 0,
        n: 1,
        stream: false,
        logprobs: null,
        echo: false,
        best_of: 1,
        stop: null,
    }).then((response) => {
        console.log(response.choices.length, response.choices)

        const output = `---
title: ${name}
description: ${prompt}...
date: ${dateString}
scheduled: ${dateString}
tags:
- ${type.type}
- ${name}
- ${accomodationType}
layout: layouts/post.njk
image: /img/${image}
---

${prompt}${response.choices[0].text}`

        fs.writeFileSync(`./posts/${name.replace(/ /g, '-')}.md`, output);
    });
})

