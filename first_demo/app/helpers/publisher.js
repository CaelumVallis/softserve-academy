export default class Publisher {
  static events = {};
  static subscribe(event, listener) {
    if (!Publisher.events[event]) Publisher.events[event] = [];
    Publisher.events[event].push(listener);
  }

  static unsubscribe(event, listener) {
    if (!Publisher.events[event]) Publisher.events[event] = [];
    Publisher.events[event] = Publisher.events[event].filter((func) => func !== listener);
  }

  static notify(event, data) {
    if (!Publisher.events[event]) Publisher.events[event] = [];
    Publisher.events[event].forEach((func) => func(data));
  }
}
