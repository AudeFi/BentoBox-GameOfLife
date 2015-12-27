// game over quand pas aléatoire
// jaue dépasse si depasse 
// refaire totoro bord blanc autour et plus net

console.clear();

var VivantAutour = 0;
var vitesse = 1000;
var myTimer;
var myChrono;
var palette = 8;
var grille = document.getElementById("grille");
var etat1 = new Array ();
var etat2 = new Array ();
var a = 26; 
var b = 36;
iniTab (a, b);
affichage(etat1, a, b);
actualisation(etat1, a, b);
reset1();

/*var pause = false;*/
var typejeu = 0;
// 0 = classique , 1 = score limité , 2 = temps limité
var playpause = 1;
// 0 = jeu en cours , 1 = jeu en pause
var reset = 0;
// 0 = pas de reset , 1 = reset vient d'etre fait

var compteurscore = 0;
var compteurtour = 0;
var compteurvie; // Compteur qui verifie à chaque generation le nombre de cellule vivante et si aucune, fin de jeu
var highscore1=10000000; // Pour le jeu type 1, score limité avec le meilleur temps possible
var highscore2=(-2000); // Pour le jeu type 2, temps limité et meilleur score à faire

var chrono;

var seconde=0;
var minute=0;
document.getElementById("chrono").innerHTML="0"+minute+" : 0"+seconde;

var chrono="fin";
var scoretemps;

document.getElementById("fenetreHighscore").innerHTML= "HighScore: -";

var w = 0;
/*setInterval("prog()", 10);*/

//-----------------------------------------------------------------------------------------------------------------------------//
//-----------------------------------------------------------------------------------------------------------------------------//
//-----------------------------------------------------------------------------------------------------------------------------//
//-----------------------------------------------------------------------------------------------------------------------------//
//-----------------------------------------------------------------------------------------------------------------------------//




function start()
{
    playpause = 0;
    
    var element = document.getElementById("butStart");
    element.setAttribute("class", "off");
    var element = document.getElementById("butPause");
    element.setAttribute("class", "on1");
    
    var element = document.getElementById("fenetrePause");
    element.setAttribute("class", "fenetreinvisible");
    
    if (reset==0)
    {
        chronometre();
        reset=1;
        compteurscore = 0; // Remet à 0 le compteur de score
        
        var alea = document.getElementById("alea").checked; // Recupère si la case aléatoire est cochée
        if (alea==true && typejeu==0 || typejeu==1 || typejeu==2) // Aléatoire selon le mode de jeu et si case cochée
        {
            for (var i=0; i<a; i++)
            {
                for (var j=0; j<b; j++)
                {
                    etat1[i][j] = Math.round(Math.random()); // Rempli le tableau d'états initials aléatoire
                }
            }
        }
        
        if (typejeu!=0)
        {
            vitesse = 1000;
            document.getElementById("curseur").setAttribute('value', '1000');
        }
        
        var y = document.getElementById("jauge");
        y.style.height= "0px";
        
         myTimer = setInterval("run()", vitesse);
    }
}


function pause()
{
    var element = document.getElementById("butStart");
    element.setAttribute("class", "on1");
    var element = document.getElementById("butPause");
    element.setAttribute("class", "off");
    
    // Fenetre qui s'affiche devant
    var element = document.getElementById("fenetrePause");
    element.setAttribute("class", "fenetrevisible");
    document.getElementById("info").innerHTML="PAUSE";
    document.getElementById("indiquescore").innerHTML="";
    document.getElementById("highscore").innerHTML="";
    
    console.log("pause");
    playpause = 1;
}


function reset1()
{
    var element = document.getElementById("butStart");
    element.setAttribute("class", "on1");
    var element = document.getElementById("butPause");
    element.setAttribute("class", "on1");
    
    var element = document.getElementById("fenetrePause");
    element.setAttribute("class", "fenetreinvisible");
    
    document.getElementById("chrono").innerHTML="00 : 00";
    
    var y = document.getElementById("jauge");
    y.style.height= "0px";
    
    compteurtour = 0;
    
    console.log("reset");
    reset = 0;
    playpause = 1;
    clearInterval( myTimer );
   for (var i=0; i<a ; i++)
    { 
        for (var j=0; j<b; j++)
        {
            etat1[i][j]=0;
            var element = document.getElementById(i+"_"+j);
            element.setAttribute("class", "mort");
        }
    }
}


function run()
{
    if (playpause==0)
    {
        Generation(etat1, etat2, a, b);
    } 
    /*Generation(etat1, etat2, a, b);*/
}



