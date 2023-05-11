import * as d3 from 'd3';
import rewind from '@turf/rewind';

//PARTIE 1 TELEPHONE
const bouttons = document.querySelector('.grid-container');
const bouttonUn = document.querySelector('#boutton1');
const bouttonNeuf = document.querySelector("#boutton9");
const ecrit = document.querySelector("#ecrit");
const directive = document.querySelector('.directive');
const gridContainer = bouttons.parentNode;

//ce qui permet de cliquer sur 911
bouttonNeuf.addEventListener("click", function() {
  afficherChiffre(9);
});

bouttonUn.addEventListener("click", function() {
  afficherChiffre(1);
});


function afficherChiffre(chiffre) {
  if (chiffre === 9) {
   directive.style.display = "none"; // Masquer le paragraphe
  }
  let contenu = ecrit.innerHTML;
  ecrit.innerHTML = contenu + chiffre;
}
//ce qui permet de faire clignoter le texte du call emergency
function clignoter() {
  setInterval(function() {
    directive.style.color = (directive.style.color == "tomato" ? "white" : "tomato");
  }, 1000);
}

clignoter();
//Lorsqu'on décroche (bouton vert), l'audio se met en marche
const bouttonVert = document.querySelector('#bouttonVert'); 
const audio = new Audio("/911Call.mp4");
let temps = 0;

bouttonVert.addEventListener('click', function() {

  audio.play(); 
  
 //le message d'urgence s'ffaiche et disparaît quand on touche le clavier
  const message = document.createElement("div");
  message.classList.add("message-emergency");
  message.textContent = "Emergency Call -calling..."; 
  document.body.appendChild(message);
  setTimeout(() => {
    document.body.removeChild(message);

//Le timer se lance 5 secondes après le calling 
  let temps=0;
  const timer = document.createElement("div");
  timer.id = "timer";
  timer.classList.add("timer-container");
 document.body.appendChild(timer);

 //crée texte pour raccrocher


  function incrementerTemps() {
    temps++;
    const minutes = Math.floor(temps / 60).toString().padStart(2, "0");
    const secondes = (temps % 60).toString().padStart(2, "0");
    timer.textContent = `${minutes}:${secondes}`;

    if (minutes === "01" && secondes === "09") {
      const raccrocher = document.createElement("div");
      raccrocher.classList.add("message-raccrocher");
      raccrocher.textContent = "Hang up the call"; 
      document.body.appendChild(raccrocher);
      setInterval(function() {
        raccrocher.style.color = (raccrocher.style.color == "tomato" ? "white" : "tomato");
      }, 1000)
    }
  }
  
  setInterval(incrementerTemps, 1000);
}, 4000);



//ajouter tous les éléments au html 
  const nouveauContenu = document.createElement('div');
  nouveauContenu.classList.add('grid-container-deux', 'container', 'icon');


  const bouttonRouge = document.createElement('button');
  const icon = document.createElement("i");
  icon.classList.add('fa-solid','fa-phone-slash');
  

  bouttonRouge.id = 'bouttonRouge';
  bouttonRouge.classList.add('button','button-red');
  bouttonRouge.appendChild(icon);
  
  //créer 12 bouttons gris qui ont chacuns des icones différentes
 for (let i = 1; i <= 6; i++) {
    const bouttonGris = document.createElement('button');
    bouttonGris.id = 'grid-container-deux';
    bouttonGris.classList.add('container','grid-container-deux','button', 'button-grey')
    
  const iconGris = document.createElement("i");
  iconGris.classList.add('icon-gris-container');

  switch (i) {
    case 1:
      iconGris.classList.add('fa-solid','fa-microphone-slash');
      break;
    case 2:
      iconGris.classList.add('fa-solid','fa-keyboard');
      break;
    case 3:
      iconGris.classList.add('fa-solid','fa-volume-high');
      break;
    case 4:
      iconGris.classList.add('fa-solid','fa-plus');
      break;
    case 5:
      iconGris.classList.add('fa-solid','fa-video');
      break;
    case 6:
      iconGris.classList.add('fa-solid','fa-circle-user');
      break;
    default:
      break;
  }
  bouttonGris.appendChild(iconGris); // Ajout de l'icône dans le bouton
  

  nouveauContenu.appendChild(bouttonGris)
  }
 

  bouttonRouge.addEventListener('click', function() {
    const elementsToHide = document.querySelectorAll(".ecrit, .grid-container, .grid-container-deux, .timer-container, .message-emergency");
  
    for (let element of elementsToHide) {
      element.style.display = "none";
    }
    audio.pause();
    affichTexteIntro();
    const raccrocher = document.querySelector(".message-raccrocher")
    document.body.removeChild(raccrocher);
    /*let index = 0;
    const vitesseEcriture = 5; // Temps en millisecondes entre chaque lettre*/
    
//Intro s'écrit
function affichTexteIntro() {

  const texteIntro = document.createElement("p");
  const textNode = document.createTextNode("");
  const indication = document.createElement("p");
  const textIndication = document.createTextNode("During the whole project, press the 'space' key to continue");
  texteIntro.classList.add("texteIntro");
  indication.classList.add("indication");
  texteIntro.appendChild(textNode);
  indication.appendChild(textIndication);
  document.body.appendChild(texteIntro);
  document.body.appendChild(indication);

  const text = `The United States, the American dream, abundance, superficiality, the world's greatest power, a facet of a country that has long made people dream.
  However, violence, shootings, racism, poverty and inequality represent another facet of the United States that is much darker but unfortunately real. Through this project, discover the dark truth behind Baltimore, one of the most dangerous cities in the United States.\n
  You witnessed an attack and called 911. But among you, 5373 other individuals contacted the emergency call during the month of December 2022, calls that were rated as high priority.`;
  
  let index = 0;
  const intervalId = setInterval(() => {
    if (index < text.length) {
      textNode.textContent += text.charAt(index);
      index++;
    } else {
      clearInterval(intervalId);
    }
  }, 50);
}
  });

  nouveauContenu.appendChild(bouttonRouge);
  gridContainer.replaceWith(nouveauContenu);
});

