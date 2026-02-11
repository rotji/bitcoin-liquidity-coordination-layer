// Interface for routing intent adapter
export interface RoutingIntent {
  publishIntent(intent: object): Promise<void>;
  getIntents(): Promise<object[]>;
}
