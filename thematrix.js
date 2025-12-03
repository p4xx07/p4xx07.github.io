class GeneChar {
    constructor(x, y, speed, first, opacity) {
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.first = first;
        this.opacity = opacity;
        this.value;
        this.switchInterval = round(random(2, 25));
    }

    setValue(value) {
        this.value = value;
    }

    rain() {
        this.y = (this.y >= height) ? 0 : this.y + this.speed;
    }
}


class Stream {
    constructor(length) {
        this.symbols = [];
        this.totalSymbols = length;
        this.speed = random(4, 8);
    }

    setPosition(x, y){
        var opacity = 255;
        var first = round(random(0, 4)) == 1;
        for (let i = 0; i < this.totalSymbols; i++) {
            const symbol = new GeneChar(x, y, this.speed, first, opacity);
            this.symbols.push(symbol);
            opacity -= (255 / this.totalSymbols) / fadeInterval;
            y -= symbolSize;
            first = false;
        }
    }

    setPhrase(phrase) {
        for(let i = 0; i < this.totalSymbols; i++){
            this.symbols[i].value = phrase[phrase.length -1 - i];
        }
    }

    render() {
        this.symbols.forEach(symbol => {
            if (symbol.first) {
                fill(140, 255, 170, symbol.opacity);
            }
            else {
                fill(0, 255, 70, symbol.opacity);
            }
            text(symbol.value, symbol.x, symbol.y);
            symbol.rain();
        });
    }
}
