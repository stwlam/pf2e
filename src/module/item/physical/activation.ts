import { AbilityItemPF2e } from "@item";
import { UserSelectableAbilityTrait } from "@item/ability/types.ts";
import { SlugField } from "@system/schema-data-fields.ts";
import { UUIDUtils } from "@util/uuid.ts";
import * as R from "remeda";
import type DataModel from "types/foundry/common/abstract/data.d.ts";
import type { ArrayField, NumberField, SchemaField, StringField } from "types/foundry/common/data/fields.d.ts";
import type { PhysicalItemPF2e } from "./document.ts";

class ItemActivation extends foundry.abstract.DataModel<PhysicalItemPF2e, ItemActivationSchema> {
    constructor(source: Partial<ItemActivationSource>, options: ItemActivationOptions) {
        options.strict = false;
        super(source, options);
    }

    static override defineSchema(): ItemActivationSchema {
        const { fields, validation } = foundry.data;

        const traitChoices = (): Record<UserSelectableAbilityTrait, string> =>
            R.omit(AbilityItemPF2e.validTraits, [
                ...R.keys.strict(CONFIG.PF2E.ancestryTraits),
                ...R.keys.strict(CONFIG.PF2E.classTraits),
                "archetype",
                "cantrip",
                "class",
                "dedication",
                "focus",
                "general",
                "multiclass",
                "skill",
                "summoned",
            ]);

        const effectItemField: EffectItemField = new fields.StringField<
            "spinoff" | ItemUUID,
            "spinoff" | ItemUUID,
            true,
            true,
            true
        >({
            required: true,
            nullable: true,
            validate: (v) =>
                v === "spinoff" || UUIDUtils.isItemUUID(v)
                    ? true
                    : new validation.DataModelValidationFailure({
                          invalidValue: v,
                          message: "must be a spinoff, item UUID, or null",
                      }),
            initial: null,
        });

        const frequencyPeriodField: FrequencyPeriodField = new fields.SchemaField({
            value: new fields.NumberField({
                required: true,
                nullable: false,
                integer: true,
                positive: true,
                initial: 1,
            }),
            unit: new fields.StringField({
                required: true,
                nullable: false,
                choices: ["rounds", "minutes", "hours", "days", "weeks", "months", "years"],
                initial: "days",
            }),
        });

        return {
            slug: new SlugField({
                required: true,
                nullable: false,
                initial: () => `activation-${fu.randomID(6)}`.toLocaleLowerCase("en"),
            }),
            label: new fields.StringField({ required: false, nullable: true, blank: false, initial: null }),
            time: new fields.SchemaField(
                {
                    value: new fields.NumberField({
                        required: true,
                        integer: true,
                        min: 0,
                        nullable: false,
                        initial: 1,
                    }),
                    unit: new fields.StringField({
                        required: true,
                        choices: ["actions", "reaction", "rounds", "minutes", "hours"],
                        initial: "actions",
                    }),
                },
                { required: true, nullable: false, initial: () => ({ value: 1, unit: "actions" }) },
            ),
            traits: new fields.ArrayField(
                new fields.StringField({
                    required: true,
                    nullable: false,
                    choices: traitChoices,
                    initial: undefined,
                }),
                { initial: ["manipulate"] },
            ),
            trigger: new fields.SchemaField(
                {
                    text: new fields.StringField({ required: true, nullable: false }),
                },
                { required: true, nullable: true, initial: null },
            ),
            frequency: new fields.SchemaField(
                {
                    value: new fields.NumberField({
                        required: true,
                        nullable: false,
                        integer: true,
                        positive: true,
                        initial: 1,
                    }),
                    period: frequencyPeriodField,
                },
                { required: false, nullable: true, initial: null },
            ),
            effect: new fields.SchemaField(
                {
                    item: effectItemField,
                    text: new fields.StringField({ required: true, nullable: false }),
                },
                { required: false, nullable: true, initial: null },
            ),
        };
    }

