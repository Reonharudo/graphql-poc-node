import { GraphQLResolveInfo, Kind } from "graphql";

export function getRequestedFields(info: GraphQLResolveInfo): string[] {
    const requestedFields = [];
    const fieldNode = info.fieldNodes[0];
    if (fieldNode) {
        const selectionSet = fieldNode.selectionSet;
        if (selectionSet) {
            for (const field of selectionSet.selections) {
                if (field.kind === Kind.FIELD) {
                    requestedFields.push(field.name.value);
                }
            }
        }
    }

    return requestedFields;
}
