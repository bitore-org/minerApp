import { EventEmitter as NodeEventEmitter } from "eventemitter3";

class EventEmitter {
  private static instance: EventEmitter;
  private emitter: NodeEventEmitter;

  private constructor() {
    this.emitter = new NodeEventEmitter();
  }

  public static getInstance(): EventEmitter {
    if (!EventEmitter.instance) {
      EventEmitter.instance = new EventEmitter();
    }

    return EventEmitter.instance;
  }

  public on(eventName: string, handler: (...args: any[]) => void): void {
    this.emitter.on(eventName, handler);
  }

  public off(eventName: string, handler: (...args: any[]) => void): void {
    this.emitter.off(eventName, handler);
  }

  public emit(eventName: string, ...args: any[]): boolean {
    return this.emitter.emit(eventName, ...args);
  }

  public removeAllListeners(eventName?: string): void {
    this.emitter.removeAllListeners(eventName);
  }
}

export default EventEmitter.getInstance();
