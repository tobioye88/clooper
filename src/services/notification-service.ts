import INotifyService from "../interfaces/i-notify";
import IProperty from '../interfaces/i-property';

export class NotificationService {

    static notify(property: IProperty, service: INotifyService){
        service.notify(property);
    }
}