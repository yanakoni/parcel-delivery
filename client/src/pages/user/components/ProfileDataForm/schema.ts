import { string, object, TypeOf } from 'zod';
import { MAX_IMAGE_SIZE_BYTES } from '../../../../consts';
import { base64SizeCheck } from '../../../../utils';

const UpdateProfileDataSchema = object({
  first_name: string().nonempty('First name is required.'),
  last_name: string().nonempty('Last name is required.'),
  settings_profile_phone: string().nullable(),
  settings_profile_avatar: string()
    .nullable()
    .refine(base64SizeCheck, {
      message: `Avatar size exceeds the maximum allowed size of ${
        MAX_IMAGE_SIZE_BYTES / 1_000_000
      } MB.`,
    }),
});

type UpdateProfileDataInput = TypeOf<typeof UpdateProfileDataSchema>;

export type { UpdateProfileDataInput };
export { UpdateProfileDataSchema };
