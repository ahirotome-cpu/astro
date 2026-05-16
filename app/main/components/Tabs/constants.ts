import { ZodiacBasePlanetType, ZodiacSignType } from "@/app/types";
import { FinanceIcon, RelationsIcon, CareerIcon, PersonIcon } from "../../../assets/icons";
import { Tab, TabType } from "./types";

export const tabs: Tab[] = [
  { name: 'Отношения', icon: RelationsIcon, type: TabType.RELATIONS },
  { name: 'Финансы', icon: FinanceIcon, type: TabType.FINANCE },
  { name: 'Карьера', icon: CareerIcon, type: TabType.CAREER },
  { name: 'Личность', icon: PersonIcon, type: TabType.PERSON }
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