//-----------------------------------------------------------------------------------------------------------------------------//
//-----------------------------------------------------------------------------------------------------------------------------//


// Fin de jeu et highscores

function finjeu() //Définir la fin du jeu
{
    if (compteurvie == 0)       //  Si plus aucune cellule vivante, game over pour tout les type de jeux
    {
        if (typejeu==0 && alea!=true && compteurtour<2)
        {
            clearInterval( myChrono );
            clearInterval( myTimer );
            var element = document.getElementById("fenetrePause");
            element.setAttribute("class", "fenetrevisible");
            document.getElementById("info").innerHTML="GAME OVER";
            document.getElementById("indiquescore").innerHTML="CREEZ DES ELEMENTS</br>OU COCHEZ 'ALEATOIRE'";
            document.getElementById("highscore").innerHTML="";
        }
        else
        {
            clearInterval( myChrono );
            clearInterval( myTimer );
            var element = document.getElementById("fenetrePause");
            element.setAttribute("class", "fenetrevisible");
            document.getElementById("info").innerHTML="GAME OVER";
            document.getElementById("indiquescore").innerHTML="";
            document.getElementById("highscore").innerHTML="";
        }
        
        
        /*reset1();*/
        chrono="fin";
    }
    
    if (compteurscore >= 50 && typejeu==1) // Si on est sur le mode de jeu score limité, quand score atteinr = fin du jeu 
    {
        clearInterval( myChrono );
        clearInterval( myTimer );
        
        scoretemps=minute*60+seconde;
        console.log("scoretemps" + scoretemps);
        console.log("hs1" + highscore1);
        var element = document.getElementById("fenetrePause");
        element.setAttribute("class", "fenetrevisible");
        
        document.getElementById("info").innerHTML= "YOU WIN";
          
        if (minute <10)
        {
             document.getElementById("indiquescore").innerHTML= "Score: 0" + minute + " : " + seconde;
        }
        else
        {
             document.getElementById("indiquescore").innerHTML= "Score: " + minute + " : " + seconde;
        }
       
        /*reset1(); */
        // Le bouton start ICI renvoie vers la fonction RESET
        if (scoretemps < highscore1)
        {
            highscore1 = scoretemps;
            console.log("yeeeah");
        }
        afficherhigh();
        chrono="fin";
        
       
       /* minute=Math.floor(highscore1/60);
        seconde=highscore1%60;*/
       /* document.getElementById("highscore").innerHTML= "Highscore: " + minute + " : " + seconde;
    */
    }
    
    if (chrono == "fin" && typejeu==2)  // Si on est sur le mode de jeu avec temps limité, quand chrono fini = fin du jeu
    {
        clearInterval( myChrono );
        clearInterval( myTimer );
        
        var element = document.getElementById("fenetrePause");
        element.setAttribute("class", "fenetrevisible");
        
        if (compteurscore > highscore2)
        {
            highscore2 = compteurscore;
        }
        afficherhigh();
        /* reset1();*/

        document.getElementById("info").innerHTML= "YOU WIN";
        document.getElementById("indiquescore").innerHTML= "Score: " + compteurscore;
       /* document.getElementById("highscore").innerHTML= "Highscore: " + highscore2;*/
       
    }
    
    
}


function afficherhigh() // Affichage du meilleu score
{
    minute=Math.floor(highscore1/60);
    seconde=highscore1%60;
    if (typejeu==1)
    {
        if (seconde<10)
        {
            if (minute<10)
            {document.getElementById("highscore").innerHTML="HighScore: 0"+minute+" : 0"+seconde;
            document.getElementById("fenetreHighscore").innerHTML="HighScore: 0"+minute+" : 0"+seconde;}
            else
            {document.getElementById("highscore").innerHTML="HighScore: "+minute+" : 0"+seconde;
            document.getElementById("fenetreHighscore").innerHTML="HighScore: "+minute+" : 0"+seconde;}
            
        }
        else
        {
            if (minute<10)
            {document.getElementById("highscore").innerHTML="HighScore: 0"+minute+" : "+seconde;
            document.getElementById("fenetreHighscore").innerHTML="HighScore: 0"+minute+" : "+seconde;}
            else
            {document.getElementById("highscore").innerHTML="HighScore: "+minute+" : "+seconde;
            document.getElementById("fenetreHighscore").innerHTML="HighScore: "+minute+" : "+seconde; }
        }
    }
    if (typejeu==2 )
    {   
        if (highscore2==-2000)
        {
            document.getElementById("fenetreHighscore").innerHTML= "HighScore: -";
        }
        else
        {
            document.getElementById("fenetreHighscore").innerHTML= "HighScore: " + highscore2;
            document.getElementById("highscore").innerHTML= "HighScore: " + highscore2;
        }
    }
}



