export default class Event {
  static events: { [key: string]: Function[] } = {};

  static on(eventName: string, fn: Function) {
    Event.events[eventName] = Event.events[eventName] || [];
    Event.events[eventName].push(fn);
  }

  static off = function (eventName: string, fn: Function) {
    if (Event.events[eventName]) {
      for (var i = 0; i < Event.events[eventName].length; i++) {
        if (Event.events[eventName][i] === fn) {
          Event.events[eventName].splice(i, 1);
          break;
        }
      }
    }
  };

  static emit = function (eventName: string, data: any) {
    if (Event.events[eventName]) {
      Event.events[eventName].forEach(function (fn: Function) {
        fn(data);
      });
    }
  };
}
