import { mockSetups } from '@/lib/mock-data';
import type { SafeSetup } from './entitlement-types';
import { getMockServerUser } from './mock-session';
import { projectSetupForUser } from './project-setup';

export function getSafeSetupsForUser(): SafeSetup[] {
  const user = getMockServerUser();

  return mockSetups.map((setup) => projectSetupForUser(setup, user.tier));
}
