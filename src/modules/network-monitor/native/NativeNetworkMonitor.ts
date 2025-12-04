import type { TurboModule } from 'react-native';
import { TurboModuleRegistry } from 'react-native';
import { ConnectionInfo } from '../types';

export interface Spec extends TurboModule {
  getCurrentState(): Promise<ConnectionInfo>;
  startMonitoring(): void;
  stopMonitoring(): void;
  addListener(eventName: string): void;
  removeListeners(count: number): void;
}

export default TurboModuleRegistry.getEnforcing<Spec>('NetworkMonitor');