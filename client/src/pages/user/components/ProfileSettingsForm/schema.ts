import { object, string, TypeOf } from 'zod';
import { Locale, TableItemsCount } from '../../../../enums';

const UpdateProfileSettingsSchema = object({
  settings_locale: string()
    .nonempty('Locale is required')
    .refine((str) => Object.values(Locale).includes(str as Locale), 'Locale is required'),
  settings_table_items_count: string()
    .nonempty('Table items count is required')
    .refine((str) => Object.values(TableItemsCount).includes(str as TableItemsCount), 'Table items count is required'),
});

type UpdateProfileSettingsInput = TypeOf<typeof UpdateProfileSettingsSchema>;

export type { UpdateProfileSettingsInput };
export { UpdateProfileSettingsSchema };
