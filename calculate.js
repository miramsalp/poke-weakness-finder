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
  "dragon", "steel", "dark", "fairy"
];
