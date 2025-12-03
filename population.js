
class Population {
    constructor(p, m, num) {
  
      this.population;
      this.matingPool;
      this.generations = 0;
      this.finished = false;
      this.target = p; 
      this.mutationRate = m;
      this.perfectScore = 1;
  
      this.best = "";
  
      this.population = [];
      for (let i = 0; i < num; i++) {
        this.population[i] = new DNA(this.target.length);
      }
      this.matingPool = [];
      this.calcFitness();
    }
  
    // Fill our fitness array with a value for every member of the population
    calcFitness() {
      for (let i = 0; i < this.population.length; i++) {
        this.population[i].calcFitness(target);
      }
    }
  
    // Generate a mating pool
    naturalSelection() {
      // Clear the ArrayList
      this.matingPool = [];
  
      let maxFitness = 0;
      for (let i = 0; i < this.population.length; i++) {
        if (this.population[i].fitness > maxFitness) {
          maxFitness = this.population[i].fitness;
        }
      }
  
      // Based on fitness, each member will get added to the mating pool a certain number of times
      // a higher fitness = more entries to mating pool = more likely to be picked as a parent
      // a lower fitness = fewer entries to mating pool = less likely to be picked as a parent
      for (let i = 0; i < this.population.length; i++) {
  
        let fitness = map(this.population[i].fitness, 0, maxFitness, 0, 1);
        let n = floor(fitness * 100); // Arbitrary multiplier, we can also use monte carlo method
        for (let j = 0; j < n; j++) { // and pick two random numbers
          this.matingPool.push(this.population[i]);
        }
      }
    }
  
    generate() {
      for (let i = 0; i < this.population.length; i++) {
        let a = floor(random(this.matingPool.length));
        let b = floor(random(this.matingPool.length));
        let partnerA = this.matingPool[a];
        let partnerB = this.matingPool[b];
        let child = partnerA.crossover(partnerB);
        child.mutate(this.mutationRate);
        this.population[i] = child;
      }
      this.generations++;
    }
  
    setToBest(){
      for(let i = 0; i < this.population.length; i++){
        for(let j = 0; j < this.population[i].genes.length; j++){
          this.population[i].genes[j] = this.best[j];
        }
      }
    }

    getBest() {
      return this.best;
    }
  
    evaluate() {
      let worldrecord = 0.0;
      let index = 0;
      for (let i = 0; i < this.population.length; i++) {
        if (this.population[i].fitness > worldrecord) {
          index = i;
          worldrecord = this.population[i].fitness;
        }
      }
  
      this.best = this.population[index].getPhrase();
      if (worldrecord === this.perfectScore) {
        this.finished = true;
      }
    }
  
    isFinished() {
      return this.finished;
    }
  
    getGenerations() {
      return this.generations;
    }
  
    getAverageFitness() {
      let total = 0;
      for (let i = 0; i < this.population.length; i++) {
        total += this.population[i].fitness;
      }
      return total / (this.population.length);
    }

    allPhrasesArray(){
      return this.population.map(m => m.genes.join(""));
    }
  
    allPhrases() {
      let everything = "";
  
      let displayLimit = min(this.population.length, 50);
  
  
      for (let i = 0; i < displayLimit; i++) {
        everything += this.population[i].getPhrase() + "<br>";
      }
      return everything;
    }
  }