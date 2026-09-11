import { DateTime, Duration, Interval } from "luxon";

interface DarknessTransition {
    /** Target darkness level; between 0 and 1 */
    target: number;
    /** Duration in milliseconds */
    duration: number;
    /** interval for debugging purposes */
    interval?: Interval;
}

const dayInSeconds = Duration.fromObject({ hours: 24 }).as("seconds");

/** Plot darkness level along a cosine of a duration */
function darknessLevelAtTime(time: DateTime): number {
    const secondsElapsed = time.diff(time.startOf("day")).as("seconds");
    const radians = 2 * Math.PI * (secondsElapsed / dayInSeconds);
    const lightnessLevel = -1 * Math.cos(radians);
    const rad18degrees = Math.toRadians(18);

    return (
        1 -
        (lightnessLevel > 0
            ? 1
            : lightnessLevel < -rad18degrees
              ? 0
              : Math.sin((((lightnessLevel + rad18degrees) / rad18degrees) * Math.PI) / 2))
    );
}

/** Calculate animateDarkness parameters from a time interval */
function intervalToTransition(interval: Interval, compactInterval: Interval): DarknessTransition {
    const currentDarkness = canvas.darknessLevel;
    const targetDarkness = interval.end ? darknessLevelAtTime(interval.end) : NaN;
    const darknessDiff = Math.abs((currentDarkness ?? targetDarkness) - targetDarkness);

    // Cap the darkness transition duration
    const elapsedSeconds = compactInterval.length("seconds");
    const proportionOfDay = elapsedSeconds / dayInSeconds;
    const darkTimeMean = (darknessDiff * 0.5 + proportionOfDay) / 2;

    return {
        target: targetDarkness,
        duration: darkTimeMean * 6000,
        interval: interval,
    };
}

export { darknessLevelAtTime, intervalToTransition };
export type { DarknessTransition };
