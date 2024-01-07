import { object, string, TypeOf } from 'zod';

const UpdateProfileDataSchema = object({
  username: string().nonempty('Username is required.'),
});

type UpdateProfileDataInput = TypeOf<typeof UpdateProfileDataSchema>;

export type { UpdateProfileDataInput };
export { UpdateProfileDataSchema };
