import { EventInterface } from './event.interface';
import { ActivityInterface } from '../activities/activity.interface';
import { DurationClassAbstract } from '../duration/duration.class.abstract';
import { EventJSONInterface } from './event.json.interface';
import { Privacy } from '../privacy/privacy.class.interface';
export declare class Event extends DurationClassAbstract implements EventInterface {
    name: string;
    description?: string;
    privacy: Privacy;
    private activities;
    constructor(name: string, startDate: Date, endDate: Date, privacy?: Privacy, description?: string);
    addActivity(activity: ActivityInterface): void;
    addActivities(activities: ActivityInterface[]): void;
    clearActivities(): void;
    removeActivity(activityToRemove: ActivityInterface): void;
    getActivities(): ActivityInterface[];
    getFirstActivity(): ActivityInterface;
    getLastActivity(): ActivityInterface;
    private sortActivities;
    toJSON(): EventJSONInterface;
}
