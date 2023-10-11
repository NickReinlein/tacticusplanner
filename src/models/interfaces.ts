﻿import {
    Alliance, CharacterBias,
    DamageType,
    Equipment,
    Faction,
    LegendaryEventEnum,
    LegendaryEvents,
    PersonalGoalType,
    Rank,
    Rarity,
    RarityStars,
    RarityString,
    Trait,
} from './enums';

export type LegendaryEventSection = 'alpha' | 'beta' | 'gamma';

export interface UnitDataRaw {
  Name: string;
  Faction: Faction;
  Alliance: Alliance;
  Health: number;
  Damage: number;
  Armour: number;
  'Initial rarity': RarityString;
  'Melee Damage': DamageType;
  'Melee Hits': number;
  'Ranged Damage'?: DamageType;
  'Ranged Hits'?: number;
  Distance?: number;
  Movement: number;
  'Trait 1'?: Trait;
  'Trait 2'?: Trait;
  'Trait 3'?: Trait;
  'Trait 4'?: Trait;
  Traits: Trait[];
  'Active Ability'?: DamageType;
  'Passive Ability'?: DamageType;
  Equipment1: Equipment;
  Equipment2: Equipment;
  Equipment3: Equipment;
  Number: number;
  ForcedSummons: boolean;
  RequiredInCampaign: boolean;
  Icon: string;
}

export interface IUnitData {
  alliance: Alliance;
  faction: Faction;
  factionColor: string;
  name: string;
  numberAdded: number;
  health: number;
  damage: number;
  armour: number;
  rarity: Rarity;
  rarityStars: RarityStars;
  damageTypes: IDamageTypes;
  traits: Trait[];
  equipment1: Equipment;
  equipment2: Equipment;
  equipment3: Equipment;
  meleeHits: number;
  rangeHits?: number;
  rangeDistance?: number;
  movement: number;
  forcedSummons: boolean;
  requiredInCampaign: boolean;
  icon: string;
  legendaryEvents: ICharLegendaryEvents;
}

export interface IDamageTypes {
  all: DamageType[];
  melee: DamageType;
  range?: DamageType;
  activeAbility?: DamageType;
  passiveAbility?: DamageType;
}

export interface IDirtyDozenChar {
  Name: string;
  Rank: number;
  Pvp: number;
  GRTyranid: number;
  GRNecron: number;
  GROrk: number;
  GRMortarion: number;
}

export type ICharacter = IUnitData & IPersonalCharacter;

export type ICharLegendaryEvents = Record<LegendaryEventEnum, ICharLegendaryEvent>;

export interface ICharLegendaryEvent {
  alphaPoints: number;
  alphaSlots: number;

  betaPoints: number;
  betaSlots: number;

  gammaPoints: number;
  gammaSlots: number;

  totalPoints: number;
  totalSlots: number;
}

export interface ILegendaryEvent extends ILegendaryEventStatic {
  id: LegendaryEventEnum;
  alpha: ILegendaryEventTrack;
  beta: ILegendaryEventTrack;
  gamma: ILegendaryEventTrack;

  suggestedTeams: ITableRow[];
  allowedUnits: Array<ICharacter>;
}

export interface ILegendaryEventStatic {
  id: number,
  name: string;
  wikiLink: string;
  eventStage: number;
  nextEventDate: string;
  
  regularMissions: string[];
  premiumMissions: string[];
  
  alpha: ILegendaryEventTrackStatic;
  beta: ILegendaryEventTrackStatic;
  gamma: ILegendaryEventTrackStatic;
  
  pointsMilestones: IPointsMilestone[];
  chestsMilestones: IChestMilestone[];
}

export interface IPointsMilestone {
  milestone: number;
  cumulativePoints: number;
  engramPayout: number;
}

export interface IChestMilestone {
  chestLevel: number;
  engramCost: number;
}

export interface ILegendaryEventTrackStatic {
  name: string;
  killPoints: number;
  battlesPoints: number[]; 
}

export interface ILegendaryEventTrack extends ILegendaryEventTrackStatic {
  eventId: LegendaryEventEnum;
  section: LegendaryEventSection;
  allowedUnits: ICharacter[];
  unitsRestrictions: Array<ILegendaryEventTrackRequirement>;

  getCharacterPoints(char: ICharacter): number;

  getCharacterSlots(char: ICharacter): number;

  getRestrictionPoints(name: string): number;

