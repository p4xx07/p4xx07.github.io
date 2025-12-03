
let target;
let popmax;
let mutationRate;
let population;

let bestPhrase;
let allPhrases;
let stats;

streams = [];
let fadeInterval = 1.6;
let symbolSize = 30;

let finished = false;

function setup() {
    geneticSetup();
    matrixSetup();
}

function matrixSetup() {
    createCanvas(window.innerWidth, window.innerHeight);
    background(0);
    var x = 0;
    for (var i = 0; i <= width / symbolSize; i++) {
        var stream = new Stream(target.length);
        stream.setPosition(x, random(-2000, 0));
        streams.push(stream);
        x += symbolSize
    }
    textFont('Consolas');
    textSize(symbolSize);
}

function geneticSetup() {
    target = "Genetic Algorithm";
    popmax = 500;
    mutationRate = 0.01;
    population = new Population(target, mutationRate, popmax);
}

function draw() {
    // Generate mating pool
    population.naturalSelection();
    //Create next generation
    population.generate();
    // Calculate fitness
    population.calcFitness();

    population.evaluate();

    // If we found the target phrase, stop
    if (population.isFinished()) {
        if(!finished){
            console.log(`${population.generations} - ${population.best}`);
            finished = true;
        }
        population.setToBest();
    }
    else{
        console.log(`${population.generations} - ${population.best}`);
    }

    background(0, 150);
    streams.forEach(stream =>  {
        const phrase = random(population.allPhrasesArray())
        stream.setPhrase(phrase)
        stream.render();
    });
}