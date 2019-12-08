var startPlazierung=1;
var anzahlRunden=2;
var anzahlHelden=0;
var anzahlHeldentot=0;
var klassenselect=0;
var heldennselect=0;
var farbselect=0;
var anzahlinklasse=8;
const imageHeight=25;
const imageWidth=25;
const anzahlKlassen=7;
const anzahlSpalten=4;
const schiebeMemory=3;
const beginnSchiebeMemory=6;
const optionenAnzahlPunkte=7;
const listeKlassen=["ALPHA", "JÄGER", "TECHNIKER", "HEILER", "WOLF", "GUARDIAN", "GLOREICHEN"];
const listeHeldennamen=[["BUCHHALTER", "CAPTAIN", "COLLECTOR","EL RAY","IRON","JAMES", "LONER", "RIDER"],["BLOOD","BRO","COLT","CONTRACTOR","DANCING QUEEN","FINISHER", "HAWK", "SHOOTER"],["EINSTEIN","FUNKER","GEIER","GUNNER","MISTER MATRUSCHKA","OPERATOR","PAWELSKY","SCOTTY"],["BABYFACE","COCAINE","CRAZY DOC","KOCH","OTTO","POISON","PSYCHO","VALERIAN"],["BANKIER","BLOODHOUND","BUDDY","DUSTY","FOX","MR TROPHY","NACHTEULE","SPEEDY"],["ANGEL","DAVID","DISTRACTOR","EAGLE EYE","GOLIATH","JOHNNY","SAVIOR","SPARTACUS"],["ADAM","CHAOS","STALKER","BIG BEN","B","C","D","E"]];
const farbListe=["Gelb", "Rot", "Grau", "Grün"];
const farbListeEnglisch=["yellow", "red", "gray", "green"];
const listeAktivPunkte= ["Keine Aktion 0", "Bewegung 3", "Luftballern 5", "Taktieren 6", "Körpertreffer 7", "Headshot 9", "Töten 12"];
const listeSpaltenNamen= [" Klasse ", " Nummer "," Held ", " Aktuelle Punktzahl ", " Nächste Runde ", "       ", " Runde -3 ", " Runde -2 ", " Runde -1 ", "       ", " Aktuelle Aktion ",  "       ", " Gesamtpunktzahl "];
const listeSpaltenNamentot= ["  Nummer  ", " Heldenname ", "    ", " Keine Aktion ", " Bewegung ", " Luftballern ", " Taktieren ", " Körpertreffer ", " Headshot ", " Töten ",  "       ", " Gesamtpunktzahl "];
const listeSpaltenNameninit=["  Nummer  ", " Heldenname ","    ","  Plazierung  ", "    ","  Up  ","    ","  Down  "];
const listeAktivPunkteZahl= [0,3,5,6,7,9,12];

