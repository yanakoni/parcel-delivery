import { MAX_IMAGE_SIZE_BYTES } from '../consts';

const base64SizeCheck = (value: string | null) => {
  if (!value) return true;
  // Convert base64 string size to byte size. Roughly every 4 chars of base64 represent 3 bytes.
  const byteSize = (value.length * 3) / 4;

  // Adjust for padding. Every '=' at the end of the base64 string represents a missing byte.
  const paddingSize = (value.match(/=*$/) || [''])[0].length;
  const adjustedByteSize = byteSize - paddingSize;

  return adjustedByteSize <= MAX_IMAGE_SIZE_BYTES;
};
export { base64SizeCheck };
