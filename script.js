var anzahlHelden=0;
var anzahlHeldentot=0;
const anzahlSpalten=4;
const schiebeMemory=3;
const beginnSchiebeMemory=2;
const optionenAnzahlPunkte=7;
const listeAktivPunkte= ["Keine Aktion 0", "Bewegung 3", "Luftballern 5", "Taktieren 6", "Körpertreffer 7", "Headshot 9", "Töten 12"];
const listeSpaltenNamen= [" Heldenname ", "    ", " Vorvorletzte Runde ", " Vorletzte Runde ", " Letzte Runde ", "    ", " Aktuelle Punktzahl ", "       ", " Aktuelle Aktion " , "       ", " Nächste Runde ",  "       ", " Gesamtpunktzahl "];
const listeSpaltenNamentot= [" Heldenname ", "    ", " Keine Aktion ", " Bewegung ", " Luftballern ", " Taktieren ", " Körpertreffer ", " Headshot ", " Töten ",  "       ", " Gesamtpunktzahl "];
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
        this.gesamtPunktZahl=0;
        this.gesamtPunktZahlalt=0;
        this.listeEinzelStatistik=[];
        var i=0;
        for (i=0; i<listeAktivPunkte.length;i++){
            this.listeEinzelStatistik.push(0);
            
        }
        this.aktivToken=true;
        this.lebend=true;
      }

}
var listeHelden = [];
var listeHeldentot = [];

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
    var t = document.createElement("SELECT");
    selectid= "toetenselect";
    t.setAttribute("id", selectid);

    var k=0;
    var op = document.createElement("option");
    op.setAttribute("value", k-1);
    var temp = document.createTextNode("Held auswählen");
    op.appendChild(temp);
    t.appendChild(op);


    for (k=1; k<(anzahlHelden +1); k++) {
        var op = document.createElement("option");
        op.setAttribute("value", k-1);
        var temp = document.createTextNode(listeHelden[k-1].heldenName);
        op.appendChild(temp);
        t.appendChild(op);
    }
    
    t.onchange = heldtot;
    document.body.appendChild(t);
    
    
}

function heldtot(event) {
    var heldennummer=parseInt(event.target.value);

    
    var listeHeldenNeu = [];
    listeHeldenNeu= listeHelden.slice(0,heldennummer).concat( listeHelden.slice(heldennummer+1) );
    anzahlHeldentot=listeHeldentot.push(listeHelden[heldennummer]);
    listeHelden=listeHeldenNeu;
    anzahlHelden=anzahlHelden -1;
    
    var el = document.getElementById("toetenselect");
    el.remove();

    heldenListeSortieren();
    aktualisierungTabelle();
    aktualisierungTabelletot();
}


function rundeWeiter(){
    heldenAktualisieren();
    heldenListeSortieren();
    for (i=0; i< anzahlHelden;i++){
        listeHelden[i].aktuellePlazierung=i+1;
    }

    aktualisierungTabelle();
    aktualisierungTabelletot();
    
}

function heldenAktualisieren(){
    for (i=0; i< anzahlHelden;i++){
        listeHelden[i].listeSchiebeMemory[0] =  listeHelden[i].listeSchiebeMemory[1];
        listeHelden[i].listeSchiebeMemory[1] =  listeHelden[i].listeSchiebeMemory[2];
        listeHelden[i].listeSchiebeMemory[2] =  listeHelden[i].punkteDieseRunde;
        var wert=statistikSelectUmwandlung(listeHelden[i].punkteDieseRunde);
        listeHelden[i].listeEinzelStatistik[wert] = listeHelden[i].listeEinzelStatistik[wert] +1;

        listeHelden[i].punkteDieseRunde=0;
        listeHelden[i].aktuellePunktZahl=listeHelden[i].listeSchiebeMemory[0]+listeHelden[i].listeSchiebeMemory[1]+listeHelden[i].listeSchiebeMemory[2];
        listeHelden[i].zukuenftigePunktZahl=listeHelden[i].punkteDieseRunde+listeHelden[i].listeSchiebeMemory[1]+listeHelden[i].listeSchiebeMemory[2];
        listeHelden[i].rangListenPunkteSort= listeHelden[i].listeSchiebeMemory[0]+listeHelden[i].listeSchiebeMemory[1]+listeHelden[i].listeSchiebeMemory[2]+(1000-listeHelden[i].aktuellePlazierung)/1000;
        listeHelden[i].aktivToken=true;
        listeHelden[i].gesamtPunktZahlalt=listeHelden[i].gesamtPunktZahl;

    }

}
        
   

window.onload = function createAllElements() {
    var x = document.createElement("TABLE");
    x.setAttribute("id", "myTable");
    document.body.appendChild(x);

    var x = document.createElement("TABLE");
    x.setAttribute("id", "myTabletot");
    document.body.appendChild(x);


}

