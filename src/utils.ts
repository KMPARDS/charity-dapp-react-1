export function routine(fn: Function, msec: number): NodeJS.Timeout {
  let working = true;
  const result = fn();
  if (result instanceof Promise) {
    result.then(() => (working = false));
  } else {
    working = false;
  }

  const intervalId = setInterval(async () => {
    if (!working) {
      working = true;
      await fn();
      working = false;
    }
  }, msec);

  return intervalId;

}


export function renderSecondsRemaining(numberOfSeconds: number): string {
  const days = Math.floor(numberOfSeconds / 60 / 60 / 24);
  const hours = Math.floor((numberOfSeconds - days * 60 * 60 * 24) / 60 / 60);
  const minutes = Math.floor((numberOfSeconds - days * 60 * 60 * 24 - hours * 60 * 60) / 60);
  const seconds = numberOfSeconds - days * 60 * 60 * 24 - hours * 60 * 60 - minutes * 60;

  return `${days} days, ${hours} hours, ${minutes} minutes and ${seconds} seconds`;
}

export function renderTimestampRemaining(unixTimestampSeconds: number): string {
  const currentTimestamp = Math.round(Date.now() / 1000);
  let secondsRemaining = currentTimestamp - unixTimestampSeconds;
  if (secondsRemaining < 0) secondsRemaining = 0;
  return renderSecondsRemaining(secondsRemaining);
}

export function renderTimeStamp(datetime: string): number {
  const date = new Date(datetime);
  const timeStamp: number = date.getTime();
  return timeStamp / 1000;
}