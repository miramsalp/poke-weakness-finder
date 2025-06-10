// base on https://pokemondb.net/type
const typeChart = {
  "normal": {
    "double_damage_from": ["fighting"],
    "half_damage_from": [],
    "no_damage_from": ["ghost"]
  },
  "fire": {
    "double_damage_from": ["water", "ground", "rock"],
    "half_damage_from": ["fire", "grass", "ice", "bug", "steel", "fairy"],
    "no_damage_from": []
  },
  "water": {
    "double_damage_from": ["grass", "electric"],
    "half_damage_from": ["fire", "water", "ice", "steel"],
    "no_damage_from": []
  },
  "electric": {
    "double_damage_from": ["ground"],
    "half_damage_from": ["electric", "flying", "steel"],
    "no_damage_from": []
  },
  "grass": {
    "double_damage_from": ["fire", "ice", "poison", "flying", "bug"],
    "half_damage_from": ["water", "electric", "grass", "ground"],
    "no_damage_from": []
  },
  "ice": {
    "double_damage_from": ["fire", "fighting", "rock", "steel"],
    "half_damage_from": ["ice"],
    "no_damage_from": []
  },
  "fighting": {
    "double_damage_from": ["flying", "psychic", "fairy"],
    "half_damage_from": ["bug", "rock", "dark"],
    "no_damage_from": []
  },
  "poison": {
    "double_damage_from": ["ground", "psychic"],
    "half_damage_from": ["grass", "fighting", "poison", "bug", "fairy"],
    "no_damage_from": []
  },
  "ground": {
    "double_damage_from": ["water", "grass", "ice"],
    "half_damage_from": ["poison", "rock"],
    "no_damage_from": ["electric"]
  },
  "flying": {
    "double_damage_from": ["electric", "ice", "rock"],
    "half_damage_from": ["grass", "fighting", "bug"],
    "no_damage_from": ["ground"]
  },
  "psychic": {
    "double_damage_from": ["bug", "ghost", "dark"],
    "half_damage_from": ["fighting", "psychic"],
    "no_damage_from": []
  },
  "bug": {
    "double_damage_from": ["fire", "flying", "rock"],
    "half_damage_from": ["grass", "fighting", "ground"],
    "no_damage_from": []
  },
  "rock": {
    "double_damage_from": ["water", "grass", "fighting", "ground", "steel"],
    "half_damage_from": ["normal", "fire", "poison", "flying"],
    "no_damage_from": []
  },
  "ghost": {
    "double_damage_from": ["ghost", "dark"],
    "half_damage_from": ["poison", "bug"],
    "no_damage_from": ["normal", "fighting"]
  },
  "dragon": {
    "double_damage_from": ["ice", "dragon", "fairy"],
    "half_damage_from": ["fire", "water", "electric", "grass"],
    "no_damage_from": []
  },
  "dark": {
    "double_damage_from": ["fighting", "bug", "fairy"],
    "half_damage_from": ["ghost", "dark"],
    "no_damage_from": ["psychic"]
  },
  "steel": {
    "double_damage_from": ["fire", "fighting", "ground"],
    "half_damage_from": ["normal", "grass", "ice", "flying", "psychic", "bug", "rock", "dragon", "steel", "fairy"],
    "no_damage_from": ["poison"]
  },
  "fairy": {
    "double_damage_from": ["poison", "steel"],
    "half_damage_from": ["fighting", "bug", "dark"],
    "no_damage_from": ["dragon"]
  }
};

// All 18 Pokémon types for iteration
const allPokemonTypes = [
  "normal", "fire", "water", "electric", "grass", "ice", "fighting",
  "poison", "ground", "flying", "psychic", "bug", "rock", "ghost",
  "dragon", "dark", "steel", "fairy"
];

// 0 1/4 1/2 2 4 

// pokemonTypes is string[]
function calculateMultiplier(attackingType, defendingType) {
  // initial at base 1x
  let multiplier = 1.0;
  for (const def of defendingType) {
    // typechart[element][damage]
    if (typeChart[def]["no_damage_from"].includes(attackingType)) {
      return 0.0;
    } else if (typeChart[def]["half_damage_from"].includes(attackingType)) {
      multiplier *= 0.5;
    } else if (typeChart[def]["double_damage_from"].includes(attackingType)) {
      multiplier *= 2.0;
    }
  }
  return multiplier;
}


export function getAllTypeEffectiveness(pokemonTypes) {
  let result = {
    "4": [],     // Double Super Effective
    "2": [],     // Super Effective
    "0.5": [],     // Not Very Effective
    "0.25": [],    // Double Not Very Effective
    "0": []      // Immune
  };
  // loop through all pokemon type
  // console.log("Wtf");
  let arr = [4, 2, 0.5, 0.25, 0];
  for (const att of allPokemonTypes) {
    // this function will handle *4, *2, *0.5, *0.25, *0
    // console.log("imhere");
    const mux = calculateMultiplier(att, pokemonTypes);
    // console.log(mux);
    // mux.toString()
    if (arr.includes(mux)) {
      // console.log(mux.toString());
      result[mux.toString()].push(att);
    }
  }
  return result;
}