function aktualisierungTabelle() {
   if (document.getElementById("myTable")) {
    var el = document.getElementById("myTable");
    el.remove();
   }

if (anzahlHelden>0){
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
    //z.setAttribute("bgcolor",listeHelden[i-1].farbe);

    var t = document.createTextNode("");
    z.appendChild(t);
    document.getElementById(zeilenNr).appendChild(z);
    
    
    
    j=schiebeMemory+beginnSchiebeMemory+1;

    var z = document.createElement("TD");
    nummerfeldij= "feldnummer" + i + j;
    z.setAttribute("id", nummerfeldij);
    z.setAttribute("align","center");
    z.setAttribute("bgcolor",listeHelden[i-1].farbe);

    var thx = document.createTextNode(listeHelden[i-1].aktuellePunktZahl);
    z.appendChild(thx);
    document.getElementById(zeilenNr).appendChild(z);

    j=schiebeMemory+beginnSchiebeMemory+2;
    var z = document.createElement("TD");
    nummerfeldij= "feldnummer" + i + j;
    z.setAttribute("id", nummerfeldij);
    z.setAttribute("align","center");
    //z.setAttribute("bgcolor",listeHelden[i-1].farbe);

    var t = document.createTextNode("");
    z.appendChild(t);
    document.getElementById(zeilenNr).appendChild(z);

    
    j=schiebeMemory+beginnSchiebeMemory+3;

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
        if (listeAktivPunkteZahl[k]==listeHelden[i-1].punkteDieseRunde){
            op.setAttribute("selected", "selected");

        }
        var temp = document.createTextNode(listeAktivPunkte[k]);
        op.appendChild(temp);
        t.appendChild(op);
    
    }
    t.onchange = select_gewaehlt;
    document.getElementById(zeilenNr).appendChild(t);

    j=schiebeMemory+beginnSchiebeMemory+4;
    var z = document.createElement("TD");
    nummerfeldij= "feldnummer" + i + j;
    z.setAttribute("id", nummerfeldij);
    z.setAttribute("align","center");
    //z.setAttribute("bgcolor",listeHelden[i-1].farbe);

    var t = document.createTextNode("");
    z.appendChild(t);
    document.getElementById(zeilenNr).appendChild(z);


    j=schiebeMemory+beginnSchiebeMemory+5;

    var z = document.createElement("TD");
    nummerfeldij= "feldnummer" + i + j;
    z.setAttribute("id", nummerfeldij);
    z.setAttribute("align","center");
    z.setAttribute("bgcolor",listeHelden[i-1].farbe);

    var thx = document.createTextNode(listeHelden[i-1].zukuenftigePunktZahl);
    z.appendChild(thx);
    document.getElementById(zeilenNr).appendChild(z);

    j=schiebeMemory+beginnSchiebeMemory+6;
    var z = document.createElement("TD");
    nummerfeldij= "feldnummer" + i + j;
    z.setAttribute("id", nummerfeldij);
    z.setAttribute("align","center");
    //z.setAttribute("bgcolor",listeHelden[i-1].farbe);

    var t = document.createTextNode("");
    z.appendChild(t);
    document.getElementById(zeilenNr).appendChild(z);


    j=schiebeMemory+beginnSchiebeMemory+7;

    var z = document.createElement("TD");
    nummerfeldij= "feldnummer" + i + j;
    z.setAttribute("id", nummerfeldij);
    z.setAttribute("align","center");
    z.setAttribute("bgcolor",listeHelden[i-1].farbe);

    var thx = document.createTextNode(listeHelden[i-1].gesamtPunktZahl);
    z.appendChild(thx);
    document.getElementById(zeilenNr).appendChild(z);

  }

}


}



