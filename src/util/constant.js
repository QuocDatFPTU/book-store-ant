export const defaultPage = {
  page: 1,
  limit: 10,
};
export const formatDate = 'DD-MM-YYYY';
export const formatDateTime = 'DD-MM-YYYY HH:mm';
export const formatDateTimeFull = 'YYYY-MM-DD[T]HH:mm:ss';
export const formatDateYearFirst = 'YYYY-MM-DD';

export function randomDate(start, end) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).toISOString();
}