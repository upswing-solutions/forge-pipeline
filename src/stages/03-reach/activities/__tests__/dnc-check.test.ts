jest.mock('@temporalio/activity', () => ({ log: { info: jest.fn(), warn: jest.fn() } }));
jest.mock('../../../../shared/lib/postgres');
jest.mock('../../../../shared/lib/workspace');

import { dncCheck } from '../dnc-check';
import { query } from '../../../../shared/lib/postgres';
import { loadProspect } from '../../../../shared/lib/workspace';

const mockedQuery = query as jest.MockedFunction<typeof query>;
const mockedLoad = loadProspect as jest.MockedFunction<typeof loadProspect>;

beforeEach(() => jest.clearAllMocks());

describe('dncCheck', () => {
  it('blocks a prospect whose contact is on the do-not-contact list', async () => {
    mockedLoad.mockResolvedValue({ id: 1, phone: '555-0100', email: 'a@b.test' } as any);
    mockedQuery.mockResolvedValue([{ id: 99 }] as any);
    await expect(dncCheck(1)).resolves.toEqual({ blocked: true });
  });
  it('allows a prospect with no suppression match', async () => {
    mockedLoad.mockResolvedValue({ id: 2, phone: '555-0101', email: 'c@d.test' } as any);
    mockedQuery.mockResolvedValue([] as any);
    await expect(dncCheck(2)).resolves.toEqual({ blocked: false });
  });
});
