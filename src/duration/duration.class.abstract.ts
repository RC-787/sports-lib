import { DurationClassInterface } from './duration.class.interface';
import { StatsClassAbstract } from '../stats/stats.class.abstract';
import { DataPause } from '../data/data.pause';
import { DataDuration } from '../data/data.duration';

export abstract class DurationClassAbstract extends StatsClassAbstract implements DurationClassInterface {
  startDate: Date;
  endDate: Date;

  protected constructor(startDate: Date, endDate: Date) {
    super();
    this.startDate = startDate;
    this.endDate = endDate;
  }

  getDuration(): DataDuration {
    return <DataDuration>this.stats.get(DataDuration.type);
  }

  getPause(): DataPause {
    return <DataPause>this.stats.get(DataPause.type);
  }

  setDuration(duration: DataDuration) {
    this.stats.set(DataDuration.type, duration);
  }

  setPause(pause: DataPause) {
    this.stats.set(DataPause.type, pause);
  }
}