function prog(compteur)
{
    if (typejeu==1 && compteurscore <=51)
    {
        var y = document.getElementById("jauge");
        y.style.height= (compteurscore+1) *10 +"px";
    }
    if (typejeu==2)
    {
        var y = document.getElementById("jauge");
        y.style.height=compteurscore *2 +"px";
    }
}

//-----------------------------------------------------------------------------------------------------------------------------//
//-----------------------------------------------------------------------------------------------------------------------------//

// Chronométre du jeu 
function chronometre()
{
    chrono="jeu";
    
    if (typejeu==1)
    {
        clearInterval( myChrono );
        // chronometre monte
        minute=0;
        seconde = 0;
       myChrono = setInterval('ajoutseconde()',1000);
    }
    if (typejeu==2)
    {
        // chronometre descend
        clearInterval( myChrono );
        minute=0;
        seconde = 46;
        myChrono = setInterval('enleveseconde()',1000);
        
    }
}

function ajoutseconde() 
{
    if (reset!=0 && playpause != 1 && typejeu==1 && seconde < 59 && chrono!="fin")
    {
        seconde=seconde+1;
         if (seconde<10)
        {
            document.getElementById("chrono").innerHTML="0"+minute+" : 0"+seconde;
        }
        else
        {
            document.getElementById("chrono").innerHTML="0"+minute+" : "+seconde;
        }
        return seconde; 
    }
    if (seconde == 59)
    {
        minute = 1;
        seconde = 0;
        if (seconde<10)
        {
            document.getElementById("chrono").innerHTML="0"+minute+" : 0"+seconde;
        }
        else
        {
            document.getElementById("chrono").innerHTML="0"+minute+" : "+seconde;
        }
        return seconde; 
    }
}

function enleveseconde() 
{
    if (seconde >0 && reset!=0 && playpause != 1 && typejeu==2 && chrono!="fin")
    {
        seconde=seconde-1;
        if (seconde<10)
        {
            document.getElementById("chrono").innerHTML="0"+minute+" : 0"+seconde;
        }
        else
        {
            document.getElementById("chrono").innerHTML="0"+minute+" : "+seconde;
        }
        return seconde; 
    }
    else if (seconde == 0)
    {
        chrono="fin";
    }
}


//--------------------------------------------------------------------------------------------//


/* Fonction qui actualise l'interieur du tableau en mort/vivant */
function actualisation(etat1, a, b)   
{   
    compteurvie=0; // Compteur du nombre de cellules encore vivantes sur le jeu (au début = 0)
    for (var i=0; i<a ; i++)
    { 
        for (var j=0; j<b; j++)
        {
            var element = document.getElementById(i+"_"+j);
            if ( etat1[i][j]==1)
            {
                compteurvie = compteurvie + 1 ;
                element.setAttribute("class", "vivant" + (Math.round(Math.random()*3)+palette));
            }
            else
            {
                element.setAttribute("class", "mort");
            }
        }
    }
    if (compteurtour>0)
    {
        finjeu();  // Verifie après actualisation du jeu, si c'est fini 
    }
}


//--------------------------------------------------------------------------------------------//

// Naissance des cellules aux clic sur les cases du tableau
function clic(cellule)
{
   /* if (playpause ==0 ) // A mettre que quand mode pause et car la fonctionne quand quand start marche et on peux pas faire avant le jeu
    {*/
        var idCellule = cellule.id;
        var indexTiret = idCellule.indexOf("_");
        var i = parseInt(idCellule.substring(0, indexTiret));
        var j = parseInt(idCellule.substring(indexTiret+1));
        if (cellule.className=="mort")
        {
            cellule.className="vivant" + (Math.round(Math.random()*3)+palette);
            etat1[i][j]=1;
            
            if (typejeu == 1 || typejeu == 2)
            {
                compteurscore = compteurscore - 1;
                prog();
                /*document.getElementById("scorejeu").innerHTML =  compteurscore ;*/
            }
        }
        else
        {
            cellule.className="mort";
            etat1[i][j]=0;
            
            // IF Jeu mange scor, compteur ++ 
            if (typejeu == 1 || typejeu == 2)
            {
                compteurscore = compteurscore + 2;
                prog();
                console.log(compteurscore);
                /*document.getElementById("scorejeu").innerHTML =  compteurscore ;*/
            }
        }
   /* }*/
}