  suggestTeams(
    settings: IAutoTeamsPreferences,
    restrictions: string[]
  ): Record<string, ICharacter[]>;

  suggestTeam(
    settings: IAutoTeamsPreferences,
    restrictions: string[]
  ): Array<ICharacter>;
}

export interface ILegendaryEventTrackRequirement {
  name: string;
  points: number;
  units: ICharacter[];
  selected?: boolean;
}

export type ITableRow<T = ICharacter | string> = Record<string, T>;

export interface IPersonalData {
  autoTeamsPreferences: IAutoTeamsPreferences;
  viewPreferences: IViewPreferences;
  selectedTeamOrder: ISelectedTeamsOrdering;
  characters: IPersonalCharacter[];
  charactersPriorityList: string[];
  goals: IPersonalGoal[];
  legendaryEvents: ILegendaryEventsData | undefined;
  legendaryEvents3: ILegendaryEventsData3 | undefined;
  legendaryEventsProgress: ILegendaryEventsProgressState;
  legendaryEventSelectedRequirements: Record<
      LegendaryEventEnum,
      ILegendaryEventSelectedRequirements
  >;
  modifiedDate?: Date | string;
}

export interface ILegendaryEventsData {
  jainZar: ILegendaryEventData;
  aunShi: ILegendaryEventData;
  shadowSun: ILegendaryEventData;
}

export type ILegendaryEventsData3 = Record<
  LegendaryEventEnum,
  ILegendaryEventData3
>;

export type SelectedTeams = Record<string, string[]>;
export type SelectedRequirements = Record<string, boolean>;

export interface ILegendaryEventData3 {
  id: LegendaryEventEnum;
  alpha: SelectedTeams;
  beta: SelectedTeams;
  gamma: SelectedTeams;
}

export interface ILegendaryEventSelectedRequirements {
  id: LegendaryEventEnum;
  name: string;
  alpha: SelectedRequirements;
  beta: SelectedRequirements;
  gamma: SelectedRequirements;
}

export interface ILegendaryEventData {
  selectedTeams: ITableRow<string>[];
}

export interface IViewPreferences {
  showAlpha: boolean;
  showBeta: boolean;
  showGamma: boolean;
  lightWeight: boolean;
}

export interface IAutoTeamsPreferences {
  onlyUnlocked: boolean;
  preferCampaign: boolean;
  ignoreRarity: boolean;
  ignoreRank: boolean;
  ignoreRecommendedFirst: boolean;
  ignoreRecommendedLast: boolean;
}

export interface ISelectedTeamsOrdering {
  orderBy: 'name' | 'rank' | 'rarity';
  direction: 'asc' | 'desc';
}

export type IPersonalCharacter = IPersonalCharacterData;

export interface IPersonalCharacterData {
  name: string;
  unlocked: boolean;
  progress: boolean;
  rank: Rank;
  rarity: Rarity;
  rarityStars: RarityStars;
  leSelection: LegendaryEvents;
  alwaysRecommend?: boolean;
  neverRecommend?: boolean;
  bias: CharacterBias;
}

export interface ICharProgression {
  shards: number;
  orbs?: number;
  rarity?: Rarity;
}

export interface IPersonalGoal {
  id: string;
  character: string;
  type: PersonalGoalType;
  priority: number;
  targetRarity?: Rarity;
  targetRank?: Rank;
  notes?: string;
}

export type ILegendaryEventsProgressState = Record<
    LegendaryEventEnum,
    ILegendaryEventProgressState
>;

export interface ILegendaryEventProgressState {
  id: LegendaryEventEnum;
  name: string;
  alpha: ILegendaryEventProgressTrackState;
  beta: ILegendaryEventProgressTrackState;
  gamma: ILegendaryEventProgressTrackState;
  regularMissions: number;
  premiumMissions: number;
}



export interface ILegendaryEventProgressTrackState {
  battles: Array<boolean[]>;
}

export interface ILegendaryEventProgress {
  alpha: ILegendaryEventProgressTrack;
  beta: ILegendaryEventProgressTrack;
  gamma: ILegendaryEventProgressTrack;
  regularMissions: number;
  premiumMissions: number;
}

export interface ILegendaryEventProgressTrack {
  name: 'alpha' | 'beta' | 'gamma';
  battles: ILegendaryEventBattle[];
}

export interface ILegendaryEventBattle {
  battleNumber: number;
  state: boolean[];
  requirements: ILegendaryEventTrackRequirement[];
}