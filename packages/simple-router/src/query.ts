export type LocationQueryValue = string | null;

/**
 * Normalized query object that appears in {@link RouteLocationNormalized}
 *
 * @public
 */
export type LocationQuery = Record<string, LocationQueryValue | LocationQueryValue[]>;
export type LocationQueryValueRaw = LocationQueryValue | number | undefined;

export type LocationQueryRaw = Record<string | number, LocationQueryValueRaw | LocationQueryValueRaw[]>;

/**
 * Transforms a queryString into a {@link LocationQuery} object. Accept both, a version with the leading `?` and without
 * Should work as URLSearchParams
 *
 * @param search - search string to parse
 * @returns a query object
 * @internal
 */

export const PLUS_RE = /\+/g; // %2B

const EQUAL_RE = /[=]/g; // %3D

const ENC_BRACKET_OPEN_RE = /%5B/g; // [
const ENC_BRACKET_CLOSE_RE = /%5D/g; // ]
const ENC_CARET_RE = /%5E/g; // ^
const ENC_BACKTICK_RE = /%60/g; // `
const ENC_CURLY_OPEN_RE = /%7B/g; // {
const ENC_PIPE_RE = /%7C/g; // |
const ENC_CURLY_CLOSE_RE = /%7D/g; // }
const ENC_SPACE_RE = /%20/g; // }
const HASH_RE = /#/g; // %23
const AMPERSAND_RE = /&/g; // %26
export function parseQuery(search: string): LocationQuery {
  const query: LocationQuery = {};
  // avoid creating an object with an empty key and empty value
  // because of split('&')
  if (search === '' || search === '?') return query;
  const hasLeadingIM = search[0] === '?';
  const searchParams = (hasLeadingIM ? search.slice(1) : search).split('&');

  for (let i = 0; i < searchParams.length; i += 1) {
    // pre decode the + into space
    const searchParam = searchParams[i].replace(PLUS_RE, ' ');
    // allow the = character
    const eqPos = searchParam.indexOf('=');
    const key = decode(eqPos < 0 ? searchParam : searchParam.slice(0, eqPos));
    const value = eqPos < 0 ? null : decode(searchParam.slice(eqPos + 1));

    if (key in query) {
      // an extra variable for ts types
      let currentValue = query[key];
      if (!Array.isArray(currentValue)) {
        currentValue = [currentValue];
        query[key] = currentValue;
      }
      // we force the modification
      (currentValue as LocationQueryValue[]).push(value);
    } else {
      query[key] = value;
    }
  }
  return query;
}

export function stringifyQuery(query: LocationQueryRaw): string {
  let search = '';

  for (const [originalKey, value] of Object.entries(query)) {
    const key = encodeQueryKey(originalKey);
    if (value === null) {
      // only null adds the value
      if (value !== undefined) {
        search += (search.length ? '&' : '') + key;
      }
      // eslint-disable-next-line no-continue
      continue;
    }
    // keep null values
    const values: LocationQueryValueRaw[] = Array.isArray(value)
      ? value.map(v => v && encodeQueryValue(v))
      : [value && encodeQueryValue(value)];

    for (const v of values) {
      // skip undefined values in arrays as if they were not present
      if (v !== undefined) {
        // only append & with non-empty search
        search += (search.length ? '&' : '') + key;
        if (v !== null) search += `=${v}`;
      }
    }
  }

  return search;
}

export function decode(text: string | number): string {
  try {
    return decodeURIComponent(`${text}`);
  } catch {
    console.warn(`Error decoding "${text}". Using original value`);
  }
  return `${text}`;
}

export function encodeQueryKey(text: string | number): string {
  return encodeQueryValue(text).replace(EQUAL_RE, '%3D');
}

export function encodeQueryValue(text: string | number): string {
  return (
    commonEncode(text)
      // Encode the space as +, encode the + to differentiate it from the space
      .replace(PLUS_RE, '%2B')
      .replace(ENC_SPACE_RE, '+')
      .replace(HASH_RE, '%23')
      .replace(AMPERSAND_RE, '%26')
      .replace(ENC_BACKTICK_RE, '`')
      .replace(ENC_CURLY_OPEN_RE, '{')
      .replace(ENC_CURLY_CLOSE_RE, '}')
      .replace(ENC_CARET_RE, '^')
  );
}

function commonEncode(text: string | number): string {
  return encodeURI(`${text}`)
    .replace(ENC_PIPE_RE, '|')
    .replace(ENC_BRACKET_OPEN_RE, '[')
    .replace(ENC_BRACKET_CLOSE_RE, ']');
}