//Intro s'efface
function cacheTexteIntro(){
  const texteIntro = document.querySelectorAll('.texteIntro');
      texteIntro.forEach((element) => {
        element.remove();
      });
      const indication = document.querySelector(".indication");
      document.body.removeChild(indication);
}


//Crée la map
//map baltimore

function afficheMap(){

  const mapContainer = document.querySelector('.map');
    const texteMap = document.createElement('span');
    texteMap.classList.add("texteMap");
    texteMap.textContent = `When you called 911, you were in the Western District 
    The Western district is the one in which the most 911 calls are made, precisely 795 during the month of December. The Northern District has far fewer calls. But how do we explain this big difference?\n
    Baltimore is made up of several districts, separated by neighborhoods. The districts are separated mainly by north and south. The south is at the top of the map and the south at the bottom. In the center, we find the Western, Central and Eastern districts. 
    The city is unfortunately still separated by "black" districts in the eastern district and "white" districts in the north. The south is populated by a rather mixed population. 
    As for the calls, we notice that the Western district is particularly affected, as well as the Central and Eastern. This is not a coincidence, since they represent the most dangerous districts of the city of Baltimore. If in the north, where the residential areas are located, there is little crime, in some areas of the east and west, the crime rate is very high. This is where the population is the poorest, and where drug trafficking, gangs and violence are commonplace. There is a strong correlation between crime and 911 calls. 
    Maddison Eastend, West Baltimore, Orangeville, neighborhoods extremely impacted by these calls, reflect the sad reality of the city.`
    texteMap.style.whiteSpace = "pre-line";

    mapContainer.appendChild(texteMap);
    

    const margin1 = { top: 10, right: 40, bottom: 20, left: -100 },
    width1 = 0.8 * window.innerWidth - margin1.left - margin1.right,
    height1 = 0.7 * window.innerHeight + margin1.top + margin1.bottom;

  const map = d3
    .select(".map")
    .append("svg")
    .attr("width", width1 + margin1.left + margin1.right)
    .attr("height", height1 + margin1.top + margin1.bottom)
    .append("g")
    .attr("transform", "translate(" + margin1.left + "," + margin1.top + ")");

  // Charger le fichier GeoJSON
  d3.json("/Maryland_Baltimore_City_Neighborhoods.geojson").then(
    (data) => {
      let fixed = data.features.map(function (feature) {
        return rewind(feature, { reverse: true });
      });

      // Définir la projection et les limites
      let projection = d3
        .geoMercator()
        .fitSize([width1, height1], {
          type: "FeatureCollection",
          features: fixed,
        });
      const path = d3.geoPath().projection(projection);
      const bounds = path.bounds({
        type: "FeatureCollection",
        features: fixed,
      });
      const padding = 20;
      projection.fitExtent(
        [
          [padding, padding],
          [width1 - padding, height1 - padding],
        ],
        { type: "FeatureCollection", features: fixed }
      );

      // Ajouter les chemins pour les quartiers de Baltimore
      map
        .append("g")
        .selectAll("path")
        .data(fixed)
        .join("path")
        .attr("d", path)
        .style("stroke", "#302F2F")
        .style("fill", "Grey")
        .style("opacity", 0.7);

      // Charger le fichier CSV des appels 911
      d3.csv("/911_Call_geo.csv").then(function (data) {
        data.forEach(function (d) {
          if (d.points) {
            var point = d.points.split(",");
            d.longitude = +point[1];
            d.latitude = +point[0];
          }
        });

        // Filtre pour ne garder que les données dans les limites de la carte
        data = data.filter(function (d) {
          let coords = projection([d.longitude, d.latitude]);
          return (
            coords !== null &&
            !isNaN(coords[0]) &&
            !isNaN(coords[1]) &&
            coords[0] >= bounds[0][0] &&
            coords[0] <= bounds[1][0] &&
            coords[1] >= bounds[0][1] &&
            coords[1] <= bounds[1][1]
          );
        });

        // Ajouter les cercles pour les appels 911
        let circles = map
          .selectAll("circle")
          .data(data)
          .enter()
          .append("circle")
          .attr("cx", function (d) {
            return projection([d.longitude, d.latitude])[0];
          })
          .attr("cy", function (d) {
            return projection([d.longitude, d.latitude])[1];
          })
          .attr("r", 3)
          .style("opacity", 0)
          .style("fill", "darkRed")

        circles
          .transition()
          .duration(30)
          .delay(function (d, i) {
            return i * 2;
          })
          .style("opacity", 1)
          .on("end", function() {

            const district = document.createElement('span');
            district.classList.add('district')
            district.textContent='Western'

            const quartier = document.createElement('span');
            quartier.classList.add('quartier')
            quartier.textContent=`Maddison Eastend, West Baltimore, Orangeville`

            mapContainer.appendChild(district);
            mapContainer.appendChild(quartier);
          });

        d3.select("body > div.map > svg > g > circle:nth-child(1362)").remove();
        d3.select("body > div.map > svg > g > circle:nth-child(2839)").remove();
      });
    }
  );
}



