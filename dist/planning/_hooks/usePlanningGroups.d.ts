import { Team } from '../../models/Team';
import { User } from '../../models/User';
interface UseGroupsParams {
    teams?: {
        data: Team[];
    };
    users: User[];
}
export declare const usePlanningGroups: ({ teams, users }: UseGroupsParams) => {
    siteGroups: Group[];
    teamGroups: Group[];
    currentGroups: Group[];
};
export {};
