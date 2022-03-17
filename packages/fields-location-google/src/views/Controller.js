import FieldController from '@itoa/fields/Controller';

export default class LocationGoogleController extends FieldController {
  getQueryFragment = () => `
    ${this.path} {
       id
       googlePlaceID
       formattedAddress
       lat
       lng
    }
  `;
}