//Crée le graphique des points
function afficheGraphPoints(){
  const svg = d3.select(".bubble")
  .attr("width","1200")
  .attr("height","600");

  const bubbleContainerDeb = document.querySelector('.bubble-container');
            const textePoint = document.createElement('span');
            textePoint.classList.add("textePoint");
            textePoint.textContent = `Now that we know where these calls are coming from, let's identify the reason for these calls.  Is there a relationship between the high crime rate and the causes of these 911 calls?
            Here are our 5374 calls represented as dots. Each dot represents 10 calls`
  
            bubbleContainerDeb.appendChild(textePoint);

            const data = [];
for (let i = 0; i < 537; i++) {
    data.push({
        id: i, x: (i % 35) * 20, y: Math.floor(i / 35) * 20, size: 8
    });
}

const group1Data = [];
for (let i = 0; i < 117; i++) {
    group1Data.push({
        id: 537 + i, x: (i % 15) * 20, y: Math.floor(i / 15) * 20, size: 8, group: "group1"
    });
}

const group2Data = [];
for (let i = 117; i < 193; i++) {
    group2Data.push({
        id: 537 + i, x: (i % 10) * 20, y: Math.floor((i - 117) / 10) * 20, size: 8, group: "group2"
    });
}

function updateChart() {
    // Ajouter les cercles initiaux
    const circles = svg.selectAll("circle")
        .data(data, d => d.id)
        .join("circle")
        .attr("cx", d => d.x)
        .attr("cy", d => d.y)
        .attr("r", d => d.size)
        .style("fill", "Grey")
        .style("position", "absolute")
        .style("left", "50%")
        .style("transform", "translate(32%, 20%)");

    circles.exit().remove();
    // Séparer les groupes 1 et 2

 
    // Ajouter un écouteur d'événements pour la touche "espace"
document.addEventListener("keydown", function(event) {
  if (event.code === "Enter") {
    separateGroups(circles, group1Data, group2Data);
  }
});  
}

async function separateGroups(circles, group1Data, group2Data) {
    // Animer le groupe 1
    const group1AnimationEnd = animateGroup1(circles, group1Data);

    // Animer le groupe 2
    const group2AnimationEnd = animateGroup2(circles, group2Data);

    // Attendre que les deux animations soient terminées
    await Promise.all([group1AnimationEnd, group2AnimationEnd]);

    // Supprimer les cercles qui ne sont pas dans le groupe 1 ou le groupe 2
    const otherCircles = circles.filter((d, i) => i >= 193);


    otherCircles.remove();
    textePoint.remove();
    //fait remonter les groupes

}

function animateGroup1(circles, group1Data) {
    return new Promise((resolve) => {
        const group1Circles = circles.filter((d, i) => i < 117)
            .data(group1Data);

        group1Circles
            .join(enter => enter, update => update.transition()
                .duration(2500)
                .attr("cx", d => d.x + 15)
                .attr("cy", d => d.y + 100)
                .style("fill", "darkred")
                .on("end", function () {
                    const bubbleContainer = document.querySelector('.bubble-container');
                    const texteCause1 = document.createElement('span');
                    const cause1 = document.createElement('h1');
                    const chiffreCause1 = document.createElement('h2');
                    texteCause1.classList.add("texteCause1");
                    cause1.classList.add('cause1');
                    chiffreCause1.classList.add('chiffreCause1');
                    texteCause1.textContent = `When you contacted 911 earlier, you reported a common assault. A group of individuals were physically assaulting a man on the ground. 
                              What you don't know is that the scene you witnessed, a common assault, was also experienced by 117 people. In fact, during the month of December, 1171 calls were made to 911 to report this type of case, making common assaults the most frequent cause of these calls during December. 
                              A common assault is defined by the National criminal lawyer as any act (but not a failure to act) where a person intentionally or recklessly causes another person to apprehend immediate and unlawful violence.`;
                    cause1.textContent = 'Common assault';
                    chiffreCause1.textContent = '117';

                    bubbleContainer.appendChild(texteCause1);
                    bubbleContainer.appendChild(cause1);
                    bubbleContainer.appendChild(chiffreCause1)
                    resolve()
                }))
    })
}

function animateGroup2(circles, group2Data) {
    return new Promise((resolve) => {
        const group2Circles = circles.filter((d, i) => i >= 117 && i < 193)
            .data(group2Data);

        group2Circles
            .join(enter => enter, update => update.transition()
                .duration(2500)
                .attr("cx", d => d.x + 500)
                .attr("cy", d => d.y + 100)
                .style("fill", "midnightBlue")
                .on("end", function () {
                    const bubbleContainer2 = document.querySelector('.bubble-container');
                    const texteCause2 = document.createElement('span');
                    const cause2 = document.createElement('h1');
                    const chiffreCause2 = document.createElement('h2');
                    texteCause2.classList.add("texteCause2");
                    cause2.classList.add('cause2');
                    chiffreCause2.classList.add('chiffreCause2')
                    texteCause2.textContent = "On December 05, a first call was made to report a traffic accident. This is the second most common cause of emergency calls in Baltimore in December. Indeed, 760 calls to 911 were made to report a motor vehicle accident. This may be due to the extreme temperatures in this part of the world, which makes the road dangerous. We don't know. In any case, the cause of these calls is slightly different from other causes, since it is not related to the violence or crime of the city. In fact, traffic accidents are probably the main cause of emergency calls in many cities of the world.";
                    cause2.textContent = `Auto Accident`;
                    chiffreCause2.textContent = '76';

                    bubbleContainer2.appendChild(texteCause2);
                    bubbleContainer2.appendChild(cause2);
                    bubbleContainer2.appendChild(chiffreCause2)
                    resolve();
                }))
    })
}

updateChart(data)
updateChart(group1Data)
updateChart(group2Data)

}
     
