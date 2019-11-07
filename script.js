var anzahlHelden=0;
const anzahlSpalten=4;
const schiebeMemory=3;
const beginnSchiebeMemory=2;
const optionenAnzahlPunkte=7;
const listeAktivPunkte= ["Keine Aktion 0", "Bewegung 3", "Luftballern 5", "Taktieren 6", "Körpertreffer 7", "Headshot 9", "Töten 12"];
const listeSpaltenNamen= [" Aktivtoken ", " Heldenname ", " Dritte Runde ", " Zweite Runde ", " Erste Runde ", " Aktuelle Punktzahl ", " Aktuelle Aktion ", " Nächste Runde "];
const listeAktivPunkteZahl= [0,3,5,6,7,9,12];

class held {
    constructor(heldenName, farbe, aktuellePlazierung) {
        this.heldenName = heldenName;
        this.farbe = farbe;
        this.listeSchiebeMemory = [0,0,0];
        this.aktuellePlazierung = aktuellePlazierung;
        this.punkteDieseRunde=0;
        this.rangListenPunkteSort= this.listeSchiebeMemory[0]+this.listeSchiebeMemory[1]+this.listeSchiebeMemory[2]+(1000-aktuellePlazierung)/1000;
        this.aktuellePunktZahl=this.listeSchiebeMemory[0]+this.listeSchiebeMemory[1]+this.listeSchiebeMemory[2];
        this.zukuenftigePunktZahl= this.punkteDieseRunde+this.listeSchiebeMemory[1]+this.listeSchiebeMemory[2];
        this.aktivToken=true;
        this.lebend=true;
      }

}
var listeHelden = [];

function heldHinzufuegen() {
   // Inputfeld öffnen
   var neuHeldenName = prompt("Heldenname");

   var neuHeldenFarbe= prompt("Farbe");
   var neuPlazierung= prompt("Plazierung");
   // Inputfeld öffnen

   var handleHeld = new held(neuHeldenName,neuHeldenFarbe,neuPlazierung);

   anzahlHelden=listeHelden.push(handleHeld);

   heldenListeSortieren();
   aktualisierungTabelle();

}

function heldenListeSortieren(){
    listeHelden.sort(function(a,b){
        return  b.rangListenPunkteSort - a.rangListenPunkteSort;
    })
}

function heldEntfernen() {


}


function rundeWeiter(){
    heldenAktualisieren();
    heldenListeSortieren();
    for (i=0; i< anzahlHelden;i++){
        listeHelden[i].aktuellePlazierung=i+1;
    }

    aktualisierungTabelle();
    
}

function heldenAktualisieren(){
    for (i=0; i< anzahlHelden;i++){
        listeHelden[i].listeSchiebeMemory[0] =  listeHelden[i].listeSchiebeMemory[1];
        listeHelden[i].listeSchiebeMemory[1] =  listeHelden[i].listeSchiebeMemory[2];
        listeHelden[i].listeSchiebeMemory[2] =  listeHelden[i].punkteDieseRunde;
        listeHelden[i].punkteDieseRunde=0;
        listeHelden[i].aktuellePunktZahl=listeHelden[i].listeSchiebeMemory[0]+listeHelden[i].listeSchiebeMemory[1]+listeHelden[i].listeSchiebeMemory[2];
        listeHelden[i].zukuenftigePunktZahl=listeHelden[i].punkteDieseRunde+listeHelden[i].listeSchiebeMemory[1]+listeHelden[i].listeSchiebeMemory[2];
        listeHelden[i].rangListenPunkteSort= listeHelden[i].listeSchiebeMemory[0]+listeHelden[i].listeSchiebeMemory[1]+listeHelden[i].listeSchiebeMemory[2]+(1000-listeHelden[i].aktuellePlazierung)/1000;
        listeHelden[i].aktivToken=true;

    }

}
        
        

window.onload = function createAllElements() {
    var x = document.createElement("TABLE");
    x.setAttribute("id", "myTable");
    document.body.appendChild(x);


}

