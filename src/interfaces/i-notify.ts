import IProperty from './i-property';

export default interface INotifyService {
    notify(property: IProperty): void
}