// Crée le graphique des jours
//Données de base
const margin = { top: 20, right: 30, bottom: 30, left: 60 };
    const largeur = 800;
    const hauteur = 400;


    // données à visualiser
    const dataHeure = [180, 149, 132, 99, 90, 97, 114, 131, 169, 215, 219, 274, 291, 325, 344, 307, 337, 298, 283, 304, 252, 276, 281, 207];

    const dataGraphJour = [237, 186, 221, 200, 183, 194, 215, 212, 188, 172, 168, 173, 180, 159, 160, 174, 173, 148, 148, 178, 182, 192, 168, 144, 146, 160, 159, 149, 172, 233];
   

    function afficheGraphJour(){
    //const marge = { haut: 50, droite: 50, bas: 70, gauche: 50 };
    // créer l'échelle des axes


    const graphContainer = document.querySelector('.graph-container-jour');
    const texteJour = document.createElement('span');
    const jour = document.createElement('span');
    texteJour.classList.add("texteJour");
    jour.classList.add('jour')
    texteJour.textContent = `On December 1, an armed robbery triggers a 911 call.\n
    On that day, 237 calls were logged, making December 1 the busiest day for tragedies in Baltimore. On the other hand, the Christmas holidays have the lowest number of calls. Christianity being the most practiced religion in the United States, one can imagine that this period of quietness is explained by the holiday and the gathering with one's loved ones.`;
    jour.textContent='1st December'

    graphContainer.appendChild(texteJour);
    graphContainer.appendChild(jour);


    const echelleX = d3.scaleBand()
        .domain(d3.range(1, dataGraphJour.length + 1))
        .range([margin.left, largeur - margin.right])
        .padding(0.1);
    
    const echelleY = d3.scaleLinear()
        .domain([0, d3.max(dataGraphJour)])
        .range([hauteur - margin.bottom, margin.top]);
    
    // créer l'élément SVG
    const svg4 = d3.select(".graphJour")
        .attr("width", largeur)
        .attr("height", hauteur)
      
       
    // Ajouter les barres au graphique
    svg4.selectAll("rect")
        .data(dataGraphJour)
        .enter()
        .append("rect")
        .attr("x", (d, i) => echelleX(i+1))
        .attr("y", d => echelleY(0))
        .attr("width", echelleX.bandwidth())
        .attr("height", 0)
        .attr("fill", "DarkRed")
        .attr("title", d => d)
        .transition()
        .duration(1000)
        .delay((d, i) => i * 100)
        .attr("y", d => echelleY(d))
        .attr("height", d => hauteur - margin.bottom - echelleY(d));
    
    // Ajouter l'axe X
    svg4.append("g")
    .call(d3.axisBottom(echelleX))
    .attr("transform", `translate(0, ${hauteur - margin.bottom})`)
    .append("text") // ajouter un élément texte
    .attr("class", "axis-label") // ajouter une classe CSS pour le texte
    .attr("x", largeur - margin.right-85) // positionner le texte à droite de l'axe X
    .attr("dy", "2.5em")
    .attr("font-size", "14px") // ajuster la taille de la police
    .text("Day of the month"); // ajouter le texte
    
    // Ajouter l'axe Y
    svg4.append("g")
    .call(d3.axisLeft(echelleY))
    .attr("transform", `translate(${margin.left}, 0)`)
    .append("text") // ajouter un élément texte
    .attr("class", "axis-label") // ajouter une classe CSS pour le texte
    .attr("x", -hauteur + 360) // positionner le texte au milieu de l'axe Y
    .attr("y", -margin.left + 10) // positionner le texte juste à gauche de l'axe Y
    .attr("transform", "rotate(-90)") // faire pivoter le texte de 90 degrés
    .attr("font-size", "14px")
    .text("Number of calls") // ajouter le texte
    
    // Créer un élément div pour la tooltip
    const tooltip = d3.select("body")
      .append("div")
      .attr("class", "tooltip")
      .style("opacity", 0);
    
    // Ajouter l'événement mouseover à chaque barre
    svg4.selectAll("rect")
      .on("mouseover", (event, d) => {
        tooltip.transition()
          .duration(200)
          .style("opacity", .9);
        tooltip.html(`${d} calls`)
          .style("left", (event.pageX) + "px")
          .style("top", (event.pageY - 28) + "px");
      })
      .on("mouseout", (event, d) => {
        tooltip.transition()
          .duration(500)
          .style("opacity", 0);
      });
}

