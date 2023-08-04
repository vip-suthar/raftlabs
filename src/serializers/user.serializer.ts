import { abstractSerializer } from "./__serializer";

const userFields: string[] = ["_id", "username", "email"];

export const userSerializer = (user: any) => abstractSerializer(user, userFields);