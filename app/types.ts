export type ZodiacSignType =
  | "Aries"
  | "Taurus"
  | "Gemini"
  | "Cancer"
  | "Leo"
  | "Virgo"
  | "Libra"
  | "Scorpio"
  | "Sagittarius"
  | "Capricorn"
  | "Aquarius"
  | "Pisces";

export type ZodiacBasePlanetType =
  | "Sun"
  | "Moon"
  | "Mercury"
  | "Venus"
  | "Mars"
  | "Jupiter"
  | "Saturn"
  | "Uranus"
  | "Neptune"
  | "Pluto"

export type ZodiacPlanetType =
  | ZodiacBasePlanetType
  | "Ascendant"
  | "Descendant"
  | "MC"
  | "IC"
  | "Chiron"
  | "Lilith"
  | "True Node"
  | "Mean Node"
  | "Juno"
  | "Pallas"
  | "Ceres"
  | "Vesta";

export type ZodiacHouseType = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12