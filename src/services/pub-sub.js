const events = {};

function subscribe(eventName, handler) {
  if (events[eventName] === undefined) {
    events[eventName] = [];
  }

  events[eventName].push(handler);
}

function emit(eventName, data) {
  events[eventName].forEach((handler) => handler(data));
}

export { subscribe, emit };