//--------------------------------------------------------------------------------------------//
  

// Quand on change le curseur, Recommence la boucle generation avec une autre vitesse
function getVitesse (valeurCurseur)
{
    if (typejeu==0) // Si on est en mode de jeu classique
    {
        vitesse = valeurCurseur;
        clearInterval( myTimer );
        /*myTimer = setInterval("Generation(etat1, etat2, a, b)", vitesse);*/
    
        myTimer = setInterval("run()", vitesse);
    }
}


//--------------------------------------------------------------------------------------------//

// Recupere valeur formulaire et change la couleur
function getCouleur (valeurCouleur)
{
    palette = parseInt(valeurCouleur);
    console.log("valeur de la palette " + palette);
    
   
    // 0 = cookie
    // 4 = bonbon
    // 8 = sushi
    // 12 = fruits
}

// Recupere valeur formualaire pour le type de jeu
function getTypeJeu (valeurJeu)
{
    reset1();
    typejeu = parseInt(valeurJeu);
    console.log("type de jeu numéro " + typejeu);
    if (typejeu==0)
    {
        document.getElementById("fenetreHighscore").innerHTML= "HighScore: -";
    }
    if (typejeu==1)
    {
        if (highscore1==10000000)
        {
            document.getElementById("fenetreHighscore").innerHTML= "HighScore: -";
        }
        else
        {
            afficherhigh();
        }
        
    }
    if (typejeu==2)
    {
       afficherhigh(); 
    }
    
    // 0 = classique
    // 1 = Mange score
    // 2 = Mange temps
}


//--------------------------------------------------------------------------------------------//        
// Initialisation du tableau et 1er état (nul)
function iniTab (a, b)
{
    for (var i=0; i<a; i++)
    {
        etat1[i] = new Array(b);
        etat2[i] = new Array(b);
        for (var j=0; j<b; j++)
        {
            etat2[i][j]=0;
            etat1[i][j] = 0;
        }
    }
}
//--------------------------------------------------------------------------------------------//
    
/* Fonction qui calcule la prochaine génération (puis l'affiche)*/
function Generation(etat1, etat2, a, b)
{
    for (var i=0; i<a; i++)
    {
        for (var j=0; j<b; j++)   
        {
            VivantAutour = 0;
            if (i!=0 && j!=0 && etat1[i-1][j-1]==1){VivantAutour=(VivantAutour+1);}
            if (j!=0 && etat1[i][j-1]==1){VivantAutour=VivantAutour+1;}
            if (j!=0 && i!=a-1 && etat1[i+1][j-1]==1){VivantAutour=VivantAutour+1;}
            if (i!=0 && etat1[i-1][j]==1){VivantAutour=VivantAutour+1;}
            if (i!=a-1 && etat1[i+1][j]==1){VivantAutour=VivantAutour+1;}
            if (i!=0 && j!=b-1 && etat1[i-1][j+1]==1){VivantAutour=VivantAutour+1;}
            if (j!=b-1 && etat1[i][j+1]==1){VivantAutour=VivantAutour+1;}
            if (i!=a-1 && j!=b-1 && etat1[i+1][j+1]==1){VivantAutour=VivantAutour+1;}
                    
            if (VivantAutour==3)
            {
                etat2[i][j] = 1;
            }
            else if (VivantAutour==2 && etat1[i][j]==1)
            {
                etat2[i][j] = 1;
            }
            else
            {
                etat2[i][j] = 0;
            }
        }
    }
    for (var i=0; i<a; i++)
    {
        for (var j=0; j<b; j++)
        {
            etat1[i][j] = etat2[i][j];
        }
    }  
    compteurtour = compteurtour + 1;
    actualisation(etat1, a, b);
}
//--------------------------------------------------------------------------------------------//
/* Fonction qui affiche la tableau graphiquement, tout mort car début */
function affichage(etat1, a, b)   
{
    tab = document.createElement("table");
    tab.setAttribute("id", "tab");
    grille.appendChild(tab);
    for (var i=0; i<a ; i++)
    {
        tr = document.createElement("tr");
        tab.appendChild(tr);
        tr.setAttribute("class", "tr");
        for (var j=0; j<b; j++)
        {
            td = document.createElement("td");
            tr.appendChild(td);
            td.setAttribute("id", i+"_"+j);
            td.setAttribute("class", "mort");
            td.setAttribute("onClick", "clic(this);");
        }
    }
}    
//--------------------------------------------------------------------------------------------//  