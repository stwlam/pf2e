import { TokenPF2e } from "../index.ts";

class TokenLayerPF2e<TObject extends TokenPF2e> extends TokenLayer<TObject> {
    /** Prevent redirection of event to `Ruler` when ctrl key is pressed. */
    protected override _onClickLeft(event: PlaceablesLayerPointerEvent<TObject>): void {
        if (game.activeTool !== "ruler" && game.keyboard.isModifierActive(KeyboardManager.MODIFIER_KEYS.CONTROL)) {
            return;
        }

        return super._onClickLeft(event);
    }
}

export { TokenLayerPF2e };
