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
    "no_damage_from": ["ghost"]
  },
  "poison": {
    "double_damage_from": ["ground", "psychic"],
    "half_damage_from": ["fighting", "poison", "grass", "fairy"],
    "no_damage_from": []
  },
  "ground": {
    "double_damage_from": ["water", "grass", "ice"],
    "half_damage_from": ["poison", "rock"],
    "no_damage_from": ["electric"]
  },
  "flying": {
    "double_damage_from": ["electric", "ice", "rock"],
    "half_damage_from": ["fighting", "bug", "grass"],
    "no_damage_from": ["ground"]
  },
  "psychic": {
    "double_damage_from": ["bug", "ghost", "dark"],
    "half_damage_from": ["fighting", "psychic"],
    "no_damage_from": []
  },
  "bug": {
    "double_damage_from": ["fire", "flying", "rock"],
    "half_damage_from": ["fighting", "ground", "grass"],
    "no_damage_from": []
  },
  "rock": {
    "double_damage_from": ["fighting", "ground", "steel", "water", "grass"],
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
  "steel": {
    "double_damage_from": ["fighting", "ground", "fire"],
    "half_damage_from": ["normal", "flying", "rock", "bug", "steel", "grass", "psychic", "ice", "dragon", "fairy"],
    "no_damage_from": ["poison"]
  },
  "dark": {
    "double_damage_from": ["fighting", "bug", "fairy"],
    "half_damage_from": ["ghost", "dark"],
    "no_damage_from": ["psychic"]
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
  "dragon", "steel", "dark", "fairy"
];

// function section
function calculateEffectiveness(attackingType, defendingTypes) {
  let multiplier = 1.0;

  for (const defType of defendingTypes) {
    if (typeChart[defType]) {
      // Check for immunity (0x damage) first, as it overrides other multipliers
      if (typeChart[defType]["no_damage_from"].includes(attackingType)) {
        multiplier *= 0.0;
        break; // If immune to one type, no damage regardless of the other type
      } else if (typeChart[defType]["double_damage_from"].includes(attackingType)) {
        multiplier *= 2.0;
      } else if (typeChart[defType]["half_damage_from"].includes(attackingType)) {
        multiplier *= 0.5;
      }
    }
  }
  return multiplier;
}

export function getAllTypeEffectiveness(pokemonTypes) {
  const effectivenessResults = {
    "4x": [],      // Double Super Effective
    "2x": [],      // Super Effective
    "0.5x": [],    // Not Very Effective
    "0.25x": [],   // Double Not Very Effective
    "0x": []       // Immune
  };

  for (const attType of allPokemonTypes) {
    const multiplier = calculateEffectiveness(attType, pokemonTypes);

    if (multiplier === 4.0) {
      effectivenessResults["4x"].push(attType);
    } else if (multiplier === 2.0) {
      effectivenessResults["2x"].push(attType);
    } else if (multiplier === 0.5) {
      effectivenessResults["0.5x"].push(attType);
    } else if (multiplier === 0.25) {
      effectivenessResults["0.25x"].push(attType);
    } else if (multiplier === 0.0) {
      effectivenessResults["0x"].push(attType);
    }
  }

  return effectivenessResults;
}