    static override validateJoint(data: ItemActivationSource): void {
        const validation = foundry.data.validation;

        const time = data.time;
        if (time.unit === "reaction" && time.value !== 1) {
            throw new validation.DataModelValidationFailure({
                invalidValue: time.value,
                message: 'value: must be 1 if unit is "reaction"',
            }).asError();
        } else if (time.unit === "actions" && !time.value.between(0, 3)) {
            throw new validation.DataModelValidationFailure({
                invalidValue: time.value,
                message: 'value: must be between 0 and 3 if unit is "actions"',
            }).asError();
        } else if (data.trigger && time.unit !== "reaction" && time.value !== 0) {
            throw new validation.DataModelValidationFailure({
                invalidValue: time.value,
                message: "trigger: must be a reaction or free action",
            }).asError();
        }
    }

    /** Coerce activation time value to be compatible with activation time unit. */
    static override migrateData<T extends DataModel>(
        this: ConstructorOf<T>,
        source: Record<string, unknown>,
    ): T["_source"];
    static override migrateData(source: Record<string, unknown>): Record<string, unknown> {
        if (typeof source.action === "string") {
            source.time = null;
        } else if (R.isPlainObject(source.time) && typeof source.time.value === "number") {
            if (source.time.unit === "actions") {
                source.time.value = Math.clamped(source.time.value, 0, 3);
            } else if (source.time.unit === "reaction") {
                source.time.value = 1;
            } else {
                source.time.value = Math.clamped(source.time.value, 1, 999);
            }
        } else {
            source.time = { value: 1, unit: "actions" };
        }

        return source;
    }
}

interface ItemActivation
    extends foundry.abstract.DataModel<PhysicalItemPF2e, ItemActivationSchema>,
        ModelPropsFromSchema<ItemActivationSchema> {}

declare namespace ItemActivation {
    const schema: foundry.data.fields.SchemaField<ItemActivationSchema>;
}

interface ItemActivationOptions extends ParentedDataModelConstructionOptions<PhysicalItemPF2e> {}

type ItemActivationSource = SourceFromSchema<ItemActivationSchema>;

type ItemActivationSchema = {
    slug: SlugField<true, false, true>;
    label: StringField<string, string, false, true, true>;
    time: SchemaField<
        {
            value: NumberField<number, number, true, false, true>;
            unit: StringField<ActivationTimeUnit, ActivationTimeUnit, true, false, true>;
        },
        { value: number; unit: ActivationTimeUnit },
        { value: number; unit: ActivationTimeUnit },
        true,
        false,
        true
    >;
    traits: ArrayField<StringField<UserSelectableAbilityTrait, UserSelectableAbilityTrait, true, false, false>>;
    trigger: SchemaField<
        { text: StringField<string, string, true, false, true> },
        { text: string },
        { text: string },
        true,
        true,
        true
    >;
    frequency: SchemaField<
        {
            value: NumberField<number, number, true, false, true>;
            period: FrequencyPeriodField;
        },
        {
            value: number;
            period: { value: number; unit: FrequencyPeriodUnit };
        },
        {
            value: number;
            period: { value: number; unit: FrequencyPeriodUnit };
        },
        false,
        true,
        true
    >;
    effect: SchemaField<
        {
            item: EffectItemField;
            text: StringField<string, string, true, false, true>;
        },
        { item: "spinoff" | ItemUUID | null; text: string },
        { item: "spinoff" | ItemUUID | null; text: string },
        false,
        true,
        true
    >;
};

type ActivationTimeUnit = "actions" | "reaction" | "rounds" | "minutes" | "hours";
type EffectItemField = StringField<"spinoff" | ItemUUID, "spinoff" | ItemUUID, true, true, true>;
type FrequencyPeriodUnit = "rounds" | "minutes" | "hours" | "days" | "weeks" | "months" | "years";
type FrequencyPeriodField = SchemaField<{
    value: NumberField<number, number, true, false, true>;
    unit: StringField<FrequencyPeriodUnit, FrequencyPeriodUnit, true, false, true>;
}>;

export { ItemActivation, type ItemActivationSource };
