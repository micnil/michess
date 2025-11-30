type EventHandler<TEvent> = (event: TEvent) => void;

type EventFilter<TEvent extends { type: string }> =
  | TEvent['type']
  | TEvent['type'][];

export class EventEmitter<TEvent extends { type: string }> {
  private observers: Set<EventHandler<TEvent>> = new Set();

  /**
   * Subscribe to events
   * @param handler - Function to call when events are emitted
   * @param filter - Optional event type(s) to filter for. If not provided, all events are received.
   * @returns Unsubscribe function
   */
  subscribe(
    handler: EventHandler<TEvent>,
    filter?: EventFilter<TEvent>,
  ): () => void {
    const wrappedHandler: EventHandler<TEvent> = (event) => {
      if (!filter) {
        handler(event);
      } else if (Array.isArray(filter)) {
        if (filter.includes(event.type)) {
          handler(event);
        }
      } else {
        if (event.type === filter) {
          handler(event);
        }
      }
    };

    this.observers.add(wrappedHandler);

    return () => {
      this.observers.delete(wrappedHandler);
    };
  }

  /**
   * Emit an event to all subscribers
   */
  protected emit(event: TEvent): void {
    this.observers.forEach((handler) => handler(event));
  }

  /**
   * Clear all subscribers
   */
  protected clearSubscribers(): void {
    this.observers.clear();
  }
}
