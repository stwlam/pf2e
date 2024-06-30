import type { UserPF2e } from "@module/user/document.ts";
import type { TokenPF2e } from "./token/object.ts";

class RulerPF2e<TToken extends TokenPF2e | null = TokenPF2e | null> extends Ruler<TToken, UserPF2e> {
    static override get canMeasure(): boolean {
        return super.canMeasure || canvas.tokens.controlled.length === 1;
    }

    get isMeasuring(): boolean {
        return this.state === RulerPF2e.STATES.MEASURING;
    }

    /** Add a waypoint at the currently-drawn destination. */
    saveWaypoint(): void {
        const point = this.destination;
        if (point) {
            const snap = !game.keyboard.isModifierActive(KeyboardManager.MODIFIER_KEYS.SHIFT);
            this._addWaypoint(point, { snap });
        }
    }

    protected override _onMouseUp(event: PlaceablesLayerPointerEvent<NonNullable<TToken>>): void {
        if (!this.isMeasuring) {
            // This should never be reached
            return super._onMouseUp(event);
        } else if (event.button === 2) {
            // Right mouse up: handled by `_onRightClick`
            return;
        } else if (this.waypoints.length >= 1) {
            if (this.token) {
                this.token.document.locked = this.token.document._source.locked;
            }
            this.moveToken().then(() => {
                this._endMeasurement();
            });
            return;
        }

        event.ctrlKey = false;
        return this._onClickLeft(event);
    }

    protected override _onClickRight(event: PlaceablesLayerPointerEvent<NonNullable<TToken>>): void {
        if (this.isMeasuring && this.waypoints.length > 1) {
            canvas.mouseInteractionManager._dragRight = false;
            return this._removeWaypoint();
        }
        event.ctrlKey = false;

        return super._onClickRight(event);
    }

    /** If measuring with a token, only broadcast during an encounter. */
    protected override _broadcastMeasurement(): void {
        if (!this.token || game.combat?.started) {
            return super._broadcastMeasurement();
        }
    }

    protected override _highlightMeasurementSegment(segment: RulerMeasurementSegment): void {
        if (segment.teleport) return;
        const path = canvas.grid.getDirectPath([segment.ray.A, segment.ray.B]);
        for (const offset of path) {
            const { x: x1, y: y1 } = canvas.grid.getTopLeftPoint(offset);
            canvas.interface.grid.highlightPosition(this.name, { x: x1, y: y1, color: this.color });
        }
    }
}

export { RulerPF2e };
