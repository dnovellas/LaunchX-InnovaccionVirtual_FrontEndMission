'Use strict';

// DOM Constants
const $pokeImage = document.getElementById("pokeImg");
const $pokeName = document.getElementById("lblPokeName");
const $pokeNumber = document.getElementById("lblPokeNumber");
const $pokeHeight = document.getElementById("lblPokeHeight");
const $pokeWeight = document.getElementById("lblPokeWeight");
const $pokeType01 = document.getElementById("lblPokeType01");
const $pokeType02 = document.getElementById("lblPokeType02");

const fetchPokemon = () => {
    const pokeNameInput = document.getElementById("pokeName");
    let pokeName = pokeNameInput.value;
    pokeName = pokeName.toLowerCase();
    const url = `https://pokeapi.co/api/v2/pokemon/${pokeName}`;
    fetch(url).then((res) => {
        if (res.status != "200") {
            console.log(res);
            setPokeImage("./pokemon-sad.gif")
        } else {
            return res.json();
        }
    }).then((data) => {
        if (data) {
            console.log(data);
            let pokeImg = data.sprites.front_default;
            setPokeImage(pokeImg);
            console.log(pokeImg);
            let pokemonName = data.name;
            let pokemonNumber = data.id;
            let pokemonWeight = data.weight;
            let pokemonHeight = data.height;
            setPokeNumber("#" + pokemonNumber);
            setPokeName(pokemonName);
            setPokeHeight((pokemonWeight / 100) + " M");
            setPokeWeight(pokemonHeight + " kg");
            setPokeTypes(data.types);
            setStats(data.stats);
            // setSpeedGauge(data.stats[0].base_stat);
        }
    });
}

const setPokeImage = (url) => {
    // const pokePhoto = document.getElementById("pokeImg");
    $pokeImage.src = url;
}

const setPokeName = (name) => {
    console.log(name);
    $pokeName.textContent = name;
}

function setPokeNumber(number) {
    console.log(number);
    $pokeNumber.textContent = number;
}

function setPokeHeight(height) {
    console.log(height);
    $pokeHeight.textContent = height;
}

function setPokeWeight(weight) {
    console.log(weight);
    $pokeWeight.textContent = weight;
}

function setPokeTypes(types) {
    // console.log(types[0].type.name);
    if (types[0] !== null && types[0] !== undefined) {
        $pokeType01.innerText = types[0].type.name;
        // add css class
        setPokeTypeBadge(1, types[0].type.name);
    } else {
        $pokeType01.innerText = "???";
        setPokeTypeBadge(1, "reset");
    }
    if (types[1] !== null && types[1] !== undefined) {
        $pokeType02.innerText = types[1].type.name;
        // add css class
        setPokeTypeBadge(2, types[1].type.name);
    } else {
        $pokeType02.innerText = "???";
        setPokeTypeBadge(2, "reset");
    }
}

function setPokeTypeBadge(typeNumber, typeName) {

    let pokeClass = getTypeCSSClass(typeName);

    if (typeNumber == 1) {
        //validate if class already exists
        if ($pokeType01.classList.item(1) !== null) {
            let actualType = $pokeType01.classList.item(1);
            $pokeType01.classList.remove(actualType);
            $pokeType01.classList.add(pokeClass);
        } else
            $pokeType01.classList.add(pokeClass);
    } else {
        if ($pokeType02.classList.item(1) !== null) {
            let actualType = $pokeType02.classList.item(1);
            $pokeType02.classList.remove(actualType);
            $pokeType02.classList.add(pokeClass);
        } else
            $pokeType02.classList.add(pokeClass);
    }
}

function getTypeCSSClass(type) {
    let cssClass = "";
    switch (type) {
        case "water":
            cssClass = "typeBadge--water";
            break;
        case "fire":
            cssClass = "typeBadge--fire";
            break;
        case "grass":
            cssClass = "typeBadge--grass";
            break;
        case "poison":
            cssClass = "typeBadge--poison";
            break;
        case "fight":
            cssClass = "typeBadge--fight";
            break;
        case "ground":
            cssClass = "typeBadge--ground";
            break;
        case "bug":
            cssClass = "typeBadge--bug";
            break;
        case "ice":
            cssClass = "typeBadge--ice";
            break;
        case "dragon":
            cssClass = "typeBadge--dragon";
            break;
        case "ghost":
            cssClass = "typeBadge--ghost";
            break;
        case "dark":
            cssClass = "typeBadge--dark";
            break;
        case "rock":
            cssClass = "typeBadge--rock";
            break;
        case "electric":
            cssClass = "typeBadge--electric";
            break;
        case "fairy":
            cssClass = "typeBadge--fairy";
            break;
        case "psychic":
            cssClass = "typeBadge--psychic";
            break;
        case "flying":
            cssClass = "typeBadge--flying";
            break;
        case "normal":
            cssClass = "typeBadge--normal";
            break;
        case "steel":
            cssClass = "typeBadge--steel";
            break;
        default:
            cssClass = "typeBadge";
            break;
    }
    return cssClass;
}

function setStats(stats) {
    //PS 0
    let pokeHp = stats[0].base_stat;
    resetStatGauge("pokehp");
    setStatGauge("pokehp", pokeHp);
    //ATK 1
    let pokeAtk = stats[1].base_stat;
    resetStatGauge("pokeatk");
    setStatGauge("pokeatk", pokeAtk);
    //DEF 2
    let pokeDef = stats[2].base_stat;
    resetStatGauge("pokedef");
    setStatGauge("pokedef", pokeDef);
    //SP ATK 3
    let pokeSpAtk = stats[3].base_stat;
    resetStatGauge("pokespatk");
    setStatGauge("pokespatk", pokeSpAtk);
    // SP DEF 4
    let pokeSpDef = stats[4].base_stat;
    resetStatGauge("pokespdef");
    setStatGauge("pokespdef", pokeSpDef);
    // SPEED 5
    let pokeSpeed = stats[5].base_stat;
    resetStatGauge("pokeSpeed");
    setStatGauge("pokeSpeed", pokeSpeed);
}

function setStatGauge(statName, StatValue) {
    let numberOfBars = Math.floor(StatValue / 10);
    let StatDOM = document.getElementById(statName);
    let DOMBars = StatDOM.firstElementChild.children;
    let counter = 0;

    for (let i = DOMBars.length - 1; i > 0; i--) {
        counter++;
        if (counter <= numberOfBars) {
            DOMBars[i].classList.toggle("stat__gaugeBar--full");
            // console.log(statName);
        } else
            break;
    }
}

function resetStatGauge(statName) {
    let StatDOM = document.getElementById(statName);
    let DOMBars = StatDOM.firstElementChild.children;
    for (let item of DOMBars) {
        item.classList.remove("stat__gaugeBar--full");
    }
}