//Créer le graphique des heures
function afficheGraphHeure(){
  //graphique heure
const dataHeure = [180, 149, 132, 99, 90, 97, 114, 131, 169, 215, 219, 274, 291, 325, 344, 307, 337, 298, 283, 304, 252, 276, 281, 207];

//ajoute le texteHeure et l'heure en grand
const graphContainer = document.querySelector('.graph-container-heure');
    const texteHeure = document.createElement('span');
    const heure = document.createElement('span');
    texteHeure.classList.add("texteHeure");
    heure.classList.add('heure')
   
    texteHeure.textContent = `On December 12, at 3:00 p.m., a call was made to 911 reporting an overdose in the SW Baltimore area.\n
    At this time, 344 calls were logged, making 3:00 p.m. the most frequent time for emergency calls to be made. There are a number of reasons for this, including the fact that at this time of day, many residents are out enjoying their afternoon or picking up their children from school. The lowest number of calls is in the morning between 4 and 6 a.m. since more people are at home at these times.`;
    heure.textContent='3 p.m'

    graphContainer.appendChild(texteHeure);
    graphContainer.appendChild(heure);

// Créer l'échelle des axes
const xScale5 = d3.scaleBand()
    .domain(d3.range(1, dataHeure.length + 1))
    .range([margin.left, largeur - margin.right])
    .padding(0.1);

const yScale5 = d3.scaleLinear()
    .domain([0, d3.max(dataHeure)])
    .range([hauteur - margin.bottom, margin.top]);

// Créer l'élément SVG
const svg5 = d3.select(".graphHeure")
    .attr("width", largeur)
    .attr("height", hauteur);

// Ajouter les barres au graphique
svg5.selectAll("rect")
    .data(dataHeure)
    .enter()
    .append("rect")
    .attr("x", (d, i) => xScale5(i+1))
    .attr("y", d => yScale5(0))
    .attr("width", xScale5.bandwidth())
    .attr("height", 0)
    .attr("fill", "MidnightBlue")
    .attr("title", d => d)
    .transition()
    .duration(1000)
    .delay((d, i) => i * 100)
    .attr("y", d => yScale5(d))
    .attr("height", d => hauteur - margin.bottom - yScale5(d));

// Ajouter l'axe X
svg5.append("g")
.call(d3.axisBottom(xScale5).tickFormat(d => `${d}h`))
.attr("transform", `translate(0, ${hauteur - margin.bottom})`)
.append("text") // ajouter un élément texte
.attr("class", "axis-label") // ajouter une classe CSS pour le texte
.attr("x", largeur - 90) // positionner le texte au milieu de l'axe X
.attr("y", margin.bottom + 20) // déplacer le texte vers le bas de 20 pixels
.attr("font-size", "14px") // ajuster la taille de la police
.text("Hours"); // ajouter le texte

// Ajouter l'axe Y
svg5.append("g")
.call(d3.axisLeft(yScale5))
.attr("transform", `translate(${margin.left}, 0)`)
.append("text") // ajouter un élément texte
.attr("class", "axis-label") // ajouter une classe CSS pour le texte
.attr("x", -hauteur + 360) // positionner le texte au milieu de l'axe Y
.attr("y", -margin.left + 10) // positionner le texte juste à gauche de l'axe Y
.attr("font-size", "14px")
.attr("transform", "rotate(-90)") // faire pivoter le texte de 90 degrés
.text("Number of calls"); // ajouter le texte

const tooltip2 = d3.select("body")
  .append("div")
  .attr("class", "tooltip")
  .style("opacity", 0);

  //Ajouter l'événement mouseover à chaque barre
svg5.selectAll("rect")
  .on("mouseover", (event, d) => {
    tooltip2.transition()
      .duration(200)
      .style("opacity", .9);
    tooltip2.html(`${d} calls`)
      .style("left", (event.pageX) + "px")
      .style("top", (event.pageY - 28) + "px");
  })
  .on("mouseout", (event, d) => {
    tooltip2.transition()
      .duration(500)
      .style("opacity", 0);
  });
}
//Pour afficher le texte de l'outro
function afficheTexteOutro(){

  const texteOutro = document.createElement("p");
  const textNode = document.createTextNode("");
  texteOutro.classList.add("texteOutro");
  texteOutro.appendChild(textNode);
  document.body.appendChild(texteOutro);

  const text = `If 5373 calls were made to 911 from Baltimore during the month of December, there were no less than 1,621,079 during the entire year of 2022. A figure well above the average in the United States. 
   If the former president Donald Trump described Baltimore as 'the city of hell', the inhabitants have hope that things will change. It is known that racism and violence persist in some states of the USA, and the COVID 19 crisis has not helped the situation. Many debates are held, judging the situation worrying as for the state of criminality in the USA. 
   Integrating minorities into society, turning our backs on narrow-minded ideas, learning to live together - these are major challenges that deserve to be supported.\n 
   In the meantime, let's honor the emergency services, which work every day for the safety of citizens.`;

  let index = 0;
  const intervalId = setInterval(() => {
    if (index < text.length) {
      textNode.textContent += text.charAt(index);
      index++;
    } else {
      clearInterval(intervalId);
    }
  }, 50);
}

