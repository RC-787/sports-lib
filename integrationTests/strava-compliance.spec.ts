import fs from 'fs';
import { SportsLib } from '../src';
import { EventInterface } from '../src/events/event.interface';
import * as strava_3156040843 from './fixtures/strava_compliance/suunto_export/strava_3156040843.json';
import { DataAltitude } from '../src/data/data.altitude';
import { DataHeartRate } from '../src/data/data.heart-rate';
import { DataCadence } from '../src/data/data.cadence';
import { DataTemperature } from '../src/data/data.temperature';
import { DataPower } from '../src/data/data.power';
import { DataDistance } from '../src/data/data.distance';

function clone(obj: any) {
  return JSON.parse(JSON.stringify(obj));
}

describe('Strava data compliance', () => {

  it('should match altitude', done => {

    // Given
    const path = __dirname + '/fixtures/strava_compliance/suunto_export/5e5fde38c2de24635a30d383.fit';
    const buffer = fs.readFileSync(path);

    const altitudeStream = clone(strava_3156040843.altitude);

    // When
    const eventInterfacePromise = SportsLib.importFromFit(buffer);

    // Then
    eventInterfacePromise.then((event: EventInterface) => {
      expect(altitudeStream.length).toEqual(event.getFirstActivity().getStreamData(DataAltitude.type).length);
      // @todo Thomas do you think that this precision change should happen library wise?
      expect(altitudeStream).toEqual(event.getFirstActivity().getStreamData(DataAltitude.type).map(value => value === null ? null :  Math.round(value * 10) / 10));
      done();
    });
  });

  it('should match heart rate', done => {

    // Given
    const path = __dirname + '/fixtures/strava_compliance/suunto_export/5e5fde38c2de24635a30d383.fit';
    const buffer = fs.readFileSync(path);

    const heartRateStream = clone(strava_3156040843.heartrate);

    // When
    const eventInterfacePromise = SportsLib.importFromFit(buffer);

    // Then
    eventInterfacePromise.then((event: EventInterface) => {
      expect(heartRateStream.length).toEqual(event.getFirstActivity().getStreamData(DataHeartRate.type).length);
      expect(heartRateStream).toEqual(event.getFirstActivity().getStreamData(DataHeartRate.type).map(value => value === null ? null :  Math.round(value * 10) / 10));
      done();
    });
  });

  it('should match cadence', done => {

    // Given
    const path = __dirname + '/fixtures/strava_compliance/suunto_export/5e5fde38c2de24635a30d383.fit';
    const buffer = fs.readFileSync(path);

    const cadenceStream = clone(strava_3156040843.cadence);

    // When
    const eventInterfacePromise = SportsLib.importFromFit(buffer);

    // Then
    eventInterfacePromise.then((event: EventInterface) => {
      expect(cadenceStream.length).toEqual(event.getFirstActivity().getStreamData(DataCadence.type).length);
      expect(cadenceStream).toEqual(event.getFirstActivity().getStreamData(DataCadence.type).map(value => value === null ? null :  Math.round(value * 10) / 10));
      done();
    });
  });

  it('should match temperature', done => {

    // Given
    const path = __dirname + '/fixtures/strava_compliance/suunto_export/5e5fde38c2de24635a30d383.fit';
    const buffer = fs.readFileSync(path);

    const temperatureStream = clone(strava_3156040843.temp);

    // When
    const eventInterfacePromise = SportsLib.importFromFit(buffer);

    // Then
    eventInterfacePromise.then((event: EventInterface) => {
      expect(temperatureStream.length).toEqual(event.getFirstActivity().getStreamData(DataTemperature.type).length);
      expect(temperatureStream).toEqual(event.getFirstActivity().getStreamData(DataTemperature.type).map(value => value === null ? null :  Math.round(value * 10) / 10));
      done();
    });
  });

  it('should match power', done => {

    // Given
    const path = __dirname + '/fixtures/strava_compliance/suunto_export/5e5fde38c2de24635a30d383.fit';
    const buffer = fs.readFileSync(path);

    const powerStream = clone(strava_3156040843.watts);

    // When
    const eventInterfacePromise = SportsLib.importFromFit(buffer);

    // Then
    eventInterfacePromise.then((event: EventInterface) => {
      expect(powerStream.length).toEqual(event.getFirstActivity().getStreamData(DataPower.type).length);
      expect(powerStream).toEqual(event.getFirstActivity().getStreamData(DataPower.type).map(value => value === null ? null :  Math.round(value * 10) / 10));
      done();
    });
  });

  it('should match distance', done => {

    // Given
    const path = __dirname + '/fixtures/strava_compliance/suunto_export/5e5fde38c2de24635a30d383.fit';
    const buffer = fs.readFileSync(path);
    const tolerance = 0.20; // percent

    const distanceStream = clone(strava_3156040843.distance);

    // When
    const eventInterfacePromise = SportsLib.importFromFit(buffer);

    // Then
    eventInterfacePromise.then((event: EventInterface) => {
      expect(distanceStream.length).toEqual(event.getFirstActivity().getStreamData(DataDistance.type).length);
      const importDistanceStreamData = event.getFirstActivity().getStreamData(DataDistance.type).map(value => value === null ? null :  Math.round(value * 10) / 10)
      const commonCount = distanceStream
        .filter((value: (number|null)) => importDistanceStreamData.indexOf(value) !== -1).length;
      // We find the common then add the 1% tolerance and we check if its more than equal to the "strava" stream
      expect(commonCount + Math.ceil((distanceStream.length * tolerance) / 100)).toBeGreaterThanOrEqual(distanceStream.length);
      done();
    });
  });
});