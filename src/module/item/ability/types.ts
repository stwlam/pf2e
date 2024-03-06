import type { ClassTrait } from "@item/class/types.ts";

type ActionCategory = keyof typeof CONFIG.PF2E.actionCategories;
type ActionTrait = keyof typeof CONFIG.PF2E.actionTraits;

type LimitedAncestryTrait = keyof typeof CONFIG.PF2E.ancestryTraits;
type UserSelectableAbilityTrait = Exclude<
    ActionTrait,
    | LimitedAncestryTrait
    | ClassTrait
    | "archetype"
    | "cantrip"
    | "class"
    | "dedication"
    | "focus"
    | "general"
    | "multiclass"
    | "skill"
    | "summoned"
>;

export type { ActionCategory, ActionTrait, UserSelectableAbilityTrait };
