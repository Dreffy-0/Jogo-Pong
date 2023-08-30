// Variáveis bolinha
let xBolinha = 300;
let yBolinha = 200;
let diametroBolinha = 13;
let raioBolinha = diametroBolinha / 2;

// Velocidade bolinha
let velocidadeXBolinha = 6;
let velocidadeYBolinha = 6;

// Variáveis raquete
let xRaquete = 5;
let yRaquete = 150;
let wRaquete = 10;
let hRaquete = 90;
let velocidadeRaquete = 10;

// Variáveis raquete oponente
let xRaqueteOponente = 585;
let yRaqueteOponente = 150;
let velocidadeYOponente;

// Variáveis globais
let colidiu = false;
let meusPontos = 0;
let pontosOponente = 0;

// Variáveis de audio
let raquetada;
let ponto;
let trilha;

function preload() {
    trilha = loadSound("./trilha.mp3");
    ponto = loadSound("./ponto.mp3");
    raquetada = loadSound("./raquetada.mp3");
}

function setup() {
    createCanvas(600, 400);
    trilha.loop();
}

function draw() {
    background(0);
    mostraBolinha();
    movimentaBolinha();
    verificaColisaoBorda();
    mostrarRaquete(xRaquete, yRaquete);
    mostrarRaquete(xRaqueteOponente, yRaqueteOponente);
    movimentaRaquete();
    movimentaRaqueteOponente();
    //verificaColisaoRaquete();
    colisaoRaqueteBiblioteca(xRaquete, yRaquete);
    colisaoRaqueteBiblioteca(xRaqueteOponente, yRaqueteOponente);
    placarJogo();
    marcaPonto();
}

function mostraBolinha() {
    circle(xBolinha, yBolinha, diametroBolinha);
}

function mostrarRaquete(x, y) {
    rect(x, y, wRaquete, hRaquete);
}

function movimentaBolinha() {
    xBolinha += velocidadeXBolinha;
    yBolinha += velocidadeYBolinha;
}

function movimentaRaquete() {
    if (keyIsDown(UP_ARROW)) {
        yRaquete -= velocidadeRaquete;
    }
    if (keyIsDown(DOWN_ARROW)) {
        yRaquete += velocidadeRaquete;
    }
    yRaquete = constrain(yRaquete, 0, 310);
}

function movimentaRaqueteOponente() {
    /*  
    if(keyIsDown(87)){
        yRaqueteOponente -= 10;
    }
    if (keyIsDown(83)){
        yRaqueteOponente += 10;
    }
    */
    velocidadeYOponente = yBolinha - yRaqueteOponente - wRaquete / 2 - 30;
    yRaqueteOponente += velocidadeYOponente;
    yRaqueteOponente = constrain(yRaqueteOponente, 0, 310);
}

function verificaColisaoBorda() {
    if (xBolinha + raioBolinha > width || xBolinha - raioBolinha < 0) {
        velocidadeXBolinha *= -1;
    }
    if (yBolinha + raioBolinha > height || yBolinha - raioBolinha < 0) {
        velocidadeYBolinha *= -1;
    }
}

function verificaColisaoRaquete() {
    let esquerdaBolinha = xBolinha - raioBolinha;
    let superiorBolinha = yBolinha - raioBolinha;
    let inferiorBolinha = yBolinha + raioBolinha;

    let direitaRaquete = xRaquete + wRaquete;
    let superiorRaquete = hRaquete;
    let inferiorRaquete = yRaquete + hRaquete;
    if (
        esquerdaBolinha < direitaRaquete &&
        superiorBolinha < inferiorRaquete &&
        inferiorBolinha > superiorRaquete
    ) {
        velocidadeXBolinha *= -1;
    }
}

function colisaoRaqueteBiblioteca(x, y) {
    colidiu = collideRectCircle(
        x,
        y,
        wRaquete,
        hRaquete,
        xBolinha,
        yBolinha,
        raioBolinha
    );
    if (colidiu) {
        velocidadeXBolinha *= -1;
        raquetada.play();
    }
}

function placarJogo() {
    stroke(255);
    textAlign(CENTER);
    textSize(16);
    fill(color(255, 140, 0));
    rect(130, 10, 40, 20);
    rect(430, 10, 40, 20);
    fill(255);
    text(meusPontos, 150, 26);
    text(pontosOponente, 450, 26);
}

function marcaPonto() {
    if (xBolinha > 590) {
        meusPontos += 1
        ponto.play();
    }
    if (xBolinha < 10) {
        pontosOponente += 1;
        ponto.play();
    }
}