import { TypeCard } from '../components/Dashboard/types';

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

export function sortFields(array: TypeCard[], sortedField: string, isSortedDesc: boolean) {
  array.sort((a: any, b: any) => {
    if (!isSortedDesc) {
      if (a[sortedField] > b[sortedField]) return 1;
      if (a[sortedField] < b[sortedField]) return -1;
    }
    if (isSortedDesc) {
      if (a[sortedField] < b[sortedField]) return 1;
      if (a[sortedField] > b[sortedField]) return -1;
    }
    return 0;
  });
}

export function sortByStatusField(array: TypeCard[], sortedField: string, isSortedDesc: boolean) {
  const ascStatuses = ['Online', 'Paused', 'Stopped', 'Draft'];
  const sortByObject = ascStatuses.reduce((obj: any, item: any, index: any) => {
    return {
      ...obj,
      [item]: index,
    };
  }, {});
  if (isSortedDesc) {
    return array.sort((a: any, b: any) => sortByObject[a[sortedField]] - sortByObject[b[sortedField]]);
  }
  if (!isSortedDesc) {
    return array.sort((a: any, b: any) => sortByObject[a[sortedField]] - sortByObject[b[sortedField]]).reverse();
  }
}
