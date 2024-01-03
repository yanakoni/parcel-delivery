import { object, string } from 'zod';

const SelfLinksSchema = object({
  self: string().nonempty('Self link is required'),
  related: string(),
});

export { SelfLinksSchema };