class held {
    constructor(heldenName, farbe, aktuellePlazierung,heldenKlasse, nummerHeld) {
        this.nummerHeld = nummerHeld;
        this.heldenName = heldenName;
        this.farbe = farbe;
        this.heldenKlasse=heldenKlasse;
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

/* function heldHinzufuegen() {
   // Inputfeld öffnen
   var neuHeldenName = prompt("Heldenname");

   var neuHeldenFarbe= prompt("Farbe");
   var neuPlazierung= prompt("Plazierung");
   // Inputfeld öffnen

   var handleHeld = new held(neuHeldenName,neuHeldenFarbe,neuPlazierung);

   anzahlHelden=listeHelden.push(handleHeld);

   heldenListeSortieren();
   aktualisierungTabelle();

} */

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


    for (k=1; k<(listeHelden.length +1); k++) {
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

    var wert=statistikSelectUmwandlung(listeHelden[heldennummer].punkteDieseRunde);
    listeHelden[heldennummer].listeEinzelStatistik[wert] = listeHelden[heldennummer].listeEinzelStatistik[wert] +1;
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
    for (i=0; i< listeHelden.length ;i++){
        listeHelden[i].aktuellePlazierung=i+1;
    }

    aktualisierungTabelle();
    aktualisierungTabelletot();
    anzahlRunden=anzahlRunden +1;
    buttonid= "naechsterunde";
    var el = document.getElementById(buttonid);

    el.innerHTML= "Nächste Runde (" + anzahlRunden + ")";
    
}

function heldenAktualisieren(){
    for (i=0; i< listeHelden.length ;i++){
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
        
function teamGewaehlt(event){
    var teamNummerstr=event.target.id;
    teamNummer=parseInt(teamNummerstr.slice(10));
    farbselect=teamNummer;




    var t = document.createElement("SELECT");
    selectid= "klassenselect";
    t.setAttribute("id", selectid);

    var k=0;
    var op = document.createElement("option");
    op.setAttribute("value", k-1);
    var temp = document.createTextNode("Heldenklasse Auswählen");
    op.appendChild(temp);
    t.appendChild(op);


    for (k=1; k<(listeKlassen.length +1); k++) {
        var op = document.createElement("option");
        op.setAttribute("value", k-1);
        var temp = document.createTextNode(listeKlassen[k-1]);
        op.appendChild(temp);
        t.appendChild(op);
    }
    
    t.onchange = heldenkonkret;
    document.body.appendChild(t);



    

} 


function heldenkonkret(event){
    var selectwert=parseInt(event.target.value);
    klassenselect=selectwert;

    
    var t = document.createElement("SELECT");
    selectid= "heldselect";
    t.setAttribute("id", selectid);

    var k=0;
    var op = document.createElement("option");
    op.setAttribute("value", k-1);
    var temp = document.createTextNode("Heldennamen");
    op.appendChild(temp);
    t.appendChild(op);


    for (k=1; k<(anzahlinklasse +1); k++) {
        var op = document.createElement("option");
        op.setAttribute("value", k-1);
        var temp = document.createTextNode(listeHeldennamen[selectwert][k-1]);
        op.appendChild(temp);
        t.appendChild(op);
    }
    
    t.onchange = letztendlichHeldenzwischen;
    document.body.appendChild(t);


}

function letztendlichHeldenzwischen(event){
  var selectwert=parseInt(event.target.value);
  heldennselect=selectwert;

  
  var t = document.createElement("SELECT");
  selectid= "heldennummer";
  t.setAttribute("id", selectid);

  var k=0;
  var op = document.createElement("option");
  op.setAttribute("value", k-1);
  var temp = document.createTextNode("Heldennummer");
  op.appendChild(temp);
  t.appendChild(op);


  for (k=1; k<5; k++) {
      var op = document.createElement("option");
      op.setAttribute("value", k);
      var temp = document.createTextNode(k);
      op.appendChild(temp);
      t.appendChild(op);
  }
  
  t.onchange = letztendlichHelden;
  document.body.appendChild(t);


}

function letztendlichHelden(event){
    var selectwert=parseInt(event.target.value);

   


    var handleHeld = new held(listeHeldennamen[klassenselect][heldennselect],farbListeEnglisch[farbselect],startPlazierung,klassenselect,selectwert);

    anzahlHelden=listeHelden.push(handleHeld);
 
   
    startPlazierung=startPlazierung+1;
    
    selectid= "klassenselect";
    var el = document.getElementById(selectid);
    el.remove();


    selectid= "heldselect";
    var el = document.getElementById(selectid);
    el.remove();

    selectid= "heldennummer";
    var el = document.getElementById(selectid);
    el.remove();

    aktualisierungTabelleInit();

}

window.onload = function createAllElements() {
   
   for (i=0; i<farbListe.length; i++) {
        var btn = document.createElement("BUTTON");
        btn.innerHTML= "Team  " + farbListe[i];
          
        btn.onclick = teamGewaehlt;
        buttonid= "teambutton" + i;
        btn.setAttribute("id", buttonid);
        document.body.appendChild(btn);

   }
   var btn = document.createElement("BUTTON");
   btn.innerHTML= "Beginne Spiel";
     
   btn.onclick = starteSpiel;
   buttonid= "startbutton";
   btn.setAttribute("id", buttonid);
   document.body.appendChild(btn);

}

function starteSpiel(){
  if(confirm("Spiel starten?")){
    for (i=0; i<farbListe.length; i++) {
        buttonid= "teambutton" + i;
        
        if (document.getElementById(buttonid)) {
            var el = document.getElementById(buttonid);
            el.remove();
           }

   }
   buttonid= "startbutton";
   if (document.getElementById(buttonid)) {
    var el = document.getElementById(buttonid);
    el.remove();
   }
   if (document.getElementById("myTableinit")) {
    var el = document.getElementById("myTableinit");
    el.remove();
   }

   var btn = document.createElement("BUTTON");
   btn.innerHTML= "Held entfernen";
     
   btn.onclick = heldEntfernen;
   buttonid= "heldentfernen";
   btn.setAttribute("id", buttonid);
   document.body.appendChild(btn);

   var btn = document.createElement("BUTTON");
   btn.innerHTML= "Nächste Runde (" + anzahlRunden + ")";
     
   btn.onclick = rundeWeiter;
   buttonid= "naechsterunde";
   btn.setAttribute("id", buttonid);
   document.body.appendChild(btn);

   var btn = document.createElement("BUTTON");
   btn.innerHTML= "Spiel beenden";
     
   btn.onclick = spielBeenden;
   buttonid= "spielbeenden";
   btn.setAttribute("id", buttonid);
   document.body.appendChild(btn);


   aktualisierungTabelle();
  }
}

function spielBeenden(){
  if(confirm("Spiel beenden?")){
    while (listeHelden.length >0){
    heldenhandle=listeHelden.pop();
    
    var wert=statistikSelectUmwandlung(heldenhandle.punkteDieseRunde);
    heldenhandle.listeEinzelStatistik[wert] = heldenhandle.listeEinzelStatistik[wert] +1;
    listeHeldentot.push(heldenhandle);
    //console.log(listeHelden.length);
    anzahlHelden=anzahlHelden -1;
    
    }  
    
    aktualisierungTabelle();
    aktualisierungTabelletot();



  }

}


function aktualisierungTabelle() {
   if (document.getElementById("myTable")) {
    var el = document.getElementById("myTable");
    el.remove();
   }

if (listeHelden.length>0){
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


  for (i = 1; i < (listeHelden.length+1); i++) {
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
    


    
    var img = new Image();
    
    var bildName="Klasse" + listeHelden[i-1].heldenKlasse;
    img.src = bildName + ".png";
    img.height= imageHeight;
    img.width= imageWidth;

    document.getElementById(zeilenNr).appendChild(img);
    
    j=1;

    var z = document.createElement("TD");
    nummerfeldij= "feldnummer" + i + j;
    z.setAttribute("id", nummerfeldij);
    z.setAttribute("align","center");
    z.setAttribute("bgcolor",listeHelden[i-1].farbe);

    var thx = document.createTextNode(listeHelden[i-1].nummerHeld);
    z.appendChild(thx);
    document.getElementById(zeilenNr).appendChild(z);
    
    j=2;
    var z = document.createElement("TD");
    nummerfeldij= "feldnummer" + i + j;
    z.setAttribute("id", nummerfeldij);
    z.setAttribute("align","center");
    z.setAttribute("bgcolor",listeHelden[i-1].farbe);


    var t = document.createTextNode(listeHelden[i-1].heldenName);
    z.appendChild(t);
    document.getElementById(zeilenNr).appendChild(z); 


    j=3;

    var z = document.createElement("TD");
    nummerfeldij= "feldnummer" + i + j;
    z.setAttribute("id", nummerfeldij);
    z.setAttribute("align","center");
    z.setAttribute("bgcolor",listeHelden[i-1].farbe);
    //z.setAttribute("font-weight","bold");

    var thx = document.createTextNode(listeHelden[i-1].aktuellePunktZahl);
    //thx.setAttribute('font-weight','bold');
    z.appendChild(thx);
    document.getElementById(zeilenNr).appendChild(z);

    j=4;

    var z = document.createElement("TD");
    nummerfeldij= "feldnummer" + i + j;
    z.setAttribute("id", nummerfeldij);
    z.setAttribute("align","center");
    z.setAttribute("bgcolor",listeHelden[i-1].farbe);

    var thx = document.createTextNode(listeHelden[i-1].zukuenftigePunktZahl);
    z.appendChild(thx);
    document.getElementById(zeilenNr).appendChild(z);


    j=5;
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

    

    var thx = document.createTextNode(listeHelden[i-1].gesamtPunktZahl);
    z.appendChild(thx);
    document.getElementById(zeilenNr).appendChild(z);

  }

}


}



function aktualisierungTabelleInit() {
    if (document.getElementById("myTableinit")) {
        var el = document.getElementById("myTableinit");
        el.remove();
       }
   
  
  if (listeHelden.length>0) {
    var x = document.createElement("TABLE");
    x.setAttribute("id", "myTableinit");
    x.setAttribute("border", "1px solid black");
    x.setAttribute("cellPadding", "5px");
   
    document.body.appendChild(x);
  
  
    var i=0;
  
    var y = document.createElement("TR");
    zeilenNr = "zeilenNrinit" + i;
    
    y.setAttribute("id", zeilenNr);
    document.getElementById("myTableinit").appendChild(y);
  
   
    for (j=0; j< listeSpaltenNameninit.length; j++){
      var z = document.createElement("TD");
      z.setAttribute("align","center");
      nummerfeldij= "feldnummertot" + i + j;
      z.setAttribute("id", nummerfeldij);
  
      var t = document.createTextNode(listeSpaltenNameninit[j]);
      z.appendChild(t);
      document.getElementById(zeilenNr).appendChild(z);
    }
  
  
    for (i = 1; i < (listeHelden.length+1); i++) {
      var y = document.createElement("TR");
      zeilenNr = "zeilenNrinit" + i;
      
      y.setAttribute("id", zeilenNr);
      document.getElementById("myTableinit").appendChild(y);
  
      j=0;
      var z = document.createElement("TD");
      nummerfeldij= "feldnummerinit" + i + j;
      z.setAttribute("id", nummerfeldij);
      z.setAttribute("align","center");
      z.setAttribute("bgcolor",listeHelden[i-1].farbe);
  
  
      var t = document.createTextNode(listeHelden[i-1].nummerHeld);
      z.appendChild(t);
      document.getElementById(zeilenNr).appendChild(z);


      j=1;
      var z = document.createElement("TD");
      nummerfeldij= "feldnummerinit" + i + j;
      z.setAttribute("id", nummerfeldij);
      z.setAttribute("align","center");
      z.setAttribute("bgcolor",listeHelden[i-1].farbe);
  
  
      var t = document.createTextNode(listeHelden[i-1].heldenName);
      z.appendChild(t);
      document.getElementById(zeilenNr).appendChild(z);
  
      j=2;
      var z = document.createElement("TD");
      nummerfeldij= "feldnummerinit" + i + j;
      z.setAttribute("id", nummerfeldij);
      z.setAttribute("align","center");
      //z.setAttribute("bgcolor",listeHelden[i-1].farbe);
  
      var t = document.createTextNode("");
      z.appendChild(t);
      document.getElementById(zeilenNr).appendChild(z);
  
      
      
      
      
      j=3;
  
      
      var z = document.createElement("TD");
      nummerfeldij= "feldnummerinit" + i + j;
      z.setAttribute("id", nummerfeldij);
      z.setAttribute("align","center");
      z.setAttribute("bgcolor",listeHelden[i-1].farbe);
  
      var thx = document.createTextNode(listeHelden[i-1].aktuellePlazierung);
      z.appendChild(thx);
      document.getElementById(zeilenNr).appendChild(z);
      
      j=4;
      var z = document.createElement("TD");
      nummerfeldij= "feldnummerinit" + i + j;
      z.setAttribute("id", nummerfeldij);
      z.setAttribute("align","center");
      //z.setAttribute("bgcolor",listeHelden[i-1].farbe);
  
      var t = document.createTextNode("");
      z.appendChild(t);
      document.getElementById(zeilenNr).appendChild(z);

      j=5;
      var z = document.createElement("TD");
      nummerfeldij= "feldnummerinit" + i + j;
      z.setAttribute("id", nummerfeldij);
      z.setAttribute("align","center");
      //z.setAttribute("bgcolor",listeHelden[i-1].farbe);
  
      var t = document.createElement("BUTTON");

      buttonid= "upbutton" + i;
      t.setAttribute("id", buttonid);
      t.innerHTML="UP";
      
      t.onclick = upButton;
      
      document.getElementById(zeilenNr).appendChild(t);
     

      j=6;
      var z = document.createElement("TD");
      nummerfeldij= "feldnummerinit" + i + j;
      z.setAttribute("id", nummerfeldij);
      z.setAttribute("align","center");
      //z.setAttribute("bgcolor",listeHelden[i-1].farbe);
  
      var t = document.createTextNode("");
      z.appendChild(t);
      document.getElementById(zeilenNr).appendChild(z);

      j=7;
      var z = document.createElement("TD");
      nummerfeldij= "feldnummerinit" + i + j;
      z.setAttribute("id", nummerfeldij);
      z.setAttribute("align","center");
      //z.setAttribute("bgcolor",listeHelden[i-1].farbe);
  
      var t = document.createElement("BUTTON");

      buttonid= "downbutton" + i;
      t.setAttribute("id", buttonid);
      t.innerHTML="DOWN";
      
      t.onclick = downButton;
     
      document.getElementById(zeilenNr).appendChild(t);
  
    }
  
}
  
  
  }

function upButton(event){
    var nummerHeldstr=event.target.id;
    
    nummerHeld=parseInt(nummerHeldstr.slice(8));
    

    if (nummerHeld >1){
        listeHelden[nummerHeld-1].aktuellePlazierung = listeHelden[nummerHeld-1].aktuellePlazierung -1;
        listeHelden[nummerHeld-1].rangListenPunkteSort= listeHelden[nummerHeld-1].listeSchiebeMemory[0]+listeHelden[nummerHeld-1].listeSchiebeMemory[1]+listeHelden[nummerHeld-1].listeSchiebeMemory[2]+(1000-listeHelden[nummerHeld-1].aktuellePlazierung)/1000;

        listeHelden[nummerHeld-2].aktuellePlazierung = listeHelden[nummerHeld-2].aktuellePlazierung +1;
        listeHelden[nummerHeld-2].rangListenPunkteSort= listeHelden[nummerHeld-2].listeSchiebeMemory[0]+listeHelden[nummerHeld-2].listeSchiebeMemory[1]+listeHelden[nummerHeld-2].listeSchiebeMemory[2]+(1000-listeHelden[nummerHeld-2].aktuellePlazierung)/1000;
        
        heldenListeSortieren();
        aktualisierungTabelleInit();
       
    }

}


function downButton(event){
    var nummerHeldstr=event.target.id;
    
    nummerHeld=parseInt(nummerHeldstr.slice(10));
    

    if (nummerHeld < listeHelden.length){
        listeHelden[nummerHeld-1].aktuellePlazierung = listeHelden[nummerHeld-1].aktuellePlazierung +1;
        listeHelden[nummerHeld-1].rangListenPunkteSort= listeHelden[nummerHeld-1].listeSchiebeMemory[0]+listeHelden[nummerHeld-1].listeSchiebeMemory[1]+listeHelden[nummerHeld-1].listeSchiebeMemory[2]+(1000-listeHelden[nummerHeld-1].aktuellePlazierung)/1000;

        listeHelden[nummerHeld].aktuellePlazierung = listeHelden[nummerHeld].aktuellePlazierung -1;
        listeHelden[nummerHeld].rangListenPunkteSort= listeHelden[nummerHeld].listeSchiebeMemory[0]+listeHelden[nummerHeld].listeSchiebeMemory[1]+listeHelden[nummerHeld].listeSchiebeMemory[2]+(1000-listeHelden[nummerHeld].aktuellePlazierung)/1000;
        
        heldenListeSortieren();
        aktualisierungTabelleInit();
       
    }
    
}

  function aktualisierungTabelletot() {
    if (document.getElementById("myTabletot")) {
        var el = document.getElementById("myTabletot");
        el.remove();
       }
   
  
  if (listeHeldentot.length>0) {
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
  
  
    for (i = 1; i < (listeHeldentot.length+1); i++) {
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
  
  
      var t = document.createTextNode(listeHeldentot[i-1].nummerHeld);
      z.appendChild(t);
      document.getElementById(zeilenNr).appendChild(z);



      j=1;
      var z = document.createElement("TD");
      nummerfeldij= "feldnummertot" + i + j;
      z.setAttribute("id", nummerfeldij);
      z.setAttribute("align","center");
      z.setAttribute("bgcolor",listeHeldentot[i-1].farbe);
  
  
      var t = document.createTextNode(listeHeldentot[i-1].heldenName);
      z.appendChild(t);
      document.getElementById(zeilenNr).appendChild(z);
  
      j=2;
      var z = document.createElement("TD");
      nummerfeldij= "feldnummertot" + i + j;
      z.setAttribute("id", nummerfeldij);
      z.setAttribute("align","center");
      //z.setAttribute("bgcolor",listeHelden[i-1].farbe);
  
      var t = document.createTextNode("");
      z.appendChild(t);
      document.getElementById(zeilenNr).appendChild(z);
  
      for (j = 3; j < (listeHeldentot[i-1].listeEinzelStatistik.length+3); j++) {
          var z = document.createElement("TD");
          nummerfeldij= "feldnummertot" + i + j;
          z.setAttribute("id", nummerfeldij);
          z.setAttribute("align","center");
          z.setAttribute("bgcolor",listeHeldentot[i-1].farbe);
      
          var t = document.createTextNode(listeHeldentot[i-1].listeEinzelStatistik[j-3]);
          z.appendChild(t);
          document.getElementById(zeilenNr).appendChild(z);
      }
  
      j=listeHeldentot[i-1].listeEinzelStatistik.length+3;
      var z = document.createElement("TD");
      nummerfeldij= "feldnummertot" + i + j;
      z.setAttribute("id", nummerfeldij);
      z.setAttribute("align","center");
      //z.setAttribute("bgcolor",listeHelden[i-1].farbe);
  
      var t = document.createTextNode("");
      z.appendChild(t);
      document.getElementById(zeilenNr).appendChild(z);
      
      
      
      j=listeHeldentot[i-1].listeEinzelStatistik.length+4;
  
      
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

    var j=schiebeMemory+beginnSchiebeMemory+3;

    nummerfeldij= "feldnummer" + nummerHeld + j;

    t= document.getElementById(nummerfeldij);
    t.innerText=listeHelden[nummerHeld-1].zukuenftigePunktZahl;

    var j=schiebeMemory+beginnSchiebeMemory+5;

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