//Pour cacher le graph des jours
function cacheGraphJour(){
  d3.selectAll(".graphJour")
    .style("display", "none");
    const graphContainer = document.querySelector('.graph-container-jour');
    graphContainer.innerHTML = '';
}

//Pour cacher le graph des heures
function cacheGraphHeure(){
  d3.selectAll(".graphHeure")
    .style("display", "none");
    const graphContainer = document.querySelector('.graph-container-heure');
    graphContainer.innerHTML = '';
}


//Pour supprimer les textes des graphiques
function supprimeElementsTexte() {
  const elementsTexte = document.querySelectorAll('.elementTexte');
  elementsTexte.forEach((element) => {
    element.remove();
  });
}

//Pour supprimer les textes du graph des points
function supprimeTextesPoints(){
  d3.selectAll('.texteCause1').remove();
  d3.selectAll('.cause1').remove();
  d3.selectAll('.chiffreCause1').remove();
  d3.selectAll('.texteCause2').remove();
  d3.selectAll('.cause2').remove();
  d3.selectAll('.chiffreCause2').remove();
  d3.selectAll('.texteCause3').remove();
  d3.selectAll('.cause3').remove();
  d3.selectAll('.chiffreCause3').remove();

    const textePoint = document.querySelectorAll('.textePoint');
    textePoint.forEach((element) => {
    element.remove();
});
    }
  



//Pour supprimer le graph des points
function cacheGraphPoints(){
  const points = document.querySelectorAll('.bubble');
      points.forEach((element) => {
        element.remove();
      });
}

function cacheMap(){
  const mapElement = document.querySelector('.map');
mapElement.style.display = 'none';
}


//pour que chaque addEventListener se produisent dans l'ordre pour afficher les graphiques
let currentActionIndex = 0;
document.addEventListener("keydown", function(event) {
  if (event.code === "Space") {
    if (currentActionIndex < spaceActions.length) {
      spaceActions[currentActionIndex]();
      currentActionIndex++;
    }
  }
});

const spaceActions = [
  function(){
    console.log("Action 1");
    cacheTexteIntro();
    afficheMap();
  },
  function() {
    console.log("Action 2");
    cacheMap();
    afficheGraphPoints();
    supprimeElementsTexte();
  },

  function() {
    console.log("Action 3");
    supprimeTextesPoints();
    afficheGraphJour();
    cacheGraphPoints();
  },
  function(){
    console.log("Action 4");
    cacheGraphJour();
    afficheGraphHeure();
  },
  function(){
    console.log("Action 5");
    cacheGraphHeure();
    afficheTexteOutro();
  }
];

