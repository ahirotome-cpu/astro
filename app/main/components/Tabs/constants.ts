import { ZodiacBasePlanetType, ZodiacSignType } from "@/app/types";
import { FinanceIcon, RelationsIcon, CareerIcon, PersonIcon } from "../../assets/icons";
import { Tab, TabType } from "./types";

export const tabs: Tab[] = [
  { id: 1, name: 'Отношения', icon: RelationsIcon, type: TabType.RELATIONS },
  { id: 2, name: 'Финансы', icon: FinanceIcon, type: TabType.FINANCE },
  { id: 3, name: 'Карьера', icon: CareerIcon, type: TabType.CAREER },
  { id: 4, name: 'Личность', icon: PersonIcon, type: TabType.PERSON }
]

export const rulers: { [key in ZodiacSignType]: ZodiacBasePlanetType } = {
  Aries: "Mars",
  Taurus: "Venus",
  Gemini: "Mercury",
  Cancer: "Moon",
  Leo: "Sun",
  Virgo: "Mercury",
  Libra: "Venus",
  Scorpio: "Pluto",
  Sagittarius: "Jupiter",
  Capricorn: "Saturn",
  Aquarius: "Uranus",
  Pisces: "Neptune",
};