function aktualisierungTabelletot() {
    if (document.getElementById("myTabletot")) {
        var el = document.getElementById("myTabletot");
        el.remove();
       }
   
  
  if (anzahlHeldentot>0) {
    var x = document.createElement("TABLE");
    x.setAttribute("id", "myTabletot");
    x.setAttribute("border", "1px solid black");
    x.setAttribute("cellPadding", "5px");
   
    document.body.appendChild(x);
  
  
    var i=0;
  
    var y = document.createElement("TR");
    zeilenNr = "zeilenNrtot" + i;
    
    y.setAttribute("id", zeilenNr);
    document.getElementById("myTabletot").appendChild(y);
  
   
    for (j=0; j< listeSpaltenNamentot.length; j++){
      var z = document.createElement("TD");
      z.setAttribute("align","center");
      nummerfeldij= "feldnummertot" + i + j;
      z.setAttribute("id", nummerfeldij);
  
      var t = document.createTextNode(listeSpaltenNamentot[j]);
      z.appendChild(t);
      document.getElementById(zeilenNr).appendChild(z);
    }
  
  
    for (i = 1; i < (anzahlHeldentot+1); i++) {
      var y = document.createElement("TR");
      zeilenNr = "zeilenNrtot" + i;
      
      y.setAttribute("id", zeilenNr);
      document.getElementById("myTabletot").appendChild(y);
  
      j=0;
      var z = document.createElement("TD");
      nummerfeldij= "feldnummertot" + i + j;
      z.setAttribute("id", nummerfeldij);
      z.setAttribute("align","center");
      z.setAttribute("bgcolor",listeHeldentot[i-1].farbe);
  
  
      var t = document.createTextNode(listeHeldentot[i-1].heldenName);
      z.appendChild(t);
      document.getElementById(zeilenNr).appendChild(z);
  
      j=1;
      var z = document.createElement("TD");
      nummerfeldij= "feldnummertot" + i + j;
      z.setAttribute("id", nummerfeldij);
      z.setAttribute("align","center");
      //z.setAttribute("bgcolor",listeHelden[i-1].farbe);
  
      var t = document.createTextNode("");
      z.appendChild(t);
      document.getElementById(zeilenNr).appendChild(z);
  
      for (j = 2; j < (listeHeldentot[i-1].listeEinzelStatistik.length+2); j++) {
          var z = document.createElement("TD");
          nummerfeldij= "feldnummertot" + i + j;
          z.setAttribute("id", nummerfeldij);
          z.setAttribute("align","center");
          z.setAttribute("bgcolor",listeHeldentot[i-1].farbe);
      
          var t = document.createTextNode(listeHeldentot[i-1].listeEinzelStatistik[j-2]);
          z.appendChild(t);
          document.getElementById(zeilenNr).appendChild(z);
      }
  
      j=listeHeldentot[i-1].listeEinzelStatistik.length+2;
      var z = document.createElement("TD");
      nummerfeldij= "feldnummertot" + i + j;
      z.setAttribute("id", nummerfeldij);
      z.setAttribute("align","center");
      //z.setAttribute("bgcolor",listeHelden[i-1].farbe);
  
      var t = document.createTextNode("");
      z.appendChild(t);
      document.getElementById(zeilenNr).appendChild(z);
      
      
      
      j=listeHeldentot[i-1].listeEinzelStatistik.length+3;
  
      
      var z = document.createElement("TD");
      nummerfeldij= "feldnummertot" + i + j;
      z.setAttribute("id", nummerfeldij);
      z.setAttribute("align","center");
      z.setAttribute("bgcolor",listeHeldentot[i-1].farbe);
  
      var thx = document.createTextNode(listeHeldentot[i-1].gesamtPunktZahl);
      z.appendChild(thx);
      document.getElementById(zeilenNr).appendChild(z);
  
    }
  
}
  
  
  }

function select_gewaehlt(event) {


    var nummerHeldstr=event.target.id;
    nummerHeld=parseInt(nummerHeldstr.slice(12));
    //console.log(nummerHeld);

    var selectwert=parseInt(event.target.value);

    
    
    listeHelden[nummerHeld-1].punkteDieseRunde=selectwert;
    listeHelden[nummerHeld-1].zukuenftigePunktZahl= listeHelden[nummerHeld-1].punkteDieseRunde+listeHelden[nummerHeld-1].listeSchiebeMemory[1]+listeHelden[nummerHeld-1].listeSchiebeMemory[2];
    listeHelden[nummerHeld-1].gesamtPunktZahl=listeHelden[nummerHeld-1].gesamtPunktZahlalt+selectwert;

    var j=schiebeMemory+beginnSchiebeMemory+5;

    nummerfeldij= "feldnummer" + nummerHeld + j;

    t= document.getElementById(nummerfeldij);
    t.innerText=listeHelden[nummerHeld-1].zukuenftigePunktZahl;

    var j=schiebeMemory+beginnSchiebeMemory+7;

    nummerfeldij= "feldnummer" + nummerHeld + j;

    t= document.getElementById(nummerfeldij);
    t.innerText=listeHelden[nummerHeld-1].gesamtPunktZahl;
}

function statistikSelectUmwandlung(wert){
    listeAktivPunkteZahl[1]
    switch (wert) {
        case listeAktivPunkteZahl[0]:
                return 0;
        
        case listeAktivPunkteZahl[1]:
                return 1;
        
        case listeAktivPunkteZahl[2]:
                return 2;
        
        case listeAktivPunkteZahl[3]:
                return 3;

        case listeAktivPunkteZahl[4]:
                return 4;

        case listeAktivPunkteZahl[5]:
                return 5;

        case listeAktivPunkteZahl[6]:
                return 6;
          
      }
}