function aktualisierungTabelle() {
  var el = document.getElementById("myTable");
  el.remove();


  var x = document.createElement("TABLE");
  x.setAttribute("id", "myTable");
  x.setAttribute("border", "1px solid black");
  x.setAttribute("cellPadding", "5px");
 
  document.body.appendChild(x);


  var i=0;

  var y = document.createElement("TR");
  zeilenNr = "zeilenNr" + i;
  
  y.setAttribute("id", zeilenNr);
  document.getElementById("myTable").appendChild(y);

 
  for (j=0; j< listeSpaltenNamen.length; j++){
    var z = document.createElement("TD");
    z.setAttribute("align","center");
    nummerfeldij= "feldnummer" + i + j;
    z.setAttribute("id", nummerfeldij);

    var t = document.createTextNode(listeSpaltenNamen[j]);
    z.appendChild(t);
    document.getElementById(zeilenNr).appendChild(z);
  }


  for (i = 1; i < (anzahlHelden+1); i++) {
    var y = document.createElement("TR");
    zeilenNr = "zeilenNr" + i;
    
    y.setAttribute("id", zeilenNr);
    document.getElementById("myTable").appendChild(y);

    j=0;
    var z = document.createElement("TD");
    nummerfeldij= "feldnummer" + i + j;
    z.setAttribute("id", nummerfeldij);
    z.setAttribute("align","center");
    z.setAttribute("bgcolor",listeHelden[i-1].farbe);


    var t = document.createTextNode(listeHelden[i-1].heldenName);
    z.appendChild(t);
    document.getElementById(zeilenNr).appendChild(z);

    j=1;
    var z = document.createElement("TD");
    nummerfeldij= "feldnummer" + i + j;
    z.setAttribute("id", nummerfeldij);
    z.setAttribute("align","center");
    //z.setAttribute("bgcolor",listeHelden[i-1].farbe);

    var t = document.createTextNode("");
    z.appendChild(t);
    document.getElementById(zeilenNr).appendChild(z);

    for (j = beginnSchiebeMemory; j < (schiebeMemory+beginnSchiebeMemory); j++) {
        var z = document.createElement("TD");
        nummerfeldij= "feldnummer" + i + j;
        z.setAttribute("id", nummerfeldij);
        z.setAttribute("align","center");
        z.setAttribute("bgcolor",listeHelden[i-1].farbe);
    
        var t = document.createTextNode(listeHelden[i-1].listeSchiebeMemory[j-beginnSchiebeMemory]);
        z.appendChild(t);
        document.getElementById(zeilenNr).appendChild(z);
    }

    j=schiebeMemory+beginnSchiebeMemory;

    var z = document.createElement("TD");
    nummerfeldij= "feldnummer" + i + j;
    z.setAttribute("id", nummerfeldij);
    z.setAttribute("align","center");
    z.setAttribute("bgcolor",listeHelden[i-1].farbe);

    var thx = document.createTextNode(listeHelden[i-1].aktuellePunktZahl);
    z.appendChild(thx);
    document.getElementById(zeilenNr).appendChild(z);

    
    j=schiebeMemory+beginnSchiebeMemory+1;

    var z = document.createElement("TD");
    nummerfeldij= "feldnummer" + i + j;
    z.setAttribute("id", nummerfeldij);
    z.setAttribute("align","center");
    z.setAttribute("bgcolor",listeHelden[i-1].farbe);

    var t = document.createElement("SELECT");

    selectid= "selectbutton" + i;
    t.setAttribute("id", selectid);
    
    
    for (k=0; k<optionenAnzahlPunkte; k++) {
        var op = document.createElement("option");
        op.setAttribute("value", listeAktivPunkteZahl[k]);
        var temp = document.createTextNode(listeAktivPunkte[k]);
        op.appendChild(temp);
        t.appendChild(op);
    
    }
    t.onchange = select_gewaehlt;
    document.getElementById(zeilenNr).appendChild(t);

     
    j=schiebeMemory+beginnSchiebeMemory+2;

    var z = document.createElement("TD");
    nummerfeldij= "feldnummer" + i + j;
    z.setAttribute("id", nummerfeldij);
    z.setAttribute("align","center");
    z.setAttribute("bgcolor",listeHelden[i-1].farbe);

    var thx = document.createTextNode(listeHelden[i-1].zukuenftigePunktZahl);
    z.appendChild(thx);
    document.getElementById(zeilenNr).appendChild(z);


  }




}

function select_gewaehlt(event) {


    var nummerHeldstr=event.target.id;
    nummerHeld=parseInt(nummerHeldstr.slice(12));
    console.log(nummerHeld);

    var selectwert=parseInt(event.target.value);

    
    
    listeHelden[nummerHeld-1].punkteDieseRunde=selectwert;
    listeHelden[nummerHeld-1].zukuenftigePunktZahl= listeHelden[nummerHeld-1].punkteDieseRunde+listeHelden[nummerHeld-1].listeSchiebeMemory[1]+listeHelden[nummerHeld-1].listeSchiebeMemory[2];


    var j=schiebeMemory+beginnSchiebeMemory+2;

    nummerfeldij= "feldnummer" + nummerHeld + j;

    t= document.getElementById(nummerfeldij);
    t.innerText=listeHelden[nummerHeld-1].zukuenftigePunktZahl;
}


