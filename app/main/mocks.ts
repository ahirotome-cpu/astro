import { allPlanetsInSigns, moonInSigns, ruler7InHouseText, sevenHouseSignText } from "../texts"
import { ZodiacHouseType, ZodiacPlanetType } from "../types"

export const houses: { number: ZodiacHouseType, degree: number }[] = [
  { number: 1, degree: 2.3739151215106205 },
  { number: 2, degree: 53.00033257560466 },
  { number: 3, degree: 74.74132598010203 },
  { number: 4, degree: 90.72723955077538 },
  { number: 5, degree: 106.86422025370109 },
  { number: 6, degree: 129.28775529636113 },
  { number: 7, degree: 182.3739151215106 },
  { number: 8, degree: 233.00033257560466 },
  { number: 9, degree: 254.74132598010203 },
  { number: 10, degree: 270.7272395507754 },
  { number: 11, degree: 286.8642202537011 },
  { number: 12, degree: 309.2877552963611 }]

export const planets: { name: ZodiacPlanetType, degree: number }[] = [
  { name: 'Ascendant', degree: 2.3739151215106205 },
  { name: 'Sun', degree: 280.1015505151255 },
  { name: 'Moon', degree: 88.10190532836317 },
  { name: 'Mars', degree: 164.04433848637197 },
  { name: 'Mercury', degree: 268.54093908352763 },
  { name: 'Jupiter', degree: 160.19551530235825 },
  { name: 'Venus', degree: 311.8685739158518 },
  { name: 'Saturn', degree: 176.96212807982502 },
  { name: 'Uranus', degree: 234.07013130914837 },
  { name: 'Neptune', degree: 260.9552552936781 },
  { name: 'Pluto', degree: 201.61761573236683 },
  { name: 'Ceres', degree: 9.292867654838709 },
  { name: 'Vesta', degree: 33.52972404677419 },
  { name: 'Juno', degree: 115.03787007096774 },
  { name: 'Pallas', degree: 327.8615979451613 },
  { name: 'Chiron', degree: 39.297870617741935 },
  { name: 'Lilith', degree: 169.4833710435484 },
  { name: 'Mean Node', degree: 151.87850794240137 },
  { name: 'True Node', degree: 150.44989946774194 },
  { name: 'Descendant', degree: 182.3739151215106 },
  { name: 'MC', degree: 270.7272395507754 },
  { name: 'IC', degree: 90.72723955077538 }]

export const sevenHouseSign = "Pisces"
export const sevenHouseText = sevenHouseSignText["Pisces"]
export const rulerHouse = 4
export const rulerText = ruler7InHouseText["4"]
export const ruler = "Neptune"
export const rulerSign = "Capricorn"
export const rulerSignText = allPlanetsInSigns["Neptune"]["Capricorn"]
export const moonSign = "Aries"
export const moonInSignText = moonInSigns["Aries"]