export * from './supabase'
export * from './cabinTypes';
export * from './settingsTypes'

export enum tableData {
CABINS='cabins',
BOOKINGS='bookings',
SETTINGS='settings',
GUESTS='guests',
USER='user'
}

 export enum Page {
    PAGE_SIZE = 10,
  }