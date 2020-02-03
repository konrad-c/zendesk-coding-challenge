import { Dataset } from '../src/dataset';
import { getUserRelations, getTicketRelations, getOrganizationRelations } from '../src/relations';

import { testUser } from './data/user';
import { testOrganization } from './data/organization';
import { testTicket } from './data/ticket';
import { User } from '../src/models/user';
import { Organization } from '../src/models/organization';
import { Ticket } from '../src/models/ticket';

const testData: Dataset = {
    users: [testUser],
    organizations: [testOrganization],
    tickets: [testTicket]
}

describe("Relations", () => {
    describe("User", () => {
        it("should be associated with an organization", () => {
            const userRelations: { Organization: Organization[] } = getUserRelations(testData, testUser);
            expect(userRelations).toHaveProperty("Organization");
            const organization: Organization | undefined = userRelations.Organization.shift();
            expect(organization).toEqual(testOrganization);
        });
    });

    describe("Ticket", () => {
        it("should have a user associated as Assignee", () => {
            const ticketRelations: { Assignee: User[] } = getTicketRelations(testData, testTicket);
            expect(ticketRelations).toHaveProperty("Assignee");
            const assignee: User | undefined = ticketRelations.Assignee.shift();
            expect(assignee).toEqual(testUser);
        });

        it("should have a user associated as submitter", () => {
            const ticketRelations: { Submitter: User[] } = getTicketRelations(testData, testTicket);
            expect(ticketRelations).toHaveProperty("Submitter");
            const submitter: User | undefined = ticketRelations.Submitter.shift();
            expect(submitter).toEqual(testUser);
        });

        it("should be associated with an organization", () => {
            const ticketRelations: { Organization: Organization[] } = getTicketRelations(testData, testTicket);
            expect(ticketRelations).toHaveProperty("Organization");
            const organization: Organization | undefined = ticketRelations["Organization"].shift();
            expect(organization).toEqual(testOrganization);
        });
    });

    describe("Organization", () => {
        it("should have users associated as Users", () => {
            const organizationRelations = getOrganizationRelations(testData, testOrganization);
            const users: User[] = organizationRelations.Users;
            expect(users).toEqual([testUser]);
        });

        it("should have tickets associated as Tickets", () => {
            const organizationRelations = getOrganizationRelations(testData, testOrganization);
            const tickets: Ticket[] = organizationRelations.Tickets;
            expect(tickets).toEqual([testTicket]);
        });
    });
});