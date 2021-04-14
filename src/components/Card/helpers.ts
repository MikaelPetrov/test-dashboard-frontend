export function capitalizeFirstLetter(status: string) {
  return status.charAt(0).toUpperCase() + status.slice(1).toLowerCase();
}

export function capitalizeType(type: string) {
  switch (type) {
    case 'CLASSIC':
      return capitalizeFirstLetter(type);
    case 'SERVER_SIDE':
      return capitalizeFirstLetter(type).replace('_', '-');
    case 'MVT':
      return type;
    default:
      return type;
  }
}

export function getURLWithoutProtocol(url: string) {
  const excludeWww = url.includes('www.') ? url.replace('www.', '') : url;
  if (excludeWww.includes('http://')) {
    return excludeWww.replace('http://', '');
  }
  if (excludeWww.includes('https://')) {
    return excludeWww.replace('https://', '');
  }
}
