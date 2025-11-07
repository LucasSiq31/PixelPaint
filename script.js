//Variavel da cor padrão
let cor_pixel = "preto";

//Func que seleciona a cor
function cor(nome, elemento) {

    document.getElementById("personalizado").style.display = "none"

    cor_pixel = nome;

    // remove 'selected' de todos os botões de cor
    document.querySelectorAll('.cores div').forEach(div => {
        div.classList.remove('selected');
    });

    // adiciona 'selected' apenas ao clicado
    elemento.classList.add('selected');
}

//Habilita a função de cor personalizada
function personalizado(){
    document.getElementById("personalizado").style.display = "flex";

    document.querySelectorAll('.cores div').forEach(div => {
        div.classList.remove('selected');
    });

    document.getElementById("gradiente").classList.add('selected');
}

//Salva a cor personalizada cadastrada pelo usuário
function corPerso(){
    cor_pixel = document.getElementById("perso").value
    document.getElementById("confirm").style.backgroundColor = cor_pixel
}

//Func que cria os píxels
function criar(){
    //Desabilita o menu
    document.getElementById("fundo").style.display = "none"

    //Seleciona altura e largura
    largura = document.getElementById('largura').value
    
    //Corrige os tamanhos
    if(largura > 50){
        largura = 50;
    }else if(largura < 1){
        largura = 1;
    }

    altura = (35* largura)/50
    novaAlt = Math.ceil(altura)

    console.log(novaAlt)

    //Define a qtd total de pixeis
    qtd_pixels = largura * novaAlt
    const pixels = document.getElementById("pixels");

    //Calcula o tamanho de cada pixel
    tamanho = 800/largura

    //Variável para guardar os pixels
    html = ""

    //Gerando os pixels
    for (let i = 0; i < qtd_pixels; i++) {
        id = i + 1

        html += `<div 
            class='pixel' 
            id='${id}' 
            onmousedown='pinta(${id})'
            onmouseover='arrasta(${id})'
            style='width:calc(100% / ${largura});aspect-ratio: 1 / 1;'>
        </div>`;
    }

    //Insere os pixels na página
    pixels.innerHTML = html
}

//Função de pincel
let desenhando = false;

document.addEventListener("mousedown", () => desenhando = true);
document.addEventListener("mouseup", () => desenhando = false);

//Função para pintar
function pinta(id) {
    if (cor_pixel.startsWith("#")) {
        document.getElementById(id).style.backgroundColor = cor_pixel
    } else {
        document.getElementById(id).style.backgroundColor = ""
        document.getElementById(id).className = `pixel ${cor_pixel}`;
    }
}

//Função que emite a pintura ao passar o mouse clicando
function arrasta(id) {
  if (desenhando) {
    pinta(id);
  }
}

//Função para remover a borda dos pixels
function removerBorda() {
    const pixels = document.querySelectorAll(".pixel");
    pixels.forEach(pixel => {
            pixel.style.border = pixel.style.border ? "" : "1px solid transparent";
    });
}

//Baixar a arte
function baixarImagem() {
    const pixels = document.querySelectorAll(".pixel");
    pixels.forEach(pixel => {
            pixel.style.border = "1px solid transparent";
    });
    
    const div = document.getElementById("pixels");
      
    html2canvas(div).then(canvas => {
        const link = document.createElement("a");
        link.download = "minha-arte.png";
        link.href = canvas.toDataURL("image/png");
        link.click();
    });
}
