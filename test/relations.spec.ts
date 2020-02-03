import { Dataset } from '../src/dataset';
import { getUserRelations, getTicketRelations } from '../src/relations';

import { testUser } from './data/user';
import { testOrganization } from './data/organization';
import { testTicket } from './data/ticket';
import { User } from '../src/models/user';
import { Organization } from '../src/models/organization';

const testData: Dataset = {
    users: [testUser],
    organizations: [testOrganization],
    tickets: [testTicket]
}

describe("Relations", () => {
    describe("User", () => {
        it("should be associated with an organization", () => {
            const userRelations = getUserRelations(testData, testUser);
            const organization: Organization = userRelations.Organization.unwrap();
            expect(organization).toEqual(testOrganization);
        });
    });

    describe("Ticket", () => {
        it("should have a user associated as Assignee", () => {
            const ticketRelations = getTicketRelations(testData, testTicket);
            const assignee: User = ticketRelations.Assignee.unwrap();
            expect(assignee).toEqual(testUser);
        });

        it("should have a user associated as submitter", () => {
            const ticketRelations = getTicketRelations(testData, testTicket);
            const submitter: User = ticketRelations.Submitter.unwrap();
            expect(submitter).toEqual(testUser);
        });

        it("should be associated with an organization", () => {
            const ticketRelations = getTicketRelations(testData, testTicket);
            const organization: Organization = ticketRelations.Organization.unwrap();
            expect(organization).toEqual(testOrganization);
        